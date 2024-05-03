require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs").promises; // Importing the 'fs' module to read files
const readline = require("readline"); // Importing 'readline' module for user input

// Function to select and customize the appropriate template
// async function selectAndCustomizeTemplate(templateName, data) {
//   // Determine the template path based on the template name provided by the user
//   const templatePath = `./email_templates/${templateName}.txt`;

//   // Read the content of the selected template file
//   const templateContent = await fs.readFile(templatePath, "utf8");

//   // Customize the template content with dynamic data
//   const customizedTemplate = templateContent.replace("[HR Manager's Name]", data.managerName)
//                                             .replace("[insert number of days]", data.numberOfDays)
//                                             .replace("[insert date]", data.startDate)
//                                             .replace("[Your Name]", data.senderName);

//   return customizedTemplate;


// }
async function selectAndCustomizeTemplate(templateName, data) {
    const templatePath = `./email_templates/${templateName}.txt`;

    try {
        const templateContent = await fs.readFile(templatePath, "utf8");

        // Customize the template content with dynamic data
        let customizedTemplate = templateContent;

        // Use switch statement for template-specific replacements
        switch (templateName) {
            case "template":
                customizedTemplate = customizedTemplate.replace("[HR Manager's Name]", data.managerName)
                    .replace("[insert number of days]", data.numberOfDays)
                    .replace("[insert date]", data.startDate)
                    .replace("[Your Name]", data.senderName);
                break;
            case "template1":
                customizedTemplate = customizedTemplate.replace("[Recipient's Name]", data.RecipientName)
                    //   .replace("[vacationType]", data.vacationType)
                    //   .replace("[insert start date]", data.startDate)
                    //   .replace("[insert end date]", data.endDate)
                    .replace("[Your Name]", data.senderName);
                break;
            case "template2":
                customizedTemplate = customizedTemplate.replace("[describe milestone achieved]", data.MilestoneDesc)
                    // .replace("[insert number of days]", data.numberOfDays)
                    // .replace("[insert date]", data.startDate)
                    .replace("[Your Name]", data.senderName);
                break;
            case "template3":
                customizedTemplate = customizedTemplate.replace("[Support Team]", data.TeamName)
                    .replace("[describe the problem briefly]", data.ProblemDesc)
                    .replace("[describe impact on productivity or operations]", data.OperationDesc)
                    .replace("[Your Name]", data.senderName);
                break;
            case "template4":
                customizedTemplate = customizedTemplate.replace("[Recipient's Name]", data.RecipientName)
                    .replace("[describe the specific aspect you're seeking feedback on, e.g., recent project, new initiative, or a meeting]", data.FeedbackDesc)
                    // .replace("[insert date]", data.startDate)
                    .replace("[Your Name]", data.senderName);
                break;
            case "template5":
                customizedTemplate = customizedTemplate.replace("[describe the topic or skillset]", data.TopicDesc)
                    .replace("[trainer's name or department]", data.TrainerName)
                    .replace("[topic]", data.Topic)
                    .replace("[Date]", data.Date)
                    .replace("[Time]", data.Time)
                    .replace("[Location/Online Link]", data.Location)
                    .replace("[Your Name]", data.senderName);
                break;
            case "template6":
                customizedTemplate = customizedTemplate.replace("[Employee's Name]", data.EmployeeName)
                    .replace("[Company Name]", data.CompanyName)
                    .replace("[Employee's Position/Role]", data.EmployeePosition)
                    .replace("[Company Name]", data.CompanyName)
                    .replace("[Your Name]", data.senderName)
                    .replace("[Your Position/Department]", data.SenderPosition);
                break;
            // Add more cases for other templates as needed
            default:
                throw new Error("Invalid template name.");
        }

        return customizedTemplate;
    } catch (error) {
        throw new Error(`Error reading template file: ${error}`);
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

    // Prompt user for the template name
    const templateName = await promptUser("Enter the name of the template you want to use (e.g., sick_leave): ");

    const emailSubject = await promptUser("Enter the Subject for the email : ");

    //const emailSentTO = await promptUser("Enter the Email Address of receiver : ");
    const emailRecipients = await promptUser("Enter the Email Addresses of receivers separated by comma: ");
    const emailRecipientsArray = emailRecipients.split(",").map(email => email.trim());

    // Define variables to store email data
    let emailData = {};

    // Customize email data based on selected template
    switch (templateName) {
        case "template":
            emailData = {
                managerName: await promptUser("Enter the HR Manager's Name: "),
                numberOfDays: await promptUser("Enter the number of days: "),
                startDate: await promptUser("Enter the start date: "),
                senderName: await promptUser("Enter your name: ")
            };
            break;
        case "template1":
            emailData = {
                RecipientName: await promptUser("Enter the Recipient's Name: "),
                //   vacationType: await promptUser("Enter the type of vacation: "),
                //   startDate: await promptUser("Enter the start date: "),
                //   endDate: await promptUser("Enter the end date: "),
                senderName: await promptUser("Enter your name: ")
            };
            break;
        case "template2":
            emailData = {
                // RecipientName: await promptUser("Enter the Recipient's Name: "),
                MilestoneDesc: await promptUser("Describe the Mil: "),
                //   startDate: await promptUser("Enter the start date: "),
                //   endDate: await promptUser("Enter the end date: "),
                senderName: await promptUser("Enter your name: ")
            };
            break;
        case "template3":
            emailData = {
                TeamName: await promptUser("Enter the team Name: "),
                ProblemDesc: await promptUser("Describe the Problem: "),
                OperationDesc: await promptUser("Describe the Operation: "),
                //   endDate: await promptUser("Enter the end date: "),
                senderName: await promptUser("Enter your name: ")
            };
            break;
        case "template4":
            emailData = {
                RecipientName: await promptUser("Enter the Recipient's Name: "),
                FeedbackDesc: await promptUser("Describe the Feedback: "),
                //   startDate: await promptUser("Enter the start date: "),
                //   endDate: await promptUser("Enter the end date: "),
                senderName: await promptUser("Enter your name: ")
            };
            break;
        case "template5":
            emailData = {
                TopicDesc: await promptUser("Describe the Topic:  "),
                TrainerName: await promptUser("Enter the Trainer's Name: "),
                Topic: await promptUser("Enter the Topic:  "),
                Date: await promptUser("Enter the  date: "),
                Time: await promptUser("Enter the Time: "),
                Location: await promptUser("Enter the Location: "),
                senderName: await promptUser("Enter your name: ")
            };
            break;
        case "template6":
            emailData = {
                EmployeeName: await promptUser("Enter the Employee's Name: "),
                CompanyName: await promptUser("Enter the Company's Name: "),
                EmployeePosition: await promptUser("Enter the Employee Position: "),
                //   endDate: await promptUser("Enter the end date: "),
                senderName: await promptUser("Enter your name: "),
                SenderPosition: await promptUser("Enter the sender's Position: ")
            };
            break;
        // Add more cases for other templates as needed
        default:
            console.log("Invalid template name.");
            return;
    }

    try {
        // Select and customize the appropriate template
        const customizedTemplate = await selectAndCustomizeTemplate(templateName, emailData);

        // Send the email using the customized template
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailRecipientsArray,//emailSentTO,//"robertcena30@outlook.com",
            subject: emailSubject,//"Email Subject", // Customize the subject if needed
            html: customizedTemplate,
        });

        console.log(info.messageId);
    } catch (error) {
        console.error("Error reading or sending email:", error);
    }
}

main().catch(console.error);


