var WusickControllers = angular.module('WusickControllers', []);


WusickControllers.controller('loginCtrl', ['$scope', '$http', '$window', function ($scope, $http) {
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
                        $http.post('/api/crearSesion', $scope.userData, $window)
                            .success(function(){
                                $window.location('/main/:id');
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
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
                    if(data==false){
                        $http.post('/api/registro', $scope.userData)
                            .success(function(data){
                            $scope.formData = {};
                             smoke.alert('Gracias por registrarse en Wusick. Sus datos son los siguientes: \n <strong>Usuario:</strong> '+$scope.userData.nombre+'\n <strong>Contraseña:</strong> ' +$scope.userData.pass+'\n<strong>Email: </strong>' +$scope.userData.email);
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

    $scope.tiposUsuario= function (){
        $scope.tipos;
        $http.get('/api/tiposUsuario')
            .success(function(data){
                   console.log(data);
                $scope.tipos = data;
            })
           .error(function(data) {
                    console.log('Error:' + data);
            });
    };

     $scope.generos= function (){
        $scope.generos;
        $http.get('/api/generos')
            .success(function(data){
                   console.log(data);
                $scope.generos = data;
            })
           .error(function(data) {
                    console.log('Error:' + data);
            });
    };

}]);

WusickControllers.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

    
}]);