'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {

  	$scope.loginForm = {};

    $scope.submit = function() {
	
	console.log($scope.loginForm.email, $scope.loginForm.password);
	
    }

  });
