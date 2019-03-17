(function() {
    'use strict';

    const app = angular.module('app');
    app.service('AuthService', ['$http', function($http) {
        const service = this;
        const authUri = '/api/auth';
        const userUri = '/api/user';

        let currentUser;

        service.login = function(credentials) {
            return $http.post(authUri, credentials).then(response => {
                currentUser = response.data.user;
                service.save();
            });
        };

        service.logout = function logout() {
            localStorage.userInfo = null;
            currentUser = null;
        };

        service.register = function register(newUser) {
            return $http.post(userUri, newUser).then(response => {
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

        service.isLoggedIn = function isLoggedIn() {
            return (currentUser) ? true: false;
        };

        (function init() {
            if (localStorage.userInfo) {
                const userInfo = JSON.parse(localStorage.userInfo);
                currentUser = userInfo;
            }
        })();
    }]);
})();