import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";
import connectDB from "./DB/connect";

const app = express();
app.use(cors());

connectDB()
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB Connection Failed:", error);
  });
