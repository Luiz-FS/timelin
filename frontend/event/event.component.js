(function() {
    'use strict';

    const app = angular.module('app');

    app
        .controller('EventController', ['$element', '$mdDialog', '$rootScope', 'EventsService', function($element, $mdDialog, $rootScope, EventsService) {
            const eventCtrl = this;
            eventCtrl.hideDescription = true;

            eventCtrl.formatDate = function formatDate(date) {
                return date.toLocaleDateString();
            };

            eventCtrl.showDescription = function showDescription() {
                eventCtrl.hideDescription = !eventCtrl.hideDescription;
            };

            eventCtrl.confirmRemove = function confirmRemove(ev) {
                var confirm = $mdDialog.confirm()
                    .title('Você realmente deseja remover esse evento?')
                    .textContent('Ao remover não será mais possível restaurá-lo.')
                    .ariaLabel('Remover Evento')
                    .targetEvent(ev)
                    .ok('CONFIRMAR')
                    .cancel('CANCELAR');

                return $mdDialog.show(confirm).then(function() {
                    return EventsService.deleteEvent(eventCtrl.event.id).then(() => {
                        $rootScope.$emit('REMOVE_EVENT');
                    });
                }, function() {
                });
            };

            eventCtrl.edit = function edit(ev) {
                return EventsService.showCreateEvent(ev, eventCtrl.event).then(function(event) {
                      eventCtrl.event.name = event.name;
                      eventCtrl.event.event_date = new Date(event.event_date);
                      eventCtrl.event.description = event.description;
                      eventCtrl.event.color = event.color;
                      changeCardColor();
                  }).catch(() => {});
            };

            function changeCardColor() {
                const card = $element[0].children[0];
                card.style['background-color'] = eventCtrl.event.color;
            };

            eventCtrl.$onInit = function $onInit() {
                changeCardColor();
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