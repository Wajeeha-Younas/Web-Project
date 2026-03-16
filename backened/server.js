import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import freebie from "./routes/freebieBrandsRoutes.js"
import dashboard from "./routes/dashboardRoutes.js"
import sponsoredBrand from "./routes/sponsoredBrandRoutes.js";

dotenv.config();

const app = express();   

app.use(cors());         
app.use(express.json());

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api/brands",dashboard );
app.use("/api/freebie-brands", freebie);
app.use("/api/sponsored-brands", sponsoredBrand);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});