'use strict';

//FUNCIONES RELACIONADAS CON LOS POSTS


var connection = require('dbfunct/MySQLconnection');


//Función de envío de posts
exports.postear = function (req,res) {
	
	var contenido =req.body.contenido;
	var post_img =req.body.img;
	var destinatario =req.body.destinatario;
	var usuario = req.body.usuario;

	var sqlconnection = connection.createConnection();
	var query = 'INSERT INTO posts (contenido, fecha,post_img, destinatario, Usuarios_idUsuario) VALUES ("'+contenido+'",now(),"'+post_img+'","'+destinatario+'",'+usuario+') ';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });	
};

//Funcion de borrado de posts, la llamada sera /post/borrarPost/:id
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

//Funcion de recuperacion de post
exports.feed = function (req,res) {
	
	var id =req.params.id;

	var sqlconnection = connection.createConnection();
	var query = 'select tr.Usuarios_idUsuario logueado, tp.idPosts idPost, tp.contenido contenido, tp.fecha fecha, tp.post_img img, tp.destinatario destinatario, tp.Usuarios_idUsuario autor from usuarios_has_usuarios tr, posts tp where tr.Usuarios_idUsuario = '+id+' and (tp.Usuarios_idUsuario = tr.Usuarios_idUsuario1 or tp.Usuarios_idUsuario = '+id+') order by tp.fecha desc;
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });	
};