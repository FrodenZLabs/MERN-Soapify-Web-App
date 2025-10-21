import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/signout`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error logging out.";
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/auth/update`, formData, {
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
