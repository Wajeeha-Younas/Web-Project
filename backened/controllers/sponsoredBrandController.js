import {
    addSponsoredBrandsService,
    removeSponsoredBrandService,
    getSponsoredBrandsService,
  } from "../services/sponsoredBrandService.js";
  
  
  export const addSponsoredBrands = async (req, res) => {
    try {
      const { brandIds } = req.body;
  
      if (!brandIds || !Array.isArray(brandIds) || brandIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "brandIds must be a non-empty array",
        });
      }
  
      const inserted = await addSponsoredBrandsService(brandIds);
  
      res.status(200).json({
        success: true,
        message: "Sponsored brands added",
        data: inserted,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  
  export const removeSponsoredBrand = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID parameter is required",
        });
      }
  
      const deleted = await removeSponsoredBrandService(id);
  
      res.status(200).json({
        success: true,
        message: "Sponsored brand removed",
        data: deleted,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const getSponsoredBrands = async (req, res) => {
    try {
      const brands = await getSponsoredBrandsService();
  
      res.status(200).json({
        success: true,
        data: brands,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };