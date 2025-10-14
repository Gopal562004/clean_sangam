const mongoose = require("mongoose");

const CustomQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  type: { type: String, enum: ["text", "select", "number"], default: "text" },
  options: [String],
  required: { type: Boolean, default: false },
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, default: null },
  description: { type: String, default: "" },
  size: { type: String, default: "" },
  founded: { type: String, default: "" },
  industry: { type: String, default: "" },
  rating: { type: String, default: "" },
});

const SalarySchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
});
const applicantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  coverLetter: { type: String },
  resume: { type: String }, // URL from Cloudinary
  answers: [
    {
      questionId: { type: String, },
      answer: { type: String, },
    },
  ],
  appliedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "reviewed", "rejected", "accepted"],
    default: "pending",
  },
});
const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: CompanySchema, required: true },
    location: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
      default: "Full-time",
    },
    remote: { type: Boolean, default: false },
    urgent: { type: Boolean, default: false },
    salary: { type: SalarySchema, required: true },
    postedDate: { type: Date, default: Date.now },
    description: { type: String, default: "" },
    keyRequirements: [String],
    requirements: [String],
    benefits: [String],
    matchScore: { type: Number, default: 0 },
    customQuestions: [CustomQuestionSchema],
    applicants: [applicantSchema],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional: recruiter/admin
    category: {
      type: String,
      enum: ["IT", "Finance", "Healthcare", "Education", "Other"],
      default: "Other",
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "executive"],
      default: "entry",
    },
    tags: [String],
    closingDate: { type: Date },
    views: { type: Number, default: 0 },
    applicationCount: { type: Number, default: 0 },
    coordinates: {
      lat: Number,
      lng: Number,
    },

    // ✅ Admin Approval Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Only export the model
const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
