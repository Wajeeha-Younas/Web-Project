import mongoose from "mongoose";

const sponsoredBrandSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      unique: true, 
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SponsoredBrand ||
  mongoose.model("SponsoredBrand", sponsoredBrandSchema);