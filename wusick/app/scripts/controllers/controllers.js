"use strict";

var WusickControllers = angular.module('WusickControllers', []);


WusickControllers.controller('loginCtrl', ['$scope', '$location', '$http', 'IdUsuario', function ($scope, $location, $http, IdUsuario) {
        $scope.userData = {};
        //Las peticiones desde el controlador indican la ruta a la base de datos.
        $scope.obtenerUsuario = function(){
            $http.post('/user/login', $scope.userData)
                .success(function(data) {
                	console.log(data);
                    if(data==='null'){
                         console.log(data);
                         smoke.alert('Usuario o contraseña incorrectos');
                    }else if(data=='admin'){
                    	console.log('vamos a panel');
                    	
                    	 $http.post('/api/crearSesion', $scope.userData)
                         .success(function(data){
                         	console.log(data);
                         	window.location.href = '/administrator';
                             
                         })
                         .error(function(data) {
                             console.log('Error: ' + data);
                         });
                    }else{
                    	console.log('vamos a main');
                        $http.post('/api/getIdByEmail', $scope.userData)
                            .success(function(data){
                                     IdUsuario.id = data;
                                    $location.url("/main");
                        
                            })
                            .error(function(data) {
                            console.log('Error:' + data);
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
						 smoke.alert('Gracias por registrarse en Wusick. Sus datos son los siguientes: \n <strong>Usuario:</strong> '+$scope.userData.nombre+'\n <strong>ContraseÃ±a:</strong> ' +$scope.userData.pass+'\n<strong>Email: </strong>' +$scope.userData.email);
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

WusickControllers.controller('mainCtrl', ['$scope', '$http','IdUsuario', function ($scope, $http, IdUsuario) {
   
     $scope.message = 'Hola usuario numero '+IdUsuario.id;


}]);

WusickControllers.controller('adminCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.obtenerListado = function(){
        $scope.listGral;
         //Las peticiones desde el controlador indican la ruta a la base de datos.
        $http.get('/user/listadoUsuarios')
        .success(function(data){
            console.log('todo ok:' + data);
            $scope.listGral = data;
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    };
    
}]);
