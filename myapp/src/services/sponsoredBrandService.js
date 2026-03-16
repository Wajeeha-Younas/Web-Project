import { apiRequest } from "../utils/api";

const BASE_URL = "/sponsored-brands";


export const getSponsoredBrands = async () => {
  return await apiRequest(BASE_URL, "GET");
};

export const addSponsoredBrands = async (brandIds) => {
  return await apiRequest(BASE_URL, "POST", { brandIds });
};


export const removeSponsoredBrand = async (id) => {
  return await apiRequest(`${BASE_URL}/${id}`, "DELETE");
};