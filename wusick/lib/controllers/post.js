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
	var query = 'INSERT INTO posts (contenido, fecha,post_img, destinatario, Usuarios_idUsuario) VALUES ("'+contenido+'",curdate(),"'+post_img+'","'+destinatario+'",'+usuario+') ';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               res.send(results);
	             }
	            });	
};

//Función de borrado de posts, la llamada será /api/borrarPost/:id
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