CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: mydb
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
INSERT INTO `basicos` VALUES ('1989-02-15','H',6),('1984-05-07','H',7),('1989-01-02','M',8);
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
  `idPosts` int(11) NOT NULL,
  `contenido` varchar(500) DEFAULT NULL,
  `fec ha` date NOT NULL,
  `Usuarios_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idPosts`),
  KEY `fk_Posts_Usuarios1_idx` (`Usuarios_idUsuario`),
  CONSTRAINT `fk_Posts_Usuarios1` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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
  `bloqueado` bit(1) NOT NULL DEFAULT b'0',
  `Tipo_usuarios_idTipo_usuarios` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Usuarios_Tipo_usuarios1_idx` (`Tipo_usuarios_idTipo_usuarios`),
  CONSTRAINT `fk_Usuarios_Tipo_usuarios1` FOREIGN KEY (`Tipo_usuarios_idTipo_usuarios`) REFERENCES `tipo_usuarios` (`idTipo_usuarios`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'Ludwig','ludwig','ludwig@ludwig','2014-05-31','\0',2),(5,'Metallico','metallico','metallico@metallico','2014-05-31','\0',2),(6,'pedroBasico','pedroBasico','pedro@pedro','2014-05-31','\0',1),(7,'juanBasico','juanBasico','juan@juan','2014-05-31','\0',1),(8,'anaBasico','anaBasico','ana@ana','2014-05-31','\0',1),(9,'Marco Aldany','marcoaldany','marcoaldany@marcoaldany','2014-05-31','\0',3),(10,'La Riviera','lariviera','lariviera@lariviera','2014-05-31','\0',3),(11,'Sala Caracol','salacaracol','salacaracol@salacaracol','2014-05-31','\0',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `usuarios_has_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-31 15:59:31
