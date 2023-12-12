-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dev_db
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid(),1)),
  `first_name` varchar(60) DEFAULT NULL,
  `middle_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (_binary '�O%\�\�\�^\��','David','Van','Basten','daniel.basten@hotmail.com','$2b$12$63ihBI9rgq4AwrPBvhlEVelruReGUdKtthp/YEpsQmIOEKM2HocZq');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ballots`
--

DROP TABLE IF EXISTS `ballots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ballots` (
  `ballot_id` varchar(60) NOT NULL,
  `race_id` varchar(60) DEFAULT NULL,
  `precinct_id` varchar(60) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ballot_id`),
  UNIQUE KEY `ballot_id_UNIQUE` (`ballot_id`),
  KEY `race_id` (`race_id`),
  KEY `precinct_id` (`precinct_id`),
  CONSTRAINT `ballots_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `races` (`race_id`),
  CONSTRAINT `ballots_ibfk_2` FOREIGN KEY (`precinct_id`) REFERENCES `precincts` (`precinct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ballots`
--

LOCK TABLES `ballots` WRITE;
/*!40000 ALTER TABLE `ballots` DISABLE KEYS */;
INSERT INTO `ballots` VALUES ('IA-HOUSE-NY-8408','IA-HOUSE-IA-CON-9-4480','NY-8408','inactive'),('US-PRESIDENT-NY-2355','US-PRESIDENT-US-PRED-3206','NY-2355','inactive'),('US-PRESIDENT-NY-8408','US-PRESIDENT-US-PRED-3206','NY-8408','inactive'),('US-SENATE-NY-2355','US-SENATE-IA-SN-1-9379','NY-2355','inactive'),('US-SENATE-NY-8408','US-SENATE-IA-SN-1-9379','NY-8408','inactive');
/*!40000 ALTER TABLE `ballots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `body_types`
--

DROP TABLE IF EXISTS `body_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `body_types` (
  `type` varchar(60) NOT NULL,
  `number_officials` int DEFAULT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `body_types`
--

LOCK TABLES `body_types` WRITE;
/*!40000 ALTER TABLE `body_types` DISABLE KEYS */;
INSERT INTO `body_types` VALUES ('CORALVILLE-COUNCIL',5),('CORALVILLE-MAYOR',1),('IA-HOUSE',100),('IA-SENATE',50),('US-HOUSE',435),('US-PRESIDENT',1),('US-SENATE',100);
/*!40000 ALTER TABLE `body_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `candidate_id` varchar(60) NOT NULL,
  `first_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `geography_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`candidate_id`),
  UNIQUE KEY `candidate_id_UNIQUE` (`candidate_id`),
  KEY `geography_id` (`geography_id`),
  CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`geography_id`) REFERENCES `geography` (`geography_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES ('New York City-NY-2263','Yolo','Ruttle','1982-12-08','New York City-Queens-NY'),('New York City-NY-3964','Richard','Rachel','1982-11-26','New York City-Brooklyn-NY'),('New York City-NY-9793','David','Wilson','1968-11-13','New York City-Brooklyn-NY');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `district_id` varchar(60) NOT NULL,
  `title` varchar(60) DEFAULT NULL,
  `head_official` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`district_id`),
  UNIQUE KEY `district_id_UNIQUE` (`district_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES ('IA-1','Iowa District 1','Nicolas Thompson'),('IA-CON-9','Iowa Congressional District 9','N/A'),('IA-SN-1','Iowa Senate District 1','N/A'),('IA-SN-2','Iowa Senate District 2','N/A'),('MN-1','Minnesota District 1','N/A'),('NY-1','New York District 1','N/A'),('US-PRED','United State President','N/A');
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elections`
--

DROP TABLE IF EXISTS `elections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elections` (
  `election_id` varchar(60) NOT NULL,
  `title` text,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`election_id`),
  UNIQUE KEY `election_id_UNIQUE` (`election_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elections`
--

LOCK TABLES `elections` WRITE;
/*!40000 ALTER TABLE `elections` DISABLE KEYS */;
INSERT INTO `elections` VALUES ('IA-2024','Iowa Government of 2024','2023-12-30 06:00:00','2023-12-30 23:00:00','inactive'),('US-2024','United State Presidential Election of 2024','2024-11-03 06:00:00','2024-11-03 23:00:00','inactive');
/*!40000 ALTER TABLE `elections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geography`
--

DROP TABLE IF EXISTS `geography`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `geography` (
  `geography_id` varchar(60) NOT NULL,
  `zip` varchar(60) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `county` varchar(60) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`geography_id`),
  UNIQUE KEY `zip_UNIQUE` (`zip`),
  KEY `zip` (`zip`,`city`),
  CONSTRAINT `geography_ibfk_1` FOREIGN KEY (`zip`, `city`) REFERENCES `zips` (`zip_code`, `city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography`
--

LOCK TABLES `geography` WRITE;
/*!40000 ALTER TABLE `geography` DISABLE KEYS */;
INSERT INTO `geography` VALUES ('New York City-Brooklyn-NY','23421-1172','New York City','Brooklyn','NY'),('New York City-Kings-NY','76253-1821','New York City','Kings','NY'),('New York City-Queens-NY','98927-6793','New York City','Queens','NY');
/*!40000 ALTER TABLE `geography` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid(),1)),
  `first_name` varchar(60) DEFAULT NULL,
  `middle_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text,
  `admin_id` binary(16) DEFAULT NULL,
  `approval_status` enum('pending','approved','declined') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `managers_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
INSERT INTO `managers` VALUES (_binary '\�\�m�ݤ\�\�^\��','Nicolas','Van','Thompson','nicolas.thompson@gmail.com','$2b$12$gf6Oydg2EGG4BICXvxU7F.bMQnRN9R386UsptY8Uu6qWTm8IjQE8q',_binary '�O%\�\�\�^\��','pending'),(_binary '\�\�H9�4�\�\�^\��','Wiliam','Burg','Nasvada','william.nasvada@yahoo.com','$2b$12$nrq5wY8v1aaa1/6vinwCBe6WmM/8f631Zmj./mkxgiey5.JzcYWZC',_binary '�O%\�\�\�^\��','pending'),(_binary '\�a�ƪw�\�\�^\��','Warsel','Laymen','Conn','warsel.conn@gmail.com','$2b$12$3xoQV67OsMUjs0D4CHbjWOXLA4DdTBN5cWO6iFOaxTi1bTQyeNApm',_binary '�O%\�\�\�^\��','pending');
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officials`
--

DROP TABLE IF EXISTS `officials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officials` (
  `official_id` varchar(60) NOT NULL,
  `race_id` varchar(60) DEFAULT NULL,
  `candidate_id` varchar(60) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`official_id`),
  UNIQUE KEY `official_id_UNIQUE` (`official_id`),
  KEY `race_id` (`race_id`),
  KEY `candidate_id` (`candidate_id`),
  CONSTRAINT `officials_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `races` (`race_id`),
  CONSTRAINT `officials_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`candidate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officials`
--

LOCK TABLES `officials` WRITE;
/*!40000 ALTER TABLE `officials` DISABLE KEYS */;
INSERT INTO `officials` VALUES ('RACHEL-US-SENATE-IA-SN-1-9379','US-SENATE-IA-SN-1-9379','New York City-NY-3964','running'),('RUTTLE-US-PRESIDENT-US-PRED-3206','US-PRESIDENT-US-PRED-3206','New York City-NY-2263','running'),('RUTTLE-US-SENATE-IA-SN-1-9379','US-SENATE-IA-SN-1-9379','New York City-NY-2263','running'),('WILSON-US-PRESIDENT-US-PRED-3206','US-PRESIDENT-US-PRED-3206','New York City-NY-9793','running');
/*!40000 ALTER TABLE `officials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precincts`
--

DROP TABLE IF EXISTS `precincts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precincts` (
  `precinct_id` varchar(60) NOT NULL,
  `manager_id` binary(16) DEFAULT NULL,
  `address` text,
  `geography_id` varchar(60) DEFAULT NULL,
  `district_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`precinct_id`),
  UNIQUE KEY `manager_id_UNIQUE` (`manager_id`),
  KEY `geography_id` (`geography_id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `precincts_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`),
  CONSTRAINT `precincts_ibfk_2` FOREIGN KEY (`geography_id`) REFERENCES `geography` (`geography_id`),
  CONSTRAINT `precincts_ibfk_3` FOREIGN KEY (`district_id`) REFERENCES `districts` (`district_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precincts`
--

LOCK TABLES `precincts` WRITE;
/*!40000 ALTER TABLE `precincts` DISABLE KEYS */;
INSERT INTO `precincts` VALUES ('NY-2355',_binary '\�\�H9�4�\�\�^\��','243 Covered, Minneapolis, MN 55401','New York City-Brooklyn-NY','MN-1'),('NY-5573',_binary '\�\�m�ݤ\�\�^\��','3434 Covered, Minneapolis, MN 55401','New York City-Queens-NY','MN-1'),('NY-8408',_binary '\�a�ƪw�\�\�^\��','9773 Bayton Street, New York City, NY 32762','New York City-Kings-NY','NY-1');
/*!40000 ALTER TABLE `precincts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `races`
--

DROP TABLE IF EXISTS `races`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `races` (
  `race_id` varchar(60) NOT NULL,
  `body_type` varchar(60) DEFAULT NULL,
  `title` text,
  `term` varchar(60) DEFAULT NULL,
  `number_candidates` int DEFAULT NULL,
  `district_id` varchar(60) DEFAULT NULL,
  `election_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`race_id`),
  UNIQUE KEY `race_id_UNIQUE` (`race_id`),
  KEY `body_type` (`body_type`),
  KEY `district_id` (`district_id`),
  KEY `election_id` (`election_id`),
  CONSTRAINT `races_ibfk_1` FOREIGN KEY (`body_type`) REFERENCES `body_types` (`type`),
  CONSTRAINT `races_ibfk_2` FOREIGN KEY (`district_id`) REFERENCES `districts` (`district_id`),
  CONSTRAINT `races_ibfk_3` FOREIGN KEY (`election_id`) REFERENCES `elections` (`election_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `races`
--

LOCK TABLES `races` WRITE;
/*!40000 ALTER TABLE `races` DISABLE KEYS */;
INSERT INTO `races` VALUES ('IA-HOUSE-IA-CON-9-4480','IA-HOUSE','Iowa House of Representatives','2024-2028',0,'IA-CON-9','IA-2024'),('US-PRESIDENT-US-PRED-3206','US-PRESIDENT','US President','2024-2028',2,'US-PRED','US-2024'),('US-SENATE-IA-SN-1-9379','US-SENATE','US Senate, Iowa Senate District 2','2024-2028',2,'IA-SN-1','US-2024');
/*!40000 ALTER TABLE `races` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voters`
--

DROP TABLE IF EXISTS `voters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voters` (
  `id` binary(16) DEFAULT (uuid_to_bin(uuid(),1)),
  `first_name` varchar(60) DEFAULT NULL,
  `middle_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `street_address` text,
  `email` varchar(255) DEFAULT NULL,
  `password` text,
  `dob` date DEFAULT NULL,
  `drivers_license` text,
  `approval_status` enum('pending','approved','declined') DEFAULT 'pending',
  `question_index` int DEFAULT NULL,
  `question_answer` text,
  `passport` text,
  `zip_code` varchar(10) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `zip_code` (`zip_code`,`city`),
  CONSTRAINT `voters_ibfk_1` FOREIGN KEY (`zip_code`, `city`) REFERENCES `zips` (`zip_code`, `city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voters`
--

LOCK TABLES `voters` WRITE;
/*!40000 ALTER TABLE `voters` DISABLE KEYS */;
INSERT INTO `voters` VALUES (_binary '\�an\"��q\�^\��','Daniel','Van','Basten','3423 York Street','daniel.basten@yahoo.com','$2b$12$ARll1q.V9yN5V9tIoEEoZeP8CSr/1H5W4ohj1Q0CvtkCZPIz56uFC','2004-02-14','f32r3tr2w','pending',1,'Van','5f43r23r','23421-1172','New York City'),(_binary '\�dc�傛\�\�^\��','Daniel','Van','Basten','1234 York Street','daniel.basten@uiowa.edu','$2b$12$uBzgEmMPhagRCBUzSedj3OKIXF27RZRGBtqmO76cf5jrPSTlG5U0G','2000-03-04','232dq3r3','pending',0,'New York City','fwse234d','98927-6793','New York City'),(_binary '\�e{]C_�\�\�^\��','William','Van','Thompson','1234 Havana Street','william.thompson@gmail.com','$2b$12$85T6myZ8V/Xr7r0WQ5itR.WT9FXb2WnLCavEylfn9YWd7HVPcVXBW','1999-08-14','f3rqrsd','pending',1,'Van','432dew3','76253-1821','New York City');
/*!40000 ALTER TABLE `voters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zips`
--

DROP TABLE IF EXISTS `zips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zips` (
  `zip_code` varchar(10) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`zip_code`,`city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zips`
--

LOCK TABLES `zips` WRITE;
/*!40000 ALTER TABLE `zips` DISABLE KEYS */;
INSERT INTO `zips` VALUES ('23421-1172','New York City','NY'),('76253-1821','New York City','NY'),('98927-6793','New York City','NY');
/*!40000 ALTER TABLE `zips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dev_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `check_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_admin`(in input_id text, in input_email text)
BEGIN
	declare admin_select int;
	select COUNT(*) into admin_select from admins where email = input_email and id = UUID_TO_BIN(input_id);
    if admin_select = 1 then
		SELECT 
			BIN_TO_UUID(id) as id,
            first_name,
            middle_name,
            last_name,
            email,
            password
        from 
			admins 
        where 
			email = input_email and id = UUID_TO_BIN(input_id);
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_ballot` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_ballot`(in input_ballot_id varchar(60))
BEGIN
	declare ballot_select int;
    
    select COUNT(*) into ballot_select from ballots where ballot_id = input_ballot_id;
	
    if ballot_select = 1 then
		SELECT * from ballots where ballot_id = input_ballot_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_district` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_district`(in input_district_id varchar(60))
BEGIN
	declare district_select int;
    
    select COUNT(*) into district_select from districts where district_id = input_district_id;
	
    if district_select = 1 then
		SELECT * from districts where district_id = input_district_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_manager` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_manager`(in input_id text, in input_email text)
BEGIN
	declare manager_select int;
	select COUNT(*) into manager_select from managers where email = input_email and id = UUID_TO_BIN(input_id);
    if manager_select = 1 then
		SELECT 
			BIN_TO_UUID(id) as id,
            first_name,
            middle_name,
            last_name,
            email,
            password,
            admin_id
        from 
			managers
        where 
			email = input_email and id = UUID_TO_BIN(input_id);
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_official` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_official`(in input_official_id varchar(60))
BEGIN
	declare official_select int;
    
    select COUNT(*) into official_select from officials where official_id = input_official_id;
	
    if official_select = 1 then
		SELECT * from officials where official_id = input_official_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_precinct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_precinct`(in input_precinct_id varchar(60))
BEGIN
	declare precinct_select int;
    
    select COUNT(*) into precinct_select from precincts where precinct_id = input_precinct_id;
	
    if precicnt_select = 1 then
		SELECT * from precincts where precinct_id = input_precinct_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_race` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_race`(in input_race_id varchar(60))
BEGIN
	declare race_select int;
    
    select COUNT(*) into race_select from races where race_id = input_race_id;
	
    if race_select = 1 then
		SELECT * from races where race_id = input_race_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_voter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_voter`(in input_email varchar(255))
begin
	declare voter_select int;
    
    select COUNT(*) into voter_select from voters where email = input_email;
	
    if voter_select = 1 then
		SELECT * from voters where email = input_email;
	end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_voter_with_join` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_voter_with_join`(in input_email varchar(255),IN base_table_name varchar(255), IN target_table_name varchar(255), IN selection text, IN join_clause text)
BEGIN
	declare voter_select int;
    SET @email = input_email;
    select COUNT(*) into voter_select from voters where email = input_email;
    if voter_select = 1 then
		SET @select_all_from_table_with_join_sql = CONCAT('SELECT * FROM (','SELECT ', selection,' FROM ', base_table_name, ' b ', 'INNER JOIN ', target_table_name, ' t', ' ON ', join_clause, ')', " T where T.email = '", @email, "';");
		PREPARE select_all_from_table_with_join_stmt FROM @select_all_from_table_with_join_sql;
		EXECUTE select_all_from_table_with_join_stmt;
		DEALLOCATE PREPARE select_all_from_table_with_join_stmt;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_admin`(in input_first_name varchar(60), in input_middle_name varchar(60), in input_last_name varchar(60), in input_email text, in input_password text)
begin 
	insert into admins(first_name, middle_name, last_name, email, password) values (input_first_name, input_middle_name, input_last_name, input_email, input_password);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_ballot` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_ballot`(in input_ballot_id varchar(60), in input_race_id varchar(60), in input_precinct_id varchar(60), in input_status varchar(25))
BEGIN
	INSERT INTO ballots(ballot_id, race_id, precinct_id, status) values (input_ballot_id, input_race_id, input_precinct_id, input_status);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_body_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_body_type`(in input_type varchar(60), in input_number_officials int)
BEGIN
	INSERT INTO body_types(type, number_officials) values (input_type, input_number_officials);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_candidate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_candidate`(in input_candidate_id varchar(60), in input_first_name varchar(60), in input_last_name varchar(60), in input_dob date, in input_geography_id varchar(60))
BEGIN
	INSERT INTO candidates(candidate_id, first_name, last_name, dob, geography_id) values (input_candidate_id, input_first_name, input_last_name, input_dob, input_geography_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_district` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_district`(in input_district_id varchar(60), in input_title text, in input_official text)
BEGIN
	INSERT INTO districts(district_id, title, head_official) values (input_district_id, input_title, input_official);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_election` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_election`(in input_election_id varchar(60), in input_title text, in input_start_time datetime, in input_end_time datetime, in input_status varchar(25))
BEGIN
	INSERT INTO elections(election_id, title, start_time, end_time, status) values (input_election_id, input_title, input_start_time, input_end_time, input_status);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_geography` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_geography`(in input_geography_id varchar(60), in input_zipcode varchar(10), in input_city varchar(60), in input_county varchar(60), in input_state varchar(2))
BEGIN
	INSERT INTO geography(geography_id, zip, city, county, state) values (input_geography_id, input_zipcode, input_city, input_county, input_state);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_manager` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_manager`(in input_first_name varchar(60), in input_middle_name varchar(60), in input_last_name varchar(60), in input_email varchar(255), in input_password text, in input_admin_id binary(16))
BEGIN
	insert into managers(first_name, middle_name, last_name, email, password, admin_id) values (input_first_name, input_middle_name, input_last_name, input_email, input_password, input_admin_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_official` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_official`(in input_official_id varchar(60), in input_race_id varchar(60), in input_candidate_id varchar(60), in input_status varchar(25))
BEGIN
	INSERT INTO officials(official_id, race_id, candidate_id, status) values (input_official_id, input_race_id, input_candidate_id, input_status);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_precinct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_precinct`(in input_precinct_id varchar(60), in input_manager_id binary(16), in input_address text, in input_district varchar(60), in input_geography_id varchar(60))
BEGIN
	INSERT INTO precincts(precinct_id, manager_id, address, geography_id, district_id) values (input_precinct_id, input_manager_id, input_address, input_geography_id, input_district);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_race` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_race`(in input_race_id varchar(60), in input_type varchar(60), in input_title text, in input_term varchar(60), in input_number_candidates int, in input_district_id varchar(60), in input_election_id varchar(60))
BEGIN
	INSERT INTO races(race_id, body_type, title, term, number_candidates, district_id, election_id) values (input_race_id, input_type, input_title, input_term, input_number_candidates, input_district_id, input_election_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_voter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_voter`(in input_first_name varchar(60), in input_middle_name varchar(60), in input_last_name varchar(60), in input_street_address text, in input_zip_code varchar(10), in input_city varchar(255), in input_state varchar(2),  in input_email varchar(255), in input_password text, in input_dob date, in input_drivers_license text,  in input_question_index int, in input_question_answer text, in input_passport text)
begin
	call create_zip(input_zip_code, input_city, input_state);
	insert into voters(first_name, middle_name, last_name, street_address, email, password, dob, drivers_license, question_index, question_answer, passport, zip_code, city)  values (input_first_name, input_middle_name, input_last_name, input_street_address, input_email, input_password, input_dob, input_drivers_license, input_question_index, input_question_answer, input_passport, input_zip_code, input_city);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_zip` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_zip`(in input_zip varchar(10), in input_city varchar(255), in input_state varchar(2))
begin
	insert ignore into zips (zip_code, city, state) values (input_zip, input_city, input_state);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_from_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_from_table`(
 IN table_name VARCHAR(255),
 IN where_clause TEXT
)
BEGIN
    SET @delete_from_table_sql = CONCAT('DELETE FROM ', table_name, ' WHERE ', where_clause,';');
    PREPARE delete_from_table_with_where_stmt FROM @delete_from_table_sql;
    EXECUTE delete_from_table_with_where_stmt;
    DEALLOCATE PREPARE delete_from_table_with_where_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_admin_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_admin_id`(in input_email text)
BEGIN
	select
		BIN_TO_UUID(id) id
	from 
		admins
    where
		email = input_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_manager_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_manager_id`(in input_email text)
BEGIN
	select
		BIN_TO_UUID(id) id
	from 
		managers
    where
		email = input_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_table`(
    IN table_name VARCHAR(255),
    IN insert_proto TEXT,
    IN insert_values TEXT
)
BEGIN
    SET @insert_values_sql = CONCAT('INSERT INTO ', table_name, ' ', insert_proto ,' VALUES ', insert_values, ';');
    PREPARE insert_values_stmt FROM @insert_values_sql;
    EXECUTE insert_values_stmt;
    DEALLOCATE PREPARE insert_values_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_all_from_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_all_from_table`(
 IN table_name VARCHAR(255)
)
BEGIN
    SET @select_all_from_table_sql = CONCAT('SELECT * FROM ', table_name, ';');
    PREPARE select_all_from_table_stmt FROM @select_all_from_table_sql;
    EXECUTE select_all_from_table_stmt;
    DEALLOCATE PREPARE select_all_from_table_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_all_from_table_with_join` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_all_from_table_with_join`(IN base_table_name varchar(255), IN target_table_name varchar(255), IN join_clause text)
BEGIN
	SET @select_all_from_table_with_join_sql = CONCAT('SELECT * FROM ', base_table_name, ' b ', 'INNER JOIN ', target_table_name, ' t', ' ON ', join_clause, ';');
    PREPARE select_all_from_table_with_join_stmt FROM @select_all_from_table_with_join_sql;
    EXECUTE select_all_from_table_with_join_stmt;
    DEALLOCATE PREPARE select_all_from_table_with_join_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_all_from_table_with_where` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_all_from_table_with_where`(
 IN table_name VARCHAR(255),
 IN where_clause TEXT
)
BEGIN
    SET @select_all_from_table_with_where_sql = CONCAT('SELECT * FROM ', table_name, ' WHERE ', where_clause,';');
    PREPARE select_all_from_table_with_where_stmt FROM @select_all_from_table_with_where_sql;
    EXECUTE select_all_from_table_with_where_stmt;
    DEALLOCATE PREPARE select_all_from_table_with_where_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_precinct_for_voter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_precinct_for_voter`(IN selection text, IN where_clause text)
BEGIN
	SET @select_all_from_table_with_join_sql = CONCAT('SELECT ', selection, ' FROM voters v INNER JOIN geography g ON v.zip_code = g.zip INNER JOIN precincts p ON g.geography_id = p.geography_id WHERE ', where_clause, ';');
    PREPARE select_all_from_table_with_join_stmt FROM @select_all_from_table_with_join_sql;
    EXECUTE select_all_from_table_with_join_stmt;
    DEALLOCATE PREPARE select_all_from_table_with_join_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_some_from_table_with_join` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_some_from_table_with_join`(IN base_table_name varchar(255), IN target_table_name varchar(255), IN selection text, IN join_clause text)
BEGIN
	SET @select_all_from_table_with_join_sql = CONCAT('SELECT ', selection,' FROM ', base_table_name, ' b ', 'INNER JOIN ', target_table_name, ' t', ' ON ', join_clause, ';');
    PREPARE select_all_from_table_with_join_stmt FROM @select_all_from_table_with_join_sql;
    EXECUTE select_all_from_table_with_join_stmt;
    DEALLOCATE PREPARE select_all_from_table_with_join_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_some_from_table_with_join_where` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_some_from_table_with_join_where`(IN base_table_name varchar(255), IN target_table_name varchar(255), IN selection text, IN join_clause text, IN where_clause text)
BEGIN
	SET @select_all_from_table_with_join_sql = CONCAT('SELECT * FROM (', 'SELECT ', selection,' FROM ', base_table_name, ' b ', 'INNER JOIN ', target_table_name, ' t', ' ON ', join_clause, ')', " T WHERE ", where_clause, ";");
    PREPARE select_all_from_table_with_join_stmt FROM @select_all_from_table_with_join_sql;
    EXECUTE select_all_from_table_with_join_stmt;
    DEALLOCATE PREPARE select_all_from_table_with_join_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_status_election_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_status_election_table`(in input_status varchar(25), in input_election_id varchar(60))
BEGIN
	UPDATE elections SET status = input_status WHERE election_id = input_election_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_table`(
 IN table_name VARCHAR(255),
 IN set_clause text,
 IN where_clause TEXT
)
BEGIN
    SET @update_table_sql = CONCAT('UPDATE ', table_name,' SET ',set_clause,' WHERE ', where_clause,';');
    PREPARE update_table_stmt FROM @update_table_sql;
    EXECUTE update_table_stmt;
    DEALLOCATE PREPARE update_table_stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;