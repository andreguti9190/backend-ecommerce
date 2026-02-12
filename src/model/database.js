import mysql from "mysql2/promise";
import { email } from "zod";

const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "admin",
    database: "ecommercedb"
})

export const registerUserDB = async (email, username, password)=>{
    if (typeof email != "undefined") {
        await conn.query("INSERT INTO users(email,passwordUser) values(?,?)",[email,password]);
    } else if (typeof username != "undefined") {
        await conn.query("INSERT INTO users(username,passwordUser) values(?,?)",[username,password]);
    }
    let data = await getUserDB(email,username);
    return data;
}

export const getUserDB = async (email, username) => {
    let data;
    if (typeof email != "undefined") {
        data = await conn.query("SELECT userID as id,email,username,passwordUser as password FROM users WHERE email=?", email);
    } else if (typeof username != "undefined") {
        data = await conn.query("SELECT userID as id,email,username,passwordUser as password FROM users WHERE username=?", username);
    }
    if (typeof data[0][0] == "undefined") return { id: undefined, email: undefined, username: undefined, password: undefined }
    return data[0][0];
}