(function () {
    'use strict';

    const app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router']);

    app.config(function($mdIconProvider, $mdThemingProvider, $urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $mdIconProvider.fontSet('md', 'material-icons');
        $mdThemingProvider.theme('docs-dark');
        $mdThemingProvider.theme('input')
            .primaryPalette('green');
        $mdThemingProvider.theme('dialogTheme')
            .primaryPalette('teal');

        $urlMatcherFactoryProvider.caseInsensitive(true);

        $stateProvider
            .state("landing", {
                url: '/',
                views: {
                    main: {
                        templateUrl: "landing/landing.html"
                    }
                }
            }).state("app", {
                abstract: true,
                views: {
                    main: {
                        templateUrl: "main/main.html",
                        controller: "MainController as mainCtrl"
                    }
                }
            }).state("app.login", {
                url: "/login",
                views: {
                    content: {
                        templateUrl: "auth/login/html",
                        controller: "LoginController as loginCtrl"
                    }
                }
            });
        

        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode(true);
    });
})();