import { userValidation } from "../validation/user.js";
import { getUserDB, registerUserDB } from "../../model/database.js"
import jwt from "jsonwebtoken";
import config from "../../config.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

export const signup = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: "request body is empty" })

    const { username, email, password } = req.body;
    let valid = await userValidation(email, username, password);
    if (valid.error) return res.status(401).json({ error: valid.msg })
    
    let user = await getUserDB(email,username)
    if(user.email == email && typeof email != "undefined") return res.status(401).json({error:"email was register"})
    if(user.username == username && typeof username != "undefined") return res.status(401).json({error:"username was register"})

    user = registerUserDB(email,username,password)
    let token = jwt.sign({id:user.id},config.JWT_SECRET,{
        expiresIn:"1h"
    });
    res.cookie("token",token,{
        httpOnly:true,
        expiresIn:60*60
    }).status(200).json({create:true})
}