require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs").promises; // Importing the 'fs' module to read files
const readline = require("readline"); // Importing 'readline' module for user input

// Function to select and customize the appropriate template
async function selectAndCustomizeTemplate(templateName, data) {
  // Determine the template path based on the template name provided by the user
  const templatePath = `./email_templates/${templateName}.txt`;

  // Read the content of the selected template file
  const templateContent = await fs.readFile(templatePath, "utf8");

  // Customize the template content with dynamic data
  const customizedTemplate = templateContent.replace("[HR Manager's Name]", data.managerName)
                                            .replace("[insert number of days]", data.numberOfDays)
                                            .replace("[insert date]", data.startDate)
                                            .replace("[Your Name]", data.senderName);

  return customizedTemplate;
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
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Prompt the user to select a template
  const templateName = await promptUser("Enter the name of the template you want to use (e.g., sick_leave): ");

  // Prompt the user for email data
  const emailData = {
    managerName: await promptUser("Enter the HR Manager's Name: "),
    numberOfDays: await promptUser("Enter the number of days: "),
    startDate: await promptUser("Enter the start date: "),
    senderName: await promptUser("Enter your name: ")
  };

  try {
    // Select and customize the appropriate template
    const customizedTemplate = await selectAndCustomizeTemplate(templateName, emailData);

    // Send the email using the customized template
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "robertcena30@outlook.com",
      subject: "Email Subject", // Customize the subject if needed
      html: customizedTemplate,
    });

    console.log(info.messageId);
  } catch (error) {
    console.error("Error reading or sending email:", error);
  }
}

main().catch(console.error);
