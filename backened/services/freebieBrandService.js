import FreebieBrand from "../models/freebieBrand.js";

    export const addFreebieBrandsService = async (brandIds) => {
      
        const existing = await FreebieBrand.find({ brand: { $in: brandIds } }).select("brand");
        const existingIds = existing.map((b) => b.brand.toString());
      

        const newIds = brandIds.filter((id) => !existingIds.includes(id));
      
        const records = newIds.map((id) => ({ brand: id }));
        return await FreebieBrand.insertMany(records);
      };

export const removeFreebieBrandService = async (id) => {
  const deleted = await FreebieBrand.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Freebie brand not found");
  }
  return deleted;
};


export const getFreebieBrandsService = async () => {
  const brands = await FreebieBrand.find().sort({ createdAt: -1 });
  return brands;
};