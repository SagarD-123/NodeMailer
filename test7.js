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

            switch (templateName) {
                case "template":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[HR Manager's Name]", recipient.name)
                        .replace("[insert number of days]", recipient.numberOfDays)
                        .replace("[insert date]", recipient.startdate)
                        .replace("[Your Name]", recipient.senderName);
                    break;

                case "template1":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[Recipient's Name]", recipient.name)
                        // .replace("[Dynamic Data]", recipient.numberOfDays)
                        .replace("[Your Name]", recipient.senderName);
                    break;
                case "template2":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[Recipient's Name]", recipient.name)
                        .replace("[describe milestone achieved]", recipient.MilestoneDesc)
                        .replace("[Your Name]", recipient.senderName);
                    break;
                case "template3":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[Recipient's Name]", recipient.name)
                        .replace("[describe the problem briefly]", recipient.ProblemDesc)
                        .replace("[describe impact on productivity or operations]", recipient.OperationDesc)
                        .replace("[Your Name]", recipient.senderName);
                    break;
                case "template4":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[Recipient's Name]", recipient.name)
                        .replace("[describe the specific aspect you're seeking feedback on, e.g., recent project, new initiative, or a meeting]", recipient.FeedbackDesc)
                        .replace("[Your Name]", recipient.senderName);
                    break;
                case "template5":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[Recipient's Name]", recipient.name)
                        .replace("[describe the topic or skillset]", recipient.TopicDesc)
                        .replace("[trainer's name or department]", recipient.TrainerName)
                        .replace("[topic]", recipient.Topic)
                        .replace("[Date]", recipient.Date)
                        .replace("[Time]", recipient.Time)
                        .replace("[Location/Online Link]", recipient.Location)
                        .replace("[Your Name]", recipient.senderName);
                    break;
                case "template6":
                    templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
                        .replace("[Employee's Name]", recipient.name)
                        .replace("[Company Name]", recipient.CompanyName)
                        .replace("[Employee's Position/Role]", recipient.EmployeePosition)
                        .replace("[Your Name]", recipient.senderName)
                        .replace("[Your Position/Department]", recipient.senderPosition);
                    break;

                default:
                    break;
            }
            // templateWithRecipientData = templateWithRecipientData.replace("[Recipient's Email]", recipient.email)
            //     .replace("[Recipient's Name]", recipient.name)
            //     .replace("[Dynamic Data]", recipient.numberOfDays)
            //     .replace("[Your Name]", recipient.senderName);

            // Send email for each recipient
            await sendEmail(recipient.email, templateWithRecipientData);
        }
    } catch (error) {
        throw new Error(`Error reading template file: ${error}`);
    }
}

// Function to send email

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


        switch (templateName) {
            case "template":
                const recipientEmail = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName = await promptUser(`Enter the Name of recipient ${i + 1}: `);
                const numberOfDays = await promptUser(`Enter the number of day for leave for recipient ${i + 1}: `);
                const startdate = await promptUser(`Enter the start date of leave for recipient ${i + 1}: `);
                const senderName = await promptUser(`Enter the sender Name ${i + 1}: `);
                recipientData.push({ email: recipientEmail, name: recipientName, numberOfDays: numberOfDays, startdate: startdate, senderName: senderName });
                break;

            case "template1":
                const recipientEmail1 = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName1 = await promptUser(`Enter the Name of recipient ${i + 1}: `);
                // const dynamicData = await promptUser(`Enter the dynamic data for recipient ${i + 1}: `);
                const senderName1 = await promptUser(`Enter the sender Name ${i + 1}: `);
                recipientData.push({ email: recipientEmail1, name: recipientName1, senderName: senderName1 });
                break;
            case "template2":
                const recipientEmail2 = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName2 = await promptUser(`Enter the Name of recipient ${i + 1}: `);
                const MilestoneDesc = await promptUser(`Descibe the Milestone for recipient ${i + 1}: `);
                const senderName2 = await promptUser(`Enter the sender Name ${i + 1}: `);
                recipientData.push({ email: recipientEmail2, name: recipientName2, MilestoneDesc: MilestoneDesc, senderName: senderName2 });
                break;
            case "template3":
                const recipientEmail3 = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName3 = await promptUser(`Enter the Team Name ${i + 1} : `);
                const ProblemDesc = await promptUser(`Descibe the problem for team ${i + 1}: `);
                const OperationDesc = await promptUser(`Descibe the Operation for raiseed problem for team ${i + 1}: `);
                const senderName3 = await promptUser(`Enter the sender Name ${i + 1}: `);
                recipientData.push({ email: recipientEmail3, name: recipientName3, ProblemDesc: ProblemDesc, OperationDesc: OperationDesc, senderName: senderName3 });
                break;
            case "template4":
                const recipientEmail4 = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName4 = await promptUser(`Enter the Name of recipient ${i + 1}: `);
                const FeedbackDesc = await promptUser(`Describe the Feedback for recipient ${i + 1}: `);
                const senderName4 = await promptUser(`Enter the sender Name ${i + 1}: `);
                recipientData.push({ email: recipientEmail4, name: recipientName4, FeedbackDesc: FeedbackDesc, senderName: senderName4 });
                break;
            case "template5":
                const recipientEmail5 = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName5 = await promptUser(`Enter the Name of recipient ${i + 1}: `);
                const TopicDesc = await promptUser(`Describe the Topic for recipient ${i + 1}: `);
                const TrainerName = await promptUser(`Enter the name of trainer for recipient ${i + 1}: `);
                const Topic = await promptUser(`Enter the name Topic for recipient ${i + 1}: `);
                const Date = await promptUser(`Enter the Date for training recipient ${i + 1}: `);
                const Time = await promptUser(`Enter the Time for training recipient ${i + 1}: `);
                const Location = await promptUser(`Enter the Location for training recipient ${i + 1}: `);
                const senderName5 = await promptUser(`Enter the sender Name ${i + 1}: `);
                recipientData.push({ email: recipientEmail5, name: recipientName5, TopicDesc: TopicDesc, TrainerName: TrainerName, Topic: Topic, Date: Date, Time: Time, Location: Location, senderName: senderName5 });
                break;
            case "template6":
                const recipientEmail6 = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
                const recipientName6 = await promptUser(`Enter the Name of recipient ${i + 1}: `);
                const CompanyName = await promptUser(`Enter the Name the company for recipient ${i + 1}: `);
                const EmployeePosition = await promptUser(`Enter the Position for recipient ${i + 1}: `);
                const senderName6 = await promptUser(`Enter the sender Name ${i + 1}: `);
                const senderPosition = await promptUser(`Enter the sender Position : `);
                recipientData.push({ email: recipientEmail6, name: recipientName6, CompanyName: CompanyName,EmployeePosition: EmployeePosition, senderName: senderName6 , senderPosition: senderPosition });
                break;
            default:
                break;
        }

        // const recipientEmail = await promptUser(`Enter the Email Address of recipient ${i + 1}: `);
        // const recipientName = await promptUser(`Enter the Name of recipient ${i + 1}: `);
        // const dynamicData = await promptUser(`Enter the dynamic data for recipient ${i + 1}: `);
        // const senderName = await promptUser(`Enter the sender Name ${i + 1}: `);
        // recipientData.push({ email: recipientEmail, name: recipientName, dynamicData: dynamicData, senderName: senderName });
    }

    try {
        // Select and customize the appropriate template for each recipient
        await selectAndCustomizeTemplate(templateName, recipientData);
    } catch (error) {
        console.error("Error:", error);
    }
}
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

main().catch(console.error);
