'use strict';

angular.module('ambassadorApp')
  .controller('MainCtrl', function($scope, $http, $filter) {

    // Empty array to hold referrals
    $scope.referrals = [];

    // For sort/filtering: to be used for selecting items from array.
    $scope.predicate = 'link';
    $scope.reverse = true;

    // Fetch referrals and assign the response/data to $scope.referrals
    $http.get('/api/referrals')
      .then(function(response) {
        $scope.referrals = response.data;
    });

    /**
     * Set the sort order when user clicks table header
     * @param  {String} predicate
     */
    $scope.sortOrder = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    /**
     * Add a referral
     * @param {Object} referral Contains click and link/title data
     */
    $scope.addReferral = function(referral) {
      if (!referral) {
        return;
      }

      // Replace spaces with hyphens
      var referralLink = $filter('hyphenate')(referral.link);

      // Set initial values on referral object
      $scope.referral = {
        link: referralLink,
        clicks: 0
      };

      // Post referral object to API
      $http.post('/api/referrals', $scope.referral)
        .then(function(response) {
          // Push the response referral array
          $scope.referrals.push(response.data);
      });

      // Set the form value to null
      $scope.referral = {};
    };

    /**
     * Allows the user to edit the referral link/title
     * @param  {Object} Referral current referral object
     * @param  {String} Text value from editable field
     */
    $scope.editReferral = function(referral, data) {
      var referralLink = $filter('hyphenate')(data);

      // Set referral > link property to new updated text
      $scope.referral = {
        link: referralLink
      };

      // Put updated referral object to API
      $http.put('/api/referrals/' + referral._id, $scope.referral);

      // TODO: isolate scope on component/referral-form
      // to remove edited value after edit happens
    };

    /**
     * Delete a referral
     * @param  {Object} Referral object to delete
     */
    $scope.deleteReferral = function(referral) {
      var referrals = $scope.referrals;

      // Delete the referral and remove item from DOM
      $http.delete('/api/referrals/' + referral._id)
        .then(function(response) {
          referrals.splice(referrals.indexOf(referral), 1);
        });
    };

  });
