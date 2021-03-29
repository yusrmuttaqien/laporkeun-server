-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.17-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for laporkeun
CREATE DATABASE IF NOT EXISTS `laporkeun` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `laporkeun`;

-- Dumping structure for procedure laporkeun.availibility
DELIMITER //
//
DELIMITER ;

-- Dumping structure for procedure laporkeun.detailReport
DELIMITER //
//
DELIMITER ;

-- Dumping structure for procedure laporkeun.detailReportPetugas
DELIMITER //
//
DELIMITER ;

-- Dumping structure for procedure laporkeun.finduser
DELIMITER //
//
DELIMITER ;

-- Dumping structure for table laporkeun.penggunas
CREATE TABLE IF NOT EXISTS `penggunas` (
  `name_pengguna` varchar(225) NOT NULL,
  `password` longtext NOT NULL,
  `NIK` varchar(255) NOT NULL,
  `telp` text DEFAULT NULL,
  `pic` text DEFAULT NULL,
  `id_role` int(255) NOT NULL,
  `date_akun` date NOT NULL,
  PRIMARY KEY (`NIK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table laporkeun.petugass
CREATE TABLE IF NOT EXISTS `petugass` (
  `id_petugas` int(255) NOT NULL AUTO_INCREMENT,
  `name_petugas` varchar(255) NOT NULL,
  `date_akun` date NOT NULL,
  `password` longtext NOT NULL,
  `telp` varchar(255) DEFAULT NULL,
  `pic` text DEFAULT NULL,
  `id_role` int(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_petugas`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table laporkeun.reports
CREATE TABLE IF NOT EXISTS `reports` (
  `id_report` int(255) NOT NULL AUTO_INCREMENT,
  `NIK` varchar(255) NOT NULL,
  `id_response` int(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `report` longtext NOT NULL,
  `date_report` date NOT NULL,
  `pic` text DEFAULT NULL,
  `vis` enum('Publik','Privat') NOT NULL,
  `stat` enum('Diterima','Ditolak','Menunggu') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_report`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table laporkeun.responses
CREATE TABLE IF NOT EXISTS `responses` (
  `id_response` int(255) NOT NULL AUTO_INCREMENT,
  `id_petugas` int(255) NOT NULL,
  `id_report` int(255) NOT NULL,
  `response` longtext NOT NULL,
  `date_response` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_response`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table laporkeun.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` int(20) NOT NULL AUTO_INCREMENT,
  `role` enum('admin','pengguna','petugas') NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
