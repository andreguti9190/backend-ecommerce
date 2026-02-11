import z from "zod";

const emailZod = z.string().email();
const usernameZod = z.string().min(3);
const passwordZod = z.string().min(8);

const email = async (value) => {
    let valid = (await emailZod.safeParseAsync(value)).success
    return valid
}
const username = async (value) => {
    let valid = (await usernameZod.safeParseAsync(value)).success
    return valid
}
const password = async (value) => {
    let valid =(await passwordZod.safeParseAsync(value)).success
    return valid
}

export default {
    email,
    username,
    password
}