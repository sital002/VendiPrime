import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.set("strictQuery",false)
  mongoose
    .connect(process.env.DB_URI ).then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
