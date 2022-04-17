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
-- Table structure for table `reviews_comment`
--

DROP TABLE IF EXISTS `reviews_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `created` date NOT NULL,
  `review_id` bigint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_comment_review_id_43f1c708_fk_reviews_cityreview_id` (`review_id`),
  KEY `reviews_comment_user_id_1d319c7d_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `reviews_comment_review_id_43f1c708_fk_reviews_cityreview_id` FOREIGN KEY (`review_id`) REFERENCES `reviews_cityreview` (`id`),
  CONSTRAINT `reviews_comment_user_id_1d319c7d_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews_comment`
--

LOCK TABLES `reviews_comment` WRITE;
/*!40000 ALTER TABLE `reviews_comment` DISABLE KEYS */;
INSERT INTO `reviews_comment` VALUES (13,'vghghg','2022-03-31',9,7),(14,'test','2022-03-31',9,7),(15,'test','2022-03-31',9,7),(19,'test','2022-04-01',112,7),(20,'\"aa\"','2022-04-01',3,2),(21,'aaaaaaaaaa','2022-04-04',9,13),(22,'aaaaaaaaaa','2022-04-04',23,13),(24,'est','2022-04-04',105,7),(40,'test','2022-04-05',6,7),(41,'test','2022-04-05',6,7),(42,'test','2022-04-05',6,7),(43,'seta','2022-04-05',6,7),(44,'string','2022-04-05',6,7),(47,'test','2022-04-05',23,7),(49,'test','2022-04-05',23,7),(50,'ㄷㄴㅅ','2022-04-05',23,7),(51,'ㅅㄷㄴㅅ','2022-04-05',23,7),(52,'양평 베이커리 정말 맛있어요 다시한번 먹고싶네요 ㅎㅎ','2022-04-05',23,7),(53,'댓글댓글','2022-04-05',152,3),(54,'글댓글','2022-04-05',152,3),(55,'댓글을 입력ㅎ주세요','2022-04-05',154,3),(56,'ㄴㅇㅁㄴㅇ','2022-04-06',155,3),(57,'댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글','2022-04-06',152,3),(58,'h','2022-04-07',4,13),(59,'g','2022-04-07',4,13),(60,'ㅍㅍㅍㅍㅍㅍㅍ','2022-04-07',4,13),(61,'ㄹㄹㄹㄹ','2022-04-07',4,13),(62,'ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ','2022-04-07',4,13),(63,'ㅍㅍㅍ','2022-04-07',4,13),(64,'ㅀㅀㄹ','2022-04-07',1,13),(65,'bbbbbbbbbb','2022-04-07',21,13);
/*!40000 ALTER TABLE `reviews_comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 10:31:13
