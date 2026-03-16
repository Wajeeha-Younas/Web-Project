import SponsoredBrand from "../models/sponsoredBrand.js";

export const addSponsoredBrandsService = async (brandIds) => {
  
  const existing = await SponsoredBrand.find({ brand: { $in: brandIds } }).select("brand");
  const existingIds = existing.map((b) => b.brand.toString());

  const newIds = brandIds.filter((id) => !existingIds.includes(id));

  const records = newIds.map((id) => ({ brand: id }));
  return await SponsoredBrand.insertMany(records);
};


export const removeSponsoredBrandService = async (id) => {
  const deleted = await SponsoredBrand.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Sponsored brand not found");
  }
  return deleted;
};


export const getSponsoredBrandsService = async () => {
  const brands = await SponsoredBrand.find().sort({ createdAt: -1 });
  return brands;
};