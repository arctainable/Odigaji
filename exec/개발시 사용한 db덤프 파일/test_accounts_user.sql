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
-- Table structure for table `accounts_user`
--

DROP TABLE IF EXISTS `accounts_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `point` bigint NOT NULL,
  `photo` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user`
--

LOCK TABLES `accounts_user` WRITE;
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` VALUES ('pbkdf2_sha256$320000$a4kuCedOQ0q8ourjjswMkW$CN3oOB3yGO/e25PANHQqjaUCrofScTEFqaEUuFhQEmw=',NULL,1,'test@test.com','test',200,'',1,0),('pbkdf2_sha256$320000$rl2PKqEZoQjqxkzN0BLtGm$RpEF4ioH4G37PID4zcle+trkyGJu7XIWqFBP4JzvlEM=',NULL,2,'aaa','aaa',220,'mypage_images/2022/03/28/다운로드.jpg',1,0),('pbkdf2_sha256$320000$tiFt191lGiVwfbxt6c9CfI$KobpB6TtpcVTO6PVHFt7u7SwIUuXwQ4kVqSKW3tsjN8=',NULL,3,'jay@naver.com','jay',600,'mypage_images/2022/04/05/images.jpg',1,0),('pbkdf2_sha256$320000$vH9xXn2LqNwhQP8eZwcgPd$MQ/3RIQ7GpNsQMsh/YWa9pCkwfL1FL34rAd5+Di3VtQ=',NULL,4,'test3@test.com','test3',0,'mypage_images/2022/03/28/쿼카2_yV4bWpD.jpeg',1,0),('pbkdf2_sha256$320000$vskZsoADf7gu0pyKUD1BRz$Z7VL7FyTVDnMzaAcrEsb6moLvrhYit+KmQLjFeE7WKY=',NULL,5,'test4@test.com','test4',0,'mypage_images/2022/03/28/오디가지_vcNyDui.jpg',1,0),('pbkdf2_sha256$320000$3iT59aSe7peeBPox2oAgAv$h1kcAj+1HoLLx+NOsF6Owc60wOnd7hL0sxFBjARWcHE=',NULL,6,'djs02027@gmail.com','djs02027',0,'mypage_images/2022/03/29/오디가지.jpg',1,0),('pbkdf2_sha256$320000$FHgc4mO6AA2PjzgyViL7yd$KW6foW/qxtL5dBXulqoW+o3hvUxOI7xXGRoGXG4fmVo=',NULL,7,'seokwon@ssafy.com','ssafy1',780,'',1,0),('pbkdf2_sha256$320000$jG29xKABg6nXu6qScBYEIF$McGrMRXlA9vY+iGam2Arajetwc90sd7XlM3JsSOccbI=',NULL,8,'sample@naver.com','sample',0,'',1,0),('pbkdf2_sha256$320000$QFMMH6LZIE1BonsQ17DPzg$cBG1vqybHL+VML/T66qSfwKXZIXoy5b2y7kTrXP/K8c=',NULL,9,'ssafycon01@ssafy.com','대전1반컨설턴트',0,'',1,0),('pbkdf2_sha256$320000$oqiKzfHOhk8mdLWNWBRUEc$BkrHyZXhHdwpk5k8XOe+L2Vyt0TWKGs3MP6SDXVY0gw=',NULL,10,'hyg52496@gmail.com','hyg52496',0,'',1,0),('pbkdf2_sha256$320000$Jsh4gGaDmYZUJldZ5uxYpV$Jl8UfLv+JqZZmvhDagN0Bve52buWsZZ/7f5rjcvz2CE=',NULL,11,'ssafy@naver.com','ssafy',0,'',1,0),('pbkdf2_sha256$320000$TpjFnL2Q6vIoT2Sqoh6j6G$NARRQ+Z8QrJOAUF5ThCO6nRoC9gKF9z03S010APE+hw=',NULL,12,'jinyong@naver.com','지뇽',0,'',1,0),('pbkdf2_sha256$320000$FPSyWOZMY0bb2LsHlpQm7o$cVWjubYugzE1R7kOrBI3FPF9uspWVT36QKyJi581ZDY=',NULL,13,'test0','test0',380,'mypage_images/2022/04/01/오디가지.jpg',1,0),('pbkdf2_sha256$320000$TuuBH8U65UbEy0ggbfmqy2$vBz5fLjn7CULWvMEQIMsA5XcIPyfBommh4VdzJqZluE=',NULL,14,'test6','test6',0,'mypage_images/2022/04/01/오디가지_eslKH0R.jpg',1,0),('pbkdf2_sha256$320000$BQaTL3TZNncSG2KP1FtsOw$UH8G3B+GUMcBt01ZV7ayYe+g6uc6i9t7zHch2/qznrE=',NULL,15,'hihi','hihi',0,'',1,0),('pbkdf2_sha256$320000$iOupIxO2rLg51cZXZQRVu6$Lgb5ssURZohEt9zlUF57MbwvWKVcwooyiS8dRLBwv2A=',NULL,16,'hyg8702','hyg8702',1400,'',1,0),('pbkdf2_sha256$320000$7KDODCyP5On5Jw0KVmuszI$aAPlQVNkkC/iGFE8XxX6i6Vg5XfUNLj4dIC/HiKej1M=',NULL,17,'ssafycon01','ssafycon01',0,'',1,0),('pbkdf2_sha256$320000$BzqsD26SgFuaoOc4sLZ6YK$qyfZulTZBEcyGt4WXKai+vHkVfx0Maqc+NhcD1DfM6Y=',NULL,18,'mstkang','몽컨',0,'mypage_images/2022/04/06/icon_bottom_tab5.jpg',1,0),('pbkdf2_sha256$320000$SP1Lao5C88GajnuoXFRI0V$EiCGVJDKy9ic7WOvE5j9e/gOCITdpbdeUUnQva38iT4=',NULL,19,'test12','test12',0,'',1,0),('pbkdf2_sha256$320000$97dQKJeO23aFvVITr32aJB$uFXKjnB42zECLmclrILcxIychAFLpuZVpeojP/IDJPI=',NULL,20,'asdfasdf','asdf',0,'',1,0),('pbkdf2_sha256$320000$J5hy62ln7s6NjxR4MQMfoL$A2Lv24jt3SAIvH7lQyZujKny0hhdjCCYeyJwb7cz2hk=',NULL,21,'jinjin','지뇨옹',0,'',1,0),('pbkdf2_sha256$320000$o4l61lynLGYots1R24AxKs$zNNzHBy1ou6Ob1823FS2eyqztuKeXqYqrhNec/7eWQs=',NULL,22,'xhlrms11','xhlrms11',0,'',1,0);
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;
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
