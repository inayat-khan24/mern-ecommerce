import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/Route.js";
import connectDB from "./model/connection.js";
// Load environment variable
dotenv.config();
const app = express()

app.use(cors())

app.use(express.json())
connectDB()
app.use("/api",router)

const PORT= process.env.PORT || 30045

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});