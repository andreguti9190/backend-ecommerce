import z from "zod";

const emailZod = z.string().email();
const usernameZod = z.string().min(3);
const passwordZod = z.string().min(8);

const emailV = async (value) => {
    let valid = (await emailZod.safeParseAsync(value)).success
    return valid
}
const usernameV = async (value) => {
    let valid = (await usernameZod.safeParseAsync(value)).success
    return valid
}
const passwordV = async (value) => {
    let valid =(await passwordZod.safeParseAsync(value)).success
    return valid
}

export const userValidation = async (email, username, password) => {
    if (typeof email === "undefined" && typeof username === "undefined") {
        return { error: true, msg: "you didn´t provide an email or username" }
    }
    const emailValid = await emailV(email)
    const usernameValid = await usernameV(username)
    const passwordValid = await passwordV(password)

    if (!emailValid && typeof email != "undefined") return { error: true, msg: "email is invalid" }
    if (!usernameValid && typeof username != "undefined") return { error: true, msg: "username is invalid" }
    if (!passwordValid) return { error: true, msg: "password is invalid" }
    return {error:false}
}