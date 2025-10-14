// const express = require("express");
// const router = express.Router();
// const {
//   createEvent,
//   getApprovedEvents,
//   getMyEvents,
//   updateEventStatus,
//   deleteEvent,
//   registerForEvent,
//   getQR,
//   scanQR,
//   getMyRegisteredEvents,
//   getEventById,
//   getEventParticipants,
//   getEventAnalytics,
//   updateAttendance
// } = require("../controllers/event.controller");
// const { protect } = require("../middlewares/auth.middleware");
// const { authorizeRole } = require("../middlewares/role.middleware");



// router.get("/:eventId/participants", protect, authorizeRole("admin"), getEventParticipants);
// router.get("/:eventId/analytics", protect, authorizeRole("admin"), getEventAnalytics);
// router.patch("/:eventId/attendance", protect, authorizeRole("admin"), updateAttendance);
// // Event CRUD
// router.post("/", protect, createEvent);
// router.get("/my-registered-events", protect, getMyRegisteredEvents);
// router.get("/browse", protect,getApprovedEvents);
// router.get("/my-events", protect, getMyEvents);
// router.patch(
//   "/:eventId/status",
//   protect,
//   authorizeRole("admin"),
//   updateEventStatus
// );
// router.delete("/delete/:eventId", protect, deleteEvent);
// router.get("/:eventId", protect, getEventById);
// // Registration / QR
// router.post("/:eventId/register", protect, registerForEvent);
// router.get("/registration/:registrationId/qr", protect, getQR);

// // QR Scan (attendance)
// router.post("/scan", protect, scanQR);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getApprovedEvents,
  getMyEvents,
  updateEventStatus,
  deleteEvent,
  registerForEvent,
  getQR,
  scanQR,
  getMyRegisteredEvents,
  getEventById,
  getEventParticipants,
  getEventAnalytics,
  updateAttendance,
  getPendingEvents
} = require("../controllers/event.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/role.middleware");

// Event CRUD
router.post("/", protect, createEvent); // Create event
router.get("/browse", protect, getApprovedEvents); // Browse all approved events
router.get("/my-events", protect, getMyEvents); // Events created by the user
router.get("/my-registered-events", protect, getMyRegisteredEvents); // Events the user registered for
router.get("/pending", protect, authorizeRole("admin"), getPendingEvents); // Get all pending events (admin-only)
// Registration / QR
router.post("/:eventId/register", protect, registerForEvent); // Register for an event
router.get("/registration/:registrationId/qr", protect, getQR); // Get QR for registration

// Admin routes: Attendance, participants, analytics
router.get(
  "/:eventId/participants",
  protect,
  authorizeRole("admin"),
  getEventParticipants
);
router.get(
  "/:eventId/analytics",
  protect,
  authorizeRole("admin"),
  getEventAnalytics
);
router.patch(
  "/:eventId/attendance",
  protect,
  authorizeRole("admin"),
  updateAttendance
);

// Event status and deletion
router.patch(
  "/:eventId/status",
  protect,
  authorizeRole("admin"),
  updateEventStatus
);
router.delete("/delete/:eventId", protect, deleteEvent);

// Event detail
router.get("/:eventId", protect, getEventById);

// QR Scan (attendance)
router.post("/scan", protect, scanQR);

module.exports = router;
