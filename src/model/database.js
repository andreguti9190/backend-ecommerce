import mysql from "mysql2/promise";

export const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "admin",
    database: "ecommercedb"
})
//obtengo un uuid
export const getIdDB = async () => {
    let id = await conn.query("SELECT UUID() as id")
    return id[0][0].id
}
// registra al usuario con email o username
export const registerUserDB = async (id, email, username, password) => {
    if (typeof email != "undefined") {
        await conn.query("INSERT INTO users(userID,email,passwordUser) values(UUID_TO_BIN(?),?,?)",
            [id, email, password]);
    } else if (typeof username != "undefined") {
        await conn.query("INSERT INTO users(userID,username,passwordUser) values(UUID_TO_BIN(?),?,?)",
            [id, username, password]);
    }
    let data = await getUserDB(email, username);
    return data;
}
// consigue al usuario
export const getUserDB = async (email, username) => {
    let data;
    if (typeof email != "undefined") {
        data = await conn.query("SELECT BIN_TO_UUID(userID) as id,email,username,passwordUser as password FROM users WHERE email=?", email);
    } else if (typeof username != "undefined") {
        data = await conn.query("SELECT BIN_TO_UUID(userID) as id,email,username,passwordUser as password FROM users WHERE username=?", username);
    }
    if (typeof data[0][0] == "undefined") return { id: undefined, email: undefined, username: undefined, password: undefined }
    return data[0][0];
}

export const createCategoryDB = async (category) => {
    await conn.query("INSERT INTO category(category) VALUES(?)", category)
    return true
}

export const getCategory = async (name) => {
    let data;
    if(!name) data = await conn.query("SELECT categoryID as id,category FROM category")
    else data = await conn.query("SELECT categoryID as id,category FROM category WHERE category=?",[name])
    return data[0]
}

export const createProductDB = async (id,name,category,price,quantifiers) => {
    await conn.query("INSERT INTO product(productID,productName,category,price,quantifiers) VALUES (UUID_TO_BIN(?),?,?,?,?)",[id,name,category,price,quantifiers])
    return true
}
export const getProductDB = async (name) => {
    let data
    if(!name) data = await conn.query("SELECT BIN_TO_UUID(productID) as id,productName as name,category,quantifiers,price FROM product")
    else data = await conn.query("SELECT productName FROM product WHERE productName=?",[name])
    return data[0]
}