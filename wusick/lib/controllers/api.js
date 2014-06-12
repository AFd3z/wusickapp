'use strict';


//FUNCIONALIDADES VARIAS

var connection = require('dbfunct/MySQLconnection');
var nodemailer = require('nodemailer');
var storeclass = require('storeclass/storeclass');

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



//Función para obtener el id de usuarios a través del email (primera variable de sesión)
exports.getIdByEmail = function(req, res){
	var email = req.body.email;
	var sqlconnection = connection.createConnection();
	var query = 'SELECT idUsuario FROM usuarios WHERE email="'+email+'";';
	var id;           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	  				res.send(err, "query error");
	                  
	               }else{
	                id=results.idUsuario;	   
	               	res.send(id);
	               	
	             }
	            });
};

exports.getAdminByEmail = function(req, res){
	var email = req.body.email;
	var sqlconnection = connection.createConnection();
	var query = 'SELECT * FROM administradores WHERE email="'+email+'";';
	var id;           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	  				res.send(err, "query error");
	                  
	               }else{
	                 
	            	   
		               	res.json(results);

	             }
	            });
};



//Función para obtener el nombre de usuario a través del id
exports.getUserById = function(req, res){
	var id=req.session.idUsuario;
	console.log(id);
	var sqlconnection = connection.createConnection();
	var query = 'SELECT nombre FROM usuarios WHERE idUsuario="'+id+'";';
	           
	    sqlconnection.query(query, function(err, results) {
	            if (err){
	               res.send(err, "query error");
	                  
	               }else{
	            	   console.log(results);
	               req.session.user=results;
	               console.log(req.session.user);
	               res.send(req.session.user);
	             }
	            });
};

//Función para obtener los amigos
exports.getFriendsById = function(req, res){
	
	var id = req.params.id;
	var sqlconnection = connection.createConnection();
	var query = 'select *  from amigos_de where usuarioLogeado = '+id;
	           
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

//funcion para recuperar la contraseña
exports.recuperarPwd= function(req, res){
	   
    var nombre= req.body.nombre;
    var email= req.body.email;
    var pass= req.body.password;


       var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail", 
        auth: {
          user: "wusickapp@gmail.com",
          pass: "wusickapp1"
        }
          });

        var mailOptions = {
            from: "wusickapp@gmail.com",
            to: email, 
            subject: "Wusick restablecer pwd",
            html: "Su contraseña es: "+pass
        }

      smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
              console.log(error);
          }else{
              console.log("Message sent: " + response.message);
              res.send('mailOK');
          }
         
          smtpTransport.close(); 
      }); 
};
