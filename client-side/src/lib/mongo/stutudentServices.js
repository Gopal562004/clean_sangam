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

// ======================= Mentors =======================
export const getSuggestedMentors = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/mentors/suggested`,
      getAuthHeaders()
    );
    return res.data; // Assuming backend returns an array of mentors
  } catch (error) {
    console.error("Error fetching suggested mentors:", error);
    return [];
  }
};

// ======================= Events =======================
export const getUpcomingEvents = async () => {
  try {
    const res = await axios.get(`${API_URL}/events/upcoming`, getAuthHeaders());
    return res.data; // Array of events
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
};

// ======================= Active Mentorships =======================
export const getActiveMentorships = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/mentorships/active`,
      getAuthHeaders()
    );
    return res.data; // Array of active mentorships
  } catch (error) {
    console.error("Error fetching active mentorships:", error);
    return [];
  }
};

// ======================= Announcements =======================
export const getAnnouncements = async () => {
  try {
    const res = await axios.get(`${API_URL}/announcements`, getAuthHeaders());
    return res.data; // Array of announcements
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
};

// ======================= Dashboard Stats =======================
export const getDashboardStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/stats`, getAuthHeaders());
    return res.data; // Array of stats objects
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return [];
  }
};

// ======================= Career Opportunities =======================
export const getCareerOpportunities = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/jobs/opportunities`,
      getAuthHeaders()
    );
    return res.data; // Array of job opportunities
  } catch (error) {
    console.error("Error fetching career opportunities:", error);
    return [];
  }
};

// ======================= Optional: Apply / Save Jobs =======================
export const applyJob = async (jobId, payload) => {
  try {
    const res = await axios.post(
      `${API_URL}/jobs/apply/${jobId}`,
      payload,
      getAuthHeaders()
    );
    return res.data;
  } catch (error) {
    console.error("Error applying to job:", error);
    throw error;
  }
};

export const saveJob = async (jobId) => {
  try {
    const res = await axios.post(
      `${API_URL}/jobs/save/${jobId}`,
      {},
      getAuthHeaders()
    );
    return res.data;
  } catch (error) {
    console.error("Error saving job:", error);
    throw error;
  }
};
