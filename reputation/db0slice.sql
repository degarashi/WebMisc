-- MySQL dump 10.13  Distrib 5.1.61, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: db0slice
-- ------------------------------------------------------
-- Server version	5.1.61-0ubuntu0.11.10.1

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
-- Table structure for table `ac_counter`
--

DROP TABLE IF EXISTS `ac_counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ac_counter` (
  `ip` char(16) NOT NULL,
  `host` varchar(256) NOT NULL DEFAULT 'unknown',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language` char(16) NOT NULL,
  `refer` varchar(256) NOT NULL DEFAULT 'unknown'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ac_counter`
--

LOCK TABLES `ac_counter` WRITE;
/*!40000 ALTER TABLE `ac_counter` DISABLE KEYS */;
INSERT INTO `ac_counter` VALUES ('127.0.0.1','unknown','2012-02-21 08:18:04','ja','unknown'),('127.0.0.1','unknown','2012-02-21 08:18:15','ja','unknown'),('127.0.0.1','unknown','2012-02-21 08:26:40','ja','unknown'),('127.0.0.1','unknown','2012-02-21 10:20:18','ja','unknown'),('127.0.0.1','unknown','2012-02-21 10:20:20','ja','unknown'),('127.0.0.1','unknown','2012-02-21 10:22:13','ja','unknown'),('127.0.0.1','unknown','2012-02-21 10:22:19','ja','unknown'),('127.0.0.1','unknown','2012-02-21 10:22:38','ja','unknown'),('127.0.0.1','unknown','2012-02-21 10:27:00','ja','unknown'),('127.0.0.1','unknown','2012-02-22 19:17:47','ja','unknown'),('127.0.0.1','unknown','2012-02-22 19:18:09','ja','unknown'),('127.0.0.1','unknown','2012-02-22 19:29:44','ja','unknown'),('127.0.0.1','unknown','2012-02-22 19:29:56','ja','unknown'),('127.0.0.1','unknown','2012-02-22 19:30:09','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:33:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:35:22','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:35:37','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:35:42','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:36:19','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:36:41','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:36:52','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:37:15','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:37:23','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:37:47','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:40:15','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:40:43','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:41:11','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:41:23','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:41:30','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:41:44','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:41:56','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:42:06','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:42:10','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:42:33','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:42:43','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:42:50','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:42:59','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:43:06','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:43:22','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:43:27','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:43:39','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:43:59','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:44:11','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:44:22','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:44:36','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:45:15','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:45:37','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:45:45','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:45:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:46:55','ja','unknown'),('127.0.0.1','unknown','2012-02-23 06:54:10','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:00:20','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:00:53','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:04:42','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:04:52','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:05:01','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:05:14','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:05:34','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:05:40','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:06:24','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:12:40','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:25:37','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:25:54','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:38:30','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:38:51','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:39:13','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:40:26','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:40:37','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:40:56','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:42:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:43:09','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:43:13','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:43:17','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:43:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:43:34','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:00','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:08','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:13','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:21','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:35','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:39','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:47','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:44:54','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:45:04','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:51:10','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:51:16','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:51:37','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:51:46','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:52:22','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:52:50','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:53:21','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:53:44','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:53:58','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:54:05','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:54:09','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:54:16','ja','unknown'),('127.0.0.1','unknown','2012-02-23 07:54:28','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:00:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:01:22','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:02:53','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:03:05','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:03:21','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:03:39','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:04:00','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:04:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:11:44','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:11:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:12:10','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:12:17','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:12:23','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:12:51','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:13:11','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:13:15','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:13:19','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:13:24','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:13:32','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:19:38','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:19:42','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:20:07','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:20:53','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:23:38','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:23:40','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:24:02','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:25:06','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:25:14','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:25:20','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:27:52','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:27:55','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:27:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:28:27','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:38:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:38:47','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:38:56','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:39:04','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:39:07','ja','unknown'),('127.0.0.1','unknown','2012-02-23 08:39:59','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:02:38','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:15:35','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:16:44','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:17:08','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:17:32','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:17:42','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:17:49','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:17:54','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:18:02','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:18:13','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:18:21','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:18:30','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:18:35','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:18:58','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:19:16','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:19:24','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:23:22','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:23:44','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:24:36','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:25:09','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:25:14','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:25:32','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:25:46','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:26:00','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:26:31','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:26:53','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:27:09','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:27:38','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:27:46','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:27:56','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:28:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:28:51','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:28:55','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:29:06','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:31:23','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:31:51','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:32:21','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:32:30','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:32:37','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:32:43','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:33:24','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:33:42','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:33:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:34:03','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:34:16','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:34:23','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:34:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:34:34','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:35:51','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:35:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:36:08','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:36:24','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:36:31','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:36:38','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:37:03','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:37:18','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:38:08','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:38:20','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:38:28','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:39:35','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:39:51','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:39:59','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:41:15','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:41:38','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:43:34','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:43:53','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:43:56','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:44:58','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:45:08','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:45:29','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:46:01','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:51:11','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:58:01','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:58:36','ja','unknown'),('127.0.0.1','unknown','2012-02-23 09:58:53','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:14:40','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:15:07','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:16:14','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:16:26','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:16:44','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:17:11','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:18:09','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:18:28','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:18:39','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:20:30','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:20:58','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:21:28','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:24:00','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:26:17','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:26:35','ja','unknown'),('127.0.0.1','unknown','2012-02-23 10:26:56','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:23:57','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:24:05','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:24:40','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:25:15','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:25:23','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:25:52','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:26:41','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:27:00','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:27:26','ja','unknown'),('127.0.0.1','unknown','2012-02-23 11:27:42','ja','unknown'),('127.0.0.1','unknown','2012-02-25 05:34:09','ja','unknown'),('127.0.0.1','unknown','2012-02-25 05:43:30','ja','unknown');
/*!40000 ALTER TABLE `ac_counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vl_add`
--

DROP TABLE IF EXISTS `vl_add`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vl_add` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rep_id` int(11) NOT NULL,
  `type` enum('demand') NOT NULL,
  `description` varchar(32) NOT NULL,
  `added` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vl_add`
--

LOCK TABLES `vl_add` WRITE;
/*!40000 ALTER TABLE `vl_add` DISABLE KEYS */;
/*!40000 ALTER TABLE `vl_add` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vl_ban_user`
--

DROP TABLE IF EXISTS `vl_ban_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vl_ban_user` (
  `id` int(11) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vl_ban_user`
--

LOCK TABLES `vl_ban_user` WRITE;
/*!40000 ALTER TABLE `vl_ban_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `vl_ban_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vl_demand`
--

DROP TABLE IF EXISTS `vl_demand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vl_demand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rep_id` int(11) NOT NULL,
  `graphic` int(11) NOT NULL,
  `network` int(11) NOT NULL,
  `single` int(11) NOT NULL,
  `multi_coop` int(11) NOT NULL,
  `multi_vs` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vl_demand`
--

LOCK TABLES `vl_demand` WRITE;
/*!40000 ALTER TABLE `vl_demand` DISABLE KEYS */;
/*!40000 ALTER TABLE `vl_demand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vl_reputation`
--

DROP TABLE IF EXISTS `vl_reputation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vl_reputation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `demand_id` int(11) NOT NULL,
  `problem` int(11) NOT NULL,
  `evaluate` int(11) NOT NULL,
  `add_id` int(11) DEFAULT NULL,
  `freetext` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vl_reputation`
--

LOCK TABLES `vl_reputation` WRITE;
/*!40000 ALTER TABLE `vl_reputation` DISABLE KEYS */;
INSERT INTO `vl_reputation` VALUES (1,0,'2012-03-31 10:30:42',0,0,100,NULL,NULL),(2,0,'2012-03-31 10:30:51',0,0,50,NULL,NULL),(3,0,'2012-03-31 10:30:53',0,0,50,NULL,NULL),(4,0,'2012-03-31 10:30:55',0,0,60,NULL,NULL),(5,0,'2012-03-31 10:30:58',0,0,0,NULL,NULL);
/*!40000 ALTER TABLE `vl_reputation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vl_user`
--

DROP TABLE IF EXISTS `vl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` char(16) NOT NULL,
  `host` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vl_user`
--

LOCK TABLES `vl_user` WRITE;
/*!40000 ALTER TABLE `vl_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `vl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-04-04  1:23:11
