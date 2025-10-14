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

// Get All Mentors with filters & pagination
export const getAllMentors = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/users/mentors`, {
      ...getAuthHeaders(),
      params,
    });
    return response.data; // { message, total, page, limit, pages, count, mentors }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch mentors";
    throw message;
  }
};

// Send Mentee Request
export const sendMenteeRequest = async (mentorId) => {
  try {
    console.log("Sending mentee request to mentorId:", mentorId);
    const response = await axios.post(
      `${API_URL}/users/mentees/request`,
      { mentorId },
      getAuthHeaders()
    );
    return response.data; // { message }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to send mentee request";
    throw message;
  }
};

// Get Pending Mentee Requests (for Mentor)
export const getPendingMenteeRequests = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/users/mentees/pending`,
      getAuthHeaders()
    );
    return response.data; // { pendingRequests }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch pending requests";
    throw message;
  }
};

// Approve / Reject Mentee Request
export const handleMenteeRequest = async ({ studentId, action }) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/mentees/handle`,
      { studentId, action },
      getAuthHeaders()
    );
    return response.data; // { message }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to handle mentee request";
    throw message;
  }
};


// Get All Alumni
export const getAllAlumni = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/users/alumni`,
      getAuthHeaders()
    );
    return response.data; // { message, count, alumni }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch alumni";
    throw message;
  }
};

// Get User Profile by ID (for viewing other users)
export const getUserProfileById = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/profile/${userId}`,
      getAuthHeaders()
    );
    return response.data; // { user }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch user profile";
    throw message;
  }
};

// Get mentor-specific dashboard stats (total mentees, approved/pending/rejected)
export const getMentorshipDashboard = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/mentorship/dashboard`,
      getAuthHeaders()
    );
    return response.data; // { totalMentees, approved, pending, rejected, menteesList }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch mentorship dashboard";
    throw message;
  }
};

// Get mentees by status (approved, pending, rejected)
export const getMenteesByStatus = async (status) => {
  try {
    const response = await axios.get(
      `${API_URL}/mentorship/mentees`,
      { ...getAuthHeaders(), params: { status } }
    );
    return response.data; // { mentees }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch mentees by status";
    throw message;
  }
};

// Admin-only: get system-wide mentorship stats
export const getMentorshipSystemStats = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/mentorship/system-stats`,
      getAuthHeaders()
    );
    return response.data; // { totalMentors, totalMentees, approvedMentees, etc. }
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch mentorship system stats";
    throw message;
  }
};