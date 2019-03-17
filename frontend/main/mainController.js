(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('MainController', ['AuthService', '$state', function(AuthService, $state) {
        const mainCtrl = this;

        mainCtrl.goToUserPage = function goToUserPage() {
            return $state.go('app.user');
        };

        mainCtrl.goToTimeline = function goToTimeline() {
            return $state.go('app.events');
        };

        mainCtrl.isLoggedIn = function isLoggedIn() {
            return AuthService.isLoggedIn();
        };

        mainCtrl.goToLogin = function goToLogin() {
            return $state.go('app.login');
        };

        mainCtrl.logout = function logout() {
            AuthService.logout();
            return $state.go('app.login');
        };
    }]);
})();