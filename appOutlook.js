const nodemailer = require("nodemailer");

async function main() {
    // Create a transporter using the Outlook SMTP server
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com", // Outlook SMTP server
        port: 587, // Port for SMTP (usually 587 for TLS)
        secure: false, // Set to false if not using TLS
        auth: {
            user: "robertcena30@outlook.com", // Your Outlook email address
            pass: "lyquznzlhwovkevf", // Your Outlook password
        },
    });

    // Define email content
    let mailOptions = {
        from: "robertcena30@outlook.com",
        to: "robertcena30@gmail.com",
        subject: "Testing, testing, 123",
        html: `
            <p>Dear [HR Manager's Name],</p>
            <p>I hope this message finds you well. I am writing to inform you that I am feeling unwell and unable to come into work today. Due to my condition, I would like to request sick leave for [insert number of days] days, starting from today, [insert date].</p>
            <p>I will make sure to provide any necessary documentation from my healthcare provider upon my return to work. In the meantime, I will ensure that any urgent tasks are delegated appropriately to ensure minimal disruption to the team's workflow.</p>
            <p>Thank you for your understanding and assistance in this matter. Please let me know if there are any further steps I need to take or if you require any additional information.</p>
            <p>Best regards,<br>[Your Name]</p>
        `,
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

main();
