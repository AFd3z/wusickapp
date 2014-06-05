'use strict';
var WusickServices = angular.module('WusickServices',[]);

WusickServices.factory('DatosUsuario', function() {
  return {
  	Tipo_usuarios_idTipo_usuarios: '',
	bloqueado: 0,
	email: '',
	fecha_alta: '',
	header_img: '',
	idUsuario: 0,
	nombre: '',
	password: '',
	profile_img: '',
	logged:false

  };
});

WusickServices.factory('DatosAdmin', function() {
  return {
    email:'',
    password:'',
    id:''

  };
});





