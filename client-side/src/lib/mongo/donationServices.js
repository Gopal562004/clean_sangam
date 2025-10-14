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
// Create a new campaign
export const createCampaign = async (data) => {
  try {
    const res = await axios.post(
      `${API_URL}/donations/campaigns`,
      data,
      getAuthHeaders()
    );
    console.log("Campaign created:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error creating campaign:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllCampaigns = async (
  params = { page: 1, limit: 10, category: "", search: "" }
) => {
  try {
    const res = await axios.get(`${API_URL}/donations/campaigns`, { params });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching campaigns:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// export const getAllCampaigns = async (params = {}) => {
//   try {
//     const res = await axios.get(`${API_URL}/donations/campaigns`, {
//       params: {
//         page: params.page || 1,
//         limit: params.limit || 10,
//         category: params.category || "",
//         search: params.search || "",
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching campaigns:", error);
//     throw error.response?.data || error;
//   }
// };
// Get pending campaigns (admin)
// export const getPendingCampaigns = async () => {
//   const res = await axios.get(
//     `${API_URL}/donations/campaigns/pending`,
//     getAuthHeaders()
//   );
//   return res.data;
// };
export const getPendingCampaigns = async (params = { page: 1, limit: 10 }) => {
  try {
    const res = await axios.get(`${API_URL}/donations/campaigns/pending`, {
      headers: getAuthHeaders().headers, // include auth headers
      params, // send page & limit
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching pending campaigns:", error);
    throw error.response?.data || error;
  }
};

// Approve or reject campaign (admin)
export const handleCampaignApproval = async (campaignId, action) => {
  const res = await axios.post(
    `${API_URL}/donations/campaigns/approve`,
    { campaignId, action },
    getAuthHeaders()
  );
  return res.data;
};
// Get campaign details
export const getCampaignDetails = async (campaignId) => {
  const res = await axios.get(
    `${API_URL}/donations/campaigns/${campaignId}/details`
  );
  return res.data;
};
// Get donors of a campaign
export const getCampaignDonors = async (campaignId) => {
  const res = await axios.get(
    `${API_URL}/donations/campaigns/${campaignId}/donors`
  );
  return res.data;
};
export const donateToCampaign = async (campaignId, amount) => {
  if (!campaignId || !amount) {
    throw new Error("campaignId and amount are required");
  }

  const payload = {
    campaignId: String(campaignId),
    amount: Number(amount),
  };

  const res = await axios.post(
    `${API_URL}/donations/campaigns/donate`,
    payload,
    getAuthHeaders()
  );
  return res.data;
};
// Quick donate
export const quickDonate = async (data) => {
  const res = await axios.post(
    `${API_URL}/donations/quick-donate`,
    data,
    getAuthHeaders()
  );
  return res.data;
};
// Get recent donors (latest 10)
// Get recent donors with pagination
export const getUnifiedRecentDonors = async (page = 1, limit = 10) => {
  const res = await axios.get(
    `${API_URL}/donations/donors/recent?page=${page}&limit=${limit}`,
    getAuthHeaders()
  );
  return res.data;
};

// Get top donors with pagination
export const getUnifiedTopDonors = async (page = 1, limit = 10) => {
  const res = await axios.get(
    `${API_URL}/donations/donors/top?page=${page}&limit=${limit}`,
    getAuthHeaders()
  );
  return res.data;
};
// Get donors in last 30 days sorted by amount
export const getDonorsByAmountLast30Days = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/donations/donors/last-30-days`,
      getAuthHeaders()
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching donors:", error);
    return { success: false, donors: [] };
  }
};
// Get donation analytics (admin)
export const getDonationAnalytics = async () => {
  const res = await axios.get(
    `${API_URL}/donations/analytics`,
    getAuthHeaders()
  );
  return res.data;
};
// Get donation stats (dashboard)
export const getDonationStats = async () => {
  const res = await axios.get(`${API_URL}/donations/stats`, getAuthHeaders());
  return res.data;
};
// Get campaign progress overview
export const getCampaignProgress = async () => {
  const res = await axios.get(`${API_URL}/donations/campaigns/progress`);
  return res.data;
};
// Get user's donation history, recurring donations, tax documents
export const getUserDonationData = async () => {
  const res = await axios.get(
    `${API_URL}/donations/user/donations`,
    getAuthHeaders()
  );
  return res.data;
};

// 📌 Delete Campaign
export const deleteCampaign = async (campaignId) => {
  try {
    const res = await axios.delete(
      `${API_URL}/donations/campaigns/${campaignId}`,
      getAuthHeaders()
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete campaign" };
  }
};
export const getAllDonationHistory = async (page = 1, limit = 10) => {
  try {
    const token = localStorage.getItem("token"); // admin token
    const res = await axios.get(
      `${API_URL}/donations/history?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching donation history:",
      error.response?.data || error.message
    );
    throw error;
  }
};