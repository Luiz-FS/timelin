(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('LoginController', ['AuthService', '$state', 'MessageService', function(AuthService, $state, MessageService) {
        const loginCtrl = this;
        loginCtrl.credentials = {};
        loginCtrl.newUser = {};

        loginCtrl.login = function() {
            return AuthService.login(loginCtrl.credentials).then(() => {
                window.history.back();
            }).catch(response => {
                MessageService.showToast(response.data.msg);
            });
        };

        loginCtrl.register = function register() {
            if (loginCtrl.newUser.password === loginCtrl.confirmPass) {
                return AuthService.register(loginCtrl.newUser).then(() => {
                    return $state.go("app.events");
                }).catch(response => {
                    MessageService.showToast(response.data.msg);
                });
            } else {
                MessageService.showToast("As senhas não correspondem")
            }
        }

        loginCtrl.$onInit = function $onInit() {
            if (AuthService.isLoggedIn()) {
                $state.go("app.events");
            }
        };
    }]);
})();