# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: max808lending
# Generation Time: 2020-01-03 15:04:12 +0000
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
  `firstPaymentAmount` float DEFAULT NULL,
  `firstPaymentBalance` float DEFAULT NULL,
  `firstPaymentPaid` float DEFAULT NULL,
  `firstPaymentPenalty` float DEFAULT NULL,
  `firstPaymentStatus` varchar(255) DEFAULT NULL,
  `secondPaymentDate` date DEFAULT NULL,
  `secondPaymentAmount` float DEFAULT NULL,
  `secondPaymentPenalty` float DEFAULT NULL,
  `secondPaymentBalance` float DEFAULT NULL,
  `secondPaymentPaid` float DEFAULT NULL,
  `secondPaymentStatus` varchar(255) DEFAULT NULL,
  `thirdPaymentDate` date DEFAULT NULL,
  `thirdPaymentAmount` float DEFAULT NULL,
  `thirdPaymentBalance` float DEFAULT NULL,
  `thirdPaymentPaid` float DEFAULT NULL,
  `thirdPaymentPenalty` float DEFAULT NULL,
  `thirdPaymentStatus` varchar(255) DEFAULT NULL,
  `fourthPaymentDate` date DEFAULT NULL,
  `fourthPaymentAmount` float DEFAULT NULL,
  `fourthPaymentBalance` float DEFAULT NULL,
  `fourthPaymentPaid` float DEFAULT NULL,
  `fourthPaymentPenalty` float DEFAULT NULL,
  `fourthPaymentStatus` varchar(255) DEFAULT NULL,
  `fifthPaymentDate` date DEFAULT NULL,
  `fifthPaymentAmount` float DEFAULT NULL,
  `fifthPaymentBalance` float DEFAULT NULL,
  `fifthPaymentPaid` float DEFAULT NULL,
  `fifthPaymentPenalty` float DEFAULT NULL,
  `fifthPaymentStatus` varchar(255) DEFAULT NULL,
  `sixthPaymentDate` date DEFAULT NULL,
  `sixthPaymentAmount` float DEFAULT NULL,
  `sixthPaymentBalance` float DEFAULT NULL,
  `sixthPaymentPaid` float DEFAULT NULL,
  `sixthPaymentPenalty` float DEFAULT NULL,
  `sixthPaymentStatus` varchar(255) DEFAULT NULL,
  `seventhPaymentDate` date DEFAULT NULL,
  `seventhPaymentAmount` float DEFAULT NULL,
  `seventhPaymentBalance` float DEFAULT NULL,
  `seventhPaymentPaid` float DEFAULT NULL,
  `seventhPaymentPenalty` float DEFAULT NULL,
  `seventhPaymentStatus` varchar(255) DEFAULT NULL,
  `eighthPaymentDate` date DEFAULT NULL,
  `eighthPaymentAmount` float DEFAULT NULL,
  `eighthPaymentBalance` float DEFAULT NULL,
  `eighthPaymentPaid` float DEFAULT NULL,
  `eighthPaymentPenalty` float DEFAULT NULL,
  `eighthPaymentStatus` varchar(255) DEFAULT NULL,
  `ninthPaymentDate` date DEFAULT NULL,
  `ninthPaymentAmount` float DEFAULT NULL,
  `ninthPaymentBalance` float DEFAULT NULL,
  `ninthPaymentPaid` float DEFAULT NULL,
  `ninthPaymentPenalty` float DEFAULT NULL,
  `ninthPaymentStatus` varchar(255) DEFAULT NULL,
  `tenthPaymentDate` date DEFAULT NULL,
  `tenthPaymentAmount` float DEFAULT NULL,
  `tenthPaymentBalance` float DEFAULT NULL,
  `tenthPaymentPaid` float DEFAULT NULL,
  `tenthPaymentPenalty` float DEFAULT NULL,
  `tenthPaymentStatus` varchar(255) DEFAULT NULL,
  `eleventhPaymentDate` date DEFAULT NULL,
  `eleventhPaymentAmount` float DEFAULT NULL,
  `eleventhPaymentBalance` float DEFAULT NULL,
  `eleventhPaymentPaid` float DEFAULT NULL,
  `eleventhPaymentPenalty` float DEFAULT NULL,
  `eleventhPaymentStatus` varchar(255) DEFAULT NULL,
  `twelfthPaymentDate` date DEFAULT NULL,
  `twelfthPaymentAmount` float DEFAULT NULL,
  `twelfthPaymentBalance` float DEFAULT NULL,
  `twelfthPaymentPaid` float DEFAULT NULL,
  `twelfthPaymentPenalty` float DEFAULT NULL,
  `twelfthPaymentStatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



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
  `penaltyCharge` float DEFAULT '0',
  `loanProceeds` int(11) DEFAULT NULL,
  `loanDate` date DEFAULT NULL,
  `approvedDate` date DEFAULT NULL,
  `acceptedDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `loanStatus` varchar(255) DEFAULT NULL,
  `loanBalance` float DEFAULT NULL,
  `loanPaid` float DEFAULT '0',
  `loanType` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



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
	('max1575693551611','max808admin','$2y$10$2SN6d6diB6GydStjJ6vejOmkZvwWNwH9PFEVwRWKIwYDYUlV.s1Qe','freddiefrancisco0205@gmail.com','Freddie',NULL,'Francisco','','',NULL,NULL,NULL,NULL,NULL,'active',1,'2a101otqOcZFl233Sc8KcC7LkoLb4SA7qzKkNmC1o3YKW1jS0MclkMXq');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserTransactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserTransactions`;

CREATE TABLE `UserTransactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `loan_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `transactionDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
