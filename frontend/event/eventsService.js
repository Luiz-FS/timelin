(function() {
    'use strict';

    const app = angular.module('app');

    app.service('EventsService', ['$http', function($http) {
        const service = this;
        const eventsUri = '/api/user/events';

        service.getEvents = function getEvents() {
            return $http.get(eventsUri).then(response => response.data);
        };
    }]);
})();