(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('LoginController', ['AuthService', function(AuthService) {
        const loginCtrl = this;
        loginCtrl.credentials = {};

        loginCtrl.login = function() {
            console.log(loginCtrl.credentials);
            return AuthService.login(loginCtrl.credentials);
        };
    }]);
})();