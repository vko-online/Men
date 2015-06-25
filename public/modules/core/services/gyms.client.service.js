'use strict';


angular.module('core').factory('Gyms', ['$resource', 'CORE_CONST',
    function($resource, CORE_CONST) {
        return $resource(CORE_CONST.REST_URL + 'gyms/:countryId', { gymId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
