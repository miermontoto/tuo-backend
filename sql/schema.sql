CREATE DATABASE `presents` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

-- presents.presents definition

CREATE TABLE `presents` (
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `chosenBy` bigint(20) unsigned DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `presents_users_FK` (`userId`),
  KEY `presents_users_FK_1` (`chosenBy`),
  CONSTRAINT `presents_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `presents_users_FK_1` FOREIGN KEY (`chosenBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;


-- presents.users definition

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `users_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- presents.friends definition

CREATE TABLE `friends` (
  `fromUser` varchar(100) NOT NULL,
  `toUser` varchar(100) NOT NULL,
  PRIMARY KEY (`fromUser`,`toUser`),
  KEY `friends_users_FK_1` (`toUser`),
  CONSTRAINT `friends_users_FK` FOREIGN KEY (`fromUser`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friends_users_FK_1` FOREIGN KEY (`toUser`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
