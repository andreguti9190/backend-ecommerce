import z from "zod";

const valid = z.object({
    name: z.string().min(3),
    category: z.string().min(3),
    price: z.number().min(0),
    quantifiers: z.number().min(0)
})

export const productValidation = async (name, category, price, quantifiers) => {
    let data = await valid.safeParseAsync({
        name: name,
        category: category,
        price: price,
        quantifiers: quantifiers
    })
    return data.success
}