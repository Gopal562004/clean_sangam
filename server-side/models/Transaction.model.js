// models/Transaction.model.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["campaign", "quick"], required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "DonationCampaign" },
  campaignName: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["completed", "pending", "failed"],
    default: "completed",
  },
  receipt: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
