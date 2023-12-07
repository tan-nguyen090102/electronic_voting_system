-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test_db
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
/*!40000 ALTER TABLE `zips` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 22:49:50
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
INSERT INTO `admins` VALUES (_binary 'ÓêπÑO%\Ó§\Õ\ÿ^\”ì','David','Van','Basten','daniel.basten@hotmail.com','$2b$12$63ihBI9rgq4AwrPBvhlEVelruReGUdKtthp/YEpsQmIOEKM2HocZq');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
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
INSERT INTO `districts` VALUES ('IA-1','Iowa District 1','Nicolas Thompson'),('IA-SN-1','Iowa Senate District 1','N/A'),('IA-SN-2','Iowa Senate District 2','N/A'),('MN-1','Minnesota District 1','N/A'),('NY-1','New York District 1','N/A'),('US-PRED','United State President','N/A');
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
INSERT INTO `elections` VALUES ('US-2024','United State Presidential Election of 2024','2024-11-03 06:00:00','2024-11-03 23:00:00','inactive');
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
INSERT INTO `managers` VALUES (_binary '\Óê\¬m˚›§\Õ\ÿ^\”ì','Nicolas','Van','Thompson','nicolas.thompson@gmail.com','$2b$12$gf6Oydg2EGG4BICXvxU7F.bMQnRN9R386UsptY8Uu6qWTm8IjQE8q',_binary 'ÓêπÑO%\Ó§\Õ\ÿ^\”ì','pending'),(_binary '\Óê\ŸH9Ø4§\Õ\ÿ^\”ì','Wiliam','Burg','Nasvada','william.nasvada@yahoo.com','$2b$12$nrq5wY8v1aaa1/6vinwCBe6WmM/8f631Zmj./mkxgiey5.JzcYWZC',_binary 'ÓêπÑO%\Ó§\Õ\ÿ^\”ì','pending');
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
INSERT INTO `officials` VALUES ('RUTTLE-US-PRESIDENT-US-PRED-3206','US-PRESIDENT-US-PRED-3206','New York City-NY-2263','running'),('WILSON-US-PRESIDENT-US-PRED-3206','US-PRESIDENT-US-PRED-3206','New York City-NY-9793','running');
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
INSERT INTO `precincts` VALUES ('NY-2355',_binary '\Óê\ŸH9Ø4§\Õ\ÿ^\”ì','243 Covered, Minneapolis, MN 55401','New York City-Brooklyn-NY','MN-1'),('NY-5573',_binary '\Óê\¬m˚›§\Õ\ÿ^\”ì','3434 Covered, Minneapolis, MN 55401','New York City-Queens-NY','MN-1');
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
INSERT INTO `races` VALUES ('US-PRESIDENT-US-PRED-3206','US-PRESIDENT','US President','2024-2028',2,'US-PRED','US-2024');
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
INSERT INTO `voters` VALUES (_binary '\ÓÉan\"≥©q\ÿ^\”ì','Daniel','Van','Basten','3423 York Street','daniel.basten@yahoo.com','$2b$12$ARll1q.V9yN5V9tIoEEoZeP8CSr/1H5W4ohj1Q0CvtkCZPIz56uFC','2004-02-14','f32r3tr2w','pending',1,'Van','5f43r23r','23421-1172','New York City'),(_binary '\ÓÜdc¿ÂÇõ\Ï\ÿ^\”ì','Daniel','Van','Basten','1234 York Street','daniel.basten@uiowa.edu','$2b$12$uBzgEmMPhagRCBUzSedj3OKIXF27RZRGBtqmO76cf5jrPSTlG5U0G','2000-03-04','232dq3r3','pending',0,'New York City','fwse234d','98927-6793','New York City'),(_binary '\ÓÜe{]C_õ\Ï\ÿ^\”ì','William','Van','Thompson','1234 Havana Street','william.thompson@gmail.com','$2b$12$85T6myZ8V/Xr7r0WQ5itR.WT9FXb2WnLCavEylfn9YWd7HVPcVXBW','1999-08-14','f3rqrsd','pending',1,'Van','432dew3','76253-1821','New York City');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 22:49:50
