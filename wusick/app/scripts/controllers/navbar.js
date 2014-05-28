'use strict';

angular.module('wusickAppApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {'title': 'Home','link': 'http://www.responsivedesigner.es/webApp/demo/demoPage.html'},
    {'title': 'Login','link': '/login'},
    {'title': 'Registro','link': '/registro'}

    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
