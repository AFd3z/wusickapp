'use strict';

angular.module('wusickAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'webStorageModule',
  'WusickServices',
  'WusickControllers'
  
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login',
        controller: 'loginCtrl'
      })
      .when('/loginAdmin', {
        templateUrl: 'partials/loginAdmin',
        controller: 'loginAdminCtrl'
      })

      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'loginCtrl'
      })
       .when('/registro', {
        templateUrl: 'partials/registro',
        controller: 'registroCtrl'
      })
       .when('/main', {
        templateUrl: 'partials/main',
        controller: 'mainCtrl'
      })
        .when('/administrator', {
        templateUrl: 'partials/jades/admin-index',
        controller: 'adminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });