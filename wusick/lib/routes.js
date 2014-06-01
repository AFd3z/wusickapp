'use strict';

var api = require('./controllers/api'),
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
 app.route('/api/getUserById').get(api.getUserById);
 app.route('/api/getFriendsById').get(api.getFriendsById);
 
 
 //RUTAS USUARIO
 app.route('/api/login').post(api.login);
 app.route('/api/registro').post(api.registro);
 
 //ADMINISTRACION
 app.route('/api/bloquear/:id').post(api.bloquear);
 app.route('/api/desbloquear/:id').post(api.desbloquear);
 app.route('/api/borrarUsuario/:id').post(api.borrarUsuario);

 //POST
 app.route('/api/postear').post(api.postear);
 app.route('/api/borrarPost/:id').post(api.borrarPost);

  

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