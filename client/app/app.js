'use strict';

angular.module('ambassadorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'xeditable'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
    .state('referral', {
      url: '/:id',
      templateUrl: 'app/referral/referral.html',
      controller: 'ReferralCtrl'
    })
    .state('landing', {
      url: '/landing/*path',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingCtrl',
      reloadOnSearch: false
    })

  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
})

.run(function(editableOptions) {
  editableOptions.theme = 'default';
});