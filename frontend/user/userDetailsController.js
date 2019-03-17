(function() {
    'use strict';

    const app = angular.module('app');

    app.controller('UserDetailsController', ['UserService', function(UserService) {
        const userDetailsCtrl = this;
        userDetailsCtrl.user = {};
        userDetailsCtrl.userCopy = {};
        userDetailsCtrl.isUpdatingAttributes = false;
        userDetailsCtrl.isUpdatingPassword = false;

        userDetailsCtrl.saveUser = function saveUser() {
            return UserService.updateUser(userDetailsCtrl.userCopy).then(user  => {
                userDetailsCtrl.user = user;
                userDetailsCtrl.userCopy = _.cloneDeep(user);
                userDetailsCtrl.isUpdatingAttributes = false;
                return user;
            });
        };

        userDetailsCtrl.updatePassword = function updatePassword() {
            if (userDetailsCtrl.newPass === userDetailsCtrl.confirmPass) {
                const credentials = {
                    actualPass: userDetailsCtrl.actualPass,
                    newPass: userDetailsCtrl.newPass
                };

                return UserService.updatePassword(credentials).then(() => {
                    userDetailsCtrl.isUpdatingPassword = false;
                });
            }
        };

        userDetailsCtrl.cancelUpdate = function cancelUpdate() {
            userDetailsCtrl.isUpdatingAttributes = false;
            userDetailsCtrl.isUpdatingPassword = false;
            userDetailsCtrl.actualPass = null;
            userDetailsCtrl.newPass = null;
            userDetailsCtrl.confirmPass = null;
            userDetailsCtrl.userCopy = _.cloneDeep(userDetailsCtrl.user);
        };

        userDetailsCtrl.$onInit = function $onInit() {
            return UserService.getUser().then(user => {
                userDetailsCtrl.user = user;
                userDetailsCtrl.userCopy = _.cloneDeep(user);
                return user;
            });
        };
    }]);
})();