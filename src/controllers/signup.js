import { createUserDB } from "../model/database.js"

export const signup = async (req, res) => {
    let { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400).send({ error: "complete todos los campos" })
    }
    try {
        let data = await createUserDB(email, username, password);
        res.status(200).send("exitoso");
    } catch (error) {
        res.status(400).send(error)
    }
}