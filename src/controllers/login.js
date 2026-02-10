import z from "zod";
import cookieParser from "cookie-parser";
import { loginUserEmailDB, loginUserUsernameDB } from "../model/database.js"

const schema = z.object({
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    password: z.string()
})

export const login = async (req, res) => {
    let { username, email, password } = req.body;

    if (!username && !email) return res.status(400).send({ error: "Ingrese un usuario o contraseña" })

    let validation = await schema.safeParseAsync({
        username: username,
        email: email,
        password: password
    })

    if (validation.success) {
        try {
            let data = null;
            if (username) data = await loginUserUsernameDB(username, password)
            else if (email) data = await loginUserEmailDB(email, password)
            if (data.length === 0) {
                return res.status(400).send({ error: "No hay ningun cuenta con ese usuario o email, o tbm la contraseña puede ser incorrecta" })
            } else {
                res.cookie("session", { id: data.username }, {
                    httpOnly: true,
                })
                return res.status(200).send(data);
            }
        } catch (error) {
            return res.status(400).send({ error: "Error de la base de datos" });
        }
    } else return res.status(400).send(validation.error.message)
}
