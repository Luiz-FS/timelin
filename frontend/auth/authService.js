(function() {
    'use strict';

    const app = angular.module('app');
    app.service('AuthService', ['$http', function($http) {
        const service = this;
        const authUri = '/api/auth';

        let currentUser;

        service.login = function(credentials) {
            return $http.post(authUri, credentials).then(response => {
                currentUser = response.data.user;
                service.save();
            });
        };

        service.save = function save() {
            localStorage.userInfo = JSON.stringify(currentUser);
        };

        service.getCurrentUser = function getCurrentUser() {
            return currentUser;
        };

        (function init() {
            const userInfo = JSON.parse(localStorage.userInfo);
            if (userInfo) {
                currentUser = userInfo;
            }
        })();
    }]);
})();