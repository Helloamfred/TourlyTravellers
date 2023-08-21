-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2023 at 05:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_the_world`
--

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `destination` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `destination`) VALUES
(46, 'london'),
(47, 'Russia'),
(49, 'tanzania'),
(57, 'malawi'),
(58, 'kenya');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `location` text NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `location`, `description`) VALUES
(5, 'South Africa', 'South Africa has the most industrialized, technologically advanced, and diversified economy in Africa'),
(13, 'grfed', 'rfed');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `package` text NOT NULL,
  `description` varchar(255) NOT NULL,
  `Price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `package`, `description`, `Price`) VALUES
(43, 'Family Package', 'The package includes accommodation, airport shuttle, a rental car and theme park admission', 250),
(44, 'Adventure Vacation', 'The package includes accommodation, airport shuttle, a rental car and theme park admission ', 150),
(45, 'Spa Vacation', 'The package includes accommodation, airport shuttle, a rental car and theme park admission ', 200),
(46, 'Business package', 'The package includes accommodation, airport shuttle, a rental car and theme park admission', 100);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `travellers` int(11) NOT NULL,
  `price` int(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `user_id`, `destination_id`, `travellers`, `price`, `location_id`, `package_id`) VALUES
(53, 170, 46, 9, 300, 5, 43);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `full_name` varchar(45) NOT NULL,
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`full_name`, `id`, `email`, `password`) VALUES
('herper benn', 115, 'bent@gmail.com', '67677'),
('fraaan vannce', 119, 'annce@gmail.com', '6565656565'),
('josh alalh', 122, 'josh@gmail.com', 'bennt'),
('ADMIN', 124, 'admin@gmail.com', 'user'),
('jacksin manny', 125, 'manny@gmail.com', '787970'),
('gimon hennry', 129, 'hennry@gmail.com', '676767'),
('james njoroge', 130, 'njoroge@gmail.com', '090909'),
('izoh', 131, 'oh@gmail.com', '898989'),
('fred ngatia', 141, 'maina@gmail.com', '65758'),
('hiiro', 142, 'ro@gmail.com', '3434'),
('martin jones', 163, 'jones@gmail.com', '787879'),
('gerald mimna', 167, 'mimna@gmail.com', '9090'),
('Fred Maina', 170, 'ma1na@gmail.com', '89898910'),
('kipon', 171, 'kipon@gmail.com', '2345678'),
('hy', 175, 'am', 'fred'),
('Admin 2', 177, 'admin@yahoo.com', '1234'),
('Ahamed', 179, 'musa@gmail.com', '000000'),
('gmo', 180, 'gmo@gmail.com', '5656');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `package` (`package`) USING HASH;

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `fk_users_id` (`user_id`),
  ADD KEY `FK_location_id` (`location_id`),
  ADD KEY `FK_package_id` (`package_id`),
  ADD KEY `FK_destination_id` (`destination_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
