'use strict';
angular.module('users').controller('ProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication', '$stateParams',
    function($scope, $http, $location, Users, Authentication, $stateParams){
        $scope.query = '';
        $scope.authentication = Authentication;
        if($stateParams.userId){
            $scope.user = Users.get({
                userId: $stateParams.userId
            });
        } else {
            $scope.user = Authentication.user;
        }
        $scope.find = function(){
            $scope.users = Users.query({
                q: $scope.query
            });
        };
        // If user is not signed in then redirect back home
        if(!$scope.user) $location.path('/');
    }
]);
