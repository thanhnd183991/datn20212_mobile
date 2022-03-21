CREATE DATABASE  IF NOT EXISTS `socialnetworkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci */;
USE `socialnetworkdb`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: tuana9a.tech    Database: socialnetworkdb
-- ------------------------------------------------------
-- Server version	5.7.36-0ubuntu0.18.04.1

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `posting_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Comment_post_id_idx` (`post_id`),
  KEY `Comment_user_id_idx` (`user_id`),
  CONSTRAINT `Comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `Comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (21,6,1,'Ảnh đẹp quá','2021-12-23 15:23:31'),(22,5,3,'1','2021-12-23 20:12:28'),(23,6,3,'2','2021-12-23 20:22:04'),(24,6,3,'1','2021-12-23 21:54:44'),(25,8,2,'1','2021-12-26 18:37:12'),(26,8,2,'1','2021-12-26 22:06:34'),(27,8,2,'1','2021-12-26 22:06:56');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `user1_id` int(11) NOT NULL,
  `user2_id` int(11) NOT NULL,
  PRIMARY KEY (`user1_id`,`user2_id`),
  KEY `Friend_user2_id_idx` (`user2_id`),
  CONSTRAINT `Friend_user1_id` FOREIGN KEY (`user1_id`) REFERENCES `user` (`id`),
  CONSTRAINT `Friend_user2_id` FOREIGN KEY (`user2_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (2,1),(1,2),(3,2),(2,3),(4,3),(3,4);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `URI` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'d66a84d04d8f40194b818fa88695a07a88258d91d2f0cca10524fd4ff3ffe07f0b5e99170b68713cbdbf7d2ffd858c52.png','/api/public/image/content/d66a84d04d8f40194b818fa88695a07a88258d91d2f0cca10524fd4ff3ffe07f0b5e99170b68713cbdbf7d2ffd858c52.png'),(11,'d66a84d04d8f40194b818fa88695a07a88258d91d2f0cca10524fd4ff3ffe07f0b5e99170b68713cbdbf7d2ffd858c52.png','/api/public/image/content/d66a84d04d8f40194b818fa88695a07a88258d91d2f0cca10524fd4ff3ffe07f0b5e99170b68713cbdbf7d2ffd858c52.png'),(12,'8a2421cf14b2873c7dbf13264e42ec620b32fd5c5c864c3aaf5daa01e8e2787d7c84-fxipenp2803342.jpg','/api/public/image/content/8a2421cf14b2873c7dbf13264e42ec620b32fd5c5c864c3aaf5daa01e8e2787d7c84-fxipenp2803342.jpg'),(13,'05cc2a7ae7f20cae4a29f9b6c699eb1148fe4c4be03d11f64de335ff6382601f552667.jpg','/api/public/image/content/05cc2a7ae7f20cae4a29f9b6c699eb1148fe4c4be03d11f64de335ff6382601f552667.jpg'),(14,'cdf81ba27bb88977989d0358683b02dd7d60fd1de244734bc67a359e39a1997c1548656899_1C81E5E7EDE61521973DFCCAD85E7414__01__01.jpg','/api/public/image/content/cdf81ba27bb88977989d0358683b02dd7d60fd1de244734bc67a359e39a1997c1548656899_1C81E5E7EDE61521973DFCCAD85E7414__01__01.jpg'),(15,'eb528a4657df7b3107ffa483f3a753a72bf711f537681abbd405a51d4a0e4ad1citemer-liu-kdakaisa.jpg','/api/public/image/content/eb528a4657df7b3107ffa483f3a753a72bf711f537681abbd405a51d4a0e4ad1citemer-liu-kdakaisa.jpg'),(16,'38a85703cb01084858dbd7323d4bfe56b96bbfeadcf833b238a8f48591a90b54552667.jpg','/api/public/image/content/38a85703cb01084858dbd7323d4bfe56b96bbfeadcf833b238a8f48591a90b54552667.jpg'),(17,'ae257fb6567fce06075748e67169e454b039a06a4e5abe84d1f0df62b36b726e65a43a5dd3e6f66425c6240715e54fb2.png','/api/public/image/content/ae257fb6567fce06075748e67169e454b039a06a4e5abe84d1f0df62b36b726e65a43a5dd3e6f66425c6240715e54fb2.png'),(18,'5722091f30e6b6e1f8cc4691de1e904a18c2c37316aff2a3b116b8dce76a06ff267946783_250144723880228_5386486243705076692_n.jpg','/api/public/image/content/5722091f30e6b6e1f8cc4691de1e904a18c2c37316aff2a3b116b8dce76a06ff267946783_250144723880228_5386486243705076692_n.jpg'),(19,'a2aaeba4f5b5455a93c42d44b9ff3ef7d396860edd3712c726fded4a53b356e9c148a3c99db51ad40db9f7b47095819a.png','/api/public/image/content/a2aaeba4f5b5455a93c42d44b9ff3ef7d396860edd3712c726fded4a53b356e9c148a3c99db51ad40db9f7b47095819a.png'),(20,'cbd54e7a56097b53c49c40b60f866db014e8904c890cd9ca2d5f6231375df0f2c148a3c99db51ad40db9f7b47095819a.png','/api/public/image/content/cbd54e7a56097b53c49c40b60f866db014e8904c890cd9ca2d5f6231375df0f2c148a3c99db51ad40db9f7b47095819a.png'),(21,'7c62364c60379b79903a6721020f120000afe2668e8e570bab6a9e59e584130e95079529_2840631575992760_8776148976496803840_o.jpg','/api/public/image/content/7c62364c60379b79903a6721020f120000afe2668e8e570bab6a9e59e584130e95079529_2840631575992760_8776148976496803840_o.jpg'),(22,'ebaf3598a59553a18ab24ea08393570467db5ff56697daa620336a568b439798latest.png','/api/public/image/content/ebaf3598a59553a18ab24ea08393570467db5ff56697daa620336a568b439798latest.png'),(23,'2aefd1ec1457ccfbbb9162279384a06f660ed71ebd9342fcdf52e42a1ed1bb555a18ccd419860d9dd6ef3d23ab160d3b95866675.jpg','/api/public/image/content/2aefd1ec1457ccfbbb9162279384a06f660ed71ebd9342fcdf52e42a1ed1bb555a18ccd419860d9dd6ef3d23ab160d3b95866675.jpg'),(24,'c44ebd4c2e745cae205dd081ef104c6f30732efe79f36de221350cac2e6547815.jpg','/api/public/image/content/c44ebd4c2e745cae205dd081ef104c6f30732efe79f36de221350cac2e6547815.jpg'),(25,'89205bd2455dc6fc5d44bb5754ba8b054166aa084d8b41aeccc8b167b61ed40d994280_screenshots_20200314001757_1.jpg','/api/public/image/content/89205bd2455dc6fc5d44bb5754ba8b054166aa084d8b41aeccc8b167b61ed40d994280_screenshots_20200314001757_1.jpg'),(26,'0a015cbbd3573773e5a6187e09a815268fd7febd86ff8299e21c71f38ba5e38c994280_screenshots_20200315121234_1.jpg','/api/public/image/content/0a015cbbd3573773e5a6187e09a815268fd7febd86ff8299e21c71f38ba5e38c994280_screenshots_20200315121234_1.jpg'),(27,'73228742006fb7a9982d177fddfaf23229ac31d02d7cd8147f29eb541b0523bd994280_screenshots_20200315121218_1.jpg','/api/public/image/content/73228742006fb7a9982d177fddfaf23229ac31d02d7cd8147f29eb541b0523bd994280_screenshots_20200315121218_1.jpg'),(28,'7b15b898194a6d7762ffa3f873a2ff8fbb58f99a82b7df8d10b5ac1440826ad6994280_screenshots_20200202200940_1.jpg','/api/public/image/content/7b15b898194a6d7762ffa3f873a2ff8fbb58f99a82b7df8d10b5ac1440826ad6994280_screenshots_20200202200940_1.jpg'),(29,'ef76fde4039781429cb09037ce0901238b8a966c45f2af369d33c0f66a6846a35a18ccd419860d9dd6ef3d23ab160d3b95866675.jpg','/api/public/image/content/ef76fde4039781429cb09037ce0901238b8a966c45f2af369d33c0f66a6846a35a18ccd419860d9dd6ef3d23ab160d3b95866675.jpg'),(30,'59bdc4f21f3bdb3b450ccae59c11df89c5944191bbfe06b5b263e30cef5442cc1042736.jpg','/api/public/image/content/59bdc4f21f3bdb3b450ccae59c11df89c5944191bbfe06b5b263e30cef5442cc1042736.jpg'),(31,'30ff132ec79424e6e27935b912485aecdacd2d36d17cb4e23da36a49566973bccitemer-liu-kdaahri.jpg','/api/public/image/content/30ff132ec79424e6e27935b912485aecdacd2d36d17cb4e23da36a49566973bccitemer-liu-kdaahri.jpg'),(32,'0701437538ab2da9f286b44275dc997cd0b44d0fd4194b3a3d2165f2c396ed93Nitro_Wallpaper_5000x2813.jpg','/api/public/image/content/0701437538ab2da9f286b44275dc997cd0b44d0fd4194b3a3d2165f2c396ed93Nitro_Wallpaper_5000x2813.jpg'),(33,'d792cf9b3517f101edbbbc57608c280570b99ca0fae67e8706e68f49f9fc7fa6Nitro_Wallpaper_5000x2813.jpg','/api/public/image/content/d792cf9b3517f101edbbbc57608c280570b99ca0fae67e8706e68f49f9fc7fa6Nitro_Wallpaper_5000x2813.jpg'),(34,'421a65fa8ef2b81eed8877b15ba0ba2f3c781a87e4c46b78592d737cb8e832b5Nitro_Wallpaper_5000x2813.jpg','/api/public/image/content/421a65fa8ef2b81eed8877b15ba0ba2f3c781a87e4c46b78592d737cb8e832b5Nitro_Wallpaper_5000x2813.jpg'),(35,'5018321db2a59e22ce1e4d690a8b97fedd7824d52271c7d74c4276eefcdc7d9fNitro_Wallpaper_5000x2813.jpg','/api/public/image/content/5018321db2a59e22ce1e4d690a8b97fedd7824d52271c7d74c4276eefcdc7d9fNitro_Wallpaper_5000x2813.jpg'),(36,'3a04f343f27a5d67b0a42aaaebd4f62a48c8e0389d71e4b1e58ac2dbd0191aa065a43a5dd3e6f66425c6240715e54fb2.png','/api/public/image/content/3a04f343f27a5d67b0a42aaaebd4f62a48c8e0389d71e4b1e58ac2dbd0191aa065a43a5dd3e6f66425c6240715e54fb2.png'),(37,'5ded617841c5293c0f4bb0fa2d6fb3511612ac1993c805112d80c794f46648d20b5e99170b68713cbdbf7d2ffd858c52.png','/api/public/image/content/5ded617841c5293c0f4bb0fa2d6fb3511612ac1993c805112d80c794f46648d20b5e99170b68713cbdbf7d2ffd858c52.png'),(38,'da0bd8e773ea3d78c67a63cbba6ff824dc7f874868f0928798218ad6d1d9996afriede3.jpg','/api/public/image/content/da0bd8e773ea3d78c67a63cbba6ff824dc7f874868f0928798218ad6d1d9996afriede3.jpg');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images_of_post`
--

DROP TABLE IF EXISTS `images_of_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images_of_post` (
  `post_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`image_id`),
  KEY `ImageOfPost_image_id_idx` (`image_id`),
  CONSTRAINT `ImageOfPost_image_id` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`),
  CONSTRAINT `ImageOfPost_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images_of_post`
--

LOCK TABLES `images_of_post` WRITE;
/*!40000 ALTER TABLE `images_of_post` DISABLE KEYS */;
INSERT INTO `images_of_post` VALUES (1,11),(1,12),(2,13),(2,14),(2,15),(3,17),(4,20),(5,21),(6,25),(6,26),(6,27),(6,28),(7,32),(7,33),(8,36),(8,37);
/*!40000 ALTER TABLE `images_of_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `sending_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_sender_id_idx` (`sender_id`),
  KEY `Message_receiver_id_idx` (`receiver_id`),
  CONSTRAINT `Message_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  CONSTRAINT `Message_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,1,2,'2021-12-09 16:03:58',''),(2,1,2,'2021-12-09 16:05:09','a'),(3,1,2,'2021-12-09 16:06:29','a'),(4,1,2,'2021-12-09 16:08:16','a'),(5,1,2,'2021-12-09 16:10:36','a'),(6,1,2,'2021-12-09 16:11:12','a'),(7,1,2,'2021-12-09 16:13:19','a'),(8,1,2,'2021-12-09 16:20:42','asdas'),(9,1,2,'2021-12-09 16:21:44','a'),(10,1,2,'2021-12-09 16:23:19','a'),(11,1,2,'2021-12-09 16:55:34','1'),(12,2,1,'2021-12-09 16:55:38','2'),(13,1,2,'2021-12-12 20:37:23','asdaskdjalskdjlas'),(14,2,1,'2021-12-12 20:37:34','sadsadasd'),(15,2,3,'2021-12-12 20:44:42','sdasdasd'),(16,1,2,'2021-12-12 20:50:18','asasdasdasd'),(17,2,3,'2021-12-12 20:50:27','1'),(18,3,2,'2021-12-17 13:39:18','sâssa'),(19,3,4,'2021-12-21 23:03:13','a'),(20,3,4,'2021-12-21 23:03:52','a'),(21,3,4,'2021-12-21 23:03:57','a'),(22,3,4,'2021-12-21 23:04:00','a'),(23,3,4,'2021-12-21 23:04:14','a'),(24,3,4,'2021-12-21 23:04:16','a'),(25,3,4,'2021-12-21 23:04:17','a'),(26,3,4,'2021-12-21 23:04:19','a'),(27,3,4,'2021-12-21 23:04:20','a'),(28,3,4,'2021-12-21 23:04:21','a'),(29,3,4,'2021-12-21 23:04:45','a'),(30,3,4,'2021-12-21 23:05:52','a'),(31,3,4,'2021-12-21 23:06:14','a'),(32,3,4,'2021-12-21 23:06:15','a'),(33,3,4,'2021-12-21 23:06:16','a'),(34,3,4,'2021-12-21 23:06:17','a'),(35,3,4,'2021-12-21 23:06:18','a'),(36,3,4,'2021-12-21 23:06:19','a'),(37,3,4,'2021-12-21 23:06:31','a'),(38,3,4,'2021-12-21 23:08:27','a'),(39,3,4,'2021-12-21 23:08:28','123123'),(40,3,4,'2021-12-21 23:08:30','123123213'),(41,3,4,'2021-12-21 23:08:31','12312'),(42,3,4,'2021-12-21 23:08:31','123'),(43,3,4,'2021-12-21 23:08:32','123'),(44,3,4,'2021-12-21 23:08:33','12'),(45,3,4,'2021-12-21 23:08:33','1'),(46,3,4,'2021-12-21 23:08:34','1'),(47,3,4,'2021-12-21 23:08:34',''),(48,3,4,'2021-12-21 23:08:35',''),(49,3,4,'2021-12-21 23:08:36',''),(50,3,4,'2021-12-21 23:08:36',''),(51,3,4,'2021-12-21 23:08:37',''),(52,3,4,'2021-12-21 23:08:37',''),(53,3,4,'2021-12-21 23:08:37',''),(54,3,4,'2021-12-21 23:08:37',''),(55,3,4,'2021-12-21 23:08:37',''),(56,3,4,'2021-12-21 23:08:38',''),(57,3,4,'2021-12-21 23:08:38',''),(58,3,4,'2021-12-21 23:08:38',''),(59,3,4,'2021-12-21 23:08:38',''),(60,3,4,'2021-12-21 23:08:38',''),(61,3,4,'2021-12-21 23:08:38',''),(62,3,4,'2021-12-21 23:08:39',''),(63,3,4,'2021-12-21 23:08:39',''),(64,3,4,'2021-12-21 23:08:39',''),(65,3,4,'2021-12-21 23:08:39',''),(66,3,4,'2021-12-21 23:08:39',''),(67,3,4,'2021-12-21 23:08:39',''),(68,3,4,'2021-12-21 23:08:40',''),(69,3,4,'2021-12-21 23:08:40',''),(70,3,4,'2021-12-21 23:08:49','123'),(71,3,4,'2021-12-21 23:08:50','1'),(72,3,4,'2021-12-21 23:08:51','11'),(73,3,4,'2021-12-21 23:08:51','1'),(74,3,4,'2021-12-21 23:08:52','1'),(75,3,4,'2021-12-21 23:08:53','1'),(76,3,4,'2021-12-21 23:08:53','1'),(77,3,4,'2021-12-21 23:08:54','1'),(78,3,4,'2021-12-21 23:08:55','111'),(79,3,4,'2021-12-21 23:08:55',''),(80,3,4,'2021-12-21 23:08:56','111'),(81,3,4,'2021-12-21 23:08:56',''),(82,3,4,'2021-12-21 23:08:57',''),(83,3,4,'2021-12-21 23:08:57',''),(84,3,4,'2021-12-21 23:08:57',''),(85,3,4,'2021-12-21 23:08:57',''),(86,3,4,'2021-12-21 23:08:57',''),(87,3,4,'2021-12-21 23:09:17','a'),(88,3,4,'2021-12-21 23:09:17','a'),(89,3,4,'2021-12-21 23:09:18','a'),(90,3,4,'2021-12-21 23:09:19','aa'),(91,3,4,'2021-12-21 23:09:20','a'),(92,3,4,'2021-12-21 23:09:20',''),(93,3,4,'2021-12-21 23:09:21','a'),(94,2,3,'2021-12-21 23:11:29','1'),(95,2,3,'2021-12-21 23:11:36','2'),(96,3,2,'2021-12-21 23:11:38','3'),(97,2,3,'2021-12-21 23:11:44','4'),(98,3,2,'2021-12-21 23:11:48','5'),(99,2,3,'2021-12-21 23:12:08',''),(100,2,3,'2021-12-21 23:13:05',''),(101,2,1,'2021-12-21 23:14:04',''),(102,3,2,'2021-12-21 23:14:11','A'),(103,3,2,'2021-12-21 23:14:19','A'),(104,3,2,'2021-12-21 23:16:49','a'),(105,2,1,'2021-12-21 23:21:55','1'),(106,3,2,'2021-12-21 23:21:59','1'),(107,2,3,'2021-12-22 17:38:02','a'),(108,2,3,'2021-12-22 17:38:03','a'),(109,2,3,'2021-12-22 17:38:04','a'),(110,2,3,'2021-12-22 17:38:05','a'),(111,2,3,'2021-12-22 17:38:06','a'),(112,3,2,'2021-12-22 17:38:07','a'),(113,3,2,'2021-12-22 17:38:09','a'),(114,3,2,'2021-12-22 17:38:10','a'),(115,3,2,'2021-12-22 17:38:11','a'),(116,2,3,'2021-12-22 17:38:17','a'),(117,2,3,'2021-12-22 17:47:01','a'),(118,2,3,'2021-12-22 17:47:02','a'),(119,2,3,'2021-12-22 17:47:03','a'),(120,2,3,'2021-12-22 17:47:03','a'),(121,2,3,'2021-12-22 17:47:04','a'),(122,2,3,'2021-12-22 17:47:04','a'),(123,2,3,'2021-12-22 17:47:05','a'),(124,2,3,'2021-12-22 17:47:06','a'),(125,2,3,'2021-12-22 17:47:06','a'),(126,2,3,'2021-12-22 17:47:12','a'),(127,2,3,'2021-12-22 17:47:13','a'),(128,2,3,'2021-12-22 17:47:14','a'),(129,2,3,'2021-12-22 17:47:14','a'),(130,2,3,'2021-12-22 17:47:15','a'),(131,2,1,'2021-12-23 10:50:47','a'),(132,2,1,'2021-12-23 10:50:59','a'),(133,2,1,'2021-12-23 10:51:10','a'),(134,2,1,'2021-12-23 10:51:12','a'),(135,3,2,'2021-12-23 15:25:33','1'),(136,3,2,'2021-12-23 15:27:21','h'),(137,2,1,'2021-12-23 15:30:12','a'),(138,2,1,'2021-12-23 15:30:14','1'),(139,2,1,'2021-12-23 15:30:46','a'),(140,1,2,'2021-12-23 15:30:49','1'),(141,2,3,'2021-12-23 20:21:37','1'),(142,3,2,'2021-12-23 20:21:45','1'),(143,3,2,'2021-12-23 20:22:21','1'),(144,3,2,'2021-12-23 20:22:23','2'),(145,3,2,'2021-12-23 20:22:24','1'),(146,3,2,'2021-12-23 20:22:26','2'),(147,3,2,'2021-12-23 20:22:27','1'),(148,3,2,'2021-12-23 20:22:28','2'),(149,3,2,'2021-12-23 20:22:30','1'),(150,3,2,'2021-12-23 20:42:02','a'),(151,3,2,'2021-12-23 20:42:08','1'),(152,3,2,'2021-12-23 20:43:49','2222'),(153,3,4,'2021-12-23 20:43:57','saa'),(154,3,2,'2021-12-23 20:44:42','aaa'),(155,3,4,'2021-12-23 20:44:45','21121'),(156,3,4,'2021-12-23 20:44:52','3123123'),(157,3,4,'2021-12-23 20:45:24','2'),(158,3,2,'2021-12-26 21:38:01','a'),(159,3,2,'2021-12-26 21:38:05','a'),(160,2,1,'2021-12-26 21:38:08','a'),(161,2,1,'2021-12-26 22:05:52','a'),(162,2,1,'2021-12-26 22:05:57','a'),(163,2,1,'2021-12-26 22:06:16','21312321'),(164,2,1,'2021-12-26 22:22:21','1'),(165,2,1,'2021-12-26 22:22:40','1'),(166,2,3,'2021-12-26 22:23:14','z'),(167,2,3,'2021-12-26 22:26:57','gg'),(168,2,3,'2021-12-26 22:33:41','jjj'),(169,2,1,'2021-12-26 22:34:09','jjjj'),(170,2,3,'2021-12-26 22:36:17','hh'),(171,2,1,'2021-12-26 22:38:41','a'),(172,2,3,'2021-12-26 22:39:02','asdas'),(173,3,2,'2021-12-26 22:39:05','asdasdas');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `posting_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `number_of_comments` int(11) NOT NULL DEFAULT '0',
  `number_of_hearts` int(11) NOT NULL DEFAULT '0',
  `number_of_images` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_owner_id_idx` (`owner_id`),
  CONSTRAINT `Post_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Hôm nay thật vui','2014-04-02 08:49:43',0,0,2,1),(2,'Ẩnh đẹp quá','2020-04-02 08:49:43',4,0,3,2),(3,'Có thật nhiều thứ để chia sẻ','2021-12-12 20:58:34',1,0,0,3),(4,'','2021-12-19 20:58:54',0,0,0,1),(5,'','2021-12-19 20:59:57',3,1,0,2),(6,'Hôm nay là thứ 4        ','2021-12-22 17:39:10',12,2,0,2),(7,'Nitro','2021-12-26 18:35:37',0,0,0,2),(8,'test','2021-12-26 18:36:59',3,1,0,2);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction_of_post`
--

DROP TABLE IF EXISTS `reaction_of_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction_of_post` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `ReactOfPost_user_id_idx` (`user_id`),
  CONSTRAINT `ReactOfPost_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `ReactOfPost_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction_of_post`
--

LOCK TABLES `reaction_of_post` WRITE;
/*!40000 ALTER TABLE `reaction_of_post` DISABLE KEYS */;
INSERT INTO `reaction_of_post` VALUES (1,1),(2,1),(6,1),(1,2),(8,2),(5,3),(6,3);
/*!40000 ALTER TABLE `reaction_of_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_friend`
--

DROP TABLE IF EXISTS `request_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request_sender_id` int(11) NOT NULL,
  `request_receiver_id` int(11) NOT NULL,
  `replied` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `RequestFriend_sender_id_idx` (`request_sender_id`),
  KEY `RequestFriend_receiver_id_idx` (`request_receiver_id`),
  CONSTRAINT `RequestFriend_receiver_id` FOREIGN KEY (`request_receiver_id`) REFERENCES `user` (`id`),
  CONSTRAINT `RequestFriend_sender_id` FOREIGN KEY (`request_sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_friend`
--

LOCK TABLES `request_friend` WRITE;
/*!40000 ALTER TABLE `request_friend` DISABLE KEYS */;
INSERT INTO `request_friend` VALUES (1,1,2,_binary ''),(2,2,3,_binary ''),(3,4,3,_binary '');
/*!40000 ALTER TABLE `request_friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `validated_email` bit(1) NOT NULL DEFAULT b'0',
  `name` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `joining_date` date NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `number_of_friends` int(11) NOT NULL DEFAULT '0',
  `number_of_posts` int(11) NOT NULL DEFAULT '0',
  `number_of_images` int(11) NOT NULL DEFAULT '0',
  `profile_image_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `User_profile_image_id_idx` (`profile_image_id`),
  CONSTRAINT `User_profile_image_id` FOREIGN KEY (`profile_image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'string','null',_binary '\0','Nam','473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8','2021-12-25','2021-11-19','null',0,1,1,30),(2,'nam','a',_binary '\0','Phạm Văn Nam','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','2021-12-23','2021-11-22','a',0,4,9,18),(3,'nampv1805','null',_binary '\0','Phạm Nam 1','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','2021-12-07','2021-11-28','null',1,1,1,38),(4,'nampv1111','',_binary '\0','sadasdas','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',NULL,'2021-12-19','1',1,0,0,24),(5,'nampv2222','null',_binary '\0','âsđâsd','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','2021-12-17','2021-12-19','null',0,0,0,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-26 22:46:09
