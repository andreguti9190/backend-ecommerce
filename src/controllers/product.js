import { createProductDB, deleteProductDB, productExist } from "../model/database.js";
import z from "zod";

const schema = z.object({
    name: z.string().min(3),
    category: z.number().positive().int(),
    price: z.number().positive(),
    quatifiers: z.number().positive().int()
})

export const createProduct = async (req, res) => {
    let { name, category, price, quantifiers } = req.body;
    let validation = await schema.safeParseAsync({
        name: name,
        category: category,
        price: price,
        quantifiers: quantifiers
    })
    if (validation.success) {
        try {
            await createProductDB(name, category, price, quantifiers)
            return res.status(200).send({ state: "producto creado correctamente" })
        } catch (error) {
            return res.status(400).send({ error: "estas hackeando" })
        }
    } else res.status(400).send(validation.error.message)
}

export const deleteProduct = async (req, res) => {
    let { name } = req.body;
    if (!name) return res.status(400).send({ error: "Falto ingresar el nombre del producto" });
    let exist = await productExist(name);
    if (exist.length === 0) {
        res.status(400).send({ error: "el producto ingresado no existe" })
    } else {
        try {
            await deleteProductDB(name);
            return res.status(200).send({ state: "producto eliminado correctamente" })
        } catch (err) {
            return res.status(400).send({ error: "estas intentando hackear" })
        }
    }
}