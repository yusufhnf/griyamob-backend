-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2020 at 08:59 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `griyatest`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminusers`
--

CREATE TABLE `adminusers` (
  `idadmin` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `position` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adminusers`
--

INSERT INTO `adminusers` (`idadmin`, `email`, `password`, `fullname`, `position`) VALUES
(1, 'yusufhnf@gmail.com', '$2b$10$JVAgfmUt8ucH2jH8A0gOme.wRfeNdflLL0bLLV6PNiJpoZuwLTfki', 'Yusuf Umar Hanafi', 'Programmer');

-- --------------------------------------------------------

--
-- Table structure for table `annoucement`
--

CREATE TABLE `annoucement` (
  `idannoucement` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `detail` longtext,
  `admin_idadmin` int(11) NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(100) NOT NULL DEFAULT '/griyatest/img/g-logo.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `annoucement`
--

INSERT INTO `annoucement` (`idannoucement`, `title`, `detail`, `admin_idadmin`, `waktu`, `image`) VALUES
(9, 'Tips Jaga Uang saat Pandemi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', 1, '2020-12-10 17:00:00', '/griyatest/img/notif1.jpg'),
(10, 'Bayar PDAM dapat Mobil', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', 1, '2020-12-11 17:00:00', '/griyatest/img/notif2.png'),
(11, 'HUT GriyaMobile 12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', 1, '2020-12-12 17:00:00', '/griyatest/img/notif3.png'),
(12, 'Spesial Hari Pendidikan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', 1, '2020-12-12 17:00:00', '/griyatest/img/notif4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `loginsession`
--

CREATE TABLE `loginsession` (
  `idloginsession` int(11) NOT NULL,
  `token` varchar(45) DEFAULT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `users_idusers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pdam`
--

CREATE TABLE `pdam` (
  `idpdam` int(4) NOT NULL,
  `namapdam` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pdam`
--

INSERT INTO `pdam` (`idpdam`, `namapdam`) VALUES
(2003, 'PDAM Kab. Maros'),
(2182, 'PDAM Kab. Bantaeng');

-- --------------------------------------------------------

--
-- Table structure for table `promo`
--

CREATE TABLE `promo` (
  `idpromo` int(11) NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `detail` longtext,
  `picture` varchar(150) NOT NULL DEFAULT '/griyatest/img/g-logo.png',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `promo`
--

INSERT INTO `promo` (`idpromo`, `judul`, `detail`, `picture`, `date`) VALUES
(1, 'FRIYAY Dapat Mobil', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', '/griyatest/img/promo1.png', '2020-11-30 03:59:13'),
(2, 'Promo TAP&GO', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', '/griyatest/img/promo2.jpg', '2020-11-30 03:59:13'),
(3, 'Transfer Kemanapun Enak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', '/griyatest/img/promo3.jpeg', '2020-11-30 03:59:13'),
(4, 'Kuy Nonton', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu nunc, varius quis odio vitae, convallis dapibus nulla. Aenean a convallis turpis. Aenean mi leo, hendrerit quis lacus ut, faucibus faucibus felis. Curabitur lectus quam, tristique at urna eu, vestibulum suscipit arcu. Nam nec magna leo. Ut euismod luctus tincidunt. Duis porttitor lorem vitae interdum feugiat. Duis sed odio hendrerit, lobortis diam vitae, iaculis elit.', '/griyatest/img/promo4.jpg', '2020-11-30 03:59:13');

-- --------------------------------------------------------

--
-- Table structure for table `riwayattransaksi`
--

CREATE TABLE `riwayattransaksi` (
  `idriwayattranksaksi` int(11) NOT NULL,
  `action` varchar(12) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `noref` varchar(45) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `detail` mediumtext,
  `users_idusers` int(11) NOT NULL,
  `sumbertarget` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `riwayattransaksi`
--

INSERT INTO `riwayattransaksi` (`idriwayattranksaksi`, `action`, `jumlah`, `noref`, `datetime`, `detail`, `users_idusers`, `sumbertarget`) VALUES
(1, 'K', 20000, '202012122601001', '2020-11-30 02:38:24', 'Bayar PDAM Periode 202011', 26, 'PDAM Kab. Maros'),
(2, 'D', 620000, '202012122602001', '2020-12-03 06:18:57', 'Transfer', 26, '8123456789'),
(6, 'D', 500000, '2020121539036', '2020-11-17 04:06:02', 'Top-up Saldo', 26, 'Admin'),
(7, 'D', 1000, '2020121539047', '2020-12-15 04:17:26', 'Transfer dariYUSUF', 39, '26'),
(8, 'K', 1000, '2020121526047', '2020-12-15 04:17:26', 'Transfer keHANAFI', 26, '39'),
(9, 'D', 50000, '2020121526049', '2020-12-15 04:53:45', 'Transfer dariundefined', 26, '39'),
(10, 'K', 50000, '2020121539049', '2020-12-15 04:53:45', 'Transfer keundefined', 39, '26'),
(11, 'D', 50000, '20201215260411', '2020-12-15 04:56:00', 'Transfer dari Ahmad Hanafi', 26, 'Ahmad Hanafi'),
(12, 'D', 50000, '20201215260412', '2020-12-15 04:57:29', 'Transfer dari Ahmad Hanafi', 26, 'Ahmad Hanafi'),
(13, 'D', 50000, '20201215260413', '2020-12-15 04:57:46', 'Transfer dari Ahmad Hanafi', 26, 'Ahmad Hanafi'),
(14, 'K', 50000, '20201215390413', '2020-12-15 04:57:46', 'Transfer ke Yusuf Umar Hanafi', 39, 'Yusuf Umar Hanafi');

-- --------------------------------------------------------

--
-- Table structure for table `topup`
--

CREATE TABLE `topup` (
  `idtopup` int(11) NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `jumlah` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `users_idusers` int(11) NOT NULL,
  `admin_idadmin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `topup`
--

INSERT INTO `topup` (`idtopup`, `waktu`, `jumlah`, `status`, `users_idusers`, `admin_idadmin`) VALUES
(2, '2020-12-10 03:40:16', 20000, -1, 26, 1),
(3, '2020-11-27 07:30:53', 20000, -1, 26, NULL),
(4, '2020-11-27 07:30:53', 20000, -1, 26, NULL),
(5, '2020-12-10 08:11:05', 20000, 0, 26, 1),
(6, '2020-12-15 03:49:57', 500000, 1, 39, 1),
(7, '2020-12-21 07:33:31', 50000, 0, 39, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transasksipdam`
--

CREATE TABLE `transasksipdam` (
  `idtransasksipdam` int(11) NOT NULL,
  `nosamb` varchar(45) NOT NULL,
  `status` int(1) NOT NULL,
  `tanggalbayar` datetime DEFAULT NULL,
  `noref` varchar(45) DEFAULT NULL,
  `tagihan` int(12) NOT NULL,
  `admin` int(12) NOT NULL,
  `periode` int(6) NOT NULL,
  `pdam` varchar(45) NOT NULL,
  `users_idusers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idusers` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `joined` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '1',
  `saldo` int(20) NOT NULL DEFAULT '0',
  `avatar` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idusers`, `fullname`, `phone`, `email`, `password`, `joined`, `status`, `saldo`, `avatar`) VALUES
(24, 'UserTest1', '81111111', 'test1@test.com', '$2b$10$2i0IxsZoFeaC./lpVbkYTuDp7aC5eLnI1MewN/5NJl5yDf4jL4wQO', NULL, 1, 0, NULL),
(25, 'UserTest2', '8222222', 'test2@test.com', '$2b$10$iieThT4GmQSYS77hYYmZKeHHBQ/3jkKSSCd6BFDHqLYpX.aWdU3f.', NULL, 1, 0, NULL),
(26, 'Yusuf Umar Hanafi', '85785629865', 'yusufhnf@gmail.com', '$2b$10$lqw82Ng5J/obQH9MQ6maEemdTsPPvpof7VHhq/xrew2qoC48KP1sS', '2020-11-15 04:57:46', 1, 283000, '/griyatest/img/user1.jpeg'),
(37, 'dadadada', '857856298651', 'yusufhnf@gmail.coms', '$2b$10$ieebqmIeD6a/jSEpnF6VpOEK95EcXcFuaa7a1XP3HTQEoLw.w9KW.', '2020-11-26 03:06:27', 1, 0, NULL),
(38, 'asfafasf', '857856298', 'yusufhnf1@gmail.com', '$2b$10$k1sVzLKuaeznHMHOSJDoSuaBbUP5AFRp261td/kfbMBa2nM5thIMe', '2020-11-26 04:37:42', 1, 0, NULL),
(39, 'Ahmad Hanafi', '8123456789', 'hanafi@gmail.com', '$2b$10$hwW.FLpKfvCGCCTmHCAPc.BefDe4xyqrmxazVcHDObsS9RIw.utEW', '2020-12-15 04:57:46', 1, 301000, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminusers`
--
ALTER TABLE `adminusers`
  ADD PRIMARY KEY (`idadmin`);

--
-- Indexes for table `annoucement`
--
ALTER TABLE `annoucement`
  ADD PRIMARY KEY (`idannoucement`),
  ADD KEY `fk_annoucement_admin1_idx` (`admin_idadmin`);

--
-- Indexes for table `loginsession`
--
ALTER TABLE `loginsession`
  ADD PRIMARY KEY (`idloginsession`),
  ADD KEY `fk_loginsession_users1_idx` (`users_idusers`);

--
-- Indexes for table `pdam`
--
ALTER TABLE `pdam`
  ADD PRIMARY KEY (`idpdam`);

--
-- Indexes for table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`idpromo`);

--
-- Indexes for table `riwayattransaksi`
--
ALTER TABLE `riwayattransaksi`
  ADD PRIMARY KEY (`idriwayattranksaksi`),
  ADD KEY `fk_riwayatpemasukan_users1_idx` (`users_idusers`);

--
-- Indexes for table `topup`
--
ALTER TABLE `topup`
  ADD PRIMARY KEY (`idtopup`),
  ADD KEY `fk_topup_users1_idx` (`users_idusers`),
  ADD KEY `fk_topup_admin1_idx` (`admin_idadmin`);

--
-- Indexes for table `transasksipdam`
--
ALTER TABLE `transasksipdam`
  ADD PRIMARY KEY (`idtransasksipdam`),
  ADD KEY `fk_transasksipdam_users1_idx` (`users_idusers`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminusers`
--
ALTER TABLE `adminusers`
  MODIFY `idadmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `annoucement`
--
ALTER TABLE `annoucement`
  MODIFY `idannoucement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `idpromo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `riwayattransaksi`
--
ALTER TABLE `riwayattransaksi`
  MODIFY `idriwayattranksaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `topup`
--
ALTER TABLE `topup`
  MODIFY `idtopup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idusers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `annoucement`
--
ALTER TABLE `annoucement`
  ADD CONSTRAINT `fk_annoucement_admin1` FOREIGN KEY (`admin_idadmin`) REFERENCES `adminusers` (`idadmin`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `loginsession`
--
ALTER TABLE `loginsession`
  ADD CONSTRAINT `fk_loginsession_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `riwayattransaksi`
--
ALTER TABLE `riwayattransaksi`
  ADD CONSTRAINT `fk_riwayatpemasukan_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `topup`
--
ALTER TABLE `topup`
  ADD CONSTRAINT `fk_topup_admin1` FOREIGN KEY (`admin_idadmin`) REFERENCES `adminusers` (`idadmin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_topup_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transasksipdam`
--
ALTER TABLE `transasksipdam`
  ADD CONSTRAINT `fk_transasksipdam_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
