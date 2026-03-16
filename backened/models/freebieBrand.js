import mongoose from "mongoose";

const freebieBrandSchema = new mongoose.Schema(
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

export default mongoose.models.FreebieBrand ||
  mongoose.model("FreebieBrand", freebieBrandSchema);