(function() {
    'use strict';

    const app = angular.module('app');

    app.service('FeedbackService', ['$http', function($http) {
        const service = this;
        const feedbackUri = '/api/feedback';

        service.getAllFeedbacks = function getAllFeedbacks() {
            return $http.get(feedbackUri).then(response => response.data);
        };

        service.createFeedback = function createFeedback(feedback) {
            return $http.post(feedbackUri, feedback).then(response => response.data.feedback);
        };
    }]);
})();