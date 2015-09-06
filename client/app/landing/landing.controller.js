'use strict';

angular.module('ambassadorApp')
  .controller('LandingCtrl', function($scope, $http, $location, ClickFactory) {

    // Store the referral link value from querystring
    var referralLink = $location.search().link;

    $scope.title = referralLink;
    $scope.error = false;

    // Get the requested referral, increment it's click value
    $http.get('/api/referrals/' + referralLink)
      .then(function(response) {
        var referral = response.data;
        ClickFactory.increment(referral);
    }, function(response) {
      $scope.error = true;
    });

    // TODO: possible integration of Wikipedia results for fun
});