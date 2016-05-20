'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/inbox');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      
        
          .state('inbox', {
            url: '/inbox',
            parent: '',
            templateUrl: '/templates/views/dashboard/inbox.html'
          })
          .state('sent', {
            url: '/sent',
            parent: '',
            templateUrl: '/templates/views/dashboard/sent.html'
          })
          .state('drafts', {
            url: '/drafts',
            parent: '',
            templateUrl: '/templates/views/dashboard/drafts.html'
          });

  });
