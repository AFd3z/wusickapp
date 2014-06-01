'use strict';

angular.module('wusickAppApp')
  .controller('NavbarMainCtrl', function ($scope, $location) {
    $scope.menu = [
    {'title': 'opc 1','link': '/perfil'},
    {'title': 'opc 2','link': '/cuenta'},
    {'title': 'Salir','link': '/login'}

    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
