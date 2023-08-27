CREATE TABLE `db`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` DOUBLE NOT NULL,
  `description` TEXT(300) NOT NULL,
  `imageUrl` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO `db`.`products` (`title`, `price`, `description`, `imageUrl`) VALUES ('Monkey D. Luffy', '12', 'luffy', 'https://e.rpp-noticias.io/xlarge/2018/11/26/551055_716795.jpg');
INSERT INTO `db`.`products` (`title`, `price`, `description`, `imageUrl`) VALUES ('Roronoa Zoro', '23', 'zoro', 'https://asset-2.tstatic.net/banten/foto/bank/images/Zoro-One-Piece-faefwef.jpg');