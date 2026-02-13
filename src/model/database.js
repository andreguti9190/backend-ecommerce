import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "admin",
    database: "ecommercedb"
})

export const createCategoryDB = async (category) => {
    await conn.query("INSERT INTO category(category) VALUES(?)", category)
    return true
}

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
export const getIdDB = async () => {
    let id = await conn.query("SELECT UUID() as id")
    return id[0][0].id
}

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