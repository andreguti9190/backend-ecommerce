import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "admin",
    database: "ecommercedb"
})

export const loginUserDB = async (email, username) => {
    let data;
    if (typeof email != "undefined") {
        data = await conn.query("SELECT userID as id,email,username,passwordUser as password FROM users WHERE email=?", email);
    }else if (typeof username !="undefined"){
        data = await conn.query("SELECT userID as id,email,username,passwordUser as password FROM users WHERE username=?", username);
    }
    return data[0][0];
}