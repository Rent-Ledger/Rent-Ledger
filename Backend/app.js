import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoute from "./Route/authRoute.js";
const app = express();
const port = process.env.PORT;

app.use(cors());
connectDB();
app.use(express.json());

app.use("/api/auth",authRoute);

app.get("/",(req,res)=>{
    res.send("Hello World!, Backend is running");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});