require('dotenv').config();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: `localhost`,
  user:  `root`,
  password: `Swastik@123`,
  database: `demo`
});

async function fetchEmailAddresses() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT email_id FROM data', (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log("Fetched email addresses:", results);
        resolve(results);
      }
    });
  });
}


async function sendEmails() {
  try {
    const recipients = await fetchEmailAddresses();
    console.log("Recipients:", recipients); // Add this line for debugging
    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Loop through the recipients array and send email to each recipient
    for (let i = 0; i < recipients.length; i++) {
      let info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipients[i].email_id,
        subject: "Testing, testing, 123",
        html: `
          Dear [HR Manager's Name],<br>
          I hope this message finds you well. I am writing to inform you that I am feeling unwell and unable to come into work today. Due to my condition, I would like to request sick leave for [insert number of days] days, starting from today, [insert date]. <br>
          I will make sure to provide any necessary documentation from my healthcare provider upon my return to work. In the meantime, I will ensure that any urgent tasks are delegated appropriately to ensure minimal disruption to the team's workflow. <br>
          Thank you for your understanding and assistance in this matter. Please let me know if there are any further steps I need to take or if you require any additional information.<br>
          Best regards,<br>
          [Your Name]
        `,
      });

      console.log(`Email sent to ${recipients[i].email_id}: ${info.messageId}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the MySQL connection pool
    pool.end();
    console.log("MySQL connection pool closed.");
  }
}


sendEmails();
