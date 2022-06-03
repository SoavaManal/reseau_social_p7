
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `database_development_projet7` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `database_development_projet7` ;

-- -----------------------------------------------------
-- Table `database_development_projet7`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_development_projet7`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `bio` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `isAdmin` TINYINT(1) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 18j 
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO users VALUES (1,'admin','groupomania','admingroupomania@gmail.com','$2b$10$sKKh8DA0lg0mb6Db.nQdnOZfJaUiB8B5trqbAEOFtcNZj/IhazwUu','Admin du site','http://localhost:3000/images/pngtree-vector-administration-icon-png-image_747092.jpg1653473428643.jpeg','1','2022-05-19 12:12:40','2022-05-25 10:10:28');
UNLOCK TABLES;
-- -----------------------------------------------------
-- Table `database_development_projet7`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_development_projet7`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `content` TEXT NOT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `likes` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `posts_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `database_development_projet7`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 177
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `database_development_projet7`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_development_projet7`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  `content` TEXT NOT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `postId` (`postId` ASC) VISIBLE,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `database_development_projet7`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2`
    FOREIGN KEY (`postId`)
    REFERENCES `database_development_projet7`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `database_development_projet7`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_development_projet7`.`sequelizemeta` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `SequelizeMeta_name_unique` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `database_development_projet7`.`userslikeds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_development_projet7`.`userslikeds` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `userId` INT NOT NULL,
  `like` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `postId` (`postId` ASC) VISIBLE,
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `userslikeds_ibfk_1`
    FOREIGN KEY (`postId`)
    REFERENCES `database_development_projet7`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `userslikeds_ibfk_2`
    FOREIGN KEY (`userId`)
    REFERENCES `database_development_projet7`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 107
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
