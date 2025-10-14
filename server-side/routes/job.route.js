const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyJob,
  getJobApplicants,
  saveJob,
  getSavedJobs,
  createJobAlert,
  getJobAlerts,
  approveJob,
  rejectJob,
  getPendingJobs,
  getApplicationStatus,
  getSimilarJobs,
} = require("../controllers/job.controller");
const {
  protect,
} = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/role.middleware");

// ===================== JOBS ===================== //

// Create a job (Admin/Recruiter)
// Admin-created jobs are auto-approved
router.post("/", protect, authorizeRole("admin", "recruiter"), createJob);

// Get all approved jobs (with optional filters)
router.get("/", getAllJobs);


// Get saved jobs
router.get("/saved", protect, getSavedJobs);
// Get single job by ID
router.get("/:jobId", getJobById);

// Check application status
router.get("/apply/status/:jobId", protect, getApplicationStatus);

// Get similar jobs
router.get("/similar/:jobId", getSimilarJobs);
// Update a job
router.put("/:jobId", protect, updateJob);

// Delete a job
router.delete("/:jobId", protect, deleteJob);

// ===================== JOB APPLICATIONS ===================== //

// Apply for a job
router.post("/apply/:jobId", protect, applyJob);

// Get applicants for a job (Admin/Recruiter)
router.get("/applicants/:jobId", protect,authorizeRole("admin","recruiter"), getJobApplicants);

// ===================== SAVED JOBS ===================== //

// Save/remove job
router.post("/save/:jobId", protect, saveJob);



// ===================== JOB ALERTS ===================== //

// Create job alert
router.post("/alerts", protect, createJobAlert);

// Get job alerts
router.get("/alerts", protect, getJobAlerts);

// ===================== ADMIN JOB APPROVAL ===================== //

// Get all pending jobs (Admin)
router.get("/pending/all", protect, authorizeRole("admin","recruiter"), getPendingJobs);

// Approve a job (Admin)
router.put(
  "/approve/:jobId",
  protect,
  authorizeRole("admin", "recruiter"),
  approveJob
);

// Reject a job (Admin)
router.put(
  "/reject/:jobId",
  protect,
  authorizeRole("admin", "recruiter"),
  rejectJob
);
router.ge

module.exports = router;
