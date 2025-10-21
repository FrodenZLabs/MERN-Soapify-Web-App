import axios from "axios";

const API_URL = "http://localhost:8000";

// Fetch user profile
export const fetchUserProfile = async (authId) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/getUserProfile/${authId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};

// Update a new user profile
export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/users/update`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};
