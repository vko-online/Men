'use strict';
angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Authentication2', 'Socket', 'Users', '$http', '$location', '$state',
    function($scope, Authentication, Menus, Authentication2, Socket, Users, $http, $location, $state){
        var socket_registered = false;
        $scope.authentication = Authentication;
        Authentication2.get_user().then(function(data){
            Authentication.user = data;
            Socket.emit('join', data._id);
        });
        $scope.signout = function(){
            Users.sign_out(function(successResponse){
                Authentication.user = null;
                localStorage.removeItem('a');
                delete $http.defaults.headers.common.Authentication;
                // Redirect to signin page
                $location.path('/signin');
            }, function(errorResponse){
                $scope.error = errorResponse.message;
            });
        };
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');
        $scope.toggleCollapsibleMenu = function(){
            $scope.isCollapsed = !$scope.isCollapsed;
        };
        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function(){
            $scope.isCollapsed = false;
        });
        if($scope.authentication.user && !socket_registered){
            socket_registered = true;
            Socket.emit('join', $scope.authentication.user._id);
        }
        Socket.on('new_lobby', function(lobby){
            alert('new_lobby notification');
            console.log('new_lobby', lobby);
        });
        Socket.on('invite_lobby', function(lobby){
            alert('invite_lobby notification');
            console.log('invite_lobby', lobby);
        });
        Socket.on('coach_id', function(id){
            console.log('coach_id', id);
            $scope.$apply(function(){
                window.user.coach_id = id;
            });
        });
        Socket.on('game_resulted', function(game){
            console.log('game resulted', game);
            alert('игра которую вы подписаны - завершилась');
        });
        Socket.on('notification', function(text){
            console.log('NOTIFICATION:', text);
        });
        Socket.on('dedicated_notification', function(notify){
            console.log('DEDICATED_NOTIFICATION:', notify);
        });
        Socket.on('chat_message_new_message', function(messageResponse){
            console.log($state);
            console.log(messageResponse.chat);
        });
    }
]);
