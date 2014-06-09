'use strict';

angular.module('wusickAppApp')
  .controller('NavbarMainCtrl',['$scope','webStorage', function ($scope, $location,webStorage) {
    $scope.sessionUsuario = webStorage.session.get('usuario');
    $scope.menu = [
    {'title': 'Perfil','link': '/perfil/'+$scope.sessionusuario.idUsuario},
    {'title': 'Cuenta','link': '/cuenta'},
    {'title': 'Salir','link': '/login'}

    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
}]);
