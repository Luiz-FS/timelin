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
            .state("app", {
                abstract: true,
                views: {
                    main: {
                        templateUrl: "main/main.html",
                        controller: "MainController as mainCtrl"
                    }
                }
            }).state("app.landing", {
                url: '/',
                views: {
                    content: {
                        templateUrl: "landing/landing.html"
                    }
                }
            }).state("app.login", {
                url: "/login",
                views: {
                    content: {
                        templateUrl: "auth/login.html",
                        controller: "LoginController as loginCtrl"
                    }
                }
            }).state("app.events", {
                url: "/events",
                views: {
                    content: {
                        templateUrl: "event/events_page.html",
                        controller: "EventsController as eventsCtrl"
                    }
                }
            }).state("app.user", {
                url: '/user',
                views: {
                    content: {
                        templateUrl: "user/user_details.html",
                        controller: "UserDetailsController as userDetailsCtrl"
                    }
                }
            }).state("app.feedback", {
                url: '/feedback',
                views: {
                    content: {
                        templateUrl: "/feedback/feedback_page.html",
                        controller: "FeedbackController as feedbackCtrl"
                    }
                }
            });
        

        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('BearerAuthInterceptor');
    });

    app.factory('BearerAuthInterceptor', function ($q, $injector) {
        return {
            request: function(config) {
                const AuthService = $injector.get('AuthService');
                Utils.updateBackendUrl(config);

                if (AuthService.isLoggedIn()) {
                    const { token } = AuthService.getCurrentUser();
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config || $q.when(config);
            }
        };
    });

    app.run(function authInterceptor(AuthService, $transitions) {
        var ignored_routes = [
            "app.login",
            "app.landing",
            "app.feedback"
        ];

        $transitions.onBefore({
            to: function(state) {
                return !(_.includes(ignored_routes, state.name)) && !AuthService.isLoggedIn();
            }
        }, function(transition) {
            return transition.router.stateService.transitionTo("app.landing");
        });
    });

})();