'use strict';

angular.module('wusickAppApp')
  .controller('NavbarAdminCtrl', function ($scope, $location) {
    $scope.menu = [
    {'title': 'opc1','link': '/login'},
    {'title': 'opc2','link': '/login'},
    {'title': 'salir','link': '/login'}

    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
