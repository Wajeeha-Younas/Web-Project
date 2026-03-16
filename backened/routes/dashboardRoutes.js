import express from "express";
import upload from "../middleware/upload.js";

import {
  addBrands,
  getBrands,
  getBrandById,
  updateBrand
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/", upload.single("brandProfileImage"), addBrands);

router.get("/", getBrands);

router.get("/:id", getBrandById);

router.put("/:id", upload.single("brandProfileImage"), updateBrand);

export default router;