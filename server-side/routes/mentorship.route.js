const express = require("express");
const router = express.Router();
const {
  getMentorshipStats,
  getMenteesByStatus,
  getMentorshipSystemStats,
} = require("../controllers/mentorship.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/role.middleware");


// -------------------- Mentor Routes --------------------

// Get mentorship stats for logged-in mentor
router.get("/dashboard", protect, getMentorshipStats);

// Get mentees by status (pending, approved, rejected)
router.get("/mentees", protect, getMenteesByStatus);

// -------------------- Admin Routes --------------------

// System-wide mentorship stats (admin only)
router.get(
  "/system-stats",
  protect,
  authorizeRole("admin"),
  getMentorshipSystemStats
);

module.exports = router;
