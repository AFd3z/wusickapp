'use strict';

angular.module('wusickAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'WusickControllers'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login',
        controller: 'loginCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'loginCtrl'
      })
       .when('/registro', {
        templateUrl: 'partials/registro',
        controller: 'registroCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });