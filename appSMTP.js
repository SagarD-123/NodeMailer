const SMTPConnection = require("smtp-connection");

const connection = new SMTPConnection({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Upgrade later with STARTTLS
    auth: {
        user: 'robertcena30@gmail.com',
        pass: 'pudrzgdsxfturbtb'
    }
});

connection.connect(() => {
    const envelope = {
        from: 'robertcena30@gmail.com',
        to: 'priyankasethi077@gmail.com'
    };

    const message = {
        headers: {
            'Subject': 'Test Email'
        },
        body: 'This is a test email'
    };

    connection.send(envelope, message, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info);
        }
        connection.quit();
    });
});
