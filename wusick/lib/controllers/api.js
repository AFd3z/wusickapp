'use strict';


var connection = require('dbfunct/MySQLconnection');
exports.login = function (req,res,callback) {

var user = req.body.nombre;
var pass = req.body.pass;
var json ="";

    //creating connection object
    var sqlconnection = connection.createConnection();
    var query = 'SELECT * FROM usuarios WHERE nombre="'+user+'" AND password="'+pass+'"';

    //sending query through our connection object
    sqlconnection.query(query, function(err, results) {
       if (err)
            return callback(err, "query error");

       if (results.length<=0){
              var query = 'SELECT * FROM administradores WHERE nombre="'+user+'" AND password="'+pass+'"';
              sqlconnection.query(query, function(err, results) {
             
                         if (err)
                              return callback(err, "query error");

                         if (results.length<=0){
                          console.log("login incorrecto"+results);
                          res.send('null');
                        }else{
                          res.redirect('/panel');
                        }
              });
       }else{
        console.log("login correcto del usuario: "+user);
        json = JSON.stringify(results);
        //returning jsonized result
        //res.json(json);
        //returning json object
        res.json(results);

       }

        sqlconnection.end();

    });
};

//function to generate user type select
exports.obtieneTipoUsuario= function (req,res,callback){
	
	var json="";
	var sqlconnection = connection.createConnection();
    var query = 'SELECT nombre FROM tipo_usuarios';
	
    sqlconnection.query(query, function(err, results) {
        if (err)
            return callback(err, "query error");

       if (results.length<=0){

        //return callback(bool, false);
        res.send(false);
       }else{
    	   json = JSON.stringify(results);
           //returning jsonized result
           //res.json(json);
           //returning json object
           res.json(json);
       }

        sqlconnection.end();

    });
    
	
};

//check if mail exists
exports.existeMail = function (req,res) {

	
	
	var mail = req.body.email;
	var json ="";
	//var mail = req.body.email;
    //creating connection object
    var sqlconnection = connection.createConnection();
    var query = 'SELECT * FROM usuarios WHERE email="'+mail+'"';

    //sending query through our connection object
    sqlconnection.query(query, function(err, results) {
        if (err)
            res.send(err, "query error");

       if (results==null){
    	json = JSON.stringify(results);
        res.send(results);
       }else{
    	 res.json(results);
       }

        sqlconnection.end();

    });
};

exports.registro = function (req,res) {
	
		var user = req.body.nombre;
		var pass = req.body.pass;
		var email = req.body.mail
		
		
		
		var json ="";

		    //creating connection object
		    var sqlconnection = connection.createConnection();
		    var query = 'INSERT INTO USUARIOS (nombre, password,email,fecha_alta,Tipo_usuarios_idTipo_usuarios)VALUES ';

		    //sending query through our connection object
		    sqlconnection.query(query, function(err, results,fields) {
		        if (err)
		            return callback(err, "query error");

		       if (results.length<=0){

		        console.log("login incorrecto"+results);
		        res.send('null');

		       }else{

		        console.log("login correcto del usuario: "+user);
		        json = JSON.stringify(results);
		        //returning jsonized result
		        //res.json(json);
		        //returning json object
		        res.json(results);

		       }

		        sqlconnection.end();

		    });
		};