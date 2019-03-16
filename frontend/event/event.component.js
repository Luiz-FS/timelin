(function() {
    'use strict';

    const app = angular.module('app');

    app
        .controller('EventController', ['$element', function($element) {
            const eventCtrl = this;
            eventCtrl.hideDescription = true;

            eventCtrl.formatDate = function formatDate(date) {
                return date.toLocaleDateString();
            };

            eventCtrl.showDescription = function showDescription() {
                eventCtrl.hideDescription = !eventCtrl.hideDescription;
            };

            eventCtrl.$onInit = function $onInit() {
                const card = $element[0].children[0];
                card.style['background-color'] = eventCtrl.event.color;
                eventCtrl.event.event_date = new Date(eventCtrl.event.event_date);
            };
        }])
        .component('event', {
            templateUrl: 'event/event.html',
            controller: 'EventController',
            controllerAs: 'eventCtrl',
            bindings: {
                event: '<'
            }
        });
})();