import { apiRequest } from "../utils/api";


export const createBrand = async (brandData) => {
  return await apiRequest("/brands", "POST", brandData);
};


export const getBrands = async (params) => {
  const query = new URLSearchParams(params).toString();
  return await apiRequest(`/brands?${query}`, "GET");
};



export const getBrandById = async (id) => {
  return await apiRequest(`/brands/${id}`, "GET");
};


export const updateBrand = async (id, brandData) => {
  return await apiRequest(`/brands/${id}`, "PUT", brandData);
};


export const deleteBrand = async (id) => {
  return await apiRequest(`/brands/${id}`, "DELETE");
};