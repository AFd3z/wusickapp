'use strict';

//FUNCIONES RELACIONADAS CON LOS POSTS


var connection = require('dbfunct/MySQLconnection');


//Función de envío de posts
exports.postear = function (req,res) {
	
	var contenido =req.body.contenido;
	var post_img =req.body.img;
	var destinatario =req.body.destinatario;
	var usuario = req.body.id;
		

		if(destinatario!=null){
			destinatario = "'"+destinatario+"'";
		}

		if(post_img!=null){
			post_img= "'"+post_img+"'";
		}

	var sqlconnection = this.createConnection();
	var query = 'INSERT INTO posts (contenido, fecha,post_img, destinatario, Usuarios_idUsuario) VALUES ("'+contenido+'",now(),'+post_img+','+destinatario+','+usuario+') ';
	           console.log(query);
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	 
	            	   var query2 = 'SELECT * FROM posts WHERE idPosts='+results.insertId;
	    	           
	           	    sqlconnection.query(query2, function(err, results) {
	           	            if (err){
	           	               res.send(err, "query error");
	           	                  
	           	               }else{       	   
	           	               res.send(results);
	           	             }
	           	            });	 
	             }
	            });	
};

//Función de borrado de posts, la llamada sera /post/borrarPost/:id
exports.borrarPost = function (req,res) {
	
	var id =req.params.id;

	var sqlconnection = connection.createConnection();
	var query = 'DELETE FROM posts WHERE idPosts='+id;
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               //devolvemos numero de filas afectadas
	               res.send(results.affectedRows);
	             }
	            });	
};

//Función de recuperacion de post del main
exports.obtenerPost = function (req,res) {
	
	var id =req.params.id;

	var sqlconnection = connection.createConnection();
	var query = 'select distinct tr.Usuarios_idUsuario logueado, tp.idPosts idPost, tp.contenido contenido, tp.fecha fecha, tp.post_img img, tp.destinatario destinatario, tu.nombre nombre, tp.Usuarios_idUsuario idautor, tu.email email, tu.Tipo_usuarios_idTipo_usuarios tipousuario from usuarios_has_usuarios tr, posts tp, usuarios tu where tr.Usuarios_idUsuario = '+id+' and tp.Usuarios_idUsuario in (tr.Usuarios_idUsuario, tr.Usuarios_idUsuario1) and tu.idUsuario in (tr.Usuarios_idUsuario, tr.Usuarios_idUsuario1) and tp.Usuarios_idUsuario = tu.idUsuario order by fecha desc';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });
};

//Función de recuperacion de post del admin
exports.obtenerTodosPost = function (req,res) {

	var sqlconnection = connection.createConnection();
	var query = 'select p.idPosts idPost, p.contenido contenido, p.fecha fecha, p.post_img img, p.destinatario destinatario, u.nombre nombre from posts p, usuarios u where p.Usuarios_idUsuario = u.idUsuario order by p.fecha desc';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });	
};

//Función de recuperacion de post del main
exports.obtenerPostPropios = function (req,res) {
	
	var id =req.params.id;

	var sqlconnection = connection.createConnection();
	var query = 'select p.idPosts, p.contenido, p.fecha, p.post_img, p.destinatario, p.Usuarios_idUsuario, u.idUsuario, u.nombre from posts p, usuarios u where p.Usuarios_idUsuario = '+id+' and idUsuario = '+id+' or p.destinatario = u.nombre order by p.fecha desc';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });
};

//Función de recuperación de posts escritos por un id
exports.obtenerPostDeUnId = function (req,res) {
	
	var id =req.params.id;

	var sqlconnection = connection.createConnection();
	var query = 'select p.idPosts, p.fecha, p.post_img, p.contenido, p.destinatario, u.nombre, u.idUsuario from posts p, usuarios u where p.Usuarios_idUsuario = '+id+' and u.idUsuario = p.Usuarios_idUsuario';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });
};




