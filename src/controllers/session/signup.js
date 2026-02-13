import { userValidation } from "../validation/user.js";
import { getIdDB, getUserDB, registerUserDB } from "../../model/database.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import config from "../../config.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

export const signup = async (req, res) => {
    // validar q no hay nada en el req.body
    if (isEmpty(req.body)) return res.status(400).json({ error: "request body is empty" })
    // validar los datos
    const { username, email, password } = req.body;
    const valid = await userValidation(email, username, password);
    if (valid.error) return res.status(401).json({ error: valid.msg })
    // verificar si hay un email o usuario iguales
    let user = await getUserDB(email, username)
    if (user.email == email && typeof email != "undefined") return res.status(401).json({ error: "email was register" })
    if (user.username == username && typeof username != "undefined") return res.status(401).json({ error: "username was register" })
    // registrar el usuario
    const id = await getIdDB()
    const passwordHash = await bcrypt.hash(password,config.SALT_HASH)
    user = registerUserDB(id,email, username, passwordHash)
    // crear el accesstoken
    let token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
        expiresIn: "1h"
    });
    res.cookie("token", token, {
        httpOnly: true,
        expiresIn: 60 * 60
    }).status(200).json({ create: true })
}