import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/users/profile`,
      getAuthHeaders()
    );
    return response.data; // { user }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch user profile";
    throw message;
  }
};

// Update User Profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/profile`,
      profileData,
      getAuthHeaders()
    );
    return response.data; // { message, user }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update user profile";
    throw message;
  }
};

export const applyToBecomeMentor = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/users/mentors/apply`,
      {},
      getAuthHeaders()
    );
    return response.data; // { message, isMentor }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to apply as mentor";
    throw message;
  }
};

// Get Another User's Profile by ID
export const getUserProfileById = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/profile/${userId}`,
      getAuthHeaders()
    );
    return response.data; // { user }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch user profile by ID";
    throw message;
  }
};
