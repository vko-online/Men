'use strict';
angular.module('core').filter('html_to_plain', function() {
    return function(input) {
        return String(input).replace(/<[^>]+>/gm, '');
    };
});
