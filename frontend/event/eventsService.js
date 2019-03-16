(function() {
    'use strict';

    const app = angular.module('app');

    app.service('EventsService', ['$http', function($http) {
        const service = this;
        const eventsUri = '/api/user/events';
        const eventUri = '/api/event';

        service.getEvents = function getEvents() {
            return $http.get(eventsUri).then(response => response.data);
        };

        service.createEvent = function createEvent(event) {
            return $http.post(eventUri, event).then(response => response.data.event);
        };

        service.updateEvent = function updateEvent(eventId, event) {
            return $http.put(`${eventUri}/${eventId}`, event).then(response => response.data.event);
        };

        service.deleteEvent = function deleteEvent(eventId) {
            return $http.delete(`${eventUri}/${eventId}`);
        };
    }]);
})();