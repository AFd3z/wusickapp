'use strict';

angular.module('wusickAppApp')
  .controller('NavbarMainCtrl', function ($scope, $location) {
    $scope.menu = [
    {'title': 'Perfil','link': '/perfil'},
    {'title': 'Cuenta','link': '/cuenta'},
    {'title': 'Salir','link': '/login'}

    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
