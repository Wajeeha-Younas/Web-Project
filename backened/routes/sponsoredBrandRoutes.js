import express from "express";
import {
  addSponsoredBrands,
  removeSponsoredBrand,
  getSponsoredBrands,
} from "../controllers/sponsoredBrandController.js";

const router = express.Router();


router.post("/", addSponsoredBrands);

router.delete("/:id", removeSponsoredBrand);

router.get("/", getSponsoredBrands);

export default router;