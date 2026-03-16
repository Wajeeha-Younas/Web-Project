import { apiRequest } from "../utils/api";

const BASE_URL = "/freebie-brands";

export const getFreebieBrands = async () => {
  return await apiRequest(BASE_URL, "GET");
};


export const addFreebieBrands = async (brandIds) => {
  return await apiRequest(BASE_URL, "POST", { brandIds });
};


export const removeFreebieBrand = async (id) => {
  return await apiRequest(`${BASE_URL}/${id}`, "DELETE");
};