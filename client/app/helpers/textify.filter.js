/**
 * Description: textifies a string: replaces hyphens with white space.
 * TODO: expand to handle capitalizing words, removal of other non-letter characters
 */
'use strict';

angular.module('ambassadorApp')
  .filter('textify', function () {
    return function (value) {
      return (!value) ? '' : angular.uppercase(
        value.replace(/-/g, ' ')
             .replace(/'/g, ''));
    };
});