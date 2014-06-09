"use strict";

var WusickControllers = angular.module('WusickControllers', []);

WusickControllers.controller('loginAdminCtrl', ['$scope', '$location', '$http', 'webStorage', function ($scope, $location, $http, webStorage) {
        $scope.userData={}
        $scope.sessionAdmin= webStorage.session.get('admin');
        console.log($scope.sessionAdmin);

        if($scope.sessionAdmin!='null'){
            webStorage.session.clear();
        }
        //Las peticiones desde el controlador indican la ruta a la base de datos.
        $scope.obtenerUsuario = function(){
            $http.post('/user/login', $scope.userData)
                .success(function(data) {
                    if(data==='null'){
                         console.log(data);
                         smoke.alert('Usuario o contraseña incorrectos');
                   
                    }else{
                        $http.post('/api/getAdminByEmail', $scope.userData)
                            .success(function(data){
                                    console.log(data);
                                    webStorage.session.add('admin', data[0]);
                                    $location.url("/administrator");
                        
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

//REGISTROLOGIN

WusickControllers.controller('loginCtrl', ['$scope', '$location', '$http', 'webStorage', function ($scope, $location, $http, webStorage) {
        $scope.userData = {};
        $scope.sessionUser= webStorage.session.get('usuario');
        console.log($scope.sessionUser);

        if($scope.sessionUser!='null'){
            webStorage.session.clear();
        }
        //Las peticiones desde el controlador indican la ruta a la base de datos.
        $scope.obtenerUsuario = function(){
            $http.post('/user/login', $scope.userData)
                .success(function(data) {	                 
                    if(data==='null'){
                         smoke.alert('Usuario o contraseña incorrectos');
                   
                    }else if(data[0].bloqueado ===0){

                                    webStorage.session.add('usuario', data[0]);
                                    $location.url("/main");


                    }else if(data[0].bloqueado ===1){
                    	    smoke.alert("Su usuario ha sido bloquedo. Si quiere ser desbloqueado pongase en contacto con un administrador.");
                              console.log(data.bloqueado);
                         }
                          
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            };
        
}]);

WusickControllers.controller('recPassCtrl', ['$scope', '$http','$location', function ($scope, $http, $location) {

        $scope.recuperarPwd = function(){


        }




}]);

//REGISTRO CONTROLLER


WusickControllers.controller('registroCtrl', ['$scope', '$http','$location', function ($scope, $http, $location) {
    $scope.userData = {};
    $scope.createUsuario = function(){
		$http.post('/api/existeMail', $scope.userData)
			.success(function(data){
				if(data==false){
					$http.post('/user/registro', $scope.userData)
						.success(function(data){
						$scope.formData = {};
						 smoke.alert('Gracias por registrarse en Wusick. Sus datos son los siguientes: \n <strong>Usuario:</strong> '+$scope.userData.nombre+'\n <strong>ContraseÃ±a:</strong> ' +$scope.userData.pass+'\n<strong>Email: </strong>' +$scope.userData.email);
						})
						.error(function(data) {
							console.log('Error:' + data);
						});
                        $location.url("/login");
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


//CONTROLADOR MAIN

WusickControllers.controller('mainCtrl', ['$scope', '$http','$location','webStorage', function ($scope, $http, $location, webStorage) {
        

	   $scope.usuario = webStorage.session.get('usuario');
	    //console.log($scope.usuario);
	        if($scope.usuario==null){
	            smoke.alert('No estas logeado como usuario!');
	            $location.url("/login");
	        };
	        
	        
	    $scope.id = $scope.usuario.idUsuario;

        $scope.datosPost= {};
        $scope.postear= function(){
            $scope.datosPost.id = $scope.id;
           // console.log($scope.datosPost.img);
            if($scope.datosPost.img===undefined || $scope.datosPost.img===''){
                $scope.datosPost.img=null;
            }

            if($scope.datosPost.destinatario===undefined || $scope.datosPost.destinatario===''){
                $scope.datosPost.destinatario=null;
            }

                $http.post('/post/postear', $scope.datosPost)
                    .success(function(data){
                        $scope.datospost=data[0];
                        $scope.obtenerPost();
                        if($scope.amigos.length==0){
                            smoke.alert('Tienes que tener amigos para postear. Si no...\n ¿Quién lo leería entonces?');
                        }
                     
                    })
                    .error(function(data) {
                    console.log('Error:' + data);
                });
        }

        $scope.obtenerAmigos= function(){
            $scope.amigos;
            $http.post('/api/getFriendsById/'+$scope.id)
                .success(function(data){
                    $scope.amigos= data;
                    $scope.amigosSide= data;
                    $scope.artistasSide= data;
                    $scope.salasSide= data;

                     console.log(  $scope.artistasSide);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        }
            

	    $scope.obtenerPost= function (){
	    	$scope.posts;
	        $http.post('/post/obtenerPost/'+$scope.id)
	             .success(function(data){
	                  //console.log(data);
	                  $scope.posts = data;
                         console.log($scope.posts);
	              })
	             .error(function(data) {
	                        console.log('Error:' + data);
	              });
	        };

            $scope.$on('$viewContentLoaded', function() {
                $scope.obtenerPost();
                $scope.obtenerAmigos();
            });

        setInterval(function(){
        $scope.$apply(function() {
            $scope.obtenerPost();
        });
    }, 180000);
}]);




//CONTROLADORES ADMIN


WusickControllers.controller('navbarAdminCtrl', ['$scope','$location','webStorage', function ($scope, $location, webStorage) {
    $scope.menu = [
    {'title': 'Usuarios','link':'/login'},
    {'title': 'Post','link':'/login'},
    {'title': 'Salir','link':'/loginAdmin'}
    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

     
}]);


WusickControllers.controller('adminCtrl', ['$scope', '$location', '$http','webStorage', function ($scope, $location, $http, webStorage) {
    
    $scope.admin= webStorage.session.get('admin');
    console.log($scope.admin);
        if($scope.admin==null){
            smoke.alert('No estás loggeado como administrador!');
            $location.url("/loginAdmin");
        }
    $scope.obtenerListado = function(){
        $scope.listGral;
        $http.get('/user/listadoUsuarios')
        .success(function(data){
            console.log('todo ok:' + data);
            $scope.listGral = data;
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    };
  
    $scope.bloquear = function(obj){
    	var c = confirm('Bloquear usuario '+obj.target.attributes.name.value+' ?');
    	if (c==true){
    	 $http.post('/user/bloquear/'+obj.target.attributes.data.value)
         .success(function(data){
                console.log(data);
                location.reload();
         })
        .error(function(data) {
                 console.log('Error:' + data);
         });
    	}else{
    		alert('No se bloqueara el usuario '+obj.target.attributes.name.value);
    	}
    };
    
    $scope.desbloquear = function(obj){
    	var c = confirm('Desbloquear usuario '+obj.target.attributes.name.value+' ?');
    	if (c==true){
    	 $http.post('/user/desbloquear/'+obj.target.attributes.data.value)
         .success(function(data){
                console.log(data);
                location.reload();
         })
        .error(function(data) {
                 console.log('Error:' + data);
         });
    	}else{
    		alert('No se desbloqueara el usuario '+obj.target.attributes.name.value);
    		
    	}
  
    };
    
    $scope.borrarUsuario = function(obj){
    	var c = confirm('Está seguro de querer BORRAR el usuario '+obj.target.attributes.name.value+' ?');
    	if (c==true){
    	 $http.post('/user/borrarUsuario/'+obj.target.attributes.data.value)
         .success(function(data){
                console.log(data);
                location.reload();
         })
        .error(function(data) {
                 console.log('Error:' + data);
         });
    	}else{
    		alert('No se borrará el usuario '+obj.target.attributes.name.value);
    	}
    };
    
    $scope.modificarUsuario = function(obj){
    	//var c = confirm('Está seguro de querer EDITAR el usuario: '+obj.target.attributes.name.value+' ?');
    	if (true){
	    		$scope.id = obj.target.attributes.data.value;
	    		console.log($scope.id);
	    	$http.post('/user/modificarUsuario/'+$scope.id)
		         .success(function(data){
		        	 console.log(data);
		             $scope.nombre = data.nombre;
		             $scope.email = data.email;
		             $scope.pass = data.password;
		             $scope.tipo = data.Tipo_usuarios_idTipo_usuarios;

		            switch ($scope.tipo) {
						case 1:/*basicos*/
							var fecha = data.fecha_nac;
							var fecha_substr = fecha.substring(0, 10);

							$scope.fecha_nac = fecha_substr;
							$scope.sexo = data.sexo;
							$scope.sexos = [{sexo: 'M', nombre: 'Mujer'},
							                {sexo: 'H', nombre: 'Hombre'}]
						break;
						case 2:/*artista*/
							$scope.genero = data.Genero;
							 $http.get('/api/generos')
					            .success(function(data){
					                console.log(data);
					                $scope.generos = data;
					            })
					           .error(function(data) {
					                    console.log('Error:' + data);
					            });
						break;
						case 3:/*sala*/
							$scope.aforo =data.aforo;
							$scope.poblacion =data.poblacion;
							$scope.direccion =data.direccion;
						break;
						default:
						break;
					}
		         })
		        .error(function(data) {
		                 console.log('Error:' + data);
		         });	
    	}else{
    		alert('No se editará el usuario: '+obj.target.attributes.name.value);
    	}
    };
    
    $scope.UpdateUsuario = function(){
    	$scope.userData = {};
		$http.post('/api/existeMail', $scope.userData)
			.success(function(data){
				if(data==false){
					$http.post('/user/UpdateUsuario', $scope.userData)
					.success(function(data){
					$scope.formData = {};
					 alert('Sus nuevos datos son los siguientes: \n Usuario: '+$scope.userData.nombre+'\n Contraseña: ' +$scope.userData.pass+'\n Email: ' +$scope.userData.email);
					})
					.error(function(data) {
						console.log('Error:' + data);
					});
                    $location.url("/administrator");
				}else{
					alert('Ya existe una cuenta asociada al email '+$scope.userData.email+'.');
				}
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
			
		
    };
    
    
    
    
    
}]);
