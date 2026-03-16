
import Brand from "../models/brand.js";



export const addBrandService = async (brandData) => {

  const newBrand = new Brand({

    brandName: brandData.brandName,
    country: brandData.country,
    addressLine1: brandData.addressLine1,
    addressLine2: brandData.addressLine2,
    city: brandData.city,
    state: brandData.state,
    zipCode: brandData.zipCode,
    emailAddress: brandData.emailAddress,
    industry: brandData.industry,
    website: brandData.website,
    socialLink: brandData.socialLink,

    brandProfileImage: brandData.brandProfileImage, 

    lowPriceRange: brandData.lowPriceRange,
    highPrice: brandData.highPrice,

    newUserSignUps: brandData.newUserSignUps || 0,

    primaryRepresentative: brandData.primaryRepresentative,
    secondaryRepresentative: brandData.secondaryRepresentative,
    tertiaryRepresentative: brandData.tertiaryRepresentative,

    status: brandData.status || "active",
    reviewStatus: brandData.reviewStatus || "approved",

  });

  return await newBrand.save();
};

export const getBrandsService = async ({
  page,
  limit,
  search,
  sortBy,
  order,
}) => {
  try {
    const query = {};

    if (search) {
      const searchNumber = Number(search);
    
      query.$or = [
        { brandName: { $regex: search, $options: "i" } },
        { emailAddress: { $regex: search, $options: "i" } },
        { website: { $regex: search, $options: "i" } },
        { "primaryRepresentative.name": { $regex: search, $options: "i" } },
        { "primaryRepresentative.phone": { $regex: search, $options: "i" } },
    
        { reviewStatus: { $regex: search, $options: "i" } },
    
        ...(isNaN(searchNumber) ? [] : [{ newUserSignUps: searchNumber }])
      ];
    }

    const skip = (page - 1) * limit;

    const [brands, total] = await Promise.all([
      Brand.find(query)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
    
      Brand.countDocuments(query)
    ]);
    return {
      data: brands,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBrandByIdService = async (id) => {

  return await Brand.findById(id);

};



export const updateBrandService = async (id, brandData) => {

  return await Brand.findByIdAndUpdate(
    id,
    brandData,
    { new: true }
  );

};