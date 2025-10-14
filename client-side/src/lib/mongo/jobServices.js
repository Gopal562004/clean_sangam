import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // your backend URL

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ===================== JOBS ===================== //

// Create a job (Admin/Recruiter)
export const createJob = async (jobData) => {
  const response = await axios.post(
    `${API_URL}/jobs`,
    jobData,
    getAuthHeaders()
  );
  return response.data;
};

// Get all approved jobs with optional filters
export const getAllJobs = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/jobs`, { params: filters });
  return response.data;
};

// Get a single job by ID
export const getJobById = async (jobId) => {
  const response = await axios.get(`${API_URL}/jobs/${jobId}`);
  return response.data;
};

// Update a job (Admin/Recruiter)
export const updateJob = async (jobId, jobData) => {
  const response = await axios.put(
    `${API_URL}/jobs/${jobId}`,
    jobData,
    getAuthHeaders()
  );
  return response.data;
};

// Delete a job (Admin/Recruiter)
export const deleteJob = async (jobId) => {
  const response = await axios.delete(
    `${API_URL}/jobs/${jobId}`,
    getAuthHeaders()
  );
  return response.data;
};

// ===================== JOB APPLICATIONS ===================== //

// Apply for a job
// export const applyJob = async (jobId, answers) => {
//   const response = await axios.post(
//     `${API_URL}/jobs/apply/${jobId}`,
//     { answers },
//     getAuthHeaders()
//   );
//   return response.data;
// };
// Apply to a job
// Apply to job
// Apply to a job
export const applyJob = async (jobId, payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs/apply/${jobId}`,
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        coverLetter: payload.coverLetter || "",
        resume: payload.resume ? payload.resume.name : "", // or a URL/string
        answers: payload.answers || [],
      },
      getAuthHeaders() // includes Authorization header
    );
    return response.data;
  } catch (err) {
    console.error("applyJob Error:", err.response?.data || err.message);
    throw err;
  }
};


// Get applicants for a job (Admin/Recruiter)
export const getJobApplicants = async (jobId) => {
  const response = await axios.get(
    `${API_URL}/jobs/applicants/${jobId}`,
    getAuthHeaders()
  );
  return response.data;
};

// ===================== SAVED JOBS ===================== //

// Save or remove a job
export const saveJob = async (jobId) => {
  const response = await axios.post(
    `${API_URL}/jobs/save/${jobId}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

// Get saved jobs for current user
export const getSavedJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs/saved`, getAuthHeaders());
  return response.data;
};

// ===================== JOB ALERTS ===================== //

// Create a job alert
export const createJobAlert = async (alertData) => {
  const response = await axios.post(
    `${API_URL}/jobs/alerts`,
    alertData,
    getAuthHeaders()
  );
  return response.data;
};

// Get all job alerts for current user
export const getJobAlerts = async () => {
  const response = await axios.get(`${API_URL}/jobs/alerts`, getAuthHeaders());
  return response.data;
};

// ===================== ADMIN JOB APPROVAL ===================== //

// Get all pending jobs
export const getPendingJobs = async () => {
  const response = await axios.get(
    `${API_URL}/jobs/pending/all`,
    getAuthHeaders()
  );
  return response.data;
};

// Approve a job
export const approveJob = async (jobId) => {
  const response = await axios.put(
    `${API_URL}/jobs/approve/${jobId}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

// Reject a job
export const rejectJob = async (jobId) => {
  const response = await axios.put(
    `${API_URL}/jobs/reject/${jobId}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

// Check if user already applied for a job
export const getApplicationStatus = async (jobId) => {
  try {
    const response = await axios.get(
      `${API_URL}/jobs/apply/status/${jobId}`,
      getAuthHeaders() // includes Authorization header
    );
    return response.data; // { applied: true/false }
  } catch (err) {
    console.error(
      "getApplicationStatus Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};
// Fetch similar jobs for a given job
export const fetchSimilarJobs = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/similar/${jobId}`, getAuthHeaders());
    return response.data; // array of similar jobs
  } catch (err) {
    console.error("fetchSimilarJobs error:", err.response?.data || err.message);
    return [];
  }
};