import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { v2   as cloudinary} from "cloudinary";
const PORT = process.env.PORT || 3000;

//Config
if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path: "./config/config.env",
    });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})


connectDB();
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
