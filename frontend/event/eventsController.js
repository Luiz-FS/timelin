(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('EventsController', ['EventsService', "$mdDialog", function(EventsService, $mdDialog) {
        const eventsCtrl = this;
        eventsCtrl.events = [];


        eventsCtrl.create = function create(ev) {
            return $mdDialog.show({
                controller: 'CreateEventController',
                controllerAs: 'createEventCtrl',
                templateUrl: 'event/create_event_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: false
              }).then(function(event) {
                  eventsCtrl.events.push(event);
              }).catch(() => {});
        };

        eventsCtrl.$onInit = function $onInit() {
            return EventsService.getEvents().then(response => {
                eventsCtrl.events = response;
            });
        };
    }]);
})();