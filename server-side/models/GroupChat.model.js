const mongoose = require("mongoose");

const GroupChatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["private", "group"], default: "group" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GroupChat", GroupChatSchema);
