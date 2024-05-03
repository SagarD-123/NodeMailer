require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs").promises; // Importing the 'fs' module to read files
const readline = require("readline"); // Importing 'readline' module for user input

// Function to select and customize the appropriate template
async function selectAndCustomizeTemplate(templateName, recipientData) {
    const templatePath = `./email_templates/${templateName}.txt`;

    try {
        const templateContent = await fs.readFile(templatePath, "utf8");

        // Customize the template content with dynamic data for each recipient
        let customizedTemplate = templateContent;
        for (const recipient of recipientData) {
            let templateWithRecipientData = customizedTemplate;
            templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                .replace("[Recipient's Name]", recipient.name)
                .replace("[Dynamic Data]", recipient.dynamicData)
                .replace("[Your Name]", recipient.senderName);

            // Send email for each recipient
            await sendEmail(recipient.email, templateWithRecipientData);
        }
    } catch (error) {
        throw new Error(`Error reading template file: ${error}`);
    }
}

// Function to send email
async function sendEmail(recipientEmail, customizedTemplate) {
    // Create nodemailer transporter
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
        // Send the email using the customized template
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: "Email Subject", // Customize the subject if needed
            html: customizedTemplate,
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

// Main function to send the email
async function main() {
    // Prompt user for the template name
    const templateName = await promptUser("Enter the name of the template you want to use (e.g., template): ");

    // Prompt user for email subject
    // const emailSubject = await promptUser("Enter the Subject for the email: ");

    // Prompt user for recipient's email addresses and names
    const recipientData = [];
    const numOfRecipients = parseInt(await promptUser("Enter the number of recipients: "));
    for (let i = 0; i < numOfRecipients; i++) {
        const recipientEmail = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
        const recipientName = await promptUser(`Enter the Name of recipient ${i + 1}: `);
        const dynamicData = await promptUser(`Enter the dynamic data for recipient ${i + 1}: `);
        const senderName = await promptUser(`Enter the sender Name ${i + 1}: `);
        recipientData.push({ email: recipientEmail, name: recipientName, dynamicData: dynamicData, senderName: senderName });
    }

    try {
        // Select and customize the appropriate template for each recipient
        await selectAndCustomizeTemplate(templateName, recipientData);
    } catch (error) {
        console.error("Error:", error);
    }
}

main().catch(console.error);
