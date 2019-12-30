var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'monopolly.dissertation@gmail.com',
    pass: 'monopolly1234'
  }
});

function sendE(mailOptions){
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
};

module.exports = {
	eLoginDeetsFirstTime: function(n,p){
		var mailOptions = {
			from: 'monopolly.dissertation@gmail.com',
			to: 'gorskidawid98@gmail.com',
			subject: 'Here are your login details!',
			html: '<h1>This is in the header file</h1><p>and this this is a p tag</p>'
		};
		sendE(mailOptions);
	},
	eForgottenPass: function(){},
}