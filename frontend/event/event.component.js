(function() {
    'use strict';

    const app = angular.module('app');

    app
        .controller('EventController', function() {
            const eventCtrl = this;

            eventCtrl.$onInit = function $onInit() {
                console.log(eventCtrl.event);
            };
        })
        .component('event', {
            templateUrl: 'event/event.html',
            controller: 'EventController',
            controllerAs: 'eventCtrl',
            bindings: {
                event: '<'
            }
        });
})();