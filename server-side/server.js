const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // your DB connection
const userRoutes = require("./routes/user.route"); // user routes
const jobRoutes = require("./routes/job.route"); // job routes
const donationRoutes = require("./routes/donation.routes"); // donation routes
const mentorshipRoutes = require("./routes/mentorship.route"); // mentorship routes
const EventRoutes = require("./routes/event.route"); // event routes
dotenv.config();

// Initialize Express app
const app = express();

// -------------------- Middleware --------------------
// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// -------------------- Routes --------------------
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/donations", donationRoutes);
app.use("/mentorship", mentorshipRoutes);
app.use("/events", EventRoutes);
// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// -------------------- Error Handling --------------------
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to DB first
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
