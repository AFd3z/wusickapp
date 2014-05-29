'use strict';


var connection = require('dbfunct/MySQLconnection');

//Funcion para comprobar si existe mail registrado
exports.existeMail = function (req,res) {

	var mail = req.body.email;
	var json ="";
	
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

//Funcion para obtener dinamicamente los tipos de usuario de la base de datos
exports.tiposUsuario= function (req,res){
  
  var json="";
  var sqlconnection = connection.createConnection();
    var query = 'SELECT * FROM tipo_usuarios';
  
    sqlconnection.query(query, function(err, results) {
        if (err)
            res.send(err, "query error");

        if (results.length<=0){
              res.send(false);
        
           }else{
             //json = JSON.stringify(results);
               //returning jsonized result
               //res.json(json);
               //returning json object
               res.json(results);
           }

        sqlconnection.end();
    });
};

//Funcion para obtener dinamicamente los géneros musicales de la base de datos
exports.generos= function (req,res){
  
  var json="";
  var sqlconnection = connection.createConnection();
    var query = 'SELECT * FROM generos';
  
    sqlconnection.query(query, function(err, results) {
        if (err)
            res.send(err, "query error");

        if (results.length<=0){
              res.send(false);
        
           }else{
             //json = JSON.stringify(results);
               //returning jsonized result
               //res.json(json);
               //returning json object
               res.json(results);
           }

        sqlconnection.end();
    });
};

//Funcion Login
exports.login = function (req,res,callback) {

var user = req.body.email;
var pass = req.body.pass;
var json ="";

    //creating connection object
    var sqlconnection = connection.createConnection();
    var query = 'SELECT * FROM usuarios WHERE email="'+user+'" AND password="'+pass+'"';

    //sending query through our connection object
    sqlconnection.query(query, function(err, results) {
       if (err)
            return callback(err, "query error");

       if (results.length<=0){
              var query = 'SELECT * FROM administradores WHERE email="'+user+'" AND password="'+pass+'"';
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

//Funcion Registro

exports.registro = function (req,res) {
	
		var user = req.body.nombre;
		var pass = req.body.pass;
		var email = req.body.email;
		var tipo = req.body.tipo;
		
		var json ="";

		    //creating connection object
		  var sqlconnection = connection.createConnection();
		    var query = 'INSERT INTO USUARIOS (nombre, password,email,fecha_alta,Tipo_usuarios_idTipo_usuarios) VALUES ("'+user+'","'+pass+'","'+email+'",curdate(),'+tipo+') ';

		    //sending query through our connection object
		    sqlconnection.query(query, function(err, results) {
		        if (err)
		            res.send(err, "query error");
		        
		        var insertedID=results.insertId;
		        console.log(insertedID);
		        console.log(tipo);
		     

		        //inserting specific data into specific user type table
		        switch (tipo){
    		        case '1':
    		        	var query2 = 'INSERT INTO basicos (fecha_nac, sexo, Usuarios_idUsuario) VALUES ("'+req.body.fecha+'","'+req.body.sexo+'",'+insertedID+') ';
    		        	sqlconnection.query(query2, function(err, results) {
    				        if (err)
    				            res.send(err, "query error");
    				       
    		        	console.log("registro correcto del usuario"+tipo+": "+user+" con ID: ");
    				        
    				    	sqlconnection.end();
    		        	});
    		        	break;
    		        case '2':
    		           	var query3 = 'INSERT INTO artistas (Genero, Usuarios_idUsuario) VALUES ("'+req.body.genero+'",'+insertedID+') ';
    		        	sqlconnection.query(query3, function(err, results) {
    				        if (err)
    				            res.send(err, "query error");
    				        
    		        	
    		        	console.log("registro correcto del usuario"+tipo+": "+user+" con ID: ");
    				        
    				    	sqlconnection.end();
    		        	});
    		        
    		        case '3':

    		        	var query4 = 'INSERT INTO salas (aforo,poblacion,direccion, Usuarios_idUsuario) VALUES ("'+req.body.aforo+'","'+req.body.poblacion+'","'+req.body.direccion+'",'+insertedID+') ';
    		        	sqlconnection.query(query4, function(err, results) {
    				        if (err)
    				            res.send(err, "query error");
    				        
    		        	console.log("registro correcto del usuario "+tipo+": "+user+" con ID: ");
    				       
    				    	sqlconnection.end();
    		        	});
    		        	break;	
                default: 
                    res.send(err, "Query Error");
                  break;

		        }
		        
		        //returning jsonized result
		        //res.json(json);
		        //returning json object
		        res.json(results);

		  });
		        
	};
		    
exports.crearSesion = function (req,res) {
	
	var email = req.body.email;
	var sqlconnection = connection.createConnection();
	var query = 'SELECT Tipo_usuarios_idTipo_usuarios from usuarios where email="'+email+'";';
	sqlconnection.query(query, function(err, results) {
        if (err)
           return res.send(err, "query error");
        
	var tipo = results;
	switch(results){
	case '1':
		var query2 = 'SELECT a.*, b.fecha_nac, b.sexo from usuarios a, basicos b where a.idusuario = b.Usuarios_idUsuario and email="'+email+'";';
    	sqlconnection.query(query2, function(err, results) {
	        if (err)
	            res.send(err, "query error");
	       
    	console.log("sesi�n creada para el usuario: "+email);
    	req.session.var=results;
    	res.send(req.session.var);
    	sqlconnection.end();
    	});
		break;
	case '2':
		var query = 'SELECT a.*, b.Genero from usuarios a, artistas b where a.idusuario = b.Usuarios_idUsuario and email="'+email+'";';
    	sqlconnection.query(query, function(err, results) {
	        if (err)
	            res.send(err, "query error");
	       
    	console.log("sesi�n creada para el usuario: "+email);
    	req.session.var=results;
    	res.send(req.session.var);
    	sqlconnection.end();
    	});
		break;
	case '3':
		var query = 'SELECT a.*, b.aforo,b.direccion,b.poblacion from usuarios a, salas b where a.idusuario = b.Usuarios_idUsuario and email="'+email+'";';
    	sqlconnection.query(query, function(err, results) {
	        if (err)
	            res.send(err, "query error");
	       
    	console.log("sesi�n creada para el usuario: "+email);
    	req.session.var=results;
    	res.send(req.session.var);
    	sqlconnection.end();

    	});
    	break;
    	default:
    		res.send(err, "error de tipo de usuario");
	}
		
    	sqlconnection.end();
	});

};

//Funcion que destruye sesión	    
exports.logout = function (req,res) {
	
	delete req.session.var;
	window.location("/login");

};		
		