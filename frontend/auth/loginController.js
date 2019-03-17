(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('LoginController', ['AuthService', '$state', function(AuthService, $state) {
        const loginCtrl = this;
        loginCtrl.credentials = {};
        loginCtrl.newUser = {};

        loginCtrl.login = function() {
            return AuthService.login(loginCtrl.credentials).then(() => {
                return $state.go("app.events");
            });
        };

        loginCtrl.register = function register() {
            if (loginCtrl.newUser.password === loginCtrl.confirmPass) {
                return AuthService.register(loginCtrl.newUser).then(() => {
                    return $state.go("app.events");
                });
            }
        }

        loginCtrl.$onInit = function $onInit() {
            if (AuthService.isLoggedIn()) {
                $state.go("app.events");
            }
        };
    }]);
})();