import { getUserDB } from "../../model/database.js";
import { userValidation } from "../validation/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import config from "../../config.js";

const isEmpty = (body) => !body || Object.keys(body).length == 0;

export const login = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: "request body is empty" })

    const { email, username, password } = req.body

    const valid = await userValidation(email, username, password)
    if (valid.error) return res.status(400).json({ error: valid.msg })

    let user = await getUserDB(email, username)
    if (typeof user.id === "undefined") return res.status(401).json({error:"user or email no exist"})
    let passwordValid = bcrypt.compare(password,user.password);
    if(!passwordValid) return res.status(401).json({error:"access unauthorized"})
    
    
    let token = jwt.sign({id:user.id},config.JWT_SECRET,{
        expiresIn:"1h"
    })

    res.cookie("token",token,{
        httpOnly:true,
        expiresIn:60*60
    }).status(200).json({access:true})
}
