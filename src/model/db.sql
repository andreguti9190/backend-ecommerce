CREATE DATABASE ecommercedb;

USE ecommercedb;

CREATE TABLE users(
	userID BINARY(16) PRIMARY KEY,
    username varchar(100) UNIQUE,
    email varchar(255) UNIQUE,
    passwordUser varchar(255) NOT NULL 
);
CREATE TABLE category(
	categoryID int auto_increment PRIMARY KEY,
    category varchar(255)
);
CREATE TABLE product(
	productID BINARY(16) PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    category int NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantifiers int8 NOT NULL,
    FOREIGN KEY (category) REFERENCES category(categoryID)
);

CREATE TABLE orden(
	ordenID int8 auto_increment PRIMARY KEY,
    userID int8 NOT NULL,
    processing boolean NOT NULL,
    FOREIGN KEY(userID) REFERENCES users(userID)
);
CREATE TABLE ordenItem(
	ordenItemID int8 auto_increment PRIMARY KEY,
    ordenID int8 NOT NULL,
    productID int8 NOT NULL,
    quantifiers int8 NOT NULL,
    FOREIGN KEY(ordenID) REFERENCES orden(ordenID),
    FOREIGN KEY(productID) REFERENCES product(productID)
);