require('dotenv').config();


const nodemailer = require("nodemailer");



// Import NodeMailer (after npm install)

async function main() {
// Async function enables allows handling of promises with await
// const emailUser = process.env.EMAIL_USER;
// const emailPass = process.env.EMAIL_PASS;
  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport(
    
//     {
//     host: "smtp.gmail.com",// SMTP server address (usually mail.your-domain.com)
//     port: 465, // Port for SMTP (usually 465)
//     secure: true, // Usually true if connecting to port 465
//     auth: {
//       user: process.env.EMAIL_USER, // Accessing email user from environment variable
//       pass: process.env.EMAIL_PASS, //"pudrzgdsxfturbtb", // Password (for gmail, your app password)
//       // ⚠️ For better security, use environment variables set on the server for these values when deploying
//     },
//   }
// ,
  {
    host: "smtp.gmail.com",// SMTP server address (usually mail.your-domain.com)
    port: 587, // Port for SMTP (usually 465)
    secure: false, // Usually true if connecting to port 465
    auth: {
      user: process.env.EMAIL_USER, // Accessing email user from environment variable
      pass: process.env.EMAIL_PASS, //"pudrzgdsxfturbtb", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  }
);
  
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "robertcena30@outlook.com",
    subject: "Testing, testing, 123",
    attachments:[{filename: 'D.pdf',
    path: './D.pdf',
    cid: 'unique@gmail.com'}],
    html: `
    Dear [HR Manager's Name],<br>

I hope this message finds you well. I am writing to inform you that I am feeling unwell and unable to come into work today. Due to my condition, I would like to request sick leave for [insert number of days] days, starting from today, [insert date]. <br>

I will make sure to provide any necessary documentation from my healthcare provider upon my return to work. In the meantime, I will ensure that any urgent tasks are delegated appropriately to ensure minimal disruption to the team's workflow. <br>

Thank you for your understanding and assistance in this matter. Please let me know if there are any further steps I need to take or if you require any additional information.<br>

Best regards,<br>
[Your Name]
    `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

main()
.catch(err => console.log(err));