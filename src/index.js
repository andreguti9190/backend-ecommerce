import express from "express";
import router from "./routes/router.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000

//middelware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//routes
app.use(router)

//server
app.listen(port,(err)=>{
    console.log(`http://localhost:${port}`);
})
