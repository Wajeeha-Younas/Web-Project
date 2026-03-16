import mongoose from "mongoose";

const representativeSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
});

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    country: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    emailAddress: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String },
    socialLink: { type: String },

    brandProfileImage: { type: String },  

    lowPriceRange: { type: Number, required: true },
    highPrice: { type: Number, required: true },

    newUserSignUps: {
      type: Number,
      default: 0,
    },

    primaryRepresentative: {
      type: representativeSchema,
      required: true,
    },

    secondaryRepresentative: {
      type: representativeSchema,
    },

    tertiaryRepresentative: {
      type: representativeSchema,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    reviewStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Brand || mongoose.model("Brand", brandSchema);