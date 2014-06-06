'use strict';

//FUNCIONES RELACIONADAS CON LOS USUARIOS, INCLUIDAS LAS DE ADMINISTRACION


var connection = require('dbfunct/MySQLconnection');

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
							res.send(results[0]);
                         } else if (results.length=='0'){
							console.log("login incorrecto"+results);
							res.send('null');
                        }
              });
       }else{
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
		        //console.log(insertedID);
		        //console.log(tipo);
		     

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
        				  
        		        	console.log("registro correcto del usuario"+tipo+": "+user+" con ID: "+insertedID);
        				    	sqlconnection.end();
    		        	});
                break;
    		        
    		        case '3':
    		        	var query4 = 'INSERT INTO salas (aforo,poblacion,direccion, Usuarios_idUsuario) VALUES ("'+req.body.aforo+'","'+req.body.poblacion+'","'+req.body.direccion+'",'+insertedID+') ';
        		        	sqlconnection.query(query4, function(err, results) {
            				        if (err)
            				            res.send(err, "query error");
            				        
            		        	console.log("registro correcto del usuario "+tipo+": "+user+" con ID: "+insertedID);
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


//---------- ADMINISTRACION -----------------

//Función de listado de usuarios
exports.listadoUsuarios= function (req,res){
  
  var json="";
  var sqlconnection = connection.createConnection();
  var query = 'SELECT * FROM usuarios';
  
    sqlconnection.query(query, function(err, results) {
        if (err)
            res.send(err, "query error");

        if (results.length<=0){
              res.send(false);
        
           }else{
               res.json(results);
           }

        sqlconnection.end();
    });
};

//Función de bloqueo de usuarios, la llamada a este método debe ser de este tipo /user/bloquear/:id
exports.bloquear = function (req,res) {
	
	var id =req.params.id;
	var sqlconnection = connection.createConnection();
	var query = 'UPDATE usuarios SET bloqueado=1 where idUsuario='+id;
	            	   sqlconnection.query(query, function(err, results) {
   				        if (err)
   				            res.send(err, "query error");
   				        
   				        console.log("Usuario desbloqueado con ID: "+id);
   				        res.send('desb');
   				    	sqlconnection.end();
		        	});

};

//Función de desbloqueo de usuarios, la llamada a este método debe ser de este tipo /user/bloquear/:id
exports.desbloquear = function (req,res) {
	
	var id =req.params.id;
	var sqlconnection = connection.createConnection();
	var query = 'UPDATE usuarios SET bloqueado=0 where idUsuario='+id;
	            	   sqlconnection.query(query, function(err, results) {
   				        if (err)
   				            res.send(err, "query error");
   				        
   				        console.log("Usuario desbloqueado con ID: "+id);
   				        res.send('desb');
   				    	sqlconnection.end();
		        	});

};

//Función de borrado de usuarios, la llamada a este método debe ser de este tipo /user/borrarUsuario/:id
exports.borrarUsuario = function (req,res) {
	
	var id =req.params.id;
	var sqlconnection = connection.createConnection();
	var query = 'DELETE FROM usuarios WHERE idUsuario='+id;
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	               //devolvemos numero de filas afectadas
	               res.send(results.affectedRows);
	             }
	            sqlconnection.end();
	            });	
};

//Funcion que destruye sesión	    
exports.logout = function (req,res) {
	
	req.session.destroy();
	window.location("/login");

};

//Funcion Edicion de un usuario
exports.modificarUsuario = function (req,res) {
	
		var id = req.params.id;
		console.log("<<<estas en user.js>>>>" + id);
		var json ="";
		  //creamos objeto conexión
		  var sqlconnection = connection.createConnection();
		  
		  	var query0 = 'select * from usuarios where idUsuario = '+ id +';';
		  	
		    sqlconnection.query(query0, function(err, results) {
	            if(err){
	            	 res.send(err, "query error");
	            }
	            
	            else{
	            	
	            	res.json(results[0]);
	            }
	        });	
 //------------------------------------------------------------------------------------------------------------

	};
	
exports.datosXtipo = function(req, res){
		var tipo = req.params.tipo;
		console.log(tipo);
		res.send(tipo);
		
	}

