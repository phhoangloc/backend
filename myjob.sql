-- Drop the database if it already exists
DROP DATABASE IF EXISTS MyApp;
-- Create database
CREATE DATABASE IF NOT EXISTS MyApp;
USE MyApp;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`(
	id						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username				VARCHAR(50) NOT NULL UNIQUE KEY,
    email					VARCHAR(50) NOT NULL UNIQUE KEY,
    `password` 				VARCHAR(100) NOT NULL,
    `active`				enum("yes","no") DEFAULT "no",
    `position`				enum("user","admin") default "user",
	avatar 					VARCHAR(100),
    background  			VARCHAR(100),
    created_date			DATETIME DEFAULT NOW()
);
DROP TABLE IF EXISTS `RefreshToken`;
CREATE TABLE `RefreshToken`(
	id						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`					VARCHAR(100) NOT NULL,
    accessToken				varchar(100),
    user_id					INT UNSIGNED,
    created_date			DATETIME DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES `User`(id)
);
DROP TABLE IF EXISTS `listsearch`;
CREATE TABLE IF NOT EXISTS `listsearch` (
	id 						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id					INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES `User`(id)
);
DROP TABLE IF EXISTS `search`;
CREATE TABLE IF NOT EXISTS `search` (
	id 						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    keysearch				varchar(100) NOT NULL,
	user_id					INT UNSIGNED,
    search_date				DATETIME DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES `User`(id)
);
DROP TABLE IF EXISTS `todolist`;
CREATE TABLE IF NOT EXISTS `todolist` (
	id 						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    todolist				varchar(100) NOT NULL,
	user_id					INT UNSIGNED,
    finish					enum("not","yes") DEFAULT"not",
    finish_date				DATETIME,
    FOREIGN KEY (user_id) REFERENCES `User`(id)
);

DROP TABLE IF EXISTS `Brand`;
CREATE TABLE IF NOT EXISTS `Brand` (
	id 					INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    brand				varchar(20) NOT NULL UNIQUE,
    logo				varchar(100) NOT NULL,
    cover				varchar(100) NOT NULL,
    purchase			int DEFAULT 0
);

DROP TABLE IF EXISTS `ImageList`;
CREATE TABLE IF NOT EXISTS `ImageList` (
	id 					INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`				varchar(20) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS `Product`;
CREATE TABLE IF NOT EXISTS `Product` (
	id 					INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`				varchar(20) NOT NULL UNIQUE,
    image_list			INT UNSIGNED,
    brand_id			INT UNSIGNED,
    cover				varchar(100),
    content				text,
    purchase			int DEFAULT 0,
    FOREIGN KEY (image_list) REFERENCES `ImageList`(id),
    FOREIGN KEY (brand_id) REFERENCES `Brand`(id)
);

DROP TABLE IF EXISTS `Image`;
CREATE TABLE IF NOT EXISTS `Image` (
	id 					INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`				varchar(20) NOT NULL UNIQUE,
    imageList_id		INT UNSIGNED,
    FOREIGN KEY (imageList_id) REFERENCES `ImageList`(id)
);


