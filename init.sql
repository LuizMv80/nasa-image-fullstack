USE nasa_images;

CREATE TABLE `rols` (
  `uuid` CHAR(36) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `register_date` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `users` (
  `uuid` CHAR(36) NOT NULL,
  `names` varchar(50) DEFAULT NULL,
  `last_names` varchar(50) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `password` varchar(254) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `register_date` timestamp NULL DEFAULT current_timestamp(),
  `rol` CHAR(36) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `unique_email` (`email`),
  KEY `fk_users_roles` (`rol`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`rol`) REFERENCES `rols` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO rols (uuid, description, active, register_date) VALUES
('b9697d6c-00f9-4e76-b6b5-7c60b135f17d','USER',1,'2025-02-08 17:16:25'),
('303c3fce-1a5f-434a-80c3-d84d41752e1b','ADMIN',1,'2025-02-08 17:16:06');

INSERT INTO users (uuid, names, last_names, email, password, phone_number, active, register_date, rol) VALUES
('594e00b0-5c95-45f8-974d-a170ba3a23a2', 'Jhonson', 'J.', 'jhonson@xxxx.com', '$2b$12$24HZs3L9i2m2lhoiQEk1wOk.tqJucNte04xoE1AngYvMj.iiKITcu', '+525532454355', 1, '2025-02-08 17:41:04', 'b9697d6c-00f9-4e76-b6b5-7c60b135f17d');
