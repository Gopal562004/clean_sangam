const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: [true, "User name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
          return passwordRegex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please enter a valid phone number"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "alumni", "faculty", "recruiter", "mentor"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.jpg",
    },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    department: { type: String, default: "" },
    joinedDate: { type: Date, default: Date.now },

    // Profile Sections
    currentPosition: { type: String, default: "" },
    company: { type: String, default: "" },

    skills: [
      {
        name: String,
        level: { type: String, default: "Beginner" },
        endorsements: { type: Number, default: 0 },
      },
    ],

    experiences: [
      {
        title: String,
        company: String,
        location: String,
        type: {
          type: String,
          enum: ["Full-time", "Part-time", "Internship", "Contract"],
          default: "Full-time",
        },
        startDate: Date,
        endDate: Date,
        current: { type: Boolean, default: false },
        description: String,
        achievements: [String],
      },
    ],

    education: [
      {
        enrollmentNumber: { type: String, unique: true },
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        gpa: String,
        honors: [String],
        relevantCoursework: [String],
      },
    ],

    achievements: [
      {
        title: String,
        date: Date,
        description: String,
        category: String,
      },
    ],

    mentorshipPreferences: {
      isMentor: { type: Boolean, default: false }, // true if user clicked "Become Mentor" and approved
      available: { type: Boolean, default: false }, // mentor can toggle availability for mentees
      topics: [String],
      meetingFrequency: String,
      preferredFormat: String,
    },
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String,
    },

    privacySettings: {
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "private",
      },
      contactInfoVisible: { type: Boolean, default: true },
    },
    // Relationships
    mentees: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID of the student
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        requestedAt: { type: Date, default: Date.now },
      },
    ],
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
    groupChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" }],
    savedJobs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Job",
      default: [],
    },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
    },
    resume: { type: String }, // URL or path to file
    certifications: [{ name: String, file: String }],
    isDeleted: { type: Boolean, default: false },

    // OTP for password reset
    otp: String,
    otpExpiration: Date,
  },
  { timestamps: true }
);

// Encrypt password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = process.env.SALT_ROUNDS || 10;
  this.password = await bcrypt.hash(this.password, parseInt(saltRounds));

  next();
});

// Method to compare password during login
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Clear OTP after use
UserSchema.methods.clearOtp = async function () {
  this.otp = undefined;
  this.otpExpiration = undefined;
  await this.save();
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
