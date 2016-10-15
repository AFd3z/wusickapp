CREATE DATABASE  IF NOT EXISTS `wusick` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wusick`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: wusick
-- ------------------------------------------------------
-- Server version	5.5.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`idAdministrador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (1,'admin@admin','admin');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administradores_has_permisos`
--

DROP TABLE IF EXISTS `administradores_has_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores_has_permisos` (
  `Administradores_idAdministrador` int(11) NOT NULL,
  `Permisos_idPermisos` int(11) NOT NULL,
  PRIMARY KEY (`Administradores_idAdministrador`,`Permisos_idPermisos`),
  KEY `fk_Administradores_has_Permisos_Permisos1_idx` (`Permisos_idPermisos`),
  KEY `fk_Administradores_has_Permisos_Administradores1_idx` (`Administradores_idAdministrador`),
  CONSTRAINT `fk_Administradores_has_Permisos_Administradores1` FOREIGN KEY (`Administradores_idAdministrador`) REFERENCES `administradores` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Administradores_has_Permisos_Permisos1` FOREIGN KEY (`Permisos_idPermisos`) REFERENCES `permisos` (`idPermisos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores_has_permisos`
--

LOCK TABLES `administradores_has_permisos` WRITE;
/*!40000 ALTER TABLE `administradores_has_permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores_has_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `amigos_de`
--

DROP TABLE IF EXISTS `amigos_de`;
/*!50001 DROP VIEW IF EXISTS `amigos_de`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `amigos_de` (
  `usuarioLogeado` tinyint NOT NULL,
  `idUsuario` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `fecha_alta` tinyint NOT NULL,
  `Tipo_usuarios_idTipo_usuarios` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `artistas`
--

DROP TABLE IF EXISTS `artistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artistas` (
  `Genero` varchar(45) NOT NULL,
  `Usuarios_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`Usuarios_idUsuario`),
  KEY `fk_Artistas_Usuarios1_idx` (`Usuarios_idUsuario`),
  CONSTRAINT `fk_Artistas_Usuarios1` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artistas`
--

LOCK TABLES `artistas` WRITE;
/*!40000 ALTER TABLE `artistas` DISABLE KEYS */;
INSERT INTO `artistas` VALUES ('1',4),('3',5);
/*!40000 ALTER TABLE `artistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artistas_has_generos`
--

DROP TABLE IF EXISTS `artistas_has_generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artistas_has_generos` (
  `Artistas_Usuarios_idUsuario` int(11) NOT NULL,
  `Generos_idGeneros` int(11) NOT NULL,
  PRIMARY KEY (`Artistas_Usuarios_idUsuario`,`Generos_idGeneros`),
  KEY `fk_Artistas_has_Generos_Generos1_idx` (`Generos_idGeneros`),
  KEY `fk_Artistas_has_Generos_Artistas1_idx` (`Artistas_Usuarios_idUsuario`),
  CONSTRAINT `fk_Artistas_has_Generos_Artistas1` FOREIGN KEY (`Artistas_Usuarios_idUsuario`) REFERENCES `artistas` (`Usuarios_idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Artistas_has_Generos_Generos1` FOREIGN KEY (`Generos_idGeneros`) REFERENCES `generos` (`idGeneros`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artistas_has_generos`
--

LOCK TABLES `artistas_has_generos` WRITE;
/*!40000 ALTER TABLE `artistas_has_generos` DISABLE KEYS */;
/*!40000 ALTER TABLE `artistas_has_generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basicos`
--

DROP TABLE IF EXISTS `basicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basicos` (
  `fecha_nac` date NOT NULL,
  `sexo` char(1) NOT NULL,
  `Usuarios_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`Usuarios_idUsuario`),
  KEY `fk_Basicos_Usuarios1_idx` (`Usuarios_idUsuario`),
  CONSTRAINT `fk_Basicos_Usuarios1` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basicos`
--

LOCK TABLES `basicos` WRITE;
/*!40000 ALTER TABLE `basicos` DISABLE KEYS */;
INSERT INTO `basicos` VALUES ('1989-02-15','H',6),('1984-05-07','H',7),('1989-01-02','M',8),('2014-06-04','H',17),('2014-06-17','H',18);
/*!40000 ALTER TABLE `basicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generos` (
  `idGeneros` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idGeneros`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Clásica'),(9,'Electrónica'),(6,'Fusión'),(3,'Heavy-Metal'),(4,'Hip-Hop'),(5,'Latina'),(8,'New age'),(2,'Pop'),(7,'Rock');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisos` (
  `idPermisos` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`idPermisos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `idPosts` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` varchar(500) NOT NULL,
  `fecha` datetime NOT NULL,
  `post_img` varchar(500) DEFAULT NULL,
  `destinatario` varchar(45) DEFAULT NULL,
  `Usuarios_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idPosts`),
  KEY `fk_Posts_Usuarios1_idx` (`Usuarios_idUsuario`),
  CONSTRAINT `fk_Posts_Usuarios1` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'hola prueba','2014-06-03 00:00:00',NULL,NULL,6),(2,'hola prueba user 7','2014-06-03 19:17:40',NULL,NULL,7),(3,'hola prueba user 8','2014-06-03 19:20:30',NULL,NULL,8),(4,'hola prueba user 16','2014-06-03 19:34:35',NULL,NULL,16),(5,'hola prueba artista 4','2014-06-03 19:34:36',NULL,NULL,4),(6,'hola prueba artista 5','2014-06-03 19:34:37',NULL,NULL,5),(7,'hola prueba sala 9','2014-06-03 19:34:38',NULL,NULL,9),(8,'hola prueba sala 10','2014-06-03 19:34:39',NULL,NULL,10),(9,'hola prueba sala 11','2014-06-03 19:34:45',NULL,NULL,11),(26,'Fieston Zoologico este SABADO 7!!','2014-06-08 22:47:28','https://scontent-a-cdg.xx.fbcdn.net/hphotos-xpf1/t1.0-9/10308482_261596074028345_2161295853644790179_n.jpg',NULL,9),(27,'NUevo Sorteo en la sala Caracol!!! Ven a tu concierto favorito GRATIS!!!','2014-06-08 22:49:47','http://www.salacaracol.com/web/images/imagenes/noticias/sorteo%20entradas.jpg',NULL,11),(28,'HOLAAAA','2014-06-13 19:33:35',NULL,NULL,8),(30,'Soy anita dinamita','2014-06-16 00:20:05',NULL,NULL,8);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger `trata_posts_eliminados` before DELETE ON `posts`
for each row 
BEGIN
	INSERT INTO `posts_eliminados` SET
	`idPosts` 		  = OLD.idPosts,
	`contenido` 	  = OLD.contenido,
	`fecha` 		  = OLD.fecha,
	`post_img` 		  = OLD.post_img,
	`destinatario` 	  = OLD.destinatario,
	`idUsuario` 	  = OLD.Usuarios_idUsuario;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `posts_eliminados`
--

DROP TABLE IF EXISTS `posts_eliminados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_eliminados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPosts` int(11) NOT NULL,
  `contenido` varchar(500) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `post_img` varchar(500) DEFAULT NULL,
  `destinatario` varchar(45) DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha_eliminado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_eliminados`
--

LOCK TABLES `posts_eliminados` WRITE;
/*!40000 ALTER TABLE `posts_eliminados` DISABLE KEYS */;
INSERT INTO `posts_eliminados` VALUES (1,22,'undefined','2014-06-08 18:34:29','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKzJI0xD4xNGyvJTCiuyyaVYXy9re2AkR07xXhDav9G_82cJlu9armLJs',NULL,8,'2014-06-08 16:58:51'),(2,23,'undefined','2014-06-08 18:35:13','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKzJI0xD4xNGyvJTCiuyyaVYXy9re2AkR07xXhDav9G_82cJlu9armLJs',NULL,8,'2014-06-08 16:58:51'),(3,10,'asda','2014-06-08 16:15:07','null','null',8,'2014-06-08 16:58:51'),(4,19,'prrrruebaaa','2014-06-08 17:25:33','null','null',8,'2014-06-08 16:58:51'),(5,11,'asdapruebapruebaa','2014-06-08 16:18:10','null','null',8,'2014-06-08 19:13:36'),(6,12,'asda','2014-06-08 17:06:04','null','null',8,'2014-06-08 19:13:36'),(7,13,'asada','2014-06-08 17:12:42','null','null',8,'2014-06-08 19:13:36'),(8,14,'pruebababa','2014-06-08 17:19:44','null','null',8,'2014-06-08 19:13:36'),(9,15,'asdas','2014-06-08 17:20:22','null','null',8,'2014-06-08 19:13:36'),(10,16,'asda','2014-06-08 17:23:20','null','null',8,'2014-06-08 19:13:36'),(11,17,'asdaasda','2014-06-08 17:23:37','null','null',8,'2014-06-08 19:13:36'),(12,18,'asdasad','2014-06-08 17:24:18','null','null',8,'2014-06-08 19:13:36'),(13,20,'asdapruebabab','2014-06-08 17:32:47','null','null',8,'2014-06-08 19:13:36'),(14,25,'pruebaaaaaaaa','2014-06-08 21:10:04',NULL,'juanBasico',8,'2014-06-15 22:03:57'),(15,21,'pruebnulls','2014-06-08 17:33:35',NULL,NULL,8,'2014-06-15 22:04:56'),(16,24,'HOLAAAAAAAA','2014-06-08 19:42:34','http://www.ihpamplona.es/imagenes/prueba_nivel.jpg',NULL,8,'2014-06-15 22:19:51'),(17,29,'HOLAAAAAAA','2014-06-15 23:58:32',NULL,NULL,8,'2014-06-15 22:19:56');
/*!40000 ALTER TABLE `posts_eliminados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salas` (
  `aforo` int(11) NOT NULL,
  `poblacion` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `Usuarios_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`Usuarios_idUsuario`),
  KEY `fk_Salas_Usuarios_idx` (`Usuarios_idUsuario`),
  CONSTRAINT `fk_Salas_Usuarios` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (1000,'Madrid','C/ Princesa 1',9),(1800,'Madrid','C/ Virgen del Puerto, s/n',10),(600,'Madrid','C/ de Bernardino Obregón, 18',11);
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solicitudes` (
  `idSolicitante` int(11) NOT NULL,
  `idSolicitado` int(11) NOT NULL,
  PRIMARY KEY (`idSolicitante`,`idSolicitado`),
  KEY `idSolicitado_idx` (`idSolicitado`),
  CONSTRAINT `idsSolicitante` FOREIGN KEY (`idSolicitante`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idSolicitado` FOREIGN KEY (`idSolicitado`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
INSERT INTO `solicitudes` VALUES (6,7),(8,7),(16,7);
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superusuario`
--

DROP TABLE IF EXISTS `superusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `superusuario` (
  `idSuperUsuario` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idSuperUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superusuario`
--

LOCK TABLES `superusuario` WRITE;
/*!40000 ALTER TABLE `superusuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `superusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuarios`
--

DROP TABLE IF EXISTS `tipo_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_usuarios` (
  `idTipo_usuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipo_usuarios`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuarios`
--

LOCK TABLES `tipo_usuarios` WRITE;
/*!40000 ALTER TABLE `tipo_usuarios` DISABLE KEYS */;
INSERT INTO `tipo_usuarios` VALUES (2,'Artista'),(1,'Básico'),(3,'Sala');
/*!40000 ALTER TABLE `tipo_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_alta` date NOT NULL,
  `bloqueado` tinyint(1) NOT NULL DEFAULT '0',
  `profile_img` varchar(500) NOT NULL DEFAULT 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSF0pus3I09NGJ8VBG0_1Q8No9PYQ2ouoIFhXXN14gSLFIo_C0SPrRdTJYzeA',
  `header_img` varchar(500) NOT NULL DEFAULT 'http://utilizadosporcristo.com.ar/img/headerPrincipal.jpg',
  `Tipo_usuarios_idTipo_usuarios` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Usuarios_Tipo_usuarios1_idx` (`Tipo_usuarios_idTipo_usuarios`),
  CONSTRAINT `fk_Usuarios_Tipo_usuarios1` FOREIGN KEY (`Tipo_usuarios_idTipo_usuarios`) REFERENCES `tipo_usuarios` (`idTipo_usuarios`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'Ludwig','ludwig','ludwig@ludwig','2014-05-31',0,'','',2),(5,'Metallico','metallico','metallico@metallico','2014-05-31',0,'','',2),(6,'pedroBasico','pedroBasico','pedro@pedro','2014-05-31',0,'','',1),(7,'juanBasico','juanBasico','juan@juan','2014-05-31',0,'','',1),(8,'anaBasico','anaBasico','ana@ana','2014-05-31',0,'','',1),(9,'Marco Aldany','marcoaldany','marcoaldany@marcoaldany','2014-05-31',0,'http://www.viciousmagazine.com/viciousmusicawards/imagenes/nominados/marco_aldany_grande.jpg','http://www.viciousmagazine.com/viciousmusicawards/imagenes/nominados/marco_aldany_grande.jpg',3),(10,'La Riviera','lariviera','lariviera@lariviera','2014-05-31',0,'','',3),(11,'Sala Caracol','salacaracol','salacaracol@salacaracol','2014-05-31',0,'','',3),(16,'pepito','pepito','pepito@pepito','2014-06-02',0,'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png','http://utilizadosporcristo.com.ar/img/headerPrincipal.jpg',1),(17,'yoyoyoyo','yoyoyoyo','jha1986@gmail.com','2014-06-12',0,'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSF0pus3I09NGJ8VBG0_1Q8No9PYQ2ouoIFhXXN14gSLFIo_C0SPrRdTJYzeA','http://utilizadosporcristo.com.ar/img/headerPrincipal.jpg',1),(18,'Pedrito','pedrito','pedrito@pedrito','2014-06-13',0,'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSF0pus3I09NGJ8VBG0_1Q8No9PYQ2ouoIFhXXN14gSLFIo_C0SPrRdTJYzeA','http://utilizadosporcristo.com.ar/img/headerPrincipal.jpg',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger `trata_usuarios_eliminados` before DELETE ON `usuarios`
for each row 
BEGIN

	DECLARE fn date;
	DECLARE sx char(1);
	DECLARE gn varchar(45);
	DECLARE af integer;
	DECLARE pb varchar(45);
	DECLARE dr varchar(45);
	DECLARE id_nuevo integer;
	DECLARE tipo integer;

	INSERT INTO `usuarios_eliminados` SET
	`idUsuario`		= OLD.`idUsuario`,
	`nombre`		= OLD.`nombre`,
	`password`		= OLD.`password`,
	`email`			= OLD.`email`,
	`fecha_alta`	= OLD.`fecha_alta`,
	`bloqueado`		= OLD.`bloqueado`,
	`profile_img`	= OLD.`profile_img`,
	`header_img`	= OLD.`header_img`,
	`tipo_de_usuario`	= OLD.`Tipo_usuarios_idTipo_usuarios`,
	/* datos de tabla basicos por  defecto son null*/
	`fecha_nac`		= null,
	`sexo`			= null,
	/* datos de tabla artistas  defecto son null*/
	`genero`		= null,
	/* datos de tabla salas  defecto son null*/
	`aforo`			= null,
	`poblacion`		= null,
	`direccion`		= null;

	set tipo = OLD.`Tipo_usuarios_idTipo_usuarios`;
	select max(id) into id_nuevo from usuarios_eliminados;

	CASE tipo
		WHEN 1 THEN
			select `fecha_nac`, `sexo` into fn, sx FROM `basicos` WHERE `Usuarios_idUsuario` = OLD.`idUsuario`;
			update `usuarios_eliminados` set `fecha_nac` = fn, `sexo` = sx 
			WHERE `idUsuario` = OLD.`idUsuario` and `id` = id_nuevo;
		WHEN 2 THEN
			select `genero` into gn FROM `artistas` WHERE `Usuarios_idUsuario` = OLD.`idUsuario`;
			update `usuarios_eliminados` set `genero` = gn
			WHERE `idUsuario` = OLD.`idUsuario` and `id` = id_nuevo;
		WHEN 3 THEN
			select `aforo`, `poblacion`,`direccion` into af, pb, dr FROM `salas` WHERE `Usuarios_idUsuario` = OLD.`idUsuario`;
			update `usuarios_eliminados` set `aforo` = af, `poblacion` = pb, `direccion` = dr
			WHERE `idUsuario` = OLD.`idUsuario` and `id` = id_nuevo;
	END CASE;

    /* eliminamos los posts que contengan el id del usuario eliminado */
	DELETE FROM `posts` where `Usuarios_idUsuario` = OLD.`idUsuario`;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usuarios_eliminados`
--

DROP TABLE IF EXISTS `usuarios_eliminados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios_eliminados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_alta` date DEFAULT NULL,
  `bloqueado` bit(1) DEFAULT NULL,
  `profile_img` varchar(500) DEFAULT NULL,
  `header_img` varchar(500) DEFAULT NULL,
  `tipo_de_usuario` varchar(500) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `aforo` int(11) DEFAULT NULL,
  `poblacion` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_eliminados`
--

LOCK TABLES `usuarios_eliminados` WRITE;
/*!40000 ALTER TABLE `usuarios_eliminados` DISABLE KEYS */;
INSERT INTO `usuarios_eliminados` VALUES (1,13,'mauricio','mauricio','mairicio@mau.com','2014-06-02','\0','','','1','2014-06-12','H',NULL,NULL,NULL,NULL),(2,14,'mauricio2','mauricio2','mairicio2@mau.com','2014-06-02','\0','','','2',NULL,NULL,'1',NULL,NULL,NULL),(3,15,'mauricio3','mauricio3','mairicio3@mau.com','2014-06-02','\0','','','3',NULL,NULL,NULL,21,'Madrid','calle alcala, nº 14, 2028 de Madrid'),(4,23,'pepito2','pepito2','pepito2@pepito2','2014-06-02','\0','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSF0pus3I09NGJ8VBG0_1Q8No9PYQ2ouoIFhXXN14gSLFIo_C0SPrRdTJYzeA','http://utilizadosporcristo.com.ar/img/headerPrincipal.jpg','1','2014-07-01','H',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuarios_eliminados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_has_usuarios`
--

DROP TABLE IF EXISTS `usuarios_has_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios_has_usuarios` (
  `Usuarios_idUsuario` int(11) NOT NULL,
  `Usuarios_idUsuario1` int(11) NOT NULL,
  PRIMARY KEY (`Usuarios_idUsuario`,`Usuarios_idUsuario1`),
  KEY `fk_Usuarios_has_Usuarios_Usuarios2_idx` (`Usuarios_idUsuario1`),
  KEY `fk_Usuarios_has_Usuarios_Usuarios1_idx` (`Usuarios_idUsuario`),
  CONSTRAINT `fk_Usuarios_has_Usuarios_Usuarios1` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuarios_has_Usuarios_Usuarios2` FOREIGN KEY (`Usuarios_idUsuario1`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_has_usuarios`
--

LOCK TABLES `usuarios_has_usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios_has_usuarios` DISABLE KEYS */;
INSERT INTO `usuarios_has_usuarios` VALUES (5,4),(6,4),(7,4),(8,4),(16,4),(4,5),(6,5),(7,5),(8,5),(16,5),(8,6),(16,6),(4,7),(6,7),(8,7),(16,7),(6,8),(16,8),(17,8),(6,9),(7,9),(8,9),(10,9),(11,9),(16,9),(6,10),(7,10),(8,10),(9,10),(11,10),(16,10),(6,11),(7,11),(8,11),(9,11),(10,11),(16,11),(6,16),(8,16),(8,17);
/*!40000 ALTER TABLE `usuarios_has_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `amigos_de`
--

/*!50001 DROP TABLE IF EXISTS `amigos_de`*/;
/*!50001 DROP VIEW IF EXISTS `amigos_de`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `amigos_de` AS select `t1`.`Usuarios_idUsuario` AS `usuarioLogeado`,`t2`.`idUsuario` AS `idUsuario`,`t2`.`nombre` AS `nombre`,`t2`.`email` AS `email`,`t2`.`fecha_alta` AS `fecha_alta`,`t2`.`Tipo_usuarios_idTipo_usuarios` AS `Tipo_usuarios_idTipo_usuarios` from (`usuarios_has_usuarios` `t1` join `usuarios` `t2`) where (`t2`.`idUsuario` = `t1`.`Usuarios_idUsuario1`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-16  2:55:21
