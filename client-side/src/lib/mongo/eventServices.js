
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createEvent = async (eventData) => {
  const res = await axios.post(
    `${API_URL}/events`,
    eventData,
    getAuthHeaders()
  );
  return res.data;
};

export const getApprovedEvents = async (filters = {}, page = 1, limit = 6) => {
  try {
    const params = new URLSearchParams({ ...filters, page, limit }).toString();
    const res = await axios.get(
      `${API_URL}/events/browse?${params}`,
      getAuthHeaders()
    );

    const events = res.data.events || [];

    return {
      success: true,
      events: events.map((event) => ({
        ...event,
        isRegistered: !!event.userRegistrationId,
      })),
      pagination: res.data.pagination,
    };
  } catch (err) {
    console.error("Error fetching events:", err);
    return { success: false, events: [], message: err.message };
  }
};

export const getMyEvents = async () => {
  const res = await axios.get(`${API_URL}/events/my-events`, getAuthHeaders());
  return res.data;
};

export const updateEventStatus = async (eventId, status) => {
  const res = await axios.patch(
    `${API_URL}/events/${eventId}/status`,
    { status },
    getAuthHeaders()
  );
  return res.data;
};

export const deleteEvent = async (eventId) => {
  const res = await axios.delete(
    `${API_URL}/events/delete/${eventId}`,
    getAuthHeaders()
  );
  return res.data;
};


export const registerForEvent = async (eventId) => {
  const res = await axios.post(
    `${API_URL}/events/${eventId}/register`,
    {},
    getAuthHeaders()
  );
  return res.data;
};

export const getQR = async (registrationId) => {
  const res = await axios.get(
    `${API_URL}/events/registration/${registrationId}/qr`,
    getAuthHeaders()
  );
  console.log(res.data);
  return res.data;
};

// ========================
// QR SCAN / ATTENDANCE
// ========================

export const scanQR = async (qrData) => {
  const res = await axios.post(
    `${API_URL}/events/scan`,
    qrData,
    getAuthHeaders()
  );
  return res.data;
};

export const getMyRegisteredEvents = async () => {
  const res = await axios.get(
    `${API_URL}/events/my-registered-events`,
    getAuthHeaders()
  );
  return res.data;
};

// Get event by ID
export const getEventById = async (eventId) => {
  try {
    const res = await axios.get(
      `${API_URL}/events/${eventId}`,
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching event:", err);
    return { success: false, message: err.message };
  }
};
// Get participants for an event
export const getEventParticipants = async (eventId) => {
  try {
    const res = await axios.get(
      `${API_URL}/events/${eventId}/participants`,
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching participants:", err);
    return { success: false, participants: [], message: err.message };
  }
};
// Update attendance manually for a participant
export const updateAttendance = async (eventId, participantId, attended) => {
  try {
    const res = await axios.patch(
      `${API_URL}/events/${eventId}/attendance`,
      { participantId, attended },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error("Error updating attendance:", err);
    return { success: false, message: err.message };
  }
};
// Analytics
export const getEventAnalytics = async (eventId) => {
  try {
    const res = await axios.get(
      `${API_URL}/events/${eventId}/analytics`,
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching analytics:", err);
    return { success: false, analytics: {}, message: err.message };
  }
};

export const getPendingEvents = async ({
  page = 1,
  limit = 6,
  search = "",
} = {}) => {
  try {
    const res = await axios.get(`${API_URL}/events/pending`, {
      params: { page, limit, search },
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error(
      "Error fetching pending events:",
      err.response?.data || err.message
    );
    return { success: false, events: [], pagination: null };
  }
};