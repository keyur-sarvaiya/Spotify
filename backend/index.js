import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors"
//importing routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();

// using middlewares
app.use(cors({
  origin: [process.env.ALLOWED_ORIGIN],  // your frontend origin
  credentials: true,                 // <-- allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
