import express from "express";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cors from "cors";
import cartRoute from "./routes/cartRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import path from "path";
const app = express();
// Middleware 
app.use(cors({origin:['http://localhost:3000']}));
app.use(express.json());


app.use(express.static("./build"))








//API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart",  cartRoute);
app.use("/api/v1/orders", orderRoute);


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.resolve("build","index.html")
console.log(path.isAbsolute(filePath))
console.log(filePath)
app.get("/*",(req,res)=>{
  res.sendFile(filePath)
})
// res.sendFile("./build/index.html");


app.use((err, req, res, next) => {
  return res.status(400).json({
    msg: err.message,
  });
});

export default app;
