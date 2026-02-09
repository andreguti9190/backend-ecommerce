import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    password:"admin",
    database:"ecommercedb"
})

export const createUserDB = async (email,username,password)=>{
    let data = await conn.query("INSERT INTO users(email,username,passwordUser) value (?,?,?)",[email,username,password]);
    return data[0];
}

export const loginUserEmailDB = async (email,password)=>{
   let data = await conn.query("SELECT * FROM users WHERE email=? and passwordUser=?",[email,password]);
   return data[0];
}

export const loginUserUsernameDB= async (username,password)=>{
    let data = await conn.query("SELECT * FROM users WHERE username=? and passwordUser=?",[username,password]);
    return data[0];
}

export const createProductDB = async (name,category,price,quantifiers)=>{
    let data = await conn.query("INSERT INTO product(productName,category,price,quantifiers) VALUES (?,?,?,?)",[name,category,price,quantifiers]);
    return data[0];
}

export const deleteProductDB = async (name)=>{
    let data = await conn.query("DELETE FROM PRODUCT WHERE productName = ?",[name]);
    return data[0];
}
export const productExist = async (name)=>{
    let data = await conn.query("SELECT * FROM product WHERE productName=?",name);
    return data[0];
}