const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },

  // Target type: 'all' or 'individual'
  targetType: { type: String, enum: ["all", "individual"], default: "all" },

  // If individual, specify the target mentee
  targetMentee: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional

  // GroupChat where session announcement is sent
  menteesGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupChat",
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", SessionSchema);
