'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'CORE_CONST',
    function($scope, $http, $location, Authentication, CORE_CONST) {
        $scope.authentication = Authentication;
        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            $http.post(CORE_CONST.REST_URL + '/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                $http.defaults.headers.common.Authentication = response.loginToken;
                localStorage.setItem('a', response.loginToken);
                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            $http.post(CORE_CONST.REST_URL + '/auth/signin', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                $http.defaults.headers.common.Authentication = response.loginToken;
                localStorage.setItem('a', response.loginToken);
                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);