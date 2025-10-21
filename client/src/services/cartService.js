import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchUserCart = async (authId) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${authId}`, {
      withCredentials: true,
    });

    return response?.data || null;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity },
      {
        withCredentials: true,
      }
    );

    return response?.data || null;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

// Service to remove an item from the cart
export const removeItemFromCart = async ({ productId }) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/remove`, {
      data: { productId }, // Send productId in the request body
      withCredentials: true, // Include cookies for authentication
    });

    return response.data; // Return the response data
  } catch (error) {
    // Throw a meaningful error message if the request fails
    throw error.response?.data?.message || "Failed to remove item from cart.";
  }
};

// Service to remove an item from the cart
export const clearCart = async (authId) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/clear/${authId}`, {
      withCredentials: true, // Include cookies for authentication
    });

    return response.data; // Return the response data
  } catch (error) {
    // Throw a meaningful error message if the request fails
    throw error.response?.data?.message || "Failed to remove item from cart.";
  }
};
