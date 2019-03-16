(function() {
    'use strict';

    const app = angular.module('app');
    app.controller('CreateEventController', ['EventsService', '$mdDialog', function(EventsService, $mdDialog) {
        const createEventCtrl = this;
        createEventCtrl.event = {
            color: "#FFFFFF"
        };

        createEventCtrl.create = function create() {
            return EventsService.createEvent(createEventCtrl.event).then(event => {
                return $mdDialog.hide(event);
            });
        };

        createEventCtrl.cancel = function cancel() {
            $mdDialog.cancel();
        };
    }]);
})();