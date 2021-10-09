const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;

app.get("/sendmail", async (req, res) => {
	try {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: "columbus.thiel38@ethereal.email", // generated ethereal user
				pass: "ksm8TSRKgdSG3M1T3U", // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: "satyamor2@gmail.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "yes I am Here", // plain text body
			html: "<b>Hello world?</b>", // html body
		});
		res.send({
			msg: `Message sent:, ${info.messageId}`,
			PreviewURL: `${nodemailer.getTestMessageUrl(info)}`,
		});
	} catch (error) {
		res.send(error);
	}
});

app.listen(port, () => {
	console.log(`app is litening to ${port}`);
});
