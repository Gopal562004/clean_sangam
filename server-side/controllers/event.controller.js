
const { Event, Registration, QRScan } = require("../models/event.model");

// Create Event
// exports.createEvent = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       mode,
//       location,
//       date,
//       time,
//       capacity,
//       banner,
//       tags,
//     } = req.body;

//     const organizer = req.user.id;
//     const userRole = req.user.role;

//     const event = await Event.create({
//       title,
//       description,
//       mode,
//       location,
//       date,
//       time,
//       capacity,
//       banner,
//       tags,
//       organizer,
//       status: userRole === "admin" ? "approved" : "pending",
//     });

//     res.status(201).json({ success: true, event });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      mode,
      location,
      date,
      time,
      capacity,
      banner,
      tags,
    } = req.body;

    const organizer = req.user?.id;
    const userRole = req.user?.role;

    const event = await Event.create({
      title,
      description,
      mode,
      location,
      date,
      time,
      capacity,
      banner,
      tags,
      organizer,
      status: userRole === "admin" ? "approved" : "pending",
    });

    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error("Error creating event:", err); // 👈 full stack trace
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Approved Events with Filters, Sorting, Pagination
exports.getApprovedEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      search,
      mode,
      category,
      dateFrom,
      dateTo,
      sortBy,
      page = 1,
      limit = 6, // default items per page
    } = req.query;

    const query = { status: "approved" };

    // ----- Filters -----
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (mode) query.mode = mode;
    if (category) query.category = category;

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    // ----- Sorting -----
    let sort = {};
    switch (sortBy) {
      case "date-asc":
        sort.date = 1;
        break;
      case "date-desc":
        sort.date = -1;
        break;
      case "title-asc":
        sort.title = 1;
        break;
      case "title-desc":
        sort.title = -1;
        break;
      case "popularity":
        sort.registeredCount = -1;
        break;
      default:
        sort.date = 1;
    }

    // ----- Pagination -----
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalEvents = await Event.countDocuments(query);

    const events = await Event.find(query)
      .populate("organizer", "name email avatar")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // ----- Enrich with user registration -----
    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const registration = await Registration.findOne({
          event: event._id,
          user: userId,
        });

        return {
          ...event,
          isRegistered: !!registration,
          userRegistrationId: registration?._id || null,
        };
      })
    );

    res.json({
      success: true,
      events: enrichedEvents,
      pagination: {
        totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get all events created by the logged-in user
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get all events the logged-in user has registered for
exports.getMyRegisteredEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all registrations for this user
    const registrations = await Registration.find({ user: userId })
      .populate({
        path: "event",
        populate: { path: "organizer", select: "name email avatar" },
      })
      .lean();

    // Map to return event info + registration info
    const registeredEvents = registrations.map((reg) => ({
      registrationId: reg._id,
      status: reg.attendanceStatus || "registered",
      event: reg.event,
      registeredAt: reg.createdAt,
    }));

    res.json({ success: true, events: registeredEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Approve/Reject event (admin only)
exports.updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    );

    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Delete all registrations for this event
    await Registration.deleteMany({ event: event._id });

    // Optionally delete QRScans related to the event
    await QRScan.deleteMany({ event: event._id });

    // Delete the event itself
    await Event.findByIdAndDelete(eventId);

    res.json({ success: true, message: "Event and related data deleted" });
  } catch (err) {
    console.error("Error deleting event:", err); // log full error
    res.status(500).json({ success: false, message: err.message });
  }
};

// Register User for Event
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event || event.status !== "approved")
      return res
        .status(400)
        .json({ success: false, message: "Event not available" });

    const existing = await Registration.findOne({
      user: userId,
      event: eventId,
    });
    if (existing)
      return res.json({
        success: true,
        registration: existing,
        message: "Already registered",
      });

    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ success: true, registration });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get QR for Registration
exports.getQR = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const registration = await Registration.findById(registrationId).populate(
      "user event"
    );

    if (!registration)
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });

    const qrData = {
      registrationId: registration._id,
      userId: registration.user._id,
      name: registration.user.name,
      email: registration.user.email,
      eventId: registration.event._id,
      eventTitle: registration.event.title,
      eventDate: registration.event.date,
      eventTime: registration.event.time,
      checkInUrl: `https://yourapp.com/checkin/${registration._id}`,
    };

    res.json({ success: true, qrData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Scan QR and mark attendance
exports.scanQR = async (req, res) => {
  try {
    const { qrCode } = req.body;
    const scannerId = req.user.id;

    const registration = await Registration.findOne({ qrCode }).populate("user event");
    if (!registration) return res.status(404).json({ success: false, message: "Invalid QR code" });

    if (registration.attendanceStatus !== "attended") {
      registration.attendanceStatus = "attended";
      registration.checkInTime = new Date();
      await registration.save();

      registration.event.attendedCount += 1;
      await registration.event.save();
    }

    await QRScan.create({
      registration: registration._id,
      scannedBy: scannerId,
      valid: true,
      event: registration.event._id,
    });

    res.json({ success: true, registration, message: "Attendance marked" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get single event details
exports.getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId)
      .populate("organizer", "name email avatar")
      .lean();

    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get all participants for a specific event
exports.getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ event: eventId })
      .populate("user", "name email role")
      .lean();

    const participants = registrations.map((reg) => ({
      id: reg._id,
      name: reg.user.name,
      email: reg.user.email,
      role: reg.user.role || "Participant",
      registrationDate: reg.createdAt,
      attended: reg.attendanceStatus === "attended",
      checkInTime: reg.checkInTime,
    }));

    res.json({ success: true, participants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Mark participant attendance manually
exports.updateAttendance = async (req, res) => {
  try {
    const { participantId } = req.params;
    const { attended } = req.body;

    const registration = await Registration.findById(participantId).populate("event");
    if (!registration)
      return res.status(404).json({ success: false, message: "Participant not found" });

    // Update participant attendance
    registration.attendanceStatus = attended ? "attended" : "registered";
    registration.checkInTime = attended ? new Date() : null;
    await registration.save();

    // Update event attended count
    const event = registration.event;
    event.attendedCount = await Registration.countDocuments({
      event: event._id,
      attendanceStatus: "attended",
    });
    await event.save();

    res.json({ success: true, registration });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get analytics for a specific event
exports.getEventAnalytics = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).lean();
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    const totalRegistered = await Registration.countDocuments({ event: eventId });
    const totalAttended = await Registration.countDocuments({ event: eventId, attendanceStatus: "attended" });

    // Mock: averageFeedback, registrationTrend, feedbackDistribution
    const averageFeedback = 4.3;
    const registrationTrend = [
      { period: "Week 1", count: 23 },
      { period: "Week 2", count: 45 },
      { period: "Week 3", count: 38 },
      { period: "Week 4", count: 21 },
    ];
    const feedbackDistribution = [
      { rating: 5, count: 45 },
      { rating: 4, count: 28 },
      { rating: 3, count: 12 },
      { rating: 2, count: 3 },
      { rating: 1, count: 1 },
    ];

    const attendanceRate = totalRegistered ? ((totalAttended / totalRegistered) * 100).toFixed(1) : 0;

    res.json({
      success: true,
      analytics: {
        totalRegistered,
        totalAttended,
        attendanceRate: parseFloat(attendanceRate),
        averageFeedback,
        registrationTrend,
        feedbackDistribution,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get all pending events (admin only) with pagination
exports.getPendingEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy } = req.query;

    const query = { status: "pending" };

    // ----- Search Filter -----
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // ----- Sorting -----
    let sort = {};
    switch (sortBy) {
      case "date-asc":
        sort.date = 1;
        break;
      case "date-desc":
        sort.date = -1;
        break;
      case "title-asc":
        sort.title = 1;
        break;
      case "title-desc":
        sort.title = -1;
        break;
      default:
        sort.date = 1; // default sort by date ascending
    }

    // ----- Pagination -----
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalEvents = await Event.countDocuments(query);

    const events = await Event.find(query)
      .populate("organizer", "name email avatar")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      events,
      pagination: {
        totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("Error fetching pending events:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
