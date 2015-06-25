'use strict';
// Config HTTP Error Handling
angular.module('users').run(['Menus',
    function(Menus){
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Users', 'users', 'dropdown', '/profiles');
        Menus.addSubMenuItem('topbar', 'users', 'List Users', 'profiles');
    }
]);
angular.module('users').config(['$httpProvider',
    function($httpProvider){
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
            function($q, $location, Authentication){
                return {
                    request: function(config){
                        var auth = localStorage.getItem('a');
                        if(auth){
                            config.headers.Authentication = auth;
                        }
                        return config;
                    },
                    responseError: function(rejection){
                        switch(rejection.status) {
                            case 401:
                                // Deauthenticate the global user
                                Authentication.user = null;
                                // Redirect to signin page
                                $location.path('signin');
                                break;
                            case 403:
                                // Add unauthorized behaviour
                                break;
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
]);
