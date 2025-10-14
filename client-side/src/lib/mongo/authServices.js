import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong during signup";
    throw message;
  }
};

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, loginData);

    // Save token to localStorage
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data; // { message, token, user }
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong during login";
    throw message;
  }
};
