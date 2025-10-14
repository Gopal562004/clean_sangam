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

// ---------------- User Auth & Profile ----------------

// Register user
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/users/register`, userData);
  return res.data;
};

// Login user
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/users/login`, credentials);
  return res.data;
};

// Get logged-in user's profile
export const getUserProfile = async () => {
  const res = await axios.get(`${API_URL}/users/profile`, getAuthHeaders());
  return res.data;
};

// Update profile
export const updateUserProfile = async (updates) => {
  const res = await axios.put(
    `${API_URL}/users/profile`,
    updates,
    getAuthHeaders()
  );
  return res.data;
};

// Get profile by ID
export const getUserProfileById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/${userId}`, getAuthHeaders());
  return res.data;
};

// ---------------- Admin Actions ----------------

// Get all users (with optional filters)
export const getAllUsers = async (queryParams = {}) => {
  const res = await axios.get(`${API_URL}/users/all`, {
    params: queryParams,
    ...getAuthHeaders(),
  });
  return res.data;
};

// Get pending users (optionally role-wise)
export const getPendingUsers = async (role) => {
  const params = role ? { role } : {};
  const res = await axios.get(`${API_URL}/users/admin/pending`, {
    params,
    ...getAuthHeaders(),
  });
  return res.data;
};

// Approve or reject user (admin)
export const approveOrRejectUser = async (userId, action) => {
  const res = await axios.post(
    `${API_URL}/users/admin/request`,
    { userId, action },
    getAuthHeaders()
  );
  return res.data;
};

// ---------------- Mentor/Mentee ----------------

// Apply to become mentor
export const applyToBecomeMentor = async () => {
  const res = await axios.post(
    `${API_URL}/users/apply-mentor`,
    {},
    getAuthHeaders()
  );
  return res.data;
};

// Get all mentors with optional filters
export const getAllMentors = async (queryParams = {}) => {
  const res = await axios.get(`${API_URL}/users/mentors`, {
    params: queryParams,
    ...getAuthHeaders(),
  });
  return res.data;
};

// Send mentee request
export const sendMenteeRequest = async (mentorId) => {
  const res = await axios.post(
    `${API_URL}/users/send-mentee-request`,
    { mentorId },
    getAuthHeaders()
  );
  return res.data;
};

// Get pending mentee requests (mentor)
export const getPendingMenteeRequests = async () => {
  const res = await axios.get(
    `${API_URL}/users/pending-mentee-requests`,
    getAuthHeaders()
  );
  return res.data;
};

// Handle mentee request (approve/reject)
export const handleMenteeRequest = async (studentId, action) => {
  const res = await axios.post(
    `${API_URL}/users/handle-mentee-request`,
    { studentId, action },
    getAuthHeaders()
  );
  return res.data;
};

// Toggle mentee request (send or withdraw)
export const toggleMenteeRequest = async (mentorId) => {
  const res = await axios.post(
    `${API_URL}/users/mentees/request`,
    { mentorId },
    getAuthHeaders()
  );
  return res.data;
};

// ---------------- Alumni ----------------

// Get all alumni
export const getAllAlumni = async () => {
  const res = await axios.get(`${API_URL}/users/alumni`, getAuthHeaders());
  return res.data;
};

// Check if mentee request is already sent
export const getMenteeRequestStatus = async (mentorId) => {
  const res = await axios.get(
    `${API_URL}/users/mentees/request/status/${mentorId}`,
    getAuthHeaders()
  );
  return res.data.requestSent; // true or false
};
