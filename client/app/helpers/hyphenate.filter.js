/**
 * Description: hyphenates a string: replaces hyphens with white space.
 * TODO: expand to handle more caseseg: removal of commas, etc.
 */
'use strict';

angular.module('ambassadorApp')
  .filter('hyphenate', function () {
    return function (value) {
      return (!value) ? '' : angular.lowercase(
        value.replace(/ /g, '-')
             .replace(/'/g, ''));
    }
});