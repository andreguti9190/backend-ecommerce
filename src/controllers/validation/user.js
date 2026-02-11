import validation from "./validation.js"

export const userValidation = async (email, username, password) => {
    if (typeof email === "undefined" && typeof username === "undefined") {
        return { error: true, msg: "you didn´t provide an email or username" }
    }
    const emailValid = await validation.email(email)
    const usernameValid = await validation.username(username)
    const passwordValid = await validation.password(password)

    if (!emailValid && typeof email != "undefined") return { error: true, msg: "email is invalid" }
    if (!usernameValid && typeof username != "undefined") return { error: true, msg: "username is invalid" }
    if (!passwordValid) return { error: true, msg: "password is invalid" }
    return {error:false}
}