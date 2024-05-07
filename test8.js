require('dotenv').config();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const fs = require("fs").promises;
const readline = require("readline");

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: `localhost`,
    user: `root`,
    password: `Swastik@123`,
    database: `demo`
});

// Function to fetch email addresses and names from MySQLasync function fetchRecipients() {
async function fetchRecipients() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT name, email_id, pdf_path, pdf_name FROM data', (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log("Fetched recipients:", results);
                resolve(results);
            }
        });
    });
}


// Function to customize email template with recipient data
async function customizeTemplate(templateName, recipient) {
    const templatePath = `./email_templates/${templateName}.txt`;

    try {
        const templateContent = await fs.readFile(templatePath, "utf8");

        let customizedTemplate = templateContent;

        // Customize the template content with dynamic data for the recipient
        switch (templateName) {
            case "template":
                customizedTemplate = customizedTemplate
                    .replace("[Student Name]", recipient.name);
                // .replace("[insert number of days]", recipient.numberOfDays)
                // .replace("[insert date]", recipient.startdate)
                // .replace("[Your Name]", recipient.senderName);
                break;
            // Add cases for other templates as needed
            default:
                break;
        }

        return customizedTemplate;
    } catch (error) {
        throw new Error(`Error reading template file: ${error}`);
    }
}

// Function to send email
async function sendEmailWithAttachment(recipientEmail, recipientName, customizedTemplate, emailSubject, pdf_Path, pdf_name) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: emailSubject,
            html: customizedTemplate,
            attachments: [{
                filename: pdf_name, // Filename of the attachment as seen by the recipient
                path: pdf_Path // Path to the PDF file
            }]
        });
        console.log(`Email sent to ${recipientEmail}: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email to ${recipientEmail}:`, error);
    }
}


// Function to prompt the user for input
function promptUser(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Main function to send emails
async function main() {
    try {
        const recipients = await fetchRecipients();

        // Prompt user for the template name
        const templateName = await promptUser("Enter the name of the template you want to use (e.g., template): ");

        // Prompt user for email subject
        const emailSubject = await promptUser("Enter the Subject for the email: ");

        // Customize and send email for each recipient
        for (const recipient of recipients) {
            const customizedTemplate = await customizeTemplate(templateName, recipient);
            await sendEmailWithAttachment(recipient.email_id, recipient.name, customizedTemplate, emailSubject, recipient.pdf_path);
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the MySQL connection pool
        pool.end();
        console.log("MySQL connection pool closed.");
    }
}
main().catch(console.error);
