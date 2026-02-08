import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    password:"admin",
    database:"ecommercedb"
})

export const createUser= async (email,username,password)=>{
    let data = await conn.query("INSERT INTO users(email,username,passwordUser) value (?,?,?)",[email,username,password]);
    return data;
}

export const loginUserEmail= async (email,password)=>{
   let data = await conn.query("SELECT * FROM users WHERE email=? and passwordUser=?",[email,password]);
   return data;
}

export const loginUserUsername= async (username,password)=>{
    let data = await conn.query("SELECT * FROM users WHERE username=? and passwordUser=?",[username,password]);
    return data;
}