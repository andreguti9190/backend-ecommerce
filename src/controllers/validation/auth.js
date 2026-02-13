import jwt from "jsonwebtoken"
import config from "../../config.js"

export const auth =async (req,res,next)=>{
    let token = req.cookies.token
    if(!token) return res.status(403).json({error:"access not authorized"})
    try {
        const data = jwt.verify(token,config.JWT_SECRET)
        req.user = data
        next()
    } catch (err) {
        return res.status(403).json({error:"access not authorized cause cookies"})
    }
    next()
}