(function() {
    'use strict';

    const app = angular.module('app');
    app.controller('CreateEventController', ['EventsService', '$mdDialog', 'event', 'isEditing', function(EventsService, $mdDialog, event, isEditing) {
        const createEventCtrl = this;
        createEventCtrl.isEditing = false;
        createEventCtrl.event = {
            color: "#FFFFFF"
        };

        createEventCtrl.create = function create() {
            let promise;

            if (!isEditing) {
                promise = EventsService.createEvent(createEventCtrl.event);
            } else {
                promise = EventsService.updateEvent(createEventCtrl.event.id, createEventCtrl.event);
            }

            return promise.then(event => {
                return $mdDialog.hide(event);
            });
        };

        createEventCtrl.cancel = function cancel() {
            $mdDialog.cancel();
        };

        createEventCtrl.$onInit = function $onInit() {
            createEventCtrl.isEditing = isEditing;
            if (isEditing) {
                createEventCtrl.event = _.cloneDeep(event);
            }
        };
    }]);
})();