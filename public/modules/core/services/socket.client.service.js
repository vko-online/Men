'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory', 'CORE_CONST',
    function(socketFactory, CORE_CONST) {
        return socketFactory({
            prefix: '',
            ioSocket: window.io.connect(CORE_CONST.SERVER_URL)
            //http://localhost:3000
            //http://insport.herokuapp.com
        });
    }
]);
