-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: 3.38.250.117    Database: test
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'accounts','0001_initial','2022-03-29 02:52:18.039346'),(2,'contenttypes','0001_initial','2022-03-29 02:52:18.158462'),(3,'admin','0001_initial','2022-03-29 02:52:18.422430'),(4,'admin','0002_logentry_remove_auto_add','2022-03-29 02:52:18.481494'),(5,'admin','0003_logentry_add_action_flag_choices','2022-03-29 02:52:18.516048'),(6,'contenttypes','0002_remove_content_type_name','2022-03-29 02:52:18.760032'),(7,'auth','0001_initial','2022-03-29 02:52:19.256783'),(8,'auth','0002_alter_permission_name_max_length','2022-03-29 02:52:19.387670'),(9,'auth','0003_alter_user_email_max_length','2022-03-29 02:52:19.424287'),(10,'auth','0004_alter_user_username_opts','2022-03-29 02:52:19.459433'),(11,'auth','0005_alter_user_last_login_null','2022-03-29 02:52:19.490586'),(12,'auth','0006_require_contenttypes_0002','2022-03-29 02:52:19.515837'),(13,'auth','0007_alter_validators_add_error_messages','2022-03-29 02:52:19.570020'),(14,'auth','0008_alter_user_username_max_length','2022-03-29 02:52:19.599171'),(15,'auth','0009_alter_user_last_name_max_length','2022-03-29 02:52:19.629104'),(16,'auth','0010_alter_group_name_max_length','2022-03-29 02:52:19.701314'),(17,'auth','0011_update_proxy_permissions','2022-03-29 02:52:19.771003'),(18,'auth','0012_alter_user_first_name_max_length','2022-03-29 02:52:19.814881'),(19,'recommends','0001_initial','2022-03-29 02:52:19.969563'),(20,'cities','0001_initial','2022-03-29 02:52:20.855295'),(21,'reviews','0001_initial','2022-03-29 02:52:21.428261'),(22,'sessions','0001_initial','2022-03-29 02:52:21.597162'),(23,'cities','0002_alter_city_photo','2022-03-29 02:58:22.411320'),(24,'recommends','0002_alter_taste_comp_alter_taste_impo_and_more','2022-03-29 02:58:22.696286'),(25,'reviews','0002_alter_comment_id_alter_comment_review','2022-03-29 02:58:22.810569'),(26,'cities','0002_alter_city_photo_alter_visit_user','2022-03-29 04:51:03.818508'),(27,'cities','0003_merge_20220329_1612','2022-03-29 07:13:08.668765'),(28,'cities','0002_city_background_photo','2022-04-03 15:39:58.091349'),(29,'cities','0003_alter_city_background_photo','2022-04-05 00:58:02.817792'),(30,'recommends','0002_alter_taste_results','2022-04-05 05:34:49.666240');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 10:31:11
