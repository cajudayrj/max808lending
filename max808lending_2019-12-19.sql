# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: max808lending
# Generation Time: 2019-12-19 05:24:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table LoanPayments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `LoanPayments`;

CREATE TABLE `LoanPayments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `loan_id` varchar(255) NOT NULL DEFAULT '',
  `firstPaymentDate` date DEFAULT NULL,
  `firstPaymentAmount` double DEFAULT NULL,
  `firstPaymentBalance` double DEFAULT NULL,
  `firstPaymentPaid` double DEFAULT NULL,
  `firstPaymentPenalty` double DEFAULT NULL,
  `firstPaymentStatus` varchar(255) DEFAULT NULL,
  `secondPaymentDate` date DEFAULT NULL,
  `secondPaymentAmount` double DEFAULT NULL,
  `secondPaymentPenalty` double DEFAULT NULL,
  `secondPaymentBalance` double DEFAULT NULL,
  `secondPaymentPaid` double DEFAULT NULL,
  `secondPaymentStatus` varchar(255) DEFAULT NULL,
  `thirdPaymentDate` date DEFAULT NULL,
  `thirdPaymentAmount` double DEFAULT NULL,
  `thirdPaymentBalance` double DEFAULT NULL,
  `thirdPaymentPaid` double DEFAULT NULL,
  `thirdPaymentPenalty` double DEFAULT NULL,
  `thirdPaymentStatus` varchar(255) DEFAULT NULL,
  `fourthPaymentDate` date DEFAULT NULL,
  `fourthPaymentAmount` double DEFAULT NULL,
  `fourthPaymentBalance` double DEFAULT NULL,
  `fourthPaymentPaid` double DEFAULT NULL,
  `fourthPaymentPenalty` double DEFAULT NULL,
  `fourthPaymentStatus` varchar(255) DEFAULT NULL,
  `fifthPaymentDate` date DEFAULT NULL,
  `fifthPaymentAmount` double DEFAULT NULL,
  `fifthPaymentBalance` double DEFAULT NULL,
  `fifthPaymentPaid` double DEFAULT NULL,
  `fifthPaymentPenalty` double DEFAULT NULL,
  `fifthPaymentStatus` varchar(255) DEFAULT NULL,
  `sixthPaymentDate` date DEFAULT NULL,
  `sixthPaymentAmount` double DEFAULT NULL,
  `sixthPaymentBalance` double DEFAULT NULL,
  `sixthPaymentPaid` double DEFAULT NULL,
  `sixthPaymentPenalty` double DEFAULT NULL,
  `sixthPaymentStatus` varchar(255) DEFAULT NULL,
  `seventhPaymentDate` date DEFAULT NULL,
  `seventhPaymentAmount` double DEFAULT NULL,
  `seventhPaymentBalance` double DEFAULT NULL,
  `seventhPaymentPaid` double DEFAULT NULL,
  `seventhPaymentPenalty` double DEFAULT NULL,
  `seventhPaymentStatus` varchar(255) DEFAULT NULL,
  `eighthPaymentDate` date DEFAULT NULL,
  `eighthPaymentAmount` double DEFAULT NULL,
  `eighthPaymentBalance` double DEFAULT NULL,
  `eighthPaymentPaid` double DEFAULT NULL,
  `eighthPaymentPenalty` double DEFAULT NULL,
  `eighthPaymentStatus` varchar(255) DEFAULT NULL,
  `ninthPaymentDate` date DEFAULT NULL,
  `ninthPaymentAmount` double DEFAULT NULL,
  `ninthPaymentBalance` double DEFAULT NULL,
  `ninthPaymentPaid` double DEFAULT NULL,
  `ninthPaymentPenalty` double DEFAULT NULL,
  `ninthPaymentStatus` varchar(255) DEFAULT NULL,
  `tenthPaymentDate` date DEFAULT NULL,
  `tenthPaymentAmount` double DEFAULT NULL,
  `tenthPaymentBalance` double DEFAULT NULL,
  `tenthPaymentPaid` double DEFAULT NULL,
  `tenthPaymentPenalty` double DEFAULT NULL,
  `tenthPaymentStatus` varchar(255) DEFAULT NULL,
  `eleventhPaymentDate` date DEFAULT NULL,
  `eleventhPaymentAmount` double DEFAULT NULL,
  `eleventhPaymentBalance` double DEFAULT NULL,
  `eleventhPaymentPaid` double DEFAULT NULL,
  `eleventhPaymentPenalty` double DEFAULT NULL,
  `eleventhPaymentStatus` varchar(255) DEFAULT NULL,
  `twelfthPaymentDate` date DEFAULT NULL,
  `twelfthPaymentAmount` double DEFAULT NULL,
  `twelfthPaymentBalance` double DEFAULT NULL,
  `twelfthPaymentPaid` double DEFAULT NULL,
  `twelfthPaymentPenalty` double DEFAULT NULL,
  `twelfthPaymentStatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `LoanPayments` WRITE;
/*!40000 ALTER TABLE `LoanPayments` DISABLE KEYS */;

INSERT INTO `LoanPayments` (`id`, `loan_id`, `firstPaymentDate`, `firstPaymentAmount`, `firstPaymentBalance`, `firstPaymentPaid`, `firstPaymentPenalty`, `firstPaymentStatus`, `secondPaymentDate`, `secondPaymentAmount`, `secondPaymentPenalty`, `secondPaymentBalance`, `secondPaymentPaid`, `secondPaymentStatus`, `thirdPaymentDate`, `thirdPaymentAmount`, `thirdPaymentBalance`, `thirdPaymentPaid`, `thirdPaymentPenalty`, `thirdPaymentStatus`, `fourthPaymentDate`, `fourthPaymentAmount`, `fourthPaymentBalance`, `fourthPaymentPaid`, `fourthPaymentPenalty`, `fourthPaymentStatus`, `fifthPaymentDate`, `fifthPaymentAmount`, `fifthPaymentBalance`, `fifthPaymentPaid`, `fifthPaymentPenalty`, `fifthPaymentStatus`, `sixthPaymentDate`, `sixthPaymentAmount`, `sixthPaymentBalance`, `sixthPaymentPaid`, `sixthPaymentPenalty`, `sixthPaymentStatus`, `seventhPaymentDate`, `seventhPaymentAmount`, `seventhPaymentBalance`, `seventhPaymentPaid`, `seventhPaymentPenalty`, `seventhPaymentStatus`, `eighthPaymentDate`, `eighthPaymentAmount`, `eighthPaymentBalance`, `eighthPaymentPaid`, `eighthPaymentPenalty`, `eighthPaymentStatus`, `ninthPaymentDate`, `ninthPaymentAmount`, `ninthPaymentBalance`, `ninthPaymentPaid`, `ninthPaymentPenalty`, `ninthPaymentStatus`, `tenthPaymentDate`, `tenthPaymentAmount`, `tenthPaymentBalance`, `tenthPaymentPaid`, `tenthPaymentPenalty`, `tenthPaymentStatus`, `eleventhPaymentDate`, `eleventhPaymentAmount`, `eleventhPaymentBalance`, `eleventhPaymentPaid`, `eleventhPaymentPenalty`, `eleventhPaymentStatus`, `twelfthPaymentDate`, `twelfthPaymentAmount`, `twelfthPaymentBalance`, `twelfthPaymentPaid`, `twelfthPaymentPenalty`, `twelfthPaymentStatus`)
VALUES
	(10,'ln1575797235508','2020-01-02',5000,0,5000,0,'Paid','2020-01-17',5000,250,0,5250,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid'),
	(11,'ln1575507839490','2020-01-02',1000,0,1400,400,'Paid','2020-01-17',1000,0,0,1000,'Paid','2020-02-01',1000,0,1000,0,'Paid','2020-02-16',1000,0,1000,0,'Paid','2020-03-02',1000,0,1000,0,'Paid','2020-03-17',1000,0,1000,0,'Paid','2020-04-01',1000,0,1000,0,'Paid','2020-04-16',1000,0,1000,0,'Paid','2020-05-01',1000,0,1000,0,'Paid','2020-05-16',1000,0,1000,0,'Paid','2020-05-31',1000,0,1000,0,'Paid','2020-06-15',1000,0,1000,0,'Paid'),
	(15,'ln1576633613878','2020-01-02',4000,0,4000,0,'Paid','2020-01-17',4000,0,0,4000,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid',NULL,0,0,0,0,'Paid');

/*!40000 ALTER TABLE `LoanPayments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Loans
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Loans`;

CREATE TABLE `Loans` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `user_id` varchar(255) NOT NULL DEFAULT '',
  `amount` int(11) NOT NULL,
  `terms` int(11) NOT NULL,
  `financeCharge` int(11) DEFAULT '0',
  `processingFee` int(11) DEFAULT '2',
  `serviceFee` int(11) DEFAULT '0',
  `penaltyCharge` int(11) DEFAULT '0',
  `loanProceeds` int(11) DEFAULT NULL,
  `loanDate` date DEFAULT NULL,
  `approvedDate` date DEFAULT NULL,
  `acceptedDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `loanStatus` varchar(255) DEFAULT NULL,
  `loanBalance` int(11) DEFAULT NULL,
  `loanPaid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Loans` WRITE;
/*!40000 ALTER TABLE `Loans` DISABLE KEYS */;

INSERT INTO `Loans` (`id`, `user_id`, `amount`, `terms`, `financeCharge`, `processingFee`, `serviceFee`, `penaltyCharge`, `loanProceeds`, `loanDate`, `approvedDate`, `acceptedDate`, `dueDate`, `loanStatus`, `loanBalance`, `loanPaid`)
VALUES
	('ln1575507839490','max1575507316549',12000,180,3,2,5,400,10800,'2019-12-05','2019-12-18','2019-12-18','2020-06-15','Fully Paid',0,12400),
	('ln1575797235508','max1575722402711',10000,30,0,2,0,250,9800,'2019-12-08','2019-12-18','2019-12-18','2020-01-17','Fully Paid',0,10250),
	('ln1576633613878','max1576633444299',8000,30,2,2,2,0,7520,'2019-12-18','2019-12-18','2019-12-18','2020-01-17','Fully Paid',0,8000);

/*!40000 ALTER TABLE `Loans` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserDocuments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserDocuments`;

CREATE TABLE `UserDocuments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL DEFAULT '',
  `payslipOne` varchar(255) NOT NULL DEFAULT '',
  `payslipTwo` varchar(255) NOT NULL DEFAULT '',
  `validIdOne` varchar(255) NOT NULL DEFAULT '',
  `validIdTwo` varchar(255) NOT NULL DEFAULT '',
  `coe` varchar(255) NOT NULL DEFAULT '',
  `billingStatement` varchar(255) NOT NULL DEFAULT '',
  `bankTransaction` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserDocuments` WRITE;
/*!40000 ALTER TABLE `UserDocuments` DISABLE KEYS */;

INSERT INTO `UserDocuments` (`id`, `user_id`, `payslipOne`, `payslipTwo`, `validIdOne`, `validIdTwo`, `coe`, `billingStatement`, `bankTransaction`)
VALUES
	(1,'max1575507316549','1575508931144-3.1-Loans-Awaiting-Approval_VD.jpg','1575508931151-3.1-Loans-Awaiting-Approval_VD.jpg','1575508931157-3.1-Loans-Awaiting-Approval_VD.jpg','1575508931161-3.1-Loans-Awaiting-Approval_VD.jpg','1575508931163-3.1-Loans-Awaiting-Approval_VD.jpg','1575508931166-3.1-Loans-Awaiting-Approval_VD.jpg','1575508931169-3.1-Loans-Awaiting-Approval_VD.jpg'),
	(2,'max1575722402711','1575797321391-3.1-Loans-Awaiting-Approval_VD.jpg','1575797321398-3.1-Loans-Awaiting-Approval_VD.jpg','1575797321404-3.1-Loans-Awaiting-Approval_VD.jpg','1575797321407-3.1-Loans-Awaiting-Approval_VD.jpg','1575797321410-3.1-Loans-Awaiting-Approval_VD.jpg','1575797321412-3.1-Loans-Awaiting-Approval_VD.jpg','1575797321415-3.1-Loans-Awaiting-Approval_VD.jpg'),
	(3,'max1576633444299','1576633711951-max808logo-footer.png','1576633711953-max808logo-footer.png','1576633711956-max808logo-footer.png','1576633711958-max808logo-footer.png','1576633711959-max808logo-footer.png','1576633711962-max808logo-footer.png','1576633711963-max808logo-footer.png');

/*!40000 ALTER TABLE `UserDocuments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserInformation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserInformation`;

CREATE TABLE `UserInformation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL DEFAULT '',
  `officeName` varchar(255) DEFAULT NULL,
  `officeAddress` varchar(255) DEFAULT NULL,
  `officeTelephone` varchar(255) DEFAULT NULL,
  `officePosition` varchar(255) DEFAULT NULL,
  `dateOfPayout` int(11) DEFAULT NULL,
  `officePayrollAccount` varchar(255) DEFAULT NULL,
  `bankCheckingAccount` varchar(255) DEFAULT NULL,
  `existingLoan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserInformation` WRITE;
/*!40000 ALTER TABLE `UserInformation` DISABLE KEYS */;

INSERT INTO `UserInformation` (`id`, `user_id`, `officeName`, `officeAddress`, `officeTelephone`, `officePosition`, `dateOfPayout`, `officePayrollAccount`, `bankCheckingAccount`, `existingLoan`)
VALUES
	(1,'max1575507316549','CNT','JMT Condominium','1912741724','FE Dev',30,'BDO','BPI',''),
	(2,'max1575722402711','Congoa International','2A Ground Floor 707 Shaw Boulevard','4812475712','General Accountant',30,'Eastwest','BDO',''),
	(3,'max1576633444299','Cognoa International','2A Ground Floor 707 Shaw Boulevard','09123456','Accountant',30,'Eastwest','BDO','');

/*!40000 ALTER TABLE `UserInformation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserLevels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserLevels`;

CREATE TABLE `UserLevels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserLevels` WRITE;
/*!40000 ALTER TABLE `UserLevels` DISABLE KEYS */;

INSERT INTO `UserLevels` (`id`, `level`)
VALUES
	(1,'administrator'),
	(2,'borrower');

/*!40000 ALTER TABLE `UserLevels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserReferences
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserReferences`;

CREATE TABLE `UserReferences` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `officemateName` varchar(255) DEFAULT NULL,
  `officemateDepartment` varchar(255) DEFAULT NULL,
  `officematePosition` varchar(255) DEFAULT NULL,
  `officemateMobileNum` varchar(255) DEFAULT NULL,
  `officemateEmail` varchar(255) DEFAULT NULL,
  `friendName` varchar(255) DEFAULT NULL,
  `friendMobileNum` varchar(255) DEFAULT NULL,
  `friendEmail` varchar(255) DEFAULT NULL,
  `familyName` varchar(255) DEFAULT NULL,
  `familyMobileNum` varchar(255) DEFAULT NULL,
  `familyEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserReferences` WRITE;
/*!40000 ALTER TABLE `UserReferences` DISABLE KEYS */;

INSERT INTO `UserReferences` (`id`, `user_id`, `officemateName`, `officemateDepartment`, `officematePosition`, `officemateMobileNum`, `officemateEmail`, `friendName`, `friendMobileNum`, `friendEmail`, `familyName`, `familyMobileNum`, `familyEmail`)
VALUES
	(1,'max1575507316549','Coach Jr.','Tech Dept.','Sr. FE Dev','01928451234','coach@cnttttesstt.com','Carlo Sarmiento','10294857161','carlo@mail.com','Judy Idanan','01948284412','judyidnan@mail.com'),
	(2,'max1575722402711','Arra something','Accounting','Assistant Accountant','12491258158','caasdijasid@mail.com','Caryl Salvador','11245678235','carylandshai@mail.com','Pas Somido','09182456783','passomido@mail.com'),
	(3,'max1576633444299','Arrah Dikolam Apelyido','Accounting','Accountant','10294851241','arrah@cognoa.com','Jonas Surban','12491827412','jonassurban@randommailhere.com','Pas Somido','10294815123','passomido@mailsamplerandom.com');

/*!40000 ALTER TABLE `UserReferences` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `firstName` varchar(50) NOT NULL DEFAULT '',
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL DEFAULT '',
  `mobileNum` varchar(50) DEFAULT '',
  `gender` varchar(50) DEFAULT '',
  `birthday` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `town` varchar(255) DEFAULT NULL,
  `cityProvince` varchar(255) DEFAULT NULL,
  `maritalStatus` varchar(50) DEFAULT NULL,
  `accountStatus` varchar(50) DEFAULT NULL,
  `userLevel` int(11) DEFAULT NULL,
  `accountVerificationToken` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `username`, `password`, `email`, `firstName`, `middleName`, `lastName`, `mobileNum`, `gender`, `birthday`, `address`, `town`, `cityProvince`, `maritalStatus`, `accountStatus`, `userLevel`, `accountVerificationToken`)
VALUES
	('max1575507316549','rjcajuday','$2a$10$9rlzdogkbraTyFmLPM57O.qrOVlcCl0i.F4/KgHFVgbVZVLIZt1TG','rey_jude100@yahoo.com','Rey Jude','Idanan','Cajuday','09955431780','Male','1996-12-05','433 San Isidro Village','Virac','Catanduanes','Single','active',2,'2a109rlzdogkbraTyFmLPM57OkaP3D9uuiiAiNg64hnf209s6mOkRo6'),
	('max1575693551611','max808admin','$2a$10$1otqOcZFl233Sc8KcC7Lk.LobeJEhgvcLxY4vZwStun4V0mXGurXq','cajuday.reyjude@gmail.com','Freddie',NULL,'Francisco','','',NULL,NULL,NULL,NULL,NULL,'active',1,'2a101otqOcZFl233Sc8KcC7LkoLb4SA7qzKkNmC1o3YKW1jS0MclkMXq'),
	('max1575722402711','kenjiball','$2a$10$07ubyorKBMqKYuh3Ao7kKe16pCFVQZtNRaNjn5F59QH5rGejKXJJq','ariahssomido@gmail.com','Shaira','Suarez','Somido','129412747124712','Female','1988-12-03','2A Ground Floor 707 Shaw Boulevard','Pasig','Metro Manila','Single','active',2,'2a1007ubyorKBMqKYuh3Ao7kKelvk2DcQQu3nd2IEE3L23obKiPRsEW'),
	('max1576633444299','ariahs','$2a$10$U1tZgsG0j6J9IcbpH90Wbe3Bqls5JbLJBcuShtqPb8E0iQ9Eo0xdC','shairasomido@yahoo.com','Shai','Suarez','Somido','09434285766','Female','1995-05-27','2A Ground Floor 707 Shaw Boulevard','Pasig','Metro Manila','Single','active',2,'2a10U1tZgsG0j6J9IcbpH90WbeeUuOAAzof0oFwCAf0P2Uw5OIzu4eO');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
