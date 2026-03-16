import {
    addFreebieBrandsService,
    removeFreebieBrandService,
    getFreebieBrandsService
  } from "../services/freebieBrandService.js";
  
  
  export const addFreebieBrands = async (req, res) => {
    try {
      const { brandIds } = req.body;
  
      if (!brandIds || !Array.isArray(brandIds) || brandIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "brandIds must be a non-empty array"
        });
      }
  
      const inserted = await addFreebieBrandsService(brandIds);
  
      res.status(200).json({
        success: true,
        message: "Freebie brands added",
        data: inserted
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
 
  export const removeFreebieBrand = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID parameter is required"
        });
      }
  
      const deleted = await removeFreebieBrandService(id);
  
      res.status(200).json({
        success: true,
        message: "Freebie brand removed",
        data: deleted
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  

  export const getFreebieBrands = async (req, res) => {
    try {
      const brands = await getFreebieBrandsService();
  
      res.status(200).json({
        success: true,
        data: brands
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };