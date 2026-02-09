import { createProductDB, deleteProductDB, productExist } from "../model/database.js";

export const createProduct = async (req, res) => {
    let { name, category, price, quantifiers } = req.body;
    if (!name) return res.status(400).send({ error: "Falto ingresar el nombre del producto" });
    if (!category) return res.status(400).send({ error: "Falto ingresar la categoria del producto" });
    if (!price) return res.status(400).send({ error: "falto ingresar el precio" })
    if (!quantifiers) return res.status(400).send({ error: "falto ingresar la cantidad" })
    try {
        await createProductDB(name, category, price, quantifiers)
        return res.status(200).send({ state: "producto creado correctamente" })
    } catch (error) {
        return res.status(400).send({ error: "estas hackeando" })
    }
}

export const deleteProduct = async (req, res) => {
    let { name } = req.body;
    if (!name) return res.status(400).send({ error: "Falto ingresar el nombre del producto" });
    let exist = await productExist(name);
    if (exist.length === 0) {
        res.status(400).send({error:"el producto ingresado no existe"})
    }else{
        try {
            await deleteProductDB(name);
            return res.status(200).send({ state: "producto eliminado correctamente" })
        } catch (err) {
            return res.status(400).send({ error: "estas intentando hackear" })
        }
    }
}