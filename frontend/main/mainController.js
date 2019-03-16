(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('MainController', ['AuthService', '$state', function(AuthService, $state) {
        const mainCtrl = this;

        mainCtrl.logout = function logout() {
            AuthService.logout();
            $state.go('app.login');
        };
    }]);
})();