App.controller('InboxController', ['$scope', 'Inbox', function($scope, Inbox) {

	var self = this;
        
        self.mails=[];

        self.fetchEmails = function(){
        	self.mails = Inbox.get({label:"INBOX"});
        	console.log(self.mails);
         };

        self.fetchEmails();

        self.nextPage = function(page){
        	self.mails.length = 0;
        	self.mails = Inbox.get({label:"INBOX", page:page});
        }
}]);