import express from "express";
import {
  addFreebieBrands,
  removeFreebieBrand,
  getFreebieBrands
} from "../controllers/freebieBrandController.js";

const router = express.Router();

router.post("/", addFreebieBrands);     
router.delete("/:id", removeFreebieBrand); 
router.get("/", getFreebieBrands);        

export default router;