const User = require("../models/User.model");

// Get Mentorship Dashboard Stats for Logged-in Mentor
const getMentorshipStats = async (req, res) => {
  try {
    const mentorId = req.user.id;

    // 1️⃣ Total mentors in system
    const totalMentors = await User.countDocuments({
      "mentorshipPreferences.isMentor": true,
    });

    // 2️⃣ Total mentees of this mentor
    const mentor = await User.findById(mentorId).populate(
      "mentees.userId",
      "name email username avatar role"
    );
    if (!mentor || !mentor.mentorshipPreferences?.isMentor) {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalMentees = mentor.mentees.length;

    // 3️⃣ Approved mentees
    const approvedMentees = mentor.mentees
      .filter((m) => m.status === "approved")
      .map((m) => m.userId);

    // 4️⃣ Pending mentee requests
    const pendingRequests = mentor.mentees
      .filter((m) => m.status === "pending")
      .map((m) => m.userId);

    // 5️⃣ Rejected mentees
    const rejectedMentees = mentor.mentees
      .filter((m) => m.status === "rejected")
      .map((m) => m.userId);

    // 6️⃣ Total mentees across all mentors (system-wide)
    const totalMenteesSystem = await User.aggregate([
      { $unwind: "$mentees" },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);
    const totalMenteesAll = totalMenteesSystem[0]?.total || 0;

    res.status(200).json({
      message: "Mentorship stats fetched successfully",
      stats: {
        totalMentors,
        totalMentees: totalMentees,
        approvedMenteesCount: approvedMentees.length,
        pendingRequestsCount: pendingRequests.length,
        rejectedMenteesCount: rejectedMentees.length,
        totalMenteesAll,
      },
      lists: {
        approvedMentees,
        pendingRequests,
        rejectedMentees,
      },
    });
  } catch (error) {
    console.error("❌ Mentorship Stats Error:", error);
    res.status(500).json({
      message: "Failed to fetch mentorship stats",
      error: error.message,
    });
  }
};

// Optional: Get All Mentees of Mentor (with status filter)
const getMenteesByStatus = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const { status } = req.query; // pending | approved | rejected

    const mentor = await User.findById(mentorId).populate(
      "mentees.userId",
      "name email username avatar role"
    );

    if (!mentor || !mentor.mentorshipPreferences?.isMentor)
      return res.status(403).json({ message: "Access denied" });

    let mentees = mentor.mentees;
    if (status) mentees = mentees.filter((m) => m.status === status);

    res.status(200).json({
      message: "Mentees fetched successfully",
      count: mentees.length,
      mentees: mentees.map((m) => ({
        ...m.userId._doc,
        status: m.status,
        requestedAt: m.requestedAt,
      })),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch mentees", error: error.message });
  }
};

// Optional: System-wide stats (admin-only)
const getMentorshipSystemStats = async (req, res) => {
  try {
    const totalMentors = await User.countDocuments({
      "mentorshipPreferences.isMentor": true,
    });
    const totalMentees = await User.aggregate([
      { $unwind: "$mentees" },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalMentors,
      totalMentees: totalMentees[0]?.total || 0,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch system stats", error: error.message });
  }
};

module.exports = {
  getMentorshipStats,
  getMenteesByStatus,
  getMentorshipSystemStats,
};
