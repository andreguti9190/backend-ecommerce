CREATE TABLE users(
	userID int8 auto_increment PRIMARY KEY,
    username varchar(100) NOT NULL UNIQUE,
    email varchar(255) NOT NULL
);
CREATE TABLE orden(
	ordenID int8 auto_increment PRIMARY KEY,
    userID int8 NOT NULL,
    processing boolean NOT NULL,
    FOREIGN KEY(userID) REFERENCES users(userID)
);
CREATE TABLE category(
	categoryID int8 auto_increment PRIMARY KEY,
    category varchar(255)
);
CREATE TABLE product(
	productID int8 auto_increment PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    category int8 NOT NULL,
    price float8 NOT NULL,
    quantifiers int8 NOT NULL
);
CREATE TABLE ordenItem(
	ordenItemID int8 auto_increment PRIMARY KEY,
    ordenID int8 NOT NULL,
    productID int8 NOT NULL,
    quantifiers int8 NOT NULL,
    FOREIGN KEY(ordenID) REFERENCES orden(ordenID),
    FOREIGN KEY(productID) REFERENCES product(productID)
);