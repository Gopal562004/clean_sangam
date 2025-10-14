const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { generateToken } = require("../utils/jwt");

//Register User
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, phone, role, education } =
      req.body;

    if (role === "student" || role === "alumni") {
      if (!education || !education.length) {
        return res.status(400).json({
          message:
            "At least one education entry is required for student and alumni",
        });
      }

      const edu = education[0];
      const requiredFields = [
        "institution",
        "degree",
        "field",
        "enrollmentNumber",
        "startDate",
        "endDate",
      ];
      for (const field of requiredFields) {
        if (!edu[field]) {
          return res
            .status(400)
            .json({ message: `Education field '${field}' is required` });
        }
      }
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { username },
        {
          "education.enrollmentNumber":
            education && education[0]?.enrollmentNumber,
        },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User or enrollment number already exists" });
    }

    const newUser = await User.create({
      name,
      username,
      email,
      password,
      phone,
      role,
      education:
        education && (role === "student" || role === "alumni") ? education : [],
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error); // full error stack
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
      stack: error.stack, // temp: shows exact reason
    });
  }

};
//Login User
const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user is approved
    if (user.status !== "approved") {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
//Get User Profile
const getUserProfile = async (req, res) => {
  try {
    // Fetch full user info from DB using id from req.user
    const user = await User.findById(req.user.id)
      .select("-password") // exclude password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};
//Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = { ...req.body };

    // Remove sensitive fields
    delete updates.password;
    delete updates.role;
    delete updates.status;

    console.log("Received updates:", updates);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates }, // Apply whatever fields are in req.body (except the deleted ones)
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Updated user object:", user);

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
// Apply to Become Mentor
const applyToBecomeMentor = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle isMentor
    user.mentorshipPreferences.isMentor = !user.mentorshipPreferences.isMentor;

    // Mark nested object as modified
    user.markModified("mentorshipPreferences");

    await user.save();

    res.status(200).json({
      message: `Mentor status has been ${
        user.mentorshipPreferences.isMentor ? "enabled" : "disabled"
      }`,
      isMentor: user.mentorshipPreferences.isMentor,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Failed to toggle mentor status",
        error: error.message,
      });
  }
};

// Get User Profile by ID
const getUserProfileById = async (req, res) => {
  try {
    const { userId } = req.params; // /users/:userId

    // Fetch full user info from DB using the provided userId
    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

//Get All Mentors
// Get all mentors with search, filters & pagination
// const getAllMentors = async (req, res) => {
//   try {
//     const {
//       search = "",
//       graduationYear = "",
//       department = "",
//       industry = "",
//       location = "",
//       skills = "",
//       availableForMentorship = false,
//       availableForSpeaking = false,
//       availableForRecruiting = false,
//       page = 1,
//       limit = 10,
//     } = req.query;

//     const filter = { "mentorshipPreferences.isMentor": true };

//     // 🔍 Search by name or skills
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { "skills.name": { $regex: search, $options: "i" } },
//       ];
//     }

//     // 🎓 Graduation year filter
//     if (graduationYear) {
//       if (graduationYear === "before-2000") {
//         filter["education.endDate"] = { $lt: new Date("2000-01-01") };
//       } else if (graduationYear.includes("-")) {
//         const [start, end] = graduationYear.split("-").map(Number);
//         filter["education.endDate"] = {
//           $gte: new Date(`${start}-01-01`),
//           $lte: new Date(`${end}-12-31`),
//         };
//       } else {
//         filter["education.endDate"] = {
//           $gte: new Date(`${graduationYear}-01-01`),
//           $lte: new Date(`${graduationYear}-12-31`),
//         };
//       }
//     }

//     // 🏫 Department filter
//     if (department) filter.department = department;

//     // 🏭 Industry filter (derived from company/field — you may adjust logic)
//     if (industry) filter.industry = industry;

//     // 📍 Location filter
//     if (location) filter.location = location;

//     // 🛠 Skills filter (comma-separated)
//     if (skills) {
//       const skillArray = skills.split(",").map((s) => s.trim());
//       filter["skills.name"] = { $in: skillArray };
//     }

//     // ✅ Availability filters
//     if (availableForMentorship === "true")
//       filter["mentorshipPreferences.available"] = true;
//     if (availableForSpeaking === "true")
//       filter["mentorshipPreferences.speaking"] = true;
//     if (availableForRecruiting === "true")
//       filter["mentorshipPreferences.recruiting"] = true;

//     // Pagination
//     const skip = (page - 1) * limit;

//     const mentors = await User.find(filter)
//       .select(
//         "-password -otp -otpExpiration -notifications -createdAt -updatedAt"
//       )
//       .skip(skip)
//       .limit(Number(limit))
//       .lean();

//     const total = await User.countDocuments(filter);

//     // Transform mentors
//     const mentorData = mentors.map((user, index) => {
//       const latestEdu = user.education?.[user.education.length - 1] || {};
//       return {
//         id: skip + index + 1,
//         name: user.name,
//         profileImage: user.avatar,
//         graduationYear: latestEdu.endDate
//           ? new Date(latestEdu.endDate).getFullYear()
//           : null,
//         currentPosition: user.currentPosition,
//         company: user.company,
//         department: user.department,
//         skills: user.skills?.map((s) => s.name),
//         location: user.location,
//         industry: user.company ? "technology" : "",
//         availableForMentorship: user.mentorshipPreferences?.available || false,
//         availableForSpeaking: user.mentorshipPreferences?.speaking || false,
//         availableForRecruiting: user.mentorshipPreferences?.recruiting || false,
//         isMentor: user.mentorshipPreferences?.isMentor,
//         lastActive: user.updatedAt
//           ? new Date(user.updatedAt).toISOString().split("T")[0]
//           : null,
//       };
//     });

//     res.status(200).json({
//       message: "Mentors fetched successfully",
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       pages: Math.ceil(total / limit),
//       count: mentorData.length,
//       mentors: mentorData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to fetch mentors",
//       error: error.message,
//     });
//   }
// };

// const getAllMentors = async (req, res) => {
//   try {
//     const {
//       search = "",
//       graduationYear = "",
//       department = "",
//       industry = "",
//       location = "",
//       skills = "",
//       availableForMentorship = "false",
//       availableForSpeaking = "false",
//       availableForRecruiting = "false",
//       page = 1,
//       limit = 10,
//     } = req.query;

//     const filter = { "mentorshipPreferences.isMentor": true };

//     // 🔍 Search by name or skills
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { "skills.name": { $regex: search, $options: "i" } },
//       ];
//     }

//     // 🎓 Graduation year filter
//     if (graduationYear) {
//       if (graduationYear === "before-2000") {
//         filter["education.endDate"] = { $lt: new Date("2000-01-01") };
//       } else if (graduationYear.includes("-")) {
//         const [start, end] = graduationYear.split("-").map(Number);
//         filter["education.endDate"] = {
//           $gte: new Date(`${start}-01-01`),
//           $lte: new Date(`${end}-12-31`),
//         };
//       } else {
//         filter["education.endDate"] = {
//           $gte: new Date(`${graduationYear}-01-01`),
//           $lte: new Date(`${graduationYear}-12-31`),
//         };
//       }
//     }

//     // 🏫 Department filter
//     if (department) filter.department = department;

//     // 🏭 Industry filter
//     if (industry) filter.industry = industry;

//     // 📍 Location filter
//     if (location) filter.location = location;

//     // 🛠 Skills filter (comma-separated)
//     if (skills) {
//       const skillArray = skills.split(",").map((s) => s.trim());
//       filter["skills.name"] = { $in: skillArray };
//     }

//     // ✅ Availability filters
//     if (availableForMentorship === "true")
//       filter["mentorshipPreferences.available"] = true;
//     if (availableForSpeaking === "true")
//       filter["mentorshipPreferences.speaking"] = true;
//     if (availableForRecruiting === "true")
//       filter["mentorshipPreferences.recruiting"] = true;

//     // Pagination
//     const skip = (page - 1) * limit;

//     // Fetch mentors
//     const mentors = await User.find(filter)
//       .select(
//         "-password -otp -otpExpiration -notifications -createdAt -updatedAt"
//       )
//       .skip(skip)
//       .limit(Number(limit))
//       .lean();

//     const total = await User.countDocuments(filter);

//     // Transform mentors
//     const mentorData = mentors.map((user) => {
//       const latestEdu = user.education?.[user.education.length - 1] || {};
//       return {
//         id: user._id, // Use MongoDB ObjectId
//         name: user.name,
//         profileImage: user.avatar,
//         graduationYear: latestEdu.endDate
//           ? new Date(latestEdu.endDate).getFullYear()
//           : null,
//         currentPosition: user.currentPosition,
//         company: user.company,
//         department: user.department,
//         skills: user.skills?.map((s) => s.name),
//         location: user.location,
//         industry: user.company ? "technology" : "",
//         availableForMentorship: user.mentorshipPreferences?.available || false,
//         availableForSpeaking: user.mentorshipPreferences?.speaking || false,
//         availableForRecruiting: user.mentorshipPreferences?.recruiting || false,
//         isMentor: user.mentorshipPreferences?.isMentor,
//         lastActive: user.updatedAt
//           ? new Date(user.updatedAt).toISOString().split("T")[0]
//           : null,
//       };
//     });

//     res.status(200).json({
//       message: "Mentors fetched successfully",
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       pages: Math.ceil(total / limit),
//       count: mentorData.length,
//       mentors: mentorData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to fetch mentors",
//       error: error.message,
//     });
//   }
// };
const getAllMentors = async (req, res) => {
  try {
    const {
      search = "",
      graduationYear = "",
      department = "",
      industry = "",
      location = "",
      skills = "",
      availableForMentorship = "false",
      availableForSpeaking = "false",
      availableForRecruiting = "false",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { "mentorshipPreferences.isMentor": true };

    // 🔹 Exclude current user
    if (req.user && req.user.id) {
      filter._id = { $ne: req.user.id };
    }

    // 🔍 Search by name or skills
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { "skills.name": { $regex: search, $options: "i" } },
      ];
    }

    // 🎓 Graduation year filter
    if (graduationYear) {
      if (graduationYear === "before-2000") {
        filter["education.endDate"] = { $lt: new Date("2000-01-01") };
      } else if (graduationYear.includes("-")) {
        const [start, end] = graduationYear.split("-").map(Number);
        filter["education.endDate"] = {
          $gte: new Date(`${start}-01-01`),
          $lte: new Date(`${end}-12-31`),
        };
      } else {
        filter["education.endDate"] = {
          $gte: new Date(`${graduationYear}-01-01`),
          $lte: new Date(`${graduationYear}-12-31`),
        };
      }
    }

    // 🏫 Department filter
    if (department) filter.department = department;

    // 🏭 Industry filter
    if (industry) filter.industry = industry;

    // 📍 Location filter
    if (location) filter.location = location;

    // 🛠 Skills filter
    if (skills) {
      const skillArray = skills.split(",").map((s) => s.trim());
      filter["skills.name"] = { $in: skillArray };
    }

    // ✅ Availability filters
    if (availableForMentorship === "true")
      filter["mentorshipPreferences.available"] = true;
    if (availableForSpeaking === "true")
      filter["mentorshipPreferences.speaking"] = true;
    if (availableForRecruiting === "true")
      filter["mentorshipPreferences.recruiting"] = true;

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch mentors
    const mentors = await User.find(filter)
      .select(
        "-password -otp -otpExpiration -notifications -createdAt -updatedAt"
      )
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await User.countDocuments(filter);

    // Transform mentors
    const mentorData = mentors.map((user) => {
      const latestEdu = user.education?.[user.education.length - 1] || {};
      return {
        id: user._id,
        name: user.name,
        profileImage: user.avatar,
        graduationYear: latestEdu.endDate
          ? new Date(latestEdu.endDate).getFullYear()
          : null,
        currentPosition: user.currentPosition,
        company: user.company,
        department: user.department,
        skills: user.skills?.map((s) => s.name),
        location: user.location,
        industry: user.company ? "technology" : "",
        availableForMentorship: user.mentorshipPreferences?.available || false,
        availableForSpeaking: user.mentorshipPreferences?.speaking || false,
        availableForRecruiting: user.mentorshipPreferences?.recruiting || false,
        isMentor: user.mentorshipPreferences?.isMentor,
        lastActive: user.updatedAt
          ? new Date(user.updatedAt).toISOString().split("T")[0]
          : null,
      };
    });

    res.status(200).json({
      message: "Mentors fetched successfully",
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
      count: mentorData.length,
      mentors: mentorData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch mentors",
      error: error.message,
    });
  }
};
// Send Mentee Request (Student -> Mentor)
const sendMenteeRequest = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const studentId = req.user.id;

    if (!mentorId) {
      return res.status(400).json({ message: "Mentor ID is required" });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || !mentor.mentorshipPreferences?.isMentor) {
      return res
        .status(404)
        .json({ message: "Mentor not found or not available" });
    }

    // Check if request already exists
    const existingRequestIndex = mentor.mentees.findIndex(
      (m) => m.userId.toString() === studentId
    );

    if (existingRequestIndex !== -1) {
      // Request exists → remove it (undo)
      mentor.mentees.splice(existingRequestIndex, 1);
      await mentor.save();
      return res
        .status(200)
        .json({ message: "Mentee request removed successfully" });
    }

    // Add new request
    mentor.mentees.push({
      userId: studentId,
      status: "pending",
      requestedAt: new Date(),
    });
    await mentor.save();

    res.status(200).json({ message: "Mentee request sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to send request", error: error.message });
  }
};
// Get Pending Mentee Requests (Mentor)
const getPendingMenteeRequests = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const mentor = await User.findById(mentorId)
      .populate("mentees.userId", "name username email avatar role");

    if (!mentor || !mentor.mentorshipPreferences?.isMentor) {
      return res.status(403).json({ message: "Access denied" });
    }

    const pendingRequests = mentor.mentees.filter(m => m.status === "pending");

    res.status(200).json({ pendingRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
};
// Approve / Reject Mentee Request (Mentor)
const handleMenteeRequest = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const { studentId, action } = req.body;

    if (!studentId || !action) {
      return res.status(400).json({ message: "Student ID and action are required" });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || !mentor.mentorshipPreferences?.isMentor) {
      return res.status(403).json({ message: "Access denied" });
    }

    const mentee = mentor.mentees.find(m => m.userId.toString() === studentId);
    if (!mentee) return res.status(404).json({ message: "Request not found" });

    if (action === "approve") {
      mentee.status = "approved";

      // Add mentor to student's mentors
      const student = await User.findById(studentId);
      if (student && !student.mentors.includes(mentorId)) {
        student.mentors.push(mentorId);
        await student.save();
      }
    } else if (action === "reject") {
      mentee.status = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await mentor.save();
    res.status(200).json({ message: `Request ${action}ed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to handle request", error: error.message });
  }
};
//partial access
const getAllAlumni = async (req, res) => {
  try {
    const alumniUsers = await User.find({
      role: "alumni",
      status: "approved",
    }).select(
      "-password -otp -otpExpiration -notifications -createdAt -updatedAt"
    ); // exclude sensitive

    // Map alumni to desired response format
    const alumniData = alumniUsers.map((user, index) => {
      const latestEdu = user.education[user.education.length - 1] || {};
      return {
        id: index + 1,
        name: user.name,
        profileImage: user.avatar,
        graduationYear: latestEdu.endDate
          ? new Date(latestEdu.endDate).getFullYear()
          : null,
        currentPosition: user.currentPosition,
        company: user.company,
        department: user.department,
        skills: user.skills.map((s) => s.name),
        location: user.location,
        industry: user.company ? "technology" : "", // optional, can customize
        availableForMentorship: user.mentorshipPreferences?.available || false,
        availableForSpeaking: true, // can customize if you want
        availableForRecruiting: user.role === "alumni" ? false : true,
        isConnected: false, // placeholder, to check connection with requesting user
        lastActive: user.updatedAt
          ? user.updatedAt.toISOString().split("T")[0]
          : null,
      };
    });

    res.status(200).json({
      message: "Alumni fetched successfully",
      count: alumniData.length,
      alumni: alumniData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch alumni", error: error.message });
  }
};
// Admin-only routes
const approveOrRejectUser = async (req, res) => {
  try {
    const { userId, action } = req.body; // both come from request body

    if (!userId || !action) {
      return res.status(400).json({ message: "userId and action are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (action === "approve") {
      user.status = "approved";
      await user.save();
      return res.status(200).json({ message: "User approved successfully" });
    } else if (action === "reject") {
      await user.deleteOne();
      return res.status(200).json({ message: "User rejected and deleted successfully" });
    } else {
      return res.status(400).json({ message: "Invalid action. Must be 'approve' or 'reject'" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process request", error: error.message });
  }
};
const getPendingUsers = async (req, res) => {
  try {
    // Optional role filter from query string: /users/pending?role=student
    const { role } = req.query;

    const query = { status: "pending" };
    if (role) query.role = role;

    const users = await User.find(query).select("-password");

    res.status(200).json({
      message: "Pending users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch pending users",
      error: error.message,
    });
  }
};
const toggleMenteeRequest = async (req, res) => {
  try {
    const mentorId = req.body.mentorId;
    const menteeId = req.user.id;

    if (mentorId === menteeId)
      return res.status(400).json({ message: "Cannot connect to yourself" });

    const mentor = await User.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    // Check if mentee already sent request
    const existingRequest = mentor.mentees.find(
      (m) => m.userId.toString() === menteeId
    );

    if (existingRequest) {
      // Withdraw: remove request
      mentor.mentees = mentor.mentees.filter(
        (m) => m.userId.toString() !== menteeId
      );
      await mentor.save();
      return res.status(200).json({ message: "Request withdrawn" });
    } else {
      // Send request
      mentor.mentees.push({ userId: menteeId, status: "pending" });
      await mentor.save();
      return res.status(200).json({ message: "Request sent" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get All Users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const {
      search = "",       // search by name, username, or email
      role,              // optional role filter
      status,            // optional status filter (approved, pending, rejected)
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Role filter
    if (role) query.role = role;

    // Status filter
    if (status) query.status = status;

    // Pagination
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select("-password -otp -otpExpiration -notifications") // exclude sensitive info
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await User.countDocuments(query);

    res.status(200).json({
      message: "Users fetched successfully",
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Check if the logged-in mentee has already sent a request to a mentor
const getMenteeRequestStatus = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const menteeId = req.user.id;

    const mentor = await User.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Check if mentee has already sent a request
    const requestSent = mentor.mentees?.some(
      (m) => m.userId.toString() === menteeId
    );

    return res.status(200).json({ requestSent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
//Export Controller
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  approveOrRejectUser,
  updateUserProfile,
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
};
