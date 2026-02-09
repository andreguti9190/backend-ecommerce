import { loginUserEmailDB, loginUserUsernameDB} from "../model/database.js"

export const login = async (req,res)=> {
    let {username,email,password} = req.body;
    if ((!username&&!email)) return res.status(400).json({error:"no ingreso usuario o email"}) 
    if (!password) return res.status(400).json({error:"no ingreso la contraseña"}) 
    
    try {
        let data = null;
        if(username) data = await loginUserUsernameDB(username,password)
        else if(email) data = await loginUserEmailDB(email,password)

        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send(error);
    }
}
