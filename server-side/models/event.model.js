// // const mongoose = require("mongoose");
// // const { v4: uuidv4 } = require("uuid");

// // // Event Schema
// // const EventSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     description: { type: String, required: true },
// //     organizer: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     mode: {
// //       type: String,
// //       enum: ["online", "offline", "hybrid"],
// //       required: true,
// //     },
// //     location: { type: String },
// //     date: { type: Date, required: true },
// //     time: { type: String, required: true },
// //     capacity: { type: Number, required: true },
// //     banner: { type: String },
// //     tags: [{ type: String }],
// //     status: {
// //       type: String,
// //       enum: ["pending", "approved", "rejected"],
// //       default: "pending",
// //     },
// //     registeredCount: { type: Number, default: 0 },
// //     attendedCount: { type: Number, default: 0 },
// //   },
// //   { timestamps: true }
// // );

// // // Registration Schema
// // const RegistrationSchema = new mongoose.Schema(
// //   {
// //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //     event: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Event",
// //       required: true,
// //     },
// //     qrCode: { type: String, required: true, unique: true }, // unique per registration
// //     status: {
// //       type: String,
// //       enum: ["pending", "confirmed", "cancelled"],
// //       default: "pending",
// //     },
// //     attendanceStatus: {
// //       type: String,
// //       enum: ["pending", "attended", "absent"],
// //       default: "pending",
// //     },
// //     registeredAt: { type: Date, default: Date.now },
// //     checkInTime: { type: Date },
// //   },
// //   { timestamps: true }
// // );

// // // Auto-generate QR code on registration creation
// // RegistrationSchema.pre("validate", function (next) {
// //   if (!this.qrCode) {
// //     this.qrCode = uuidv4(); // generate unique QR code
// //   }
// //   next();
// // });

// // // When an event is deleted, remove all its registrations (and QR codes)
// // EventSchema.pre("remove", async function (next) {
// //   await mongoose.model("Registration").deleteMany({ event: this._id });
// //   next();
// // });

// // // QR Scan Schema (optional for logging)
// // // const QRScanSchema = new mongoose.Schema(
// // //   {
// // //     registration: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Registration",
// // //       required: true,
// // //     },
// // //     scannedBy: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //     scanTime: { type: Date, default: Date.now },
// // //     valid: { type: Boolean, default: true },
// // //   },
// // //   { timestamps: true }
// // // );
// // const QRScanSchema = new mongoose.Schema(
// //   {
// //     registration: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Registration",
// //       required: true,
// //     },
// //     scannedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     event: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Event",
// //       required: true,
// //     }, // ADD THIS
// //     scanTime: { type: Date, default: Date.now },
// //     valid: { type: Boolean, default: true },
// //   },
// //   { timestamps: true }
// // );


// // const Event = mongoose.model("Event", EventSchema);
// // const Registration = mongoose.model("Registration", RegistrationSchema);
// // const QRScan = mongoose.model("QRScan", QRScanSchema);

// // module.exports = { Event, Registration, QRScan };
// const mongoose = require("mongoose");

// // ============================
// // Event Schema
// // ============================
// const eventSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     mode: { type: String, enum: ["online", "offline"], default: "offline" },
//     location: { type: String },
//     date: { type: Date, required: true },
//     time: { type: String, required: true },
//     capacity: { type: Number, default: 0 },
//     banner: { type: String },
//     tags: [{ type: String }],

//     organizer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },

//     registeredCount: { type: Number, default: 0 },
//     attendedCount: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// // ============================
// // Registration Schema
// // ============================
// const registrationSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     event: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//       required: true,
//     },
//     attendanceStatus: {
//       type: String,
//       enum: ["pending", "attended"],
//       default: "pending",
//     },
//     checkInTime: { type: Date },
//     qrCode: { type: String }, // optional if you store QR code value
//   },
//   { timestamps: true }
// );

// // ============================
// // QR Scan Schema
// // ============================
// const qrScanSchema = new mongoose.Schema(
//   {
//     registration: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Registration",
//       required: true,
//     },
//     scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
//     scannedAt: { type: Date, default: Date.now },
//     valid: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// // Delete registrations when event is removed
// eventSchema.pre("remove", async function (next) {
//   await mongoose.model("Registration").deleteMany({ event: this._id });
//   next();
// });

// const Event = mongoose.model("Event", eventSchema);
// const Registration = mongoose.model("Registration", registrationSchema);
// const QRScan = mongoose.model("QRScan", qrScanSchema);

// module.exports = { Event, Registration, QRScan };
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

// ============================
// Event Schema
// ============================
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mode: { type: String, enum: ["online", "offline"], default: "offline" },
    location: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, default: 0, min: 0 },
    banner: { type: String },
    tags: [{ type: String }],

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    registeredCount: { type: Number, default: 0 },
    attendedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ============================
// Registration Schema
// ============================
const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    attendanceStatus: {
      type: String,
      enum: ["registered", "attended"],
      default: "registered",
    },
    checkInTime: { type: Date },
    qrCode: { type: String, unique: true }, // Auto-generated QR code
  },
  { timestamps: true }
);

// Auto-generate QR code before saving
registrationSchema.pre("save", function (next) {
  if (!this.qrCode) this.qrCode = nanoid(10);
  next();
});

// ============================
// QR Scan Schema
// ============================
const qrScanSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    scannedAt: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ============================
// Middleware
// ============================

// Delete registrations and QRScans when event is removed
eventSchema.pre("remove", async function (next) {
  await mongoose.model("Registration").deleteMany({ event: this._id });
  await mongoose.model("QRScan").deleteMany({ event: this._id });
  next();
});

const Event = mongoose.model("Event", eventSchema);
const Registration = mongoose.model("Registration", registrationSchema);
const QRScan = mongoose.model("QRScan", qrScanSchema);

module.exports = { Event, Registration, QRScan };
