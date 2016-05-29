module.exports = {

	//return the body from the message passed in parameter
	mailBody: function(message) {
		var b64string = '';
		//if message doesn't contain parts field
		if(typeof message.parts === 'undefined')
		{
			b64string = message.body.data;
		}
		else
		{
			b64string = module.exports.mailHTMLPart(message.parts);
		}
		b64string = b64string.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');

		return new Buffer(b64string, 'base64').toString("ascii");;
	},

	//get the HTML part from an array of parts
	mailHTMLPart: function(parts) {
		//
		for(var i = 0; i < parts.length; i++)
		{
			if(typeof parts[i].parts === 'undefined')
			{
				if(parts[i].mimeType === 'text/html')
				{
					return parts[i].body.data;
				}
			}
			else
			{
				return module.exports.mailHTMLPart(parts[i].parts);
			}
		}
		return '';
	},

	buildMail : function(from, to, subject, body){

		var email_lines = [];

	    email_lines.push('From: "test" <'+ from +'>');
	    email_lines.push('To:' + to);
	    email_lines.push('Content-type: text/html;charset=iso-8859-1');
	    email_lines.push('MIME-Version: 1.0');
	    email_lines.push('Subject:'+ subject);
	    email_lines.push('');
	    email_lines.push(body);

	    var email = email_lines.join('\r\n').trim();

	    var base64EncodedEmail = new Buffer(email).toString('base64');
    	base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

    	return base64EncodedEmail;
	}
}