const nodemailer = require('nodemailer');

async function sendMail (to: String, resetCode: String){
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to, // list of receivers
      subject: "Dein Code zum ändern des Passwortes", // Subject line
      text: "Der Code: "+ resetCode, // plain text body
      html: "<h2>Moin Moin</h2> <p>du hast einen Code zum ändern des Passwortes angefordert. Hier ist er nun:</p><h1>"+ resetCode +"</h1>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
export default sendMail;