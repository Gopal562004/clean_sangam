// import React, { useState } from "react";
// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";
// import Icon from "../../../components/AppIcon";

// // Sample Events Data
// const eventsData = [
//   {
//     id: 1,
//     title: "Alumni Networking Event",
//     type: "Networking",
//     date: "2025-09-20",
//     status: "upcoming",
//     createdBy: "Alumni",
//   },
//   {
//     id: 2,
//     title: "Donation Campaign Kickoff",
//     type: "Fundraising",
//     date: "2025-08-15",
//     status: "completed",
//     createdBy: "Admin",
//   },
//   {
//     id: 3,
//     title: "Workshop on AI",
//     type: "Workshop",
//     date: "2025-09-05",
//     status: "ongoing",
//     createdBy: "Faculty",
//   },
//   {
//     id: 4,
//     title: "Mentorship Session",
//     type: "Mentorship",
//     date: "2025-09-12",
//     status: "upcoming",
//     createdBy: "Admin",
//   },
//   {
//     id: 5,
//     title: "Coding Bootcamp",
//     type: "Workshop",
//     date: "2025-09-10",
//     status: "ongoing",
//     createdBy: "Alumni",
//   },
// ];

// // Sample Pending Approvals
// const pendingEventsData = [
//   {
//     id: 101,
//     title: "Career Guidance Session",
//     type: "Workshop",
//     date: "2025-09-18",
//     requestedBy: "Alumni",
//     description: "Help students plan careers",
//   },
//   {
//     id: 102,
//     title: "AI Hackathon",
//     type: "Competition",
//     date: "2025-09-22",
//     requestedBy: "Faculty",
//     description: "Organize 24hr AI hackathon",
//   },
// ];

// const EventManagement = ({ onViewEvent, onEditEvent, onCancelEvent }) => {
//   const [events, setEvents] = useState(eventsData);
//   const [pendingEvents, setPendingEvents] = useState(pendingEventsData);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // Filtering events
//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.type.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       filterStatus === "all" || event.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Badge helper
//   const getStatusBadge = (status) => {
//     const badges = {
//       upcoming: { label: "Upcoming", color: "bg-primary/10 text-primary" },
//       ongoing: { label: "Ongoing", color: "bg-warning/10 text-warning" },
//       completed: { label: "Completed", color: "bg-success/10 text-success" },
//       cancelled: { label: "Cancelled", color: "bg-error/10 text-error" },
//     };
//     return (
//       badges[status] || { label: status, color: "bg-muted text-text-secondary" }
//     );
//   };

//   // Aggregated metrics
//   const totalEvents = events.length;
//   const eventsByStatus = events.reduce((acc, e) => {
//     acc[e.status] = (acc[e.status] || 0) + 1;
//     return acc;
//   }, {});
//   const eventsByCreator = events.reduce((acc, e) => {
//     acc[e.createdBy] = (acc[e.createdBy] || 0) + 1;
//     return acc;
//   }, {});
//   const thisMonth = new Date().getMonth() + 1;
//   const eventsThisMonth = events.filter(
//     (e) => new Date(e.date).getMonth() + 1 === thisMonth
//   );
//   const ongoingEvents = events.filter((e) => e.status === "ongoing");

//   // Approve or Reject Pending Event
//   const handleApproveEvent = (id) => {
//     const approvedEvent = pendingEvents.find((e) => e.id === id);
//     if (approvedEvent) {
//       setEvents([
//         ...events,
//         {
//           ...approvedEvent,
//           status: "upcoming",
//           createdBy: approvedEvent.requestedBy,
//         },
//       ]);
//       setPendingEvents(pendingEvents.filter((e) => e.id !== id));
//     }
//   };

//   const handleRejectEvent = (id) => {
//     setPendingEvents(pendingEvents.filter((e) => e.id !== id));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Metrics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="Calendar" size={32} className="text-primary" />
//           <div>
//             <p className="text-xs text-text-secondary">Total Events</p>
//             <p className="text-xl font-semibold">{totalEvents}</p>
//           </div>
//         </div>
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="Clock" size={32} className="text-warning" />
//           <div>
//             <p className="text-xs text-text-secondary">Ongoing Events</p>
//             <p className="text-xl font-semibold">{ongoingEvents.length}</p>
//           </div>
//         </div>
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="User" size={32} className="text-success" />
//           <div>
//             <p className="text-xs text-text-secondary">Created by Alumni</p>
//             <p className="text-xl font-semibold">
//               {eventsByCreator.Alumni || 0}
//             </p>
//           </div>
//         </div>
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="UserCheck" size={32} className="text-primary" />
//           <div>
//             <p className="text-xs text-text-secondary">This Month Events</p>
//             <p className="text-xl font-semibold">{eventsThisMonth.length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <Input
//           type="search"
//           placeholder="Search events..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full sm:w-64"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-3 py-2 border border-border rounded-md text-sm bg-input"
//         >
//           <option value="all">All Status</option>
//           <option value="upcoming">Upcoming</option>
//           <option value="ongoing">Ongoing</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Events Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-border rounded-lg">
//           <thead className="bg-muted">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
//                 Event
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
//                 Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
//                 Created By
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border">
//             {filteredEvents.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="px-6 py-8 text-center">
//                   <Icon
//                     name="Calendar"
//                     size={48}
//                     className="text-text-secondary mx-auto mb-3"
//                   />
//                   <p className="text-text-secondary">No events found</p>
//                 </td>
//               </tr>
//             ) : (
//               filteredEvents.map((event) => {
//                 const statusBadge = getStatusBadge(event.status);
//                 return (
//                   <tr key={event.id} className="hover:bg-muted/50">
//                     <td className="px-6 py-4 whitespace-nowrap text-text-primary font-medium">
//                       {event.title}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
//                       {event.type}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
//                       {event.date}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
//                       >
//                         {statusBadge.label}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
//                       {event.createdBy}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         iconName="Eye"
//                         onClick={() => onViewEvent(event.id)}
//                       >
//                         View
//                       </Button>
//                       <Button
//                         variant="default"
//                         size="sm"
//                         iconName="Edit"
//                         onClick={() => onEditEvent(event.id)}
//                       >
//                         Edit
//                       </Button>
//                       {event.status !== "cancelled" && (
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           iconName="Ban"
//                           onClick={() => onCancelEvent(event.id)}
//                         >
//                           Cancel
//                         </Button>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Pending Approvals */}
//       <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
//         <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
//           <Icon name="Bell" size={20} className="mr-2 text-primary" /> Pending
//           Event Approvals
//         </h3>
//         {pendingEvents.length === 0 ? (
//           <p className="text-text-secondary text-sm">
//             No pending event approvals
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {pendingEvents.map((event) => (
//               <div
//                 key={event.id}
//                 className="border border-border p-3 rounded-lg bg-muted flex flex-col justify-between"
//               >
//                 <div>
//                   <h4 className="text-md font-medium">{event.title}</h4>
//                   <p className="text-sm text-text-secondary">{event.type}</p>
//                   <p className="text-xs text-text-secondary">
//                     Requested by: {event.requestedBy}
//                   </p>
//                   <p className="text-xs text-text-secondary">
//                     Date: {event.date}
//                   </p>
//                   <p className="text-xs text-text-secondary">
//                     {event.description}
//                   </p>
//                 </div>
//                 <div className="mt-2 flex space-x-2">
//                   <Button
//                     variant="default"
//                     size="sm"
//                     onClick={() => handleApproveEvent(event.id)}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleRejectEvent(event.id)}
//                   >
//                     Reject
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventManagement;
import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

// API helpers (adjust path if your file lives elsewhere)
import {
  createEvent,
  getApprovedEvents,
  getMyEvents,
  updateEventStatus,
  deleteEvent,
  getEventById,
  getEventParticipants,
} from "../../../lib/mongo/eventServices";

/**
 * EventManagement component
 * - Fetches approved events (paginated)
 * - Shows metrics and list
 * - Handles search / status filter
 * - Supports approving/rejecting pending approvals (uses a lightweight pending-approvals endpoint if available)
 * - Uses provided API helpers where applicable
 *
 * Props:
 * - onViewEvent(eventId)
 * - onEditEvent(eventId)
 * - onCancelEvent(eventId)
 */
const EventManagement = ({ onViewEvent, onEditEvent, onCancelEvent }) => {
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]); // fetched from backend if available
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [pagination, setPagination] = useState(null);

  // helper: get status badge classes
  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { label: "Upcoming", color: "bg-primary/10 text-primary" },
      ongoing: { label: "Ongoing", color: "bg-warning/10 text-warning" },
      completed: { label: "Completed", color: "bg-success/10 text-success" },
      cancelled: { label: "Cancelled", color: "bg-error/10 text-error" },
    };
    return (
      badges[status] || {
        label: status?.toString() || "Unknown",
        color: "bg-muted text-text-secondary",
      }
    );
  };

  // Fetch approved events (browse) using helper
  const fetchEvents = async (pg = page) => {
    setLoading(true);
    try {
      const filters = {};
      // we request server-side filtering if available
      if (filterStatus !== "all") filters.status = filterStatus;
      if (searchTerm) filters.q = searchTerm;

      const res = await getApprovedEvents(filters, pg, limit);
      if (res && res.success) {
        setEvents(res.events || []);
        setPagination(res.pagination || null);
      } else if (res && Array.isArray(res.events)) {
        setEvents(res.events);
      } else {
        // fallback: empty
        setEvents([]);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Try to fetch pending approvals from a conventional endpoint. If your backend exposes a different route, change this.
  const fetchPendingApprovals = async () => {
    setLoadingPending(true);
    try {
      // many backends expose `/events/pending-approvals` or `/events/pending`
      // We'll attempt to call that using getMyEvents as a fallback if the endpoint isn't exposed.
      // Attempt 1: try the API helper route by calling getMyEvents and filtering role-based pending
      const myEventsRes = await getMyEvents().catch(() => null);
      if (myEventsRes && Array.isArray(myEventsRes.events)) {
        const pending = myEventsRes.events.filter(
          (e) => e.status === "pending"
        );
        setPendingEvents(pending);
        setLoadingPending(false);
        return;
      }

      // fallback: try to GET `/events/pending-approvals` directly using fetch to avoid relying on missing helper
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const resp = await fetch(`${API_URL}/events/pending-approvals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setPendingEvents(data.events || []);
      } else {
        // if no endpoint available, keep pendingEvents empty
        setPendingEvents([]);
      }
    } catch (err) {
      console.debug(
        "No pending approvals endpoint or failed to fetch — using local fallback",
        err
      );
      setPendingEvents([]);
    } finally {
      setLoadingPending(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
    fetchPendingApprovals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterStatus]);

  // run a client-side search after a short debounce (simple implementation)
  useEffect(() => {
    const t = setTimeout(() => fetchEvents(1), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Aggregated metrics (derived client-side)
  const totalEvents = events.length;
  const eventsByStatus = events.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});
  const eventsByCreator = events.reduce((acc, e) => {
    acc[e.createdBy] = (acc[e.createdBy] || 0) + 1;
    return acc;
  }, {});
  const thisMonth = new Date().getMonth() + 1;
  const eventsThisMonth = events.filter(
    (e) => new Date(e.date).getMonth() + 1 === thisMonth
  );
  const ongoingEvents = events.filter((e) => e.status === "ongoing");

  // Approve pending event -> create event via API helper, then remove from pending list and refresh events
  const handleApproveEvent = async (id) => {
    const candidate = pendingEvents.find((p) => p.id === id);
    if (!candidate) return;
    try {
      // createEvent expects eventData shape — adjust as needed
      const payload = {
        title: candidate.title,
        type: candidate.type,
        date: candidate.date,
        description: candidate.description,
        createdBy: candidate.requestedBy || "Alumni",
      };
      const res = await createEvent(payload);
      // optimistic UI update
      setPendingEvents((prev) => prev.filter((p) => p.id !== id));
      // refresh list
      fetchEvents(1);
      // if backend returns created event, we could append to events. We'll refresh instead.
      return res;
    } catch (err) {
      console.error("Approve failed:", err);
      throw err;
    }
  };

  // Reject a pending event — try direct delete endpoint or simply remove locally
  const handleRejectEvent = async (id) => {
    const candidate = pendingEvents.find((p) => p.id === id);
    if (!candidate) return;
    try {
      // try delete pending via conventional endpoint
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const resp = await fetch(`${API_URL}/events/pending/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok || resp.status === 404) {
        setPendingEvents((prev) => prev.filter((p) => p.id !== id));
        return;
      }
      // fallback: just remove locally
      setPendingEvents((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Reject failed:", err);
      setPendingEvents((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Cancel an event (update status to cancelled)
  const handleCancelEvent = async (eventId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this event?"
    );
    if (!confirm) return;
    try {
      await updateEventStatus(eventId, "cancelled");
      // update locally
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: "cancelled" } : e))
      );
      if (typeof onCancelEvent === "function") onCancelEvent(eventId);
    } catch (err) {
      console.error("Failed to cancel:", err);
      alert("Failed to cancel event. Check console for details.");
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    const confirm = window.confirm("Permanently delete this event?");
    if (!confirm) return;
    try {
      await deleteEvent(eventId);
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete event.");
    }
  };

  // UI render
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Calendar" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">Total Events</p>
            <p className="text-xl font-semibold">{totalEvents}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Clock" size={32} className="text-warning" />
          <div>
            <p className="text-xs text-text-secondary">Ongoing Events</p>
            <p className="text-xl font-semibold">{ongoingEvents.length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="User" size={32} className="text-success" />
          <div>
            <p className="text-xs text-text-secondary">Created by Alumni</p>
            <p className="text-xl font-semibold">
              {eventsByCreator.Alumni || 0}
            </p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="UserCheck" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">This Month Events</p>
            <p className="text-xl font-semibold">{eventsThisMonth.length}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          type="search"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-input"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  Loading events...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <Icon
                    name="Calendar"
                    size={48}
                    className="text-text-secondary mx-auto mb-3"
                  />
                  <p className="text-text-secondary">No events found</p>
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const statusBadge = getStatusBadge(event.status);
                return (
                  <tr key={event._id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-text-primary font-medium">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {event.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {event.createdBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() =>
                          typeof onViewEvent === "function"
                            ? onViewEvent(event.id)
                            : window.alert(`View ${event.title}`)
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Edit"
                        onClick={() =>
                          typeof onEditEvent === "function"
                            ? onEditEvent(event._id)
                            : window.alert(`Edit ${event.title}`)
                        }
                      >
                        Edit
                      </Button>
                      {event.status !== "cancelled" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="Ban"
                          onClick={() => handleCancelEvent(event._id)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls (basic) */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="space-x-2">
            <Button
              disabled={!pagination.prev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            <Button
              disabled={!pagination.next}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Pending Approvals */}
      <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-primary" /> Pending
          Event Approvals
        </h3>
        {loadingPending ? (
          <p className="text-text-secondary text-sm">
            Loading pending approvals...
          </p>
        ) : pendingEvents.length === 0 ? (
          <p className="text-text-secondary text-sm">
            No pending event approvals
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingEvents.map((event) => (
              <div
                key={event._id}
                className="border border-border p-3 rounded-lg bg-muted flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-md font-medium">{event.title}</h4>
                  <p className="text-sm text-text-secondary">{event.type}</p>
                  <p className="text-xs text-text-secondary">
                    Requested by: {event.requestedBy || event.createdBy}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {event.description}
                  </p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApproveEvent(event._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRejectEvent(event._id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
