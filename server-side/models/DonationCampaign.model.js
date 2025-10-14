const mongoose = require("mongoose");

const DonationCampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    donorCount: { type: Number, default: 0 },
    donors: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        donatedAt: { type: Date, default: Date.now },
      },
    ],
    daysRemaining: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "general",
        "scholarship",
        "emergency",
        "infrastructure",
        "Education",
        "Health",
        "Environment",
        "Community Development",
        "others",
      ],
      required: true,
    },
    image: { type: String },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "active", "completed"],
      default: "pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date, default: Date.now }, // track when campaign started
  },
  { timestamps: true }
);

// Auto-update status before saving
DonationCampaignSchema.pre("save", function (next) {
  // If target reached
  if (this.raisedAmount >= this.targetAmount) {
    this.status = "completed";
  }

  // If days are over (compare elapsed days)
  const elapsedDays = Math.floor(
    (Date.now() - new Date(this.startDate)) / (1000 * 60 * 60 * 24)
  );
  if (elapsedDays >= this.daysRemaining) {
    this.status = "completed";
  }

  next();
});

module.exports = mongoose.model("DonationCampaign", DonationCampaignSchema);
