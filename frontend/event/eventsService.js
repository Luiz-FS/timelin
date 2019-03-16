(function() {
    'use strict';

    const app = angular.module('app');

    app.service('EventsService', ['$http', '$mdDialog', function($http, $mdDialog) {
        const service = this;
        const eventsUri = '/api/user/events';
        const eventUri = '/api/event';

        service.showCreateEvent = function showCreateEvent(ev, event) {
            return $mdDialog.show({
                controller: 'CreateEventController',
                controllerAs: 'createEventCtrl',
                templateUrl: 'event/create_event_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    event: (event) ? event : {},
                    isEditing: (event) ? true: false
                },
                clickOutsideToClose:true,
                fullscreen: false
              });
        };

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