-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: testifyiq
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qualification` enum('Matric','Intermediate','Graduation') DEFAULT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL,
  `question` text,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `option4` varchar(255) DEFAULT NULL,
  `correct_option` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (14,'Matric','Easy','Which word is the odd one out?','Apple','Rose','Grapes','Mango',2),
(15,'Matric','Easy','If 1=5, 2=10, 3=15, 4=20, then 5=?','25','1','30','5',1),
(16,'Matric','Easy','Which shape comes next: Circle, Square, Circle, Square, ...?','Triangle','Circle','Square','Star',2),
(17,'Matric','Easy','Finger is to Hand as Leaf is to:','Tree','Branch','Flower','Root',2),
(18,'Matric','Easy','Which number is missing in the pattern: 2, 5, 8, 11, ?','13','14','15','12',2),
(19,'Matric','Easy','A train is moving South. Which way is the smoke blowing if there is no wind?','North','South','East','None (Electric train)',4),
(20,'Matric','Easy','I have keys but no locks. I have a space but no room. You can enter, but never leave. What am I?','A Map','A Keyboard','A Book','A Clock',2),
(21,'Matric','Easy','If today is Monday, what day was it 2 days ago?','Saturday','Sunday','Friday','Tuesday',1),
(22,'Matric','Easy','Which of these is the heaviest?','1kg of Iron','1kg of Cotton','1kg of Wood','They are all equal',4),
(23,'Matric','Easy','Look at this series: 36, 34, 30, 28, 24, ... What number should come next?','22','20','23','26',1),
(24,'Matric','Easy','Which word can be placed before \"ball\", \"stick\", and \"room\"?','Foot','Sun','Base','Bath',4),
(25,'Matric','Easy','If a doctor gives you 3 pills and says take one every 30 minutes, how many minutes until they are gone?','90','60','30','0',2),
(26,'Matric','Easy','Which number is the \"odd one out\": 9, 16, 25, 30, 36?','9','25','30','36',3),
(27,'Matric','Easy','What has a face and two hands but no arms or legs?','A Human','A Clock','A Mirror','A Chair',2),
(28,'Matric','Easy','If \"DOG\" is 4157, what is \"CAT\" using the same alphabet-number logic?','3120','3119','1234','3521',1),
(29,'Matric','Easy','Which of these is the most like: Square, Triangle, Pentagon?','Circle','Line','Hexagon','Point',3),
(30,'Matric','Easy','A boy has as many sisters as brothers, but each sister has only half as many sisters as brothers. how many boys are there?','3','4','2','5',2),
(31,'Matric','Easy','If you turn a left-hand glove inside out, which hand will it fit?','Left','Right','Both','None',2),
(32,'Matric','Easy','Which letter comes next in the sequence: A, C, E, G, ...?','H','I','J','K',2),
(33,'Matric','Easy','What goes up but never comes down?','A Balloon','Your Age','A Plane','Rain',2),
(34,'Intermediate','Medium','Which number should come next in the series: 1, 1, 2, 3, 5, 8, 13, ...?','18','21','24','20',2),
(35,'Intermediate','Medium','If all Bloops are Razzies and all Razzies are Lurgis, are all Bloops definitely Lurgis?','Yes','No','Maybe','None',1),(36,'Intermediate','Medium','A clock shows 3:15. What is the angle between the hour and minute hands?','0°','7.5°','15°','5°',2),(37,'Intermediate','Medium','Find the missing number: 8, 27, 64, 125, ?','216','250','225','196',1),(38,'Intermediate','Medium','If \"LIGHT\" is coded as \"MJHIT\", how is \"DARK\" coded?','EBSL','ECSL','EBTL','EBSM',1),(39,'Intermediate','Medium','Which word does NOT belong with the others?','Tyre','Steering Wheel','Engine','Car',4),(40,'Intermediate','Medium','If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?','100 mins','50 mins','5 mins','1 min',3),(41,'Intermediate','Medium','Which number is 1/4 of 1/2 of 1/5 of 200?','2.5','5','10','25',2),(42,'Intermediate','Medium','Find the missing letter: B, D, G, K, ?','M','N','O','P',4),(43,'Intermediate','Medium','If you rotate a 3D cube, which of the following cannot be a view of the same cube?','Mirror image','Top view','Side view','Inside view',1),(44,'Intermediate','Medium','What is the next prime number after 19?','21','23','25','27',2),(45,'Intermediate','Medium','If 7 men can build a house in 70 days, how many days would it take 70 men to build the same house?','700','10','7','1',2),(46,'Intermediate','Medium','Which word is an antonym of \"Meticulous\"?','Careful','Sloppy','Detailed','Fast',2),(47,'Intermediate','Medium','Find the missing number: 2, 6, 12, 20, 30, ?','40','42','44','46',2),(48,'Intermediate','Medium','If you are running a race and you pass the person in 2nd place, what place are you in?','1st','2nd','3rd','None',2),(49,'Intermediate','Medium','A farmer has 17 sheep and all but 9 die. How many sheep are left?','17','8','9','0',3),(50,'Intermediate','Medium','Which of these is most similar to \"Hand, Foot, Knee\"?','Eye','Elbow','Ear','Tooth',2),(51,'Intermediate','Medium','If a square?s side is doubled, by how much does its area increase?','2 times','3 times','4 times','8 times',3),(52,'Intermediate','Medium','What is the missing number: 100, 95, 85, 70, ?','50','60','55','45',1),(53,'Intermediate','Medium','If \"BLUE\" is 40, what is \"RED\" using A=1, B=2 logic?','27','30','33','35',1),(54,'Graduation','Hard','If all A are B and some B are C, which of the following MUST be true?','All A are C','Some A are C','Some B are A','No A are C',3),(55,'Graduation','Hard','A cube is painted red on all sides and then cut into 27 small equal cubes. How many small cubes have only TWO sides painted?','8','12','6','10',2),(56,'Graduation','Hard','If 3rd December 2023 was a Sunday, what day of the week was 3rd December 2020?','Thursday','Friday','Wednesday','Tuesday',1),(57,'Graduation','Hard','Find the missing number in the matrix: [[4, 9, 2], [3, 5, 7], [8, 1, ?]]','6','4','0','9',1),(58,'Graduation','Hard','In a family, a man has 6 sons and each son has a sister. How many people are in the family (including parents)?','15','9','14','10',2),(59,'Graduation','Hard','If \"MOUNTAIN\" is written as \"MNIATUON\", how is \"UNIVERSE\" written?','UVSREINE','UESREVIN','UVNRESIE','UESRNEIV',2),(60,'Graduation','Hard','Pointing to a photograph, a man said, \"I have no brother or sister, but that man\'s father is my father\'s son.\" Who was in the photograph?','His son','His father','Himself','His nephew',1),(61,'Graduation','Hard','Which number replaces the question mark: 7, 15, 32, 67, ?','134','138','140','137',4),(62,'Graduation','Hard','A man walks 3km North, then 4km East. How far is he from his starting point?','7km','1km','5km','12km',3),(63,'Graduation','Hard','Which word is the odd one out?','Socrates','Plato','Aristotle','Newton',4),(64,'Graduation','Hard','What is the next number: 2, 3, 5, 7, 11, 13, 17, ...?','19','21','23','20',1),(65,'Graduation','Hard','If 1+4=5, 2+5=12, 3+6=21, then 8+11=?','19','40','96','52',3),(66,'Graduation','Hard','If a clock strikes 6 times in 5 seconds, how many times will it strike in 10 seconds?','12','11','10','13',2),(67,'Graduation','Hard','A group of 1200 persons consisting of captains and soldiers is travelling in a train. For every 15 soldiers there is one captain. How many captains are in the group?','80','70','75','85',3),(68,'Graduation','Hard','Which number is the lowest: 0.5, 0.05, 0.55, 0.005?','0.5','0.05','0.55','0.005',4),(69,'Graduation','Hard','If WATER is written as YCVGT, then HKTG is written as?','FIRE','COLD','HEAT','WIND',1),(70,'Graduation','Hard','Find the missing number: 1, 8, 27, 64, 125, ?','216','250','225','196',1),(71,'Graduation','Hard','If you rearrange the letters \"BARBIT\", you get the name of a:','City','Animal','Ocean','Fruit',2),(72,'Graduation','Hard','Six people A, B, C, D, E, F are sitting in a circle. A is between D and B. F is between C and E. C is to the left of D. Who is between A and F?','No one','D and C','B and E','None of these',2),(73,'Graduation','Hard','How many 9s are there between 1 and 100?','10','11','19','20',4);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (1,1,2,4,'2025-12-21 19:08:37'),(2,1,4,4,'2025-12-21 19:11:22'),(3,1,4,4,'2025-12-22 06:03:28'),(4,1,4,10,'2025-12-22 06:48:38');
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `qualification` enum('Matric','Intermediate','Graduation') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Muhammad Huzaifa','m.huzaifa157@gmail.com','$2b$10$aU21fL1ZHXvT6HiPXtDXbOw5FtJ.e/svYE5XdZ.EpDgcB1CKP8dae','Intermediate','2025-12-19 17:39:25'),(4,'Atta Ur Rahman','mhtechinnovation@gmail.com','$2b$10$x5yNAtk0lyFs6MFPkmQ4mektju3OWb0C0ZgdQIQPtqfUDqBBwCk4i','Matric','2025-12-21 13:57:55'),(7,'admin','syedmohammedhuzaifaibrahim@gmail.com','$2b$10$mMUaT2PxwJTlpSCtCSAe3uBUcdDegv3o7XUAztNlaBWsXlCRmTsGq','Graduation','2025-12-21 14:06:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-22 22:55:37
