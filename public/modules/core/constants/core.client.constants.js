'use strict';
// Setting up route

angular.module('core').constant('CORE_CONST', {
    SERVER_URL: document.body ? ((document.body.getAttribute('dev-env') === 'true') ? 'http://localhost:3000' : 'http://insport.herokuapp.com') : 'http://localhost:3000',
    REST_URL: ''
});