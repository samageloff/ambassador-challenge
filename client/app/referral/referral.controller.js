'use strict';

angular.module('ambassadorApp')
  .controller('ReferralCtrl', function($scope, $stateParams, $location) {

    // Set location to format: /landing/?link=[title]
    $location.path('/landing/')
      .search({'link': $stateParams.id})
      .replace();
  });