import {
  addBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService
} from "../services/brandService.js";


export const addBrands = async (req, res) => {
  try {

    const brandData = req.body;

    if (req.file) {
      brandData.brandProfileImage = req.file.path;
    }

    const newBrand = await addBrandService(brandData);

    return res.status(201).json({
      success: true,
      message: "Brand added successfully",
      data: newBrand,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add brand",
      error: error.message,
    });

  }
};


export const getBrands = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const result = await getBrandsService({
      page,
      limit,
      search,
      sortBy,
      order,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch brands",
      error: error.message,
    });
  }
};

export const getBrandById = async (req, res) => {

  try {

    const brand = await getBrandByIdService(req.params.id);

    res.json({
      success: true,
      data: brand
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



export const updateBrand = async (req, res) => {

  try {

    const brandData = req.body;

    if (req.file) {
      brandData.brandProfileImage = req.file.path;
    }

    const updatedBrand = await updateBrandService(
      req.params.id,
      brandData
    );

    res.json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};