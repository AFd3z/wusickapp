'use strict';

var api = require('./controllers/api'),
    user = require('./controllers/user'),
    post = require('./controllers/post'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

// Server API Routes

 //FUNCIONALIDADES
 app.route('/api/existeMail').post(api.existeMail);
 app.route('/api/tiposUsuario').get(api.tiposUsuario);
 app.route('/api/generos').get(api.generos);
 app.route('/api/getSesion').get(api.getSesion);
 app.route('/api/crearSesion').post(api.crearSesion);
 app.route('/api/getIdByEmail').post(api.getIdByEmail);
 app.route('/api/getAdminByEmail').post(api.getAdminByEmail);
 app.route('/api/getUserById').post(api.getUserById);
 app.route('/api/getFriendsById/:id').post(api.getFriendsById);
 app.route('/api/recuperarPwd').post(api.recuperarPwd);
 

 //RUTAS USUARIO
 app.route('/user/login').post(user.login);
 app.route('/user/registro').post(user.registro);
 app.route('/user/seguir/:id/:id2').post(user.seguir);
 app.route('/user/anadir/:id/:id2').post(user.anadir);
 app.route('/user/anadirAAmigos/:id/:id2').post(user.anadirAAmigos);
 app.route('/user/noAnadir/:id/:id2').post(user.noAnadir);
 app.route('/user/solicitudes/:id').post(user.solicitudes);
 app.route('/user/numSolicitudes/:id').post(user.numSolicitudes);
 
 //ADMINISTRACION
 app.route('/user/bloquear/:id').post(user.bloquear);
 app.route('/user/desbloquear/:id').post(user.desbloquear);
 app.route('/user/borrarUsuario/:id').delete(user.borrarUsuario);
 app.route('/user/modificarUsuario/:id').post(user.modificarUsuario);
 app.route('/user/listadoUsuarios').get(user.listadoUsuarios);
 app.route('/user/datosXtipo').get(user.datosXtipo);
 app.route('/user/UpdateUsuario').post(user.UpdateUsuario);

 //POST
 app.route('/post/obtenerPost/:id').post(post.obtenerPost);
 app.route('/post/obtenerPostPropios/:id').post(post.obtenerPostPropios);
 app.route('/post/obtenerPostDeUnId/:id').post(post.obtenerPostDeUnId);
 app.route('/post/obtenerTodosPost').post(post.obtenerTodosPost);
 app.route('/post/postear').post(post.postear);
 app.route('/post/borrarPost/:id').delete(post.borrarPost);

  

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};