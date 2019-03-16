(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('EventsController', ['EventsService', "$mdDialog", '$rootScope',  function(EventsService, $mdDialog, $rootScope) {
        const eventsCtrl = this;
        eventsCtrl.events = [];


        eventsCtrl.create = function create(ev) {
            return $mdDialog.show({
                controller: 'CreateEventController',
                controllerAs: 'createEventCtrl',
                templateUrl: 'event/create_event_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    event: {},
                    isEditing: false
                },
                clickOutsideToClose:true,
                fullscreen: false
              }).then(function(event) {
                  eventsCtrl.events.push(event);
              }).catch(() => {});
        };

        function getEvents() {
            return EventsService.getEvents().then(response => {
                eventsCtrl.events = response;
                return response;
            });
        };

        eventsCtrl.$onInit = function $onInit() {
            $rootScope.$on('REMOVE_EVENT', () => {
                return getEvents();
            });
            return getEvents();
        };
    }]);
})();