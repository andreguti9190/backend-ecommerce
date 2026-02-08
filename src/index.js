import express from "express";
import router from "./routes/router.js"
const app = express();
const port = process.env.PORT || 3000

//middelware
app.use(express.json());

//routes
app.use(router)

//server
app.listen(port,(err)=>{
    console.log(`http://localhost:${port}`);
})
