import express from "express";
import router from "./routes/router.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import config from "./config.js";

const app = express();
const port = process.env.PORT || 3000

//middelware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: config.SERVER_FRONTEND,
    credentials: true
}))

//routes
app.use(router)

//server
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
