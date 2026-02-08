import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    password:"admin",
    database:"ecommercedb"
})

export const createUser= async (email,username,password)=>{
    conn.query("INSERT INTO users(email,username,passwordUser) value (?,?,?)",[email,username,password])
    .then((row)=>{ return row; })
    .catch((err)=>{ return err})
}

export const loginUserEmail= async (email,password)=>{
    conn.query("SELECT * FROM users WHERE email=? and passwordUser=?",[email,password])
    .then((row)=>{ return row})
    .catch((err)=>{ return err })
}

export const loginUserUsername= async (username,password)=>{
    conn.query("SELECT * FROM users WHERE username=? and passwordUser=?",[username,password])
    .then((row)=>{ return row})
    .catch((err)=>{ return err })
}