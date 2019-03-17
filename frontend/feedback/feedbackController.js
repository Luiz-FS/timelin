(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('FeedbackController', ['FeedbackService', 'AuthService', function(FeedbackService, AuthService) {
        const feedbackCtrl = this;
        const currentUser = AuthService.getCurrentUser();
        feedbackCtrl.feedbacks = [];
        feedbackCtrl.feedback = {};

        feedbackCtrl.create = function create() {
            return FeedbackService.createFeedback(feedbackCtrl.feedback).then(feedback => {
                feedbackCtrl.feedbacks.push({
                    name: currentUser.name,
                    description: feedback.description
                });

                feedbackCtrl.feedback = {};
                return feedback;
            });
        };

        feedbackCtrl.isLoggedIn = function isLoggedIn() {
            return AuthService.isLoggedIn();
        };

        feedbackCtrl.$onInit = function $onInit() {
            return FeedbackService.getAllFeedbacks().then(feedbacks => {
                feedbackCtrl.feedbacks = feedbacks;
                return feedbacks;
            });
        };
    }]);
})();