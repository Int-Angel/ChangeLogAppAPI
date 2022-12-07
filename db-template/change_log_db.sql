
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `AppUser` (
  `app_user_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Point` (
  `point_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `project_update_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Project` (
  `project_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `project_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Project_Update` (
  `project_update_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `AppUser`
  ADD PRIMARY KEY (`app_user_id`);

ALTER TABLE `Point`
  ADD PRIMARY KEY (`point_id`),
  ADD KEY `point_ibfk_1` (`project_update_id`);


ALTER TABLE `Project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `project_ibfk_1` (`creator_id`);

ALTER TABLE `Project_Update`
  ADD PRIMARY KEY (`project_update_id`),
  ADD KEY `project_update_ibfk_1` (`project_id`);

ALTER TABLE `AppUser`
  MODIFY `app_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `Point`
  MODIFY `point_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

ALTER TABLE `Project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `Project_Update`
  MODIFY `project_update_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `Point`
  ADD CONSTRAINT `point_ibfk_1` FOREIGN KEY (`project_update_id`) REFERENCES `Project_Update` (`project_update_id`) ON DELETE CASCADE;

ALTER TABLE `Project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `AppUser` (`app_user_id`) ON DELETE CASCADE;

ALTER TABLE `Project_Update`
  ADD CONSTRAINT `project_update_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `Project` (`project_id`) ON DELETE CASCADE;
COMMIT;

