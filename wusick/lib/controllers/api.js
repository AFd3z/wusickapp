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

//Funcion para obtener dinamicamente los gÃ©neros musicales de la base de datos
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

    //creamos objeto de conexion
    var sqlconnection = connection.createConnection();
    var query = 'SELECT * FROM usuarios WHERE email="'+user+'" AND password="'+pass+'"';

    //lanzamos query
    sqlconnection.query(query, function(err, results) {
       if (err)
            return callback(err, "query error");
       
       //comprobación de bloqueo de usuario
       if(results.bloqueado==1){   	   
    	   res.send('bloqu');
       }
       
       //comprobación de usuario inexistente y comprobación de si usuario admin
       if (results.length=='0'){
              var query = 'SELECT * FROM administradores WHERE email="'+user+'" AND password="'+pass+'"';
              sqlconnection.query(query, function(err, results) {
             
                         if (err)
                              return callback(err, "query error");
                         
						 if (results.length > '0'){
							console.log('vamos por admin');
							console.log("login correcto de administrador: "+results[0].email+", "+results[0].email);
							res.send('admin');
                         } else if (results.length=='0'){
							console.log("login incorrecto"+results);
							res.send('null');
                        }else{
							res.send('admin');
                        }
              });
       }else{
        console.log("login correcto del usuario: "+results[0].nombre+", "+results[0].email);
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

		  //creamos objeto conexión
		  var sqlconnection = connection.createConnection();
		    var query = 'INSERT INTO USUARIOS (nombre, password,email,fecha_alta,Tipo_usuarios_idTipo_usuarios) VALUES ("'+user+'","'+pass+'","'+email+'",curdate(),'+tipo+') ';

		    //lanzamos query
		    sqlconnection.query(query, function(err, results) {
		        if (err)
		            res.send(err, "query error");
		        
		        var insertedID=results.insertId;
		        console.log(insertedID);
		        console.log(tipo);
		     

		        //insertamos los datos propios d cada tipo de usuario en la tabla que corresponda
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
                break;
    		        
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
		        
		        //devolvemos el objeto jsonizado (si necesario)
		        //res.json(json);
		        //devolvemos el objeto json tal cual
		        res.json(results);

		  });
	};

//Función para obtener el id de usuarios a través del email (primera variable de sesión)
exports.getIdByEmail = function(req, res){
	var sqlconnection = connection.createConnection();
	var query = 'SELECT idUsuario FROM usuarios WHERE email="'+req.session.mail+'";';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               req.session.idUsuario=results;	   
	               res.send(req.session.idUsuario);
	             }
	            });
};

//Función para obtener el nombre de usuario a través del id
exports.getUserById = function(req, res){
	var id=req.body.id;
	var sqlconnection = connection.createConnection();
	var query = 'SELECT nombre FROM usuarios WHERE idUsuario="'+id+'";';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               req.session.user=results;	   
	               res.send(req.session.user);
	             }
	            });
};

//Función para obtener los amigos
exports.getFriendsById = function(req, res){
	var sqlconnection = connection.createConnection();
	var query = 'SELECT Usuarios_idUsuario1 FROM usuarios_has_usuarios WHERE Usuarios_idUsuario="'+req.session.id+'";';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               req.session.friends=results;	   
	               res.send(results);
	             }
	            });
};	
	
//Función que crea la sesión	
exports.crearSesion = function (req,res) {
	
	req.session.mail=req.body.email;
	res.send(req.session.mail);
	
};

//Función que devuelve la sesión
exports.getSesion = function (req,res) {
  
	res.send(req.session.mail);
	
};

//Funcion que destruye sesión	    
exports.logout = function (req,res) {
	
	req.session.destroy();
	window.location("/login");

};		
		
