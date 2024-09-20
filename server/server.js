import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";    

mongoose
  .connect(
    "mongodb+srv://abhijithkp642:abhijithkp642@cluster0.onwim.mongodb.net/"
  )
  .then(console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin:"http://localhost:5173/",
        methods:['GET','POST', 'DELETE', 'PUT'],
        allowedHeaders:[
            "content-type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json())

app.listen(PORT, ()=> console.log(`Server is running on port${PORT}`))