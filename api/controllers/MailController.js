/**
 * MailController
 *
 * @description :: Server-side logic for managing Mails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var google = require('googleapis');
var auth = new google.auth.OAuth2;

module.exports = {

	getMails : function(req, res){

		
    		auth.setCredentials({
        		access_token: req.session.GAccessToken,
        		refresh_token: ''
      		});

		var gmail = google.gmail({auth: auth, version: 'v1'});

		gmail.users.messages.list({ userId: 'me' }, function(err, resp){

      		if(err){
      			return res.status(err.code).json(err.message);
      		}

      		return res.json(resp);

      	});

      	
	},

	getMailsContent : function(req, res){


    		auth.setCredentials({
        		access_token: req.session.GAccessToken,
        		refresh_token: ''
      		});

		var gmail = google.gmail({auth: auth, version: 'v1'});
		
      	gmail.users.messages.get({ userId: 'me', id: '154d18bf3947424d'}, function(err, resp){

      		if(err){
      			return res.status(err.code).json(err.message);
      		}

      		var b64string = resp.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/');
			var buf = new Buffer(b64string, 'base64').toString("ascii");

			var mail = {from:resp.payload.headers[12].value, to:resp.payload.headers[11].value, subject:resp.payload.headers[10].value, body:buf}

      		return res.json(mail);

      	});
	}

	// getMails : function(req, res){

	// 	var auth = new google.auth.OAuth2;
 //      	auth.setCredentials({
 //        	access_token: req.session.GAccessToken,
 //        	refresh_token: ''
 //      	});

 //      	var gmail = google.gmail('v1');
 //      	gmail.users.label({auth: auth, userId: 'me'}, function(err, resp){

 //      		if(err){
 //      			return res.status(err.code).json(err.message);
 //      		}

 //      		return res.json(resp);

 //      	});

      	
	// }
	
};

