	/**
	 * MailController
	 *
	 * @description :: Server-side logic for managing Mails
	 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
	 */
	var google = require('googleapis');
	var auth = new google.auth.OAuth2;
	var _ = require("underscore");
	var async = require("async");

	module.exports = {

		getMails : function(req, res){

			//set auth information
	    	auth.setCredentials({
	        	access_token: req.session.GAccessToken,
	        	refresh_token: ''
	      	});

	    	//initialize gmail api
			var gmail = google.gmail({auth: auth, version: 'v1'});
			
			//Get list of message IDs and pass the response to the getMailsInfo methode to load mail content
	      	gmail.users.messages.list({ userId: 'me', labelIds: [req.param('label')], maxResults:5, pageToken:req.param('page') }, function(err, response){

	      		if(err){
	      			return res.status(err.code).json(err.message);
	      		}

	      		module.exports.getMailsInfo(response, req, res);

	      	});

	      	
		},

		getMailsInfo : function(response, req, res){

			//initialize an Object mail and an array mails
			var mail = {};
	      	var mails = [];
	      	auth.setCredentials({
	        	access_token: req.session.GAccessToken,
	        	refresh_token: ''
	      		});

			var gmail = google.gmail({auth: auth, version: 'v1'});
			
			//loop through messages response
			async.each(response.messages, function(message, callback) {
      			
      			//get specific email informations by ID and build the mail object before push it to mails array
      			gmail.users.messages.get({ userId: 'me', id: message.id}, function(err, resp){
	      			
	      			if(resp.payload){
	      				//get the field with name
	      				var hFrom = _.where(resp.payload.headers, {name: "From"});
						var hTo = _.where(resp.payload.headers, {name: "To"});
						
						mail = {from:hFrom[0].value, to:hTo[0].value, subject:resp.snippet}
					}	
	      			
	      			mails.push(mail);
					
					callback();
				});
    
    		}, function(err) {

    			//finally build the object returned to the view with a nextPAgeToken
				var finalList = {emails: mails, nextPageToken:response.nextPageToken};
    			return res.json(finalList);
    		});

		},

		getMailsBody : function(req, res){

			auth.setCredentials({
	        	access_token: req.session.GAccessToken,
	        	refresh_token: ''
	      	});

	      	var gmail = google.gmail({auth: auth, version: 'v1'});
	      	
	      	//get email by id and after that we extract body
	      	gmail.users.messages.get({ userId: 'me', id: req.param('id')}, function(err, resp){

	      		if(err){
	      			return res.status(err.code).json(err.message);
	      		}

	      		// we extract body based on the mimeType
	      		if(resp.payload.mimeType.indexOf("multipart") > -1 ){
	      			 
	      			 body = resp.payload.parts[0].body.data;
	      		}else if(resp.payload.mimeType.indexOf("text") > -1 ){
	      			 body = resp.payload.body.data;
	      		}

	      		//build mail object and send it to the view
	      		if(body){
	      			var b64string = body.replace(/-/g, '+').replace(/_/g, '/');
	      			var buf = new Buffer(b64string, 'base64').toString("ascii");
	      			var mail = {subject:resp.snippet, body: buf}
	      		}else{
	      			var mail = {subject:resp.snippet, body: body}
	      		}

	      		return res.json(mail);

	      	});

	      	
		}
		
	};

