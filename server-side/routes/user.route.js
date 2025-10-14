// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   approveOrRejectUser,
//   getPendingUsers,
//   sendMenteeRequest,
//   getAllAlumni,
//   getPendingMenteeRequests,
//   handleMenteeRequest,
//   applyToBecomeMentor,
//   getAllMentors,
// } = require("../controllers/user.controller");

// const { protect } = require("../middlewares/auth.middleware");
// const { authorizeRole } = require("../middlewares/role.middleware");

// //Public Routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);


// //Protected Routes
// // Get profile of logged-in user
// router.get("/profile", protect, getUserProfile);
// // Update profile of logged-in user
// router.put("/profile", protect, updateUserProfile);
// // Get all alumni (for students to view potential mentors)
// router.get("/alumni/all", protect, getAllAlumni);
// // Get all mentors (for students to view potential mentors)
// router.get("/mentors/all", protect, getAllMentors);
// // Apply to become a mentor (for students and alumni)
// router.post("/mentors/apply", protect, applyToBecomeMentor);
// // Send mentee request to an alumni (for students)
// router.post("/mentee/send-requests", protect, sendMenteeRequest);
// // Get pending mentee requests (for alumni)
// router.get("/mentee/pending-requests", protect, getPendingMenteeRequests);
// // Approve or reject mentee request (for alumni)
// router.post("/mentee/approve-requests", protect, handleMenteeRequest);




// // -------------------- Admin Routes --------------------
// // Approve or reject user (only admin)
// router.post(
//   "/admin/request",
//   protect,
//   authorizeRole("admin"),
//   approveOrRejectUser
// );
// router.get("/admin/pending", protect, authorizeRole("admin"), getPendingUsers);

// module.exports = router;
// routes/user.routes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  approveOrRejectUser,
  getPendingUsers,
  sendMenteeRequest,
  getAllAlumni,
  getPendingMenteeRequests,
  handleMenteeRequest,
  applyToBecomeMentor,
  getAllMentors,
  getUserProfileById,
  toggleMenteeRequest
  , getAllUsers,
  getMenteeRequestStatus
} = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/role.middleware");

// -------------------- Public Routes -------------------- //
router.post("/register", registerUser);
router.post("/login", loginUser);

// -------------------- Protected User Routes -------------------- //
// Profile

router
  .route("/profile")
  .get(protect, getUserProfile) // Get logged-in user profile
  .put(protect, updateUserProfile); // Update profile

// Get User Profile by ID
router.get("/profile/:userId", protect, getUserProfileById);



// Alumni
router.get("/alumni", protect, getAllAlumni);

// Mentors
router.get("/mentors", protect, getAllMentors);
router.post("/mentors/apply", protect, applyToBecomeMentor);

// Mentee Requests (Student → Mentor)
//router.post("/mentees/request", protect, sendMenteeRequest);
router.get("/mentees/pending", protect, getPendingMenteeRequests);
router.put("/mentees/handle", protect, handleMenteeRequest);
router.post("/mentees/request", protect, toggleMenteeRequest);
router.get("/mentees/request/status/:mentorId", protect, getMenteeRequestStatus);

// -------------------- Admin Routes -------------------- //
// Approve / Reject User (admin only)
router.post(
  "/admin/request",
  protect,
  authorizeRole("admin"),
  approveOrRejectUser
);

// Get pending users (admin only)
router.get(
  "/admin/pending",
  protect,
  authorizeRole("admin"),
  getPendingUsers
);

// Get all users (admin only)
router.get("/all", protect, authorizeRole("admin"), getAllUsers);
module.exports = router;
