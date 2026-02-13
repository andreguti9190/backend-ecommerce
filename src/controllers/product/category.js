import { createCategoryDB } from "../../model/database.js"

const create = async (req, res) => {
    const { category } = req.body
    let categoryCreated = await createCategoryDB(category)
    if (!categoryCreated) res.status(500).json({ error: "category was not created" })
    res.status(200).json({ created: true })
}
export default {
    create
}