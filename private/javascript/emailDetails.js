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
	eLoginDeetsFirstTime: (name, email)=>{
		var swig  = require('swig');
		var tmpl = swig.compileFile("../pages/emailFile/emailFile.html"),
    		renderedHTML = tmpl({
				userName : name
    		});
		var mailOptions = {
			from: 'monopolly.dissertation@gmail.com',
			to: email,
			subject: 'Here are your login details!',
			html: renderedHTML
		};
		sendE(mailOptions);
	},
	eForgottenPass: function(){},
}