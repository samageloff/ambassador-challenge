'use strict';

angular.module('ambassadorApp')
  .directive('referralForm', function () {
    return {
      templateUrl: 'components/referral-form/referral-form.html',
      restrict: 'AEC',
      link: function (scope, element) {
        element.addClass('referral-form');
      }
    };
  });
