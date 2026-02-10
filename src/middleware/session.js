import cookieParser from "cookie-parser";

export const sesion = (req,res,next)=>{
    let data = req.cookie;
    console.log(data);
    next();
}