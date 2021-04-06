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
CREATE DATABASE IF NOT EXISTS `laporkeun` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `laporkeun`;

-- Dumping structure for procedure laporkeun.availibility
DELIMITER //
CREATE PROCEDURE `availibility`(
	IN `name_pengguna` VARCHAR(255),
	IN `nik` VARCHAR(255)
)
BEGIN
	SELECT * FROM penggunas WHERE penggunas.name_pengguna = name_pengguna;
	SELECT * FROM penggunas WHERE penggunas.NIK = nik;
	SELECT * FROM petugass WHERE petugass.name_petugas = name_pengguna;
END//
DELIMITER ;

-- Dumping structure for procedure laporkeun.detailReport
DELIMITER //
CREATE PROCEDURE `detailReport`(
	IN `id` INT(255),
	IN `nik` VARCHAR(255)
)
BEGIN
	SELECT rep.id_report, pet.id_petugas, res.id_response, rep.pic, rep.title, rep.report, rep.date_report, res.date_response, rep.vis, rep.stat, res.response, pet.name_petugas, pen. name_pengguna, pen.NIK, rep.loc FROM penggunas as pen LEFT JOIN reports as rep ON pen.NIK = rep.NIK LEFT JOIN responses as res ON rep.id_response = res.id_response LEFT JOIN petugass as pet ON res.id_petugas = pet.id_petugas WHERE rep.id_report = id AND pen.NIK = nik; 
END//
DELIMITER ;

-- Dumping structure for procedure laporkeun.detailReportPetugas
DELIMITER //
CREATE PROCEDURE `detailReportPetugas`(
	IN `id` INT(255),
	IN `petugas` INT(255)
)
BEGIN
	SELECT rep. id_report, pet. id_petugas, res.id_response, rep.pic, rep.title, rep. report, rep. date_report, res.date_response, rep.vis, rep.stat, res. response, pet. name_petugas, pen. name_pengguna, pen.NIK FROM penggunas as pen LEFT JOIN reports as rep ON pen.NIK = rep.NIK LEFT JOIN responses as res ON rep.id_response = res.id_response LEFT JOIN petugass as pet ON res.id_petugas = pet.id_petugas WHERE rep.id_report = id AND pet.id_petugas = petugas; 
END//
DELIMITER ;

-- Dumping structure for procedure laporkeun.finduser
DELIMITER //
CREATE PROCEDURE `finduser`(
	IN `name` VARCHAR(255)
)
BEGIN
	SELECT * FROM penggunas WHERE penggunas.name_pengguna = name;
	SELECT * FROM petugass WHERE petugass.name_petugas = name;
END//
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

-- Dumping data for table laporkeun.penggunas: ~1 rows (approximately)
/*!40000 ALTER TABLE `penggunas` DISABLE KEYS */;
INSERT INTO `penggunas` (`name_pengguna`, `password`, `NIK`, `telp`, `pic`, `id_role`, `date_akun`) VALUES
	('Yusril', '$2b$10$tTr3d9AnRmAyN/NBXwb/DOznWqloMGO3C5AYDhHvhdBNv3sJTv4Bm', '8798798798797898', '82245494050', 'Yusril_1617732600718.WIN_20210407_01_09_23_Pro,jpg', 2, '2021-03-23');
/*!40000 ALTER TABLE `penggunas` ENABLE KEYS */;

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

-- Dumping data for table laporkeun.petugass: ~0 rows (approximately)
/*!40000 ALTER TABLE `petugass` DISABLE KEYS */;
INSERT INTO `petugass` (`id_petugas`, `name_petugas`, `date_akun`, `password`, `telp`, `pic`, `id_role`, `createdAt`) VALUES
	(22, 'laporkeun', '2021-03-28', '$2b$10$PpFUkURC1z7PdpUPTAlNvuaGHPl8zVebc1ZWNzNW7TXaWZIVmNTKy', NULL, NULL, 1, '2021-03-28 20:16:35');
/*!40000 ALTER TABLE `petugass` ENABLE KEYS */;

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
  `loc` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_report`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table laporkeun.reports: ~0 rows (approximately)
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;

-- Dumping structure for table laporkeun.responses
CREATE TABLE IF NOT EXISTS `responses` (
  `id_response` int(255) NOT NULL AUTO_INCREMENT,
  `id_petugas` int(255) NOT NULL,
  `id_report` int(255) NOT NULL,
  `response` longtext NOT NULL,
  `date_response` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_response`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table laporkeun.responses: ~0 rows (approximately)
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;

-- Dumping structure for table laporkeun.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` int(20) NOT NULL AUTO_INCREMENT,
  `role` enum('admin','pengguna','petugas') NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table laporkeun.roles: ~3 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id_role`, `role`) VALUES
	(1, 'admin'),
	(2, 'pengguna'),
	(3, 'petugas');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
