import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchProducts = async (filters) => {
  try {
    let queryParams = new URLSearchParams();

    if (filters.searchTerm)
      queryParams.append("searchTerm", filters.searchTerm);
    if (filters.inStock) queryParams.append("inStock", "true");
    if (filters.outOfStock) queryParams.append("outOfStock", "true");

    const selectedTypes = Object.keys(filters.selectedType || {}).filter(
      (key) => filters.selectedType[key]
    );
    if (selectedTypes.length > 0)
      queryParams.append("productTypes", selectedTypes.join(","));

    if (filters.sortOrder) queryParams.append("sort", filters.sortOrder);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const response = await axios.get(
      `${API_URL}/products?${queryParams.toString()}`
    );

    return response?.data.products || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const fetchProductsByID = async (productID) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productID}`);

    return response?.data || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.errorMessage;
  }
};
