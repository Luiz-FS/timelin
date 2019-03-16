(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('EventsController', ['EventsService', function(EventsService) {
        const eventsCtrl = this;
        eventsCtrl.events = [];


        eventsCtrl.$onInit = function $onInit() {
            return EventsService.getEvents().then(response => {
                eventsCtrl.events = response;
            });
        };
    }]);
})();