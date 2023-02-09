CREATE DATABASE `bikes`;
USE `bikes`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `price` decimal(12,2) DEFAULT NULL,
   `discount` int(11) DEFAULT NULL,
   `image` varchar(100) DEFAULT NULL,
   `modelId` int(11) DEFAULT NULL, 
   `sizeId` int(11) DEFAULT NULL ,
   `createdAt` timestamp DEFAULT NULL,
   `updatedAt` timestamp DEFAULT NULL,
   `deletedAt` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`)
);


insert into products value (1,'Bicicleta porp ekano', 'Diseñada como una máquina de trail XC de alto rendimiento',100000.00, 15 ,
'ebike-poly-bromo-1.jpg',1, 1,'0000-00-00 00:00:00',NULL, NULL);


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `createdAt` timestamp DEFAULT NULL,
  `updatedAt` timestamp DEFAULT NULL,
  `deletedAt` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`)
  );
  
insert into users value (1,'Dolores','Stover', 'lolistover@gmail.com','holahola', 'avatar.jpg',1, '2021-09-21 12:00:38','2021-09-28 12:09:22', NULL);
insert into users value (2,'Juan', 'Perez','juanperez@gmail.com','holahola','avatar.jpg',2, '2021-09-21 12:00:38','2021-09-28 12:09:22', NULL);
insert into users value (3,'Carlos', 'Perez','carlosperez@gmail.com','holahola','avatar.jpg',3, '2021-09-21 12:00:38','2021-09-28 12:09:22', NULL);

CREATE TABLE `models` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
 `createdAt` timestamp DEFAULT NULL,
  `updatedAt` timestamp DEFAULT NULL,
 `deletedAt` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`)
  );
  
insert into models value (1,'MTB', '2021-09-21 12:00:38','2021-09-28 12:09:22', null);
insert into models value (2,'Urban', '2021-09-21 12:00:38','2021-09-28 12:09:22', null);

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
 `createdAt` timestamp DEFAULT NULL,
  `updatedAt` timestamp DEFAULT NULL,
 `deletedAt` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`)
  );
  
insert into sizes value (1,'Small', '2021-09-21 12:00:38','2021-09-28 12:09:22', null);
insert into sizes value (2,'Medium', '2021-09-21 12:00:38','2021-09-28 12:09:22', null);
insert into sizes value (2,'Large', '2021-09-21 12:00:38','2021-09-28 12:09:22', null);