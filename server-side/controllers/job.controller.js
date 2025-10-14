
const Job = require("../models/Job.model");
const User = require("../models/User.model");
const JobAlert = require("../models/JobAlert.model");
const multer = require("multer");
const mongoose = require("mongoose");
// Store files in memory (or configure disk/cloud storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });
// ===================== JOBS ===================== //
// Create a job (Admin/Recruiter)
const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    jobData.postedBy = req.user.id;

    // Auto-approve if admin
    if (req.user.role === "admin") {
      jobData.status = "approved";
    } else {
      jobData.status = "pending"; // default for recruiter
    }

    const job = await Job.create(jobData);
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to create job", error: error.message });
  }
};

// Get all approved jobs (with filters, search, sorting)

// const getAllJobs = async (req, res) => {
//   try {
//     let query = { status: "approved" }; // only approved jobs
//     const { search, location, jobType, salaryMin, salaryMax, sortBy } = req.query;

//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { "company.name": { $regex: search, $options: "i" } },
//         { keyRequirements: { $regex: search, $options: "i" } },
//       ];
//     }
//     if (location) query.location = { $regex: location, $options: "i" };
//     if (jobType) query.employmentType = jobType;
//     if (salaryMin || salaryMax) {
//       query["salary.min"] = { $gte: salaryMin || 0 };
//       query["salary.max"] = { $lte: salaryMax || 10000000 };
//     }

//     let jobs = await Job.find(query);

//     if (sortBy === "date") jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
//     else if (sortBy === "salary") jobs.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
//     else if (sortBy === "match") jobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

//     res.status(200).json({ count: jobs.length, jobs });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
//   }
// };
// const getAllJobs = async (req, res) => {
//   try {
//     let query = { status: "approved" }; // only approved jobs
//     const {
//       search,
//       location,
//       jobType,
//       salaryMin,
//       salaryMax,
//       sortBy,
//       page = 1,
//       limit = 6,
//     } = req.query;

//     // 🔍 Search (title, company, keyRequirements) with regex for partial matches
//     if (search) {
//       const regex = new RegExp(search, "i"); // case-insensitive
//       query.$or = [
//         { title: { $regex: regex } },
//         { "company.name": { $regex: regex } },
//         { keyRequirements: { $regex: regex } },
//       ];
//     }

//     if (location) query.location = { $regex: new RegExp(location, "i") };
//     if (jobType) query.employmentType = jobType;
//     if (salaryMin || salaryMax) {
//       query["salary.min"] = { $gte: Number(salaryMin) || 0 };
//       query["salary.max"] = { $lte: Number(salaryMax) || 10000000 };
//     }

//     // Pagination
//     const skip = (page - 1) * limit;

//     let jobsQuery = Job.find(query).skip(skip).limit(Number(limit));

//     // Sorting
//     if (sortBy === "date") jobsQuery = jobsQuery.sort({ postedDate: -1 });
//     else if (sortBy === "salary")
//       jobsQuery = jobsQuery.sort({ "salary.max": -1 });
//     else if (sortBy === "match") jobsQuery = jobsQuery.sort({ matchScore: -1 });

//     const jobs = await jobsQuery.lean(); // lean for faster query
//     const total = await Job.countDocuments(query);

//     res.status(200).json({
//       count: jobs.length,
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       pages: Math.ceil(total / limit),
//       jobs,
//     });
//   } catch (error) {
//     console.error("❌ getAllJobs Error:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch jobs", error: error.message });
//   }
// };

// const getAllJobs = async (req, res) => {
//   try {
//     let query = { status: "approved" }; // only approved jobs
//     const {
//       search,
//       jobType,
//       experience,
//       companySize,
//       posted,
//       salaryMin,
//       salaryMax,
//       sortBy,
//       page = 1,
//       limit = 6,
//     } = req.query;

//     // 🔍 Search (title, company name, keyRequirements)
//     if (search) {
//       const regex = new RegExp(search, "i");
//       query.$or = [
//         { title: { $regex: regex } },
//         { "company.name": { $regex: regex } },
//         { keyRequirements: { $regex: regex } },
//       ];
//     }

//     // Job Type filter
//     if (jobType) {
//       const typesArray = Array.isArray(jobType) ? jobType : [jobType];
//       query.employmentType = { $in: typesArray };
//     }

//     // Experience filter
//     if (experience) {
//       const expArray = Array.isArray(experience) ? experience : [experience];
//       query.experienceLevel = { $in: expArray }; // Make sure Job schema has experienceLevel field
//     }

//     // Company Size filter
//     if (companySize) {
//       const sizeArray = Array.isArray(companySize)
//         ? companySize
//         : [companySize];
//       query["company.size"] = { $in: sizeArray };
//     }

//     // Date Posted filter
//     if (posted) {
//       const postedArray = Array.isArray(posted) ? posted : [posted];
//       const now = new Date();
//       const dateFilters = postedArray.map((time) => {
//         switch (time) {
//           case "today":
//             return { postedDate: { $gte: new Date(now.setHours(0, 0, 0, 0)) } };
//           case "week":
//             return {
//               postedDate: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) },
//             };
//           case "month":
//             return {
//               postedDate: { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) },
//             };
//           default:
//             return {};
//         }
//       });
//       if (dateFilters.length > 0)
//         query.$or = [...(query.$or || []), ...dateFilters];
//     }

//     // Salary filter
//     if (salaryMin || salaryMax) {
//       query["salary.min"] = { $gte: Number(salaryMin) || 0 };
//       query["salary.max"] = { $lte: Number(salaryMax) || 10000000 };
//     }

//     // Pagination
//     const skip = (page - 1) * limit;

//     let jobsQuery = Job.find(query).skip(skip).limit(Number(limit));

//     // Sorting
//     if (sortBy === "date") jobsQuery = jobsQuery.sort({ postedDate: -1 });
//     else if (sortBy === "salary")
//       jobsQuery = jobsQuery.sort({ "salary.max": -1 });
//     else if (sortBy === "match") jobsQuery = jobsQuery.sort({ matchScore: -1 });

//     const jobs = await jobsQuery.lean();
//     const total = await Job.countDocuments(query);

//     res.status(200).json({
//       count: jobs.length,
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       pages: Math.ceil(total / limit),
//       jobs,
//     });
//   } catch (error) {
//     console.error("❌ getAllJobs Error:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch jobs", error: error.message });
//   }
// };
const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      experience,
      companySize,
      posted,
      salaryMin,
      salaryMax,
      remote,
      urgent,
      category,
      industry,
      tags,
      status,
      page = 1,
      limit = 6,
      sortBy,
    } = req.query;

    let query = { status: "approved" };

    // Search by title, company name, or key requirements
    if (search) {
      const regex = new RegExp(search, "i");
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { title: { $regex: regex } },
          { "company.name": { $regex: regex } },
          { keyRequirements: { $regex: regex } },
        ],
      });
    }

    // Location filter
    if (location) {
      const locRegex = new RegExp(location, "i");
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { location: { $regex: locRegex } },
          { "company.location": { $regex: locRegex } },
        ],
      });
    }

    // Other filters
    if (jobType)
      query.employmentType = {
        $in: Array.isArray(jobType) ? jobType : [jobType],
      };
    if (experience)
      query.experienceLevel = {
        $in: Array.isArray(experience) ? experience : [experience],
      };
    if (companySize)
      query["company.size"] = {
        $in: Array.isArray(companySize) ? companySize : [companySize],
      };
    if (remote)
      query.remote = {
        $in: Array.isArray(remote)
          ? remote.map((r) => r === "Remote")
          : [remote === "Remote"],
      };
    if (urgent) query.urgent = true;
    if (category)
      query.category = { $in: Array.isArray(category) ? category : [category] };
    if (industry)
      query["company.industry"] = {
        $in: Array.isArray(industry) ? industry : [industry],
      };
    if (tags) query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
    if (salaryMin || salaryMax) {
      query["salary.min"] = { $gte: Number(salaryMin) || 0 };
      query["salary.max"] = { $lte: Number(salaryMax) || 10000000 };
    }

    // Posted date filter
    if (posted) {
      const postedArray = Array.isArray(posted) ? posted : [posted];
      const now = new Date();
      const dateFilters = postedArray.map((time) => {
        switch (time) {
          case "today":
            return { postedDate: { $gte: new Date(now.setHours(0, 0, 0, 0)) } };
          case "week":
            return {
              postedDate: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) },
            };
          case "month":
            return {
              postedDate: { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) },
            };
          default:
            return {};
        }
      });
      if (dateFilters.length > 0) {
        query.$and = query.$and || [];
        query.$and.push({ $or: dateFilters });
      }
    }

    // Status filter (active/expired)
    if (status) {
      const now = new Date();
      const statusArray = Array.isArray(status) ? status : [status];
      query.$and = query.$and || [];
      const statusConditions = [];
      if (statusArray.includes("Active"))
        statusConditions.push({ closingDate: { $gte: now } });
      if (statusArray.includes("Expired"))
        statusConditions.push({ closingDate: { $lt: now } });
      if (statusConditions.length > 0)
        query.$and.push({ $or: statusConditions });
    }

    // Pagination
    const skip = (page - 1) * limit;
    let jobsQuery = Job.find(query).skip(skip).limit(Number(limit));

    // Sorting
    if (sortBy === "date") jobsQuery = jobsQuery.sort({ postedDate: -1 });
    else if (sortBy === "salary")
      jobsQuery = jobsQuery.sort({ "salary.max": -1 });
    else if (sortBy === "match") jobsQuery = jobsQuery.sort({ matchScore: -1 });

    const jobs = await jobsQuery.lean();
    const total = await Job.countDocuments(query);

    res.status(200).json({
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job", error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job", error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};

// ===================== JOB APPLICATIONS ===================== //
// Apply for a job
// const applyJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const { answers } = req.body;
//     const userId = req.user.id;

//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const existing = job.applicants.find(a => a.userId.toString() === userId);
//     if (existing) return res.status(400).json({ message: "Already applied" });

//     job.applicants.push({ userId, answers });
//     await job.save();

//     res.status(200).json({ message: "Applied successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to apply", error: error.message });
//   }
// };
// Apply for a job
// const applyJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const userId = req.user.id; // from auth middleware
//     const { firstName, lastName, email, phone, coverLetter, resume, answers } =
//       req.body;

//     if (!Array.isArray(answers)) {
//       return res.status(400).json({
//         message: "Answers must be an array of objects [{ questionId, answer }]",
//       });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const existing = job.applicants.find(
//       (a) => a.userId.toString() === userId
//     );
//     if (existing) return res.status(400).json({ message: "Already applied" });

//     // Push new applicant
//     job.applicants.push({
//       userId,
//       firstName,
//       lastName,
//       email,
//       phone,
//       coverLetter,
//       resume,
//       answers,
//     });

//     await job.save();

//     res.status(200).json({ message: "Applied successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to apply", error: error.message });
//   }
// };
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const { firstName, lastName, email, phone, coverLetter, resume, answers } =
      req.body;

    console.log("ApplyJob payload:", req.body);

    if (!firstName || !lastName || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Missing required applicant info" });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message: "Answers must be an array of objects [{ questionId, answer }]",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = job.applicants.find(
      (a) => a.userId?.toString() === userId
    );
    if (existing) return res.status(400).json({ message: "Already applied" });

    job.applicants.push({
      userId,
      firstName,
      lastName,
      email,
      phone,
      coverLetter: coverLetter || "",
      resume: resume || "",
      answers,
    });

    await job.save();

    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ message: "Failed to apply", error: error.message });
  }
};


// Get applicants for a job
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate(
      "applicants.userId",
      "name email username role profileImage"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ applicants: job.applicants });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applicants", error: error.message });
  }
};

// ===================== SAVED JOBS ===================== //
// Save or remove a job
// const saveJob = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { jobId } = req.params;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Ensure savedJobs array exists
//     user.savedJobs = user.savedJobs || [];

//     let message;
//     if (user.savedJobs.includes(jobId)) {
//       // Job already saved, remove it
//       user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
//       message = "Job removed";
//     } else {
//       // Job not saved, add it
//       user.savedJobs.push(jobId);
//       message = "Job saved";
//     }

//     await user.save();
//     res.status(200).json({ message, savedJobs: user.savedJobs });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to update saved jobs", error: error.message });
//   }
// };
const saveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure savedJobs array exists
    user.savedJobs = user.savedJobs || [];

    let message;
    let isSaved;

    if (user.savedJobs.includes(jobId)) {
      // Job already saved → remove it
      user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
      message = "Job removed";
      isSaved = false;
    } else {
      // Job not saved → add it
      user.savedJobs.push(jobId);
      message = "Job saved";
      isSaved = true;
    }

    await user.save();

    res.status(200).json({
      message,
      isSaved,
      savedJobs: user.savedJobs, // optional: for frontend sync
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update saved jobs",
      error: error.message,
    });
  }
};


// Get saved jobs for a user
const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and populate savedJobs with full job details
    const user = await User.findById(userId).populate({
      path: "savedJobs",
      model: "Job", // Ensure it points to your Job model
      select: "title company location salary description", // select only required fields
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ savedJobs: user.savedJobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch saved jobs", error: error.message });
  }
};


// ===================== JOB ALERTS ===================== //
// Create a job alert
const createJobAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const alertData = req.body;
    alertData.userId = userId;

    const alert = await JobAlert.create(alertData);
    res.status(201).json({ message: "Job alert created", alert });
  } catch (error) {
    res.status(500).json({ message: "Failed to create job alert", error: error.message });
  }
};

// Get all job alerts for a user
const getJobAlerts = async (req, res) => {
  try {
    const userId = req.user.id;
    const alerts = await JobAlert.find({ userId });
    res.status(200).json({ alerts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job alerts", error: error.message });
  }
};

// Get all pending jobs
// const getPendingJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ status: "pending" }).sort({ createdAt: -1 });
//     res.status(200).json({ count: jobs.length, jobs });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch pending jobs", error: error.message });
//   }
// };
const getPendingJobs = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;

    const skip = (page - 1) * limit;

    const jobsQuery = Job.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const jobs = await jobsQuery.lean();
    const total = await Job.countDocuments({ status: "pending" });

    res.status(200).json({
      count: jobs.length,
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    console.error("❌ getPendingJobs error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch pending jobs", error: error.message });
  }
};

// Approve a job
const approveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndUpdate(jobId, { status: "approved" }, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job approved", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve job", error: error.message });
  }
};

// Reject a job
const rejectJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndUpdate(jobId, { status: "rejected" }, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job rejected", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject job", error: error.message });
  }
};

// ✅ Check if user already applied for a job
const getApplicationStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id; // from auth middleware

    const job = await Job.findById(jobId).select("applicants.userId");
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = job.applicants.some(
      (a) => a.userId?.equals(userId) // ✅ safer ObjectId comparison
    );

    res.status(200).json({ applied: alreadyApplied });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to check application status",
      error: error.message,
    });
  }
};

// GET /jobs/similar/:jobId
const getSimilarJobs = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Build query for similar jobs
    const similarJobs = await Job.find({
      _id: { $ne: job._id }, // exclude current job
      category: job.category, // match category
      experienceLevel: job.experienceLevel, // match experience level
      employmentType: job.employmentType, // match employment type
      tags: { $in: Array.isArray(job.tags) ? job.tags : [job.tags] }, // match any tag
      location: job.location, // optional: match location
      status: "approved", // only approved jobs
    }).limit(10); // limit to 10 results

    res.status(200).json(similarJobs);
  } catch (error) {
    console.error("fetchSimilarJobs error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ===================== EXPORT ===================== //
module.exports = {
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
  getPendingJobs,
  approveJob,
  rejectJob,
  getApplicationStatus,
  getSimilarJobs,
};
