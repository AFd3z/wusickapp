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
 app.route('/api/getUserById').get(api.getUserById);
 app.route('/api/getFriendsById').get(api.getFriendsById);

 //RUTAS USUARIO
 app.route('/user/login').post(user.login);
 app.route('/user/registro').post(user.registro);
 
 //ADMINISTRACION
 app.route('/user/bloquear/:id').post(user.bloquear);
 app.route('/user/desbloquear/:id').post(user.desbloquear);
 app.route('/user/borrarUsuario/:id').post(user.borrarUsuario);
 app.route('/user/modificarUsuario/:id').post(user.modificarUsuario);
 app.route('/user/listadoUsuarios').get(user.listadoUsuarios);
 app.route('/user/datosXtipo').get(user.datosXtipo);

 //POST
 app.route('/post/obtenerPost/:id').post(post.obtenerPost);
 app.route('/post/obtenerTodosPost').post(post.obtenerTodosPost);
 app.route('/post/postear').post(post.postear);
 app.route('/post/borrarPost/:id').post(post.borrarPost);

  

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