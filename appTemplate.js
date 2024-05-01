require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs").promises; // Importing the 'fs' module to read files

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

  // Specify the template file path based on the type of email
  const templatePath = "./email_templates/template3.txt";
  try {
    const templateContent = await fs.readFile(templatePath, "utf8");

    // Customize the template content with dynamic data
    const customizedTemplate = templateContent.replace("[Support Team]", "supprt team")
                                              .replace("[describe the problem briefly]", "3")
                                              .replace("[describe impact on productivity or operations]", "May 1, 2024")
                                              .replace("[Your Name]", "Jane Smith");

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "robertcena30@outlook.com",
      subject: "Sick Leave Request",
      html: customizedTemplate,
    });

    console.log(info.messageId);
  } catch (error) {
    console.error("Error reading or sending email:", error);
  }
}

main().catch(console.error);
