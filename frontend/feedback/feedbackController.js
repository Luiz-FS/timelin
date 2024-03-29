(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('FeedbackController', ['FeedbackService', 'AuthService', 'MessageService', function(FeedbackService, AuthService, MessageService) {
        const feedbackCtrl = this;
        const currentUser = AuthService.getCurrentUser();
        feedbackCtrl.feedbacks = [];
        feedbackCtrl.feedback = {};
        feedbackCtrl.isLoading = false;

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
            if(!feedbackCtrl.isLoggedIn()) {
                MessageService.showToast("Logue-se na aplicação para deixar sua avaliação");
            }

            feedbackCtrl.isLoading = true;
            return FeedbackService.getAllFeedbacks().then(feedbacks => {
                feedbackCtrl.isLoading = false;
                feedbackCtrl.feedbacks = feedbacks;
                return feedbacks;
            });
        };
    }]);
})();