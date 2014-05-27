var WusickControllers = angular.module('WusickControllers', []);


WusickControllers.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {
          $scope.userData = {};
            //Las peticiones desde el controlador indican la ruta a la base de datos.
        $scope.obtenerUsuario = function(){
            $http.post('/api/login', $scope.userData)
                .success(function(data) {  
                    if(data==='null'){
                         console.log(data);
                         smoke.alert('Usuario o contraseña incorrectos');
                    }
                    else{
                       /*  $http.post('/api/createSession', data)
                         .success(function(session){
                            console.log(session);
                         });*/
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            };
        
}]);

WusickControllers.controller('registroCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.userData = {};

    $scope.createUsuario = function(){
            $http.post('/api/existeMail', $scope.userData)
                .success(function(data){
                    if(data==='null'){
                        $http.post('/api/registro', $scope.userData)
                            .success(function(data){
                            $scope.formData = {};
                             smoke.alert('Gracias por registrarse en LiveStats. Sus datos son los siguientes: \n <strong>Usuario:</strong> '+$scope.userData.nombre+'\n <strong>Contraseña:</strong> ' +$scope.userData.pass+'\n<strong>Email: </strong>' +$scope.userData.email);
                            })
                            .error(function(data) {
                                console.log('Error:' + data);
                            });
                    }else{
                        smoke.alert('Ya existe una cuenta asociada al email '+$scope.userData.email+'.');
                    }
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
            };
}]);