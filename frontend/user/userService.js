(function() {
    'use strict';

    const app = angular.module('app');

    app.service('UserService', ['$http', function($http) {
        const service = this;
        const userUri = '/api/user';

        service.getUser = function getUser() {
            return $http.get(userUri).then(response => response.data.user);
        };

        service.updateUser = function updateUser(user) {
            return $http.put(userUri, user).then(response => response.data.user);
        };

        service.updatePassword = function updatePassword(credentials) {
            return $http.put(`${userUri}/reset-password`, credentials);
        };
    }]);
})();