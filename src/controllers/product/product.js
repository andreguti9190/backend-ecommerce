
import { createProductDB, getCategory, getIdDB, getProductDB } from "../../model/database.js";
import { productValidation } from "../validation/product.js"

const isEmpty = (body) => Object.keys(body).length == 0 || !body

const create = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: "request body is empty" })
    let { name, category, price, quantifiers } = req.body;

    const valid = await productValidation(name, category, price, quantifiers);
    if (!valid) return res.status(401).json({ error: "error validation propeties" })

    const categoryValid = await getCategory(category);

    if (categoryValid.length == 0) return res.status(401).json({ error: "category no exist" })
    const id = await getIdDB();

    category = categoryValid[0].id;

    let productExist = await getProductDB(name)
    if (productExist.length != 0) return res.status(400).json({ error: "product exist" })

    let product = await createProductDB(id, name, category, price, quantifiers)
    if (!product) return res.status(500).json({ error: "database error" })
    return res.status(200).json({ create: true })
}
const get = async (req, res) => {
    let productList =  await getProductDB()
    return res.status(200).json({productList:productList});
}

export default {
    create,
    get
}