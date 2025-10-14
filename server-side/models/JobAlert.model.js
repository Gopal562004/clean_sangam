const mongoose = require("mongoose");

const JobAlertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true }, // name of the alert
    keywords: [String], // search keywords for job titles, skills
    location: { type: String }, // location filter
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
    },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    category: { type: String },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "weekly",
    },
    active: { type: Boolean, default: true },
    lastSent: { type: Date, default: null }, // track last alert sent
  },
  { timestamps: true }
);

const JobAlert = mongoose.model("JobAlert", JobAlertSchema);
module.exports = JobAlert;
