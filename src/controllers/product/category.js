import { createCategoryDB, getCategory } from "../../model/database.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const create = async (req, res) => {
    const { category } = req.body
    let categoryExist = await getCategory(category)
    if (typeof categoryExist != "undefined") return res.status(400).json({ error: "category exist" })

    let categoryCreated = await createCategoryDB(category)
    if (!categoryCreated) return res.status(500).json({ error: "category was not created" })
    res.status(200).json({ created: true })
}
const get = async (req, res) => {
    if (isEmpty(req.body)) {
        let categoryList = await getCategory()
        res.status(200).json({ categoryList: categoryList })
    }
    else {
        let { category } = req.body
        let categoryList = await getCategory(category)
        if (categoryList.length == 0) return res.status(400).json({ error: "category no exist" })
        res.status(200).json({ categoryList: categoryList })
    }
}
export default {
    create,
    get
}