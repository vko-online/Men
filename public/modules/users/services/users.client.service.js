'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource', 'CORE_CONST',
    function($resource, CORE_CONST){
        return $resource(CORE_CONST.REST_URL + 'users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            follow_unfollow: {
                method: 'POST',
                url: CORE_CONST.REST_URL + 'users/:userId/follow_unfollow'
            },
            by_mmr: {
                url: CORE_CONST.REST_URL + '/users/mmr',
                method: 'GET',
                isArray: true
            },
            friends: {
                url: CORE_CONST.REST_URL + '/users/friends',
                method: 'GET',
                isArray: true
            },
            sign_out: {
                url: CORE_CONST.REST_URL + '/auth/signout',
                method: 'POST'
            }
        });
    }
]);
