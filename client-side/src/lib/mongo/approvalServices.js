import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper to include auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ======================= Users =======================

// Get pending users (optionally by role)
export const getPendingUsers = async (role) => {
  const params = role ? { role } : {};
  const res = await axios.get(`${API_URL}/users/admin/pending`, {
    params,
    ...getAuthHeaders(),
  });
  return res.data;
};

// Approve or reject user
export const approveOrRejectUser = async (userId, action) => {
  const res = await axios.post(
    `${API_URL}/users/admin/request`,
    { userId, action },
    getAuthHeaders()
  );
  return res.data;
};

// ======================= Jobs =======================

// Get pending jobs
export const getPendingJobs = async () => {
  const res = await axios.get(`${API_URL}/jobs/pending/all`, getAuthHeaders());
  return res.data;
};

// Approve a job
export const approveJob = async (jobId) => {
  const res = await axios.put(
    `${API_URL}/jobs/approve/${jobId}`,
    {},
    getAuthHeaders()
  );
  return res.data;
};

// ======================= Campaigns =======================

// Get pending campaigns (with pagination)
export const getPendingCampaigns = async (params = { page: 1, limit: 10 }) => {
  try {
    const res = await axios.get(`${API_URL}/donations/campaigns/pending`, {
      headers: getAuthHeaders().headers,
      params,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching pending campaigns:", error);
    throw error.response?.data || error;
  }
};

// Approve or reject campaign
export const handleCampaignApproval = async (campaignId, action) => {
  const res = await axios.post(
    `${API_URL}/donations/campaigns/approve`,
    { campaignId, action },
    getAuthHeaders()
  );
  return res.data;
};
