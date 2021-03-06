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
      .when('/Alogin', {
        templateUrl: 'partials/loginAdmin',
        controller: 'loginAdminCtrl'
      })

      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'loginCtrl'
      })
      .when('/recpass', {
        templateUrl: 'partials/recpass',
        controller: 'recPassCtrl'
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
        .when('/amigos', {
        templateUrl: 'partials/amigos',
        controller: 'amigosCtrl'
      })
        .when('/artistas', {
        templateUrl: 'partials/artistas',
        controller: 'artistasCtrl'
      })
        .when('/salas', {
        templateUrl: 'partials/salas',
        controller: 'salasCtrl'
      })
        .when('/perfil/:id', {
        templateUrl: 'partials/perfil',
        controller: 'perfilCtrl'
      })
      .when('/cuenta', {
        templateUrl: 'partials/cuenta',
        controller: 'cuentaCtrl'
      })
      .when('/recpass', {
        templateUrl: 'partials/recpass',
        controller: 'pwdOlviCtrl'
      })
      .when('/solicitudes', {
        templateUrl: 'partials/solicitudes',
        controller: 'solicitudesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });