(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('LoginController', ['AuthService', '$state', function(AuthService, $state) {
        const loginCtrl = this;
        loginCtrl.credentials = {};

        loginCtrl.login = function() {
            return AuthService.login(loginCtrl.credentials).then(() => {
                return $state.go("app.events");
            });
        };
    }]);
})();