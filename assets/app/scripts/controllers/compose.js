App.controller('ComposeController', ['$scope', 'Inbox', function($scope, Inbox) {

	var self = this;
	 self.mail;

	self.submit = function(){

		Inbox.compose(self.mail, function(data){

			console.log(data);
			console.log(self.mail);
			self.reset();
		});
	}
        
    self.reset = function(){

    	$scope.myForm.$setPristine();
    }
}]);