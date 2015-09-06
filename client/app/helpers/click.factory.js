/**
 * The Click Factory takes a
 * referral object, increments it's click value,
 * and sends the update back to the server.
 */
'use strict';
angular.module('ambassadorApp')
  .factory('ClickFactory', function($http) {
    return {
      increment: function(referral) {
        var clicks = { 'clicks': referral.clicks + 1 };
        $http.put('/api/referrals/' + referral._id, clicks);
      }
    }
});