// by bwin on 6/10/15.
'use strict';
// Authentication2 сервис для token auth
angular.module('users').factory('Authentication2', ['$http', '$q',
    function($http, $q){
        var user2 = null;

        function _get_user(){
            var defer = $q.defer();
            $http.get('http://localhost:3000/users/me')
                .success(function(response){
                    defer.resolve(function(){
                        user2 = response;
                        window.user = response;
                        return user2;
                    }());
                })
                .error(function(errorResponse){
                    user2 = null;
                    defer.reject(errorResponse);
                });
            return defer.promise;
        }

        return {
            get_user: _get_user,
            user2: user2
        };
    }
]);
