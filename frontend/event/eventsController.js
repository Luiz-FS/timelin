(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('EventsController', ['EventsService', '$rootScope',  function(EventsService, $rootScope) {
        const eventsCtrl = this;
        eventsCtrl.events = [];


        eventsCtrl.create = function create(ev) {
            return EventsService.showCreateEvent(ev).then(function() {
                  getEvents();
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