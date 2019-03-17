(function() {
    'use strict';

    const app = angular.module('app');
    app
        .controller('FeedbackDetailsController', function() {
            const feedbackDetailsCtrl = this;
        })
        .component('feedback', {
            templateUrl: 'feedback/feedback.html',
            controller: 'FeedbackDetailsController',
            controllerAs: 'feedbackDetailsCtrl',
            bindings: {
                feedback: '<'
            }
        });
})();