const mongoose = require("mongoose");

const QuickDonationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["general", "scholarship", "emergency", "infrastructure"],
      required: true,
    },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuickDonation", QuickDonationSchema);
