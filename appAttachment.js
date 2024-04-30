const nodemailer = require("nodemailer");

async function main() {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "robertcena30@gmail.com",
        pass: "pudrzgdsxfturbtb",
      // ⚠️ Use environment variables set on the server for these values when deploying
    },
  });

  let info = await transporter.sendMail({
    from: '"You" <robertcena30@gmail.com>',
    to: "priyankasethi077@gmail.com",
    subject: "Image test",
    html: `
    <h1>Hello world</h1>
    <p>Here's an image for you</p>
    <img src="cid:unique@gmail.com>"/>'
    `, // Embedded image links to content ID
    attachments: [{
      filename: 'D.pdf',
      path: './D.pdf',
      cid: 'unique@gmail.com' // Sets content ID
    }, {
        filename: 'img1.jpg',
        path: './img1.jpg',
        cid: 'unique@gmail.com' // Sets content ID
      }
]
  });

  console.log(info.messageId);
}

main()
.catch(err => console.log(err));