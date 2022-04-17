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
-- Table structure for table `reviews_cityreview`
--

DROP TABLE IF EXISTS `reviews_cityreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews_cityreview` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `content` longtext NOT NULL,
  `created` date NOT NULL,
  `updated` date NOT NULL,
  `city_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_cityreview_city_id_ebac4dbe_fk_cities_city_id` (`city_id`),
  KEY `reviews_cityreview_user_id_90247b04_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `reviews_cityreview_city_id_ebac4dbe_fk_cities_city_id` FOREIGN KEY (`city_id`) REFERENCES `cities_city` (`id`),
  CONSTRAINT `reviews_cityreview_user_id_90247b04_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews_cityreview`
--

LOCK TABLES `reviews_cityreview` WRITE;
/*!40000 ALTER TABLE `reviews_cityreview` DISABLE KEYS */;
INSERT INTO `reviews_cityreview` VALUES (1,'title','content','2022-03-29','2022-03-29',22,1),(2,'title2','content2','2022-03-29','2022-03-29',22,1),(3,'꼬깔','고깔꼬깔','2022-03-29','2022-03-29',1,3),(4,'string','string','2022-03-29','2022-03-29',22,7),(6,'양평시 관광리뷰','<p>양평해장국 9000원,,</p>','2022-03-29','2022-03-29',21,7),(9,'양평','<p>해장국</p>','2022-03-29','2022-03-29',21,7),(10,'string','string','2022-03-29','2022-03-29',1,3),(11,'string','string','2022-03-29','2022-03-29',2,3),(12,'string','string','2022-03-29','2022-03-29',2,3),(13,'string','string','2022-03-29','2022-03-29',2,3),(14,'string','string','2022-03-29','2022-03-29',3,3),(15,'string','string','2022-03-29','2022-03-29',4,3),(16,'title3','content3','2022-03-29','2022-03-29',22,1),(17,'title4','content4','2022-03-29','2022-03-29',22,1),(18,'title5','content5','2022-03-29','2022-03-29',22,1),(19,'title6','content6','2022-03-29','2022-03-29',22,1),(20,'title7','content7','2022-03-29','2022-03-29',22,1),(21,'title8','content8','2022-03-29','2022-03-29',22,1),(23,'양평 문호리 베이커리','<p>앞에 고기가 잘잡힘</p>','2022-03-29','2022-03-29',21,7),(25,'string','string','2022-03-30','2022-03-30',1,3),(26,'string','string','2022-03-30','2022-03-30',1,3),(27,'string','string','2022-03-30','2022-03-30',1,3),(28,'string','string','2022-03-30','2022-03-30',1,3),(29,'string','string','2022-03-30','2022-03-30',1,3),(30,'string','string','2022-03-30','2022-03-30',1,3),(31,'string','string','2022-03-30','2022-03-30',1,3),(32,'string','string','2022-03-30','2022-03-30',1,3),(33,'string','string','2022-03-30','2022-03-30',1,3),(34,'열두번째','열두번째','2022-03-30','2022-03-30',1,3),(35,'title9','content9','2022-03-29','2022-03-29',22,1),(36,'title10','content10','2022-03-29','2022-03-29',22,1),(37,'title11','content11','2022-03-29','2022-03-29',22,1),(40,'title11','content11','2022-03-29','2022-03-29',22,1),(41,'title11','content11','2022-03-29','2022-03-29',22,1),(42,'title11','content11','2022-03-29','2022-03-29',22,1),(43,'title11','content11','2022-03-29','2022-03-29',22,1),(44,'title11','content11','2022-03-29','2022-03-29',22,1),(45,'title11','content11','2022-03-29','2022-03-29',22,1),(46,'title11','content11','2022-03-29','2022-03-29',22,1),(47,'title11','content11','2022-03-29','2022-03-29',22,1),(48,'title11','content11','2022-03-29','2022-03-29',22,1),(49,'title11','content11','2022-03-29','2022-03-29',22,1),(50,'title11','content11','2022-03-29','2022-03-29',22,1),(51,'title11','content11','2022-03-29','2022-03-29',22,1),(52,'title11','content11','2022-03-29','2022-03-29',22,1),(56,'aaaaaaaaaaaaaa','content11','2022-03-29','2022-03-29',22,1),(103,'d1','d1','2022-03-31','2022-03-31',21,7),(104,'d1','d1','2022-03-31','2022-03-31',21,7),(105,'d1','d1','2022-03-31','2022-03-31',21,7),(106,'d1','d1','2022-03-31','2022-03-31',21,7),(107,'d1','d1','2022-03-31','2022-03-31',21,7),(108,'d1','d1','2022-03-31','2022-03-31',21,7),(112,'d1','d1','2022-03-31','2022-03-31',21,7),(113,'d1','d1','2022-03-31','2022-03-31',21,7),(114,'d1','d1','2022-03-31','2022-03-31',21,7),(115,'d1','d1','2022-03-31','2022-03-31',21,7),(118,'ㅅㄷㄴㅅ','<p>Hello from CKEditor 5!ㅅㄷㄴㅅ</p>','2022-03-31','2022-03-31',21,7),(119,'7676','<p>Hello from CKEditor 5!7676</p>','2022-03-31','2022-03-31',76,7),(120,'7676','<p>Hello from CKEditor 5!7676</p>','2022-03-31','2022-03-31',76,7),(121,'tets','<p>Hello from CKEditor tset5!</p>','2022-03-31','2022-03-31',21,7),(122,'7878','<p>7878</p>','2022-04-01','2022-04-01',78,7),(123,'7878','<p>7878</p>','2022-04-01','2022-04-01',78,7),(124,'test','<p>test</p>','2022-04-01','2022-04-01',78,7),(125,'string','string','2022-04-01','2022-04-01',3,2),(126,'string','string','2022-04-01','2022-04-01',1,11),(127,'string1','string','2022-04-01','2022-04-01',3,2),(128,'\"hihi\"','\"aa\"','2022-04-01','2022-04-01',3,2),(129,'\"hihi\"','\"aa\"','2022-04-01','2022-04-01',3,2),(130,'\"hihi\"','\"aa\"','2022-04-01','2022-04-01',3,2),(131,'\"hihi\"','\"aa\"','2022-04-01','2022-04-01',3,2),(132,'\"hihi\"','\"aa\"','2022-04-01','2022-04-01',3,2),(133,'\"hihi\"','\"aa\"','2022-04-01','2022-04-01',3,2),(134,'test','<p>Hello from CKEdittestsetseor 5!</p>','2022-04-01','2022-04-01',21,7),(135,'0518','<p>0518</p>','2022-04-01','2022-04-01',21,7),(136,'aaaaffa','dddddd','2022-04-04','2022-04-04',22,13),(137,'aaaaffa','dddddd','2022-04-04','2022-04-04',22,13),(138,'속초 좋네요','<p><strong>???</strong></p>','2022-04-05','2022-04-05',5,16),(139,'속초 짱재밋','<p>꿀잼</p>','2022-04-05','2022-04-05',5,16),(140,'바다 고고','<p>ㄱㄱㄱ</p>','2022-04-05','2022-04-05',5,16),(141,'색깔 및 배경 바꾸자','<p>전체적인 틀 잡자</p>','2022-04-05','2022-04-05',5,16),(142,'리뷰 페이지네이션','<p>허허</p>','2022-04-05','2022-04-05',5,16),(143,'10개씩 넘어감','<p>ㅇㄴ</p>','2022-04-05','2022-04-05',5,16),(144,'13개 만들어보자','<p>!</p>','2022-04-05','2022-04-05',5,16),(145,'속초 관광 홍보 쩐다','<p>Hello from CKEditor ㄴㄴ!</p>','2022-04-05','2022-04-05',5,16),(146,'드디어 9개','<p>Hello from CKEditor 5!!!</p>','2022-04-05','2022-04-05',5,16),(147,'1쪽완성','<p>10개다..</p>','2022-04-05','2022-04-05',5,16),(148,'제발제발','<p>!!</p>','2022-04-05','2022-04-05',5,16),(149,'3개만 더!','<p>ㅇㄴㅇㄴ</p>','2022-04-05','2022-04-05',5,16),(150,'2개!','<p>ㅇㅇㅇ</p>','2022-04-05','2022-04-05',5,16),(151,'하나!','<p>Hello from CKEditor 5!ㄴㄴ</p>','2022-04-05','2022-04-05',5,16),(152,'여기였군','<p>ㅁㄴㅇㅁㅇ</p>','2022-04-05','2022-04-05',99,3),(153,'asdasdad','<p>sadadss</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>','2022-04-05','2022-04-05',58,3),(154,'ㅁㄴㅇㅁㅇ','<p>ㅁㄴㅇㅁㅇ</p>','2022-04-05','2022-04-05',58,3),(155,'주왕산 좋아요','<p>산이 아주 높습니다.</p>','2022-04-06','2022-04-06',51,3),(156,'tt','<p>d</p>','2022-04-06','2022-04-06',47,1),(157,'test','<blockquote><ol><li><i>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</i></li></ol></blockquote><figure class=\"table\"><table><tbody><tr><td>test</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>','2022-04-06','2022-04-06',21,7),(158,'fdas','<p>asdf</p>','2022-04-06','2022-04-06',46,1),(159,'ㅁㄴㅇㅁㄴㅇ','<p>ㅁㄴㅇㅁㄴㅇ</p>','2022-04-06','2022-04-06',90,3),(160,'ㅅㄷㄴㅅ','<p>ㅅㄷㄴㅅ</p>','2022-04-06','2022-04-06',2,7),(161,'ㅅㄷㄴㅅ','<p>ㅂㅂㅂㅂㅂㅂ</p>','2022-04-06','2022-04-06',3,13),(162,'nnnnnnn','<p>nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</p>','2022-04-07','2022-04-07',22,13);
/*!40000 ALTER TABLE `reviews_cityreview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 10:31:15
