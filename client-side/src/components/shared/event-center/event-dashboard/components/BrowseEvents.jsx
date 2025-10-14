// // // // // import React, { useEffect, useState } from "react";
// // // // // import EventCard from "./EventCard";
// // // // // import FilterControls from "./FilterControls";
// // // // // import QRCodeModal from "./QRCodeModal";
// // // // // import EmptyState from "./EmptyState";
// // // // // import LoadingState from "./LoadingState";

// // // // // const BrowseEvents = () => {
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [filters, setFilters] = useState({
// // // // //     search: "",
// // // // //     mode: "",
// // // // //     category: "",
// // // // //     dateFrom: "",
// // // // //     dateTo: "",
// // // // //     sortBy: "date-asc",
// // // // //   });
// // // // //   const [isQRModalOpen, setIsQRModalOpen] = useState(false);
// // // // //   const [selectedEvent, setSelectedEvent] = useState(null);
// // // // //   const [registeredEvents, setRegisteredEvents] = useState(new Set());

// // // // //   // Mock events
// // // // //   const [approvedEvents] = useState([
// // // // //     {
// // // // //       id: 1,
// // // // //       title: "React Conference 2024",
// // // // //       description: `Join us for the most comprehensive React conference of the year! This event brings together leading developers, industry experts, and React enthusiasts from around the globe.\n\nLearn about the latest React features, best practices, and cutting-edge techniques that will elevate your development skills to the next level.`,
// // // // //       mode: "hybrid",
// // // // //       date: "2024-12-15",
// // // // //       time: "09:00",
// // // // //       location: "Tech Convention Center, San Francisco",
// // // // //       capacity: 500,
// // // // //       registeredCount: 342,
// // // // //       category: "technology",
// // // // //       status: "approved",
// // // // //       banner:
// // // // //         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
// // // // //       tags: ["React", "JavaScript", "Frontend", "Technology"],
// // // // //       organizer: "React Community",
// // // // //       guests: [
// // // // //         { name: "Dan Abramov", role: "Keynote Speaker" },
// // // // //         { name: "Sophia Lee", role: "Workshop Host" },
// // // // //       ],
// // // // //     },
// // // // //     {
// // // // //       id: 2,
// // // // //       title: "Digital Marketing Masterclass",
// // // // //       description: `Master the art of digital marketing in this intensive workshop designed for professionals looking to enhance their marketing skills.\n\nCover topics including SEO, social media marketing, content strategy, and analytics to drive business growth.`,
// // // // //       mode: "online",
// // // // //       date: "2024-12-20",
// // // // //       time: "14:00",
// // // // //       location: "",
// // // // //       capacity: 200,
// // // // //       registeredCount: 156,
// // // // //       category: "business",
// // // // //       status: "approved",
// // // // //       banner:
// // // // //         "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
// // // // //       tags: ["Marketing", "Digital", "Business", "Strategy"],
// // // // //       organizer: "Marketing Pro Institute",
// // // // //       guests: [
// // // // //         { name: "Alice Johnson", role: "Lead Instructor" },
// // // // //         { name: "Mark Davis", role: "Guest Speaker" },
// // // // //       ],
// // // // //     },
// // // // //     {
// // // // //       id: 3,
// // // // //       title: "AI & Machine Learning Summit",
// // // // //       description: `Explore the future of artificial intelligence and machine learning with industry leaders and researchers.\n\nDiscover practical applications, ethical considerations, and emerging trends that are shaping the AI landscape.`,
// // // // //       mode: "offline",
// // // // //       date: "2024-12-25",
// // // // //       time: "10:00",
// // // // //       location: "Innovation Hub, New York",
// // // // //       capacity: 300,
// // // // //       registeredCount: 287,
// // // // //       category: "technology",
// // // // //       status: "approved",
// // // // //       banner:
// // // // //         "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
// // // // //       tags: ["AI", "Machine Learning", "Technology", "Innovation"],
// // // // //       organizer: "AI Research Foundation",
// // // // //       guests: [
// // // // //         { name: "Dr. Emma Watson", role: "Keynote Speaker" },
// // // // //         { name: "Prof. John Kim", role: "Panelist" },
// // // // //       ],
// // // // //     },
// // // // //     {
// // // // //       id: 4,
// // // // //       title: "Startup Networking Event",
// // // // //       description: `Connect with fellow entrepreneurs, investors, and startup enthusiasts in this dynamic networking event.\n\nShare ideas, find potential collaborators, and learn from successful startup founders about their journey.`,
// // // // //       mode: "offline",
// // // // //       date: "2024-12-18",
// // // // //       time: "18:00",
// // // // //       location: "Startup Incubator, Austin",
// // // // //       capacity: 150,
// // // // //       registeredCount: 89,
// // // // //       category: "networking",
// // // // //       status: "approved",
// // // // //       banner:
// // // // //         "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
// // // // //       tags: ["Startup", "Networking", "Entrepreneurship", "Business"],
// // // // //       organizer: "Startup Community Austin",
// // // // //       guests: [
// // // // //         { name: "Tom Harris", role: "Mentor" },
// // // // //         { name: "Lisa Green", role: "Panelist" },
// // // // //       ],
// // // // //     },
// // // // //     {
// // // // //       id: 5,
// // // // //       title: "Web Development Bootcamp",
// // // // //       description: `Intensive 3-day bootcamp covering modern web development technologies and best practices.\n\nLearn HTML5, CSS3, JavaScript ES6+, and popular frameworks to build responsive web applications.`,
// // // // //       mode: "hybrid",
// // // // //       date: "2024-12-22",
// // // // //       time: "09:00",
// // // // //       location: "Code Academy, Seattle",
// // // // //       capacity: 80,
// // // // //       registeredCount: 73,
// // // // //       category: "education",
// // // // //       status: "approved",
// // // // //       banner:
// // // // //         "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop",
// // // // //       tags: ["Web Development", "Coding", "Education", "Programming"],
// // // // //       organizer: "Code Academy Seattle",
// // // // //       guests: [
// // // // //         { name: "Sarah Miller", role: "Instructor" },
// // // // //         { name: "James Brown", role: "Guest Lecturer" },
// // // // //       ],
// // // // //     },
// // // // //     {
// // // // //       id: 6,
// // // // //       title: "UX/UI Design Workshop",
// // // // //       description: `Learn the fundamentals of user experience and user interface design in this hands-on workshop.\n\nCover design thinking, prototyping, user research, and modern design tools used by industry professionals.`,
// // // // //       mode: "online",
// // // // //       date: "2024-12-28",
// // // // //       time: "13:00",
// // // // //       location: "",
// // // // //       capacity: 120,
// // // // //       registeredCount: 94,
// // // // //       category: "workshop",
// // // // //       status: "approved",
// // // // //       banner:
// // // // //         "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop",
// // // // //       tags: ["UX", "UI", "Design", "Workshop"],
// // // // //       organizer: "Design Masters",
// // // // //       guests: [
// // // // //         { name: "Emily Clark", role: "Trainer" },
// // // // //         { name: "Robert Wilson", role: "Guest Speaker" },
// // // // //       ],
// // // // //     },
// // // // //   ]);

// // // // //   useEffect(() => {
// // // // //     const timer = setTimeout(() => setIsLoading(false), 1200);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, []);

// // // // //   const handleFilterChange = (field, value) => {
// // // // //     setFilters((prev) => ({ ...prev, [field]: value }));
// // // // //   };

// // // // //   const handleClearFilters = () => {
// // // // //     setFilters({
// // // // //       search: "",
// // // // //       mode: "",
// // // // //       category: "",
// // // // //       dateFrom: "",
// // // // //       dateTo: "",
// // // // //       sortBy: "date-asc",
// // // // //     });
// // // // //   };

// // // // //   const handleRegisterEvent = (event) => {
// // // // //     setRegisteredEvents((prev) => new Set([...prev, event.id]));
// // // // //     setSelectedEvent(event);
// // // // //     setIsQRModalOpen(true);
// // // // //   };

// // // // //   const handleViewQR = (event) => {
// // // // //     setSelectedEvent(event);
// // // // //     setIsQRModalOpen(true);
// // // // //   };

// // // // //   const filteredEvents = approvedEvents.filter((event) => {
// // // // //     if (
// // // // //       filters.search &&
// // // // //       !event.title.toLowerCase().includes(filters.search.toLowerCase())
// // // // //     )
// // // // //       return false;
// // // // //     if (filters.mode && event.mode !== filters.mode) return false;
// // // // //     if (filters.category && event.category !== filters.category) return false;
// // // // //     return true;
// // // // //   });

// // // // //   return (
// // // // //     <div>
// // // // //       <FilterControls
// // // // //         filters={filters}
// // // // //         onFilterChange={handleFilterChange}
// // // // //         onClearFilters={handleClearFilters}
// // // // //       />

// // // // //       {isLoading ? (
// // // // //         <LoadingState count={6} />
// // // // //       ) : filteredEvents.length > 0 ? (
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //           {filteredEvents.map((event) => (
// // // // //             <EventCard
// // // // //               key={event.id}
// // // // //               event={event}
// // // // //               onRegister={handleRegisterEvent}
// // // // //               onViewQR={handleViewQR}
// // // // //               isRegistered={registeredEvents.has(event.id)}
// // // // //             />
// // // // //           ))}
// // // // //         </div>
// // // // //       ) : (
// // // // //         <EmptyState
// // // // //           type="browse-events"
// // // // //           title="No Events Found"
// // // // //           description="No events match your current filters."
// // // // //           actionLabel=""
// // // // //           onAction={() => {}}
// // // // //         />
// // // // //       )}

// // // // //       <QRCodeModal
// // // // //         isOpen={isQRModalOpen}
// // // // //         onClose={() => setIsQRModalOpen(false)}
// // // // //         event={selectedEvent}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BrowseEvents;
// // // // // BrowseEvents.jsx
// // // // import React, { useEffect, useState } from "react";
// // // // import EventCard from "./EventCard";
// // // // import FilterControls from "./FilterControls";
// // // // import QRCodeModal from "./QRCodeModal";
// // // // import EmptyState from "./EmptyState";
// // // // import LoadingState from "./LoadingState";
// // // // import { getApprovedEvents, registerForEvent } from "../../../../../lib/mongo/eventServices";

// // // // const BrowseEvents = () => {
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [filters, setFilters] = useState({
// // // //     search: "",
// // // //     mode: "",
// // // //     category: "",
// // // //     dateFrom: "",
// // // //     dateTo: "",
// // // //     sortBy: "date-asc",
// // // //   });
// // // //   const [isQRModalOpen, setIsQRModalOpen] = useState(false);
// // // //   const [selectedEvent, setSelectedEvent] = useState(null);
// // // //   const [registeredEvents, setRegisteredEvents] = useState(new Set());
// // // //   const [events, setEvents] = useState([]);

// // // //   // Fetch events from backend
// // // //   const fetchEvents = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const res = await getApprovedEvents();
// // // //       if (res.success) setEvents(res.events);
// // // //     } catch (err) {
// // // //       console.error("Error fetching events:", err);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchEvents();
// // // //   }, []);

// // // //   // Handle filter changes
// // // //   const handleFilterChange = (field, value) => {
// // // //     setFilters((prev) => ({ ...prev, [field]: value }));
// // // //   };

// // // //   const handleClearFilters = () => {
// // // //     setFilters({
// // // //       search: "",
// // // //       mode: "",
// // // //       category: "",
// // // //       dateFrom: "",
// // // //       dateTo: "",
// // // //       sortBy: "date-asc",
// // // //     });
// // // //   };

// // // //   // Register for an event
// // // //   const handleRegisterEvent = async (event) => {
// // // //     try {
// // // //       const res = await registerForEvent(event._id);
// // // //       if (res.success) {
// // // //         setRegisteredEvents((prev) => new Set([...prev, event._id]));
// // // //         setSelectedEvent(event);
// // // //         setIsQRModalOpen(true);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Error registering for event:", err);
// // // //     }
// // // //   };

// // // //   const handleViewQR = (event) => {
// // // //     setSelectedEvent(event);
// // // //     setIsQRModalOpen(true);
// // // //   };

// // // //   // Filter events
// // // //   const filteredEvents = events.filter((event) => {
// // // //     if (
// // // //       filters.search &&
// // // //       !event.title.toLowerCase().includes(filters.search.toLowerCase())
// // // //     )
// // // //       return false;
// // // //     if (filters.mode && event.mode !== filters.mode) return false;
// // // //     if (filters.category && event.category !== filters.category) return false;
// // // //     return true;
// // // //   });

// // // //   return (
// // // //     <div>
// // // //       <FilterControls
// // // //         filters={filters}
// // // //         onFilterChange={handleFilterChange}
// // // //         onClearFilters={handleClearFilters}
// // // //       />

// // // //       {isLoading ? (
// // // //         <LoadingState count={6} />
// // // //       ) : filteredEvents.length > 0 ? (
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //           {filteredEvents.map((event) => (
// // // //             <EventCard
// // // //               key={event._id}
// // // //               event={event}
// // // //               onRegister={handleRegisterEvent}
// // // //               onViewQR={handleViewQR}
// // // //               isRegistered={registeredEvents.has(event._id)}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       ) : (
// // // //         <EmptyState
// // // //           type="browse-events"
// // // //           title="No Events Found"
// // // //           description="No events match your current filters."
// // // //           actionLabel=""
// // // //           onAction={() => {}}
// // // //         />
// // // //       )}

// // // //       <QRCodeModal
// // // //         isOpen={isQRModalOpen}
// // // //         onClose={() => setIsQRModalOpen(false)}
// // // //         event={selectedEvent}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BrowseEvents;
// // // import React, { useEffect, useState } from "react";
// // // import EventCard from "./EventCard";
// // // import FilterControls from "./FilterControls";
// // // import QRCodeModal from "./QRCodeModal";
// // // import EmptyState from "./EmptyState";
// // // import LoadingState from "./LoadingState";
// // // import {
// // //   getApprovedEvents,
// // //   registerForEvent,
// // //   getMyEvents,
// // // } from "../../../../../lib/mongo/eventServices";

// // // const BrowseEvents = () => {
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [filters, setFilters] = useState({
// // //     search: "",
// // //     mode: "",
// // //     category: "",
// // //     dateFrom: "",
// // //     dateTo: "",
// // //     sortBy: "date-asc",
// // //   });
// // //   const [isQRModalOpen, setIsQRModalOpen] = useState(false);
// // //   const [selectedEvent, setSelectedEvent] = useState(null);
// // //   const [registeredEvents, setRegisteredEvents] = useState(new Map());
// // //   const [events, setEvents] = useState([]);

// // //   useEffect(() => {
// // //     fetchEvents();
// // //     fetchMyRegistrations();
// // //   }, []);

// // //   const fetchEvents = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const res = await getApprovedEvents();
// // //       if (res.success) setEvents(res.events);
// // //     } catch (err) {
// // //       console.error(err);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const fetchMyRegistrations = async () => {
// // //     try {
// // //       const res = await getMyEvents();
// // //       if (res.success) {
// // //         const regMap = new Map();
// // //         res.events.forEach((e) => {
// // //           if (e.registration?._id) regMap.set(e._id, e.registration._id);
// // //         });
// // //         setRegisteredEvents(regMap);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleFilterChange = (field, value) =>
// // //     setFilters((prev) => ({ ...prev, [field]: value }));
// // //   const handleClearFilters = () =>
// // //     setFilters({
// // //       search: "",
// // //       mode: "",
// // //       category: "",
// // //       dateFrom: "",
// // //       dateTo: "",
// // //       sortBy: "date-asc",
// // //     });

// // //   const handleRegisterEvent = async (event) => {
// // //     try {
// // //       const res = await registerForEvent(event._id);
// // //       if (res.success) {
// // //         setRegisteredEvents((prev) =>
// // //           new Map(prev).set(event._id, res.registration._id)
// // //         );
// // //         setSelectedEvent({ ...event, registrationId: res.registration._id });
// // //         setIsQRModalOpen(true);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleViewQR = (event) => {
// // //     setSelectedEvent({
// // //       ...event,
// // //       registrationId: registeredEvents.get(event._id),
// // //     });
// // //     setIsQRModalOpen(true);
// // //   };

// // //   const filteredEvents = events.filter((event) => {
// // //     if (
// // //       filters.search &&
// // //       !event.title.toLowerCase().includes(filters.search.toLowerCase())
// // //     )
// // //       return false;
// // //     if (filters.mode && event.mode !== filters.mode) return false;
// // //     if (filters.category && event.category !== filters.category) return false;
// // //     return true;
// // //   });

// // //   return (
// // //     <div>
// // //       <FilterControls
// // //         filters={filters}
// // //         onFilterChange={handleFilterChange}
// // //         onClearFilters={handleClearFilters}
// // //       />
// // //       {isLoading ? (
// // //         <LoadingState count={6} />
// // //       ) : filteredEvents.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredEvents.map((event) => (
// // //             <EventCard
// // //               key={event._id}
// // //               event={event}
// // //               onRegister={handleRegisterEvent}
// // //               onViewQR={handleViewQR}
// // //               isRegistered={registeredEvents.has(event._id)}
// // //             />
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <EmptyState
// // //           type="browse-events"
// // //           title="No Events Found"
// // //           description="No events match your current filters."
// // //           actionLabel=""
// // //           onAction={() => {}}
// // //         />
// // //       )}

// // //       <QRCodeModal
// // //         isOpen={isQRModalOpen}
// // //         onClose={() => setIsQRModalOpen(false)}
// // //         event={selectedEvent}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default BrowseEvents;
// // import React, { useEffect, useState } from "react";
// // import EventCard from "./EventCard";
// // import FilterControls from "./FilterControls";
// // import QRCodeModal from "./QRCodeModal";
// // import EmptyState from "./EmptyState";
// // import LoadingState from "./LoadingState";
// // import {
// //   getApprovedEvents,
// //   registerForEvent,
// // } from "../../../../../lib/mongo/eventServices";

// // const BrowseEvents = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [filters, setFilters] = useState({
// //     search: "",
// //     mode: "",
// //     category: "",
// //     dateFrom: "",
// //     dateTo: "",
// //     sortBy: "date-asc",
// //   });
// //   const [isQRModalOpen, setIsQRModalOpen] = useState(false);
// //   const [selectedEvent, setSelectedEvent] = useState(null);
// //   const [events, setEvents] = useState([]);

// //   // Fetch approved events on mount
// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   const fetchEvents = async () => {
// //     setIsLoading(true);
// //     try {
// //       const res = await getApprovedEvents();
// //       if (res.success) setEvents(res.events);
// //     } catch (err) {
// //       console.error("Error fetching events:", err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleFilterChange = (field, value) =>
// //     setFilters((prev) => ({ ...prev, [field]: value }));

// //   const handleClearFilters = () =>
// //     setFilters({
// //       search: "",
// //       mode: "",
// //       category: "",
// //       dateFrom: "",
// //       dateTo: "",
// //       sortBy: "date-asc",
// //     });

// //   const handleRegisterEvent = async (event) => {
// //     try {
// //       const res = await registerForEvent(event._id);
// //       if (res.success) {
// //         // Update the event in the list with registration info
// //         setEvents((prevEvents) =>
// //           prevEvents.map((e) =>
// //             e._id === event._id
// //               ? {
// //                   ...e,
// //                   isRegistered: true,
// //                   userRegistrationId: res.registration._id,
// //                 }
// //               : e
// //           )
// //         );

// //         setSelectedEvent({ ...event, registrationId: res.registration._id });
// //         setIsQRModalOpen(true);
// //       }
// //     } catch (err) {
// //       console.error("Error registering for event:", err);
// //     }
// //   };

// //   const handleViewQR = (event) => {
// //     setSelectedEvent({
// //       ...event,
// //       registrationId: event.userRegistrationId,
// //     });
// //     setIsQRModalOpen(true);
// //   };

// //   const filteredEvents = events.filter((event) => {
// //     if (
// //       filters.search &&
// //       !event.title.toLowerCase().includes(filters.search.toLowerCase())
// //     )
// //       return false;
// //     if (filters.mode && event.mode !== filters.mode) return false;
// //     if (filters.category && event.category !== filters.category) return false;
// //     return true;
// //   });

// //   return (
// //     <div>
// //       <FilterControls
// //         filters={filters}
// //         onFilterChange={handleFilterChange}
// //         onClearFilters={handleClearFilters}
// //       />

// //       {isLoading ? (
// //         <LoadingState count={6} />
// //       ) : filteredEvents.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredEvents.map((event) => (
// //             <EventCard
// //               key={event._id}
// //               event={event}
// //               onRegister={handleRegisterEvent}
// //               onViewQR={() => handleViewQR(event)}
// //               isRegistered={event.isRegistered} // already from API
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <EmptyState
// //           type="browse-events"
// //           title="No Events Found"
// //           description="No events match your current filters."
// //           actionLabel=""
// //           onAction={() => {}}
// //         />
// //       )}

// //       <QRCodeModal
// //         isOpen={isQRModalOpen}
// //         onClose={() => setIsQRModalOpen(false)}
// //         event={selectedEvent}
// //       />
// //     </div>
// //   );
// // };

// // export default BrowseEvents;
// import React, { useEffect, useState } from "react";
// import EventCard from "./EventCard";
// import FilterControls from "./FilterControls";
// import QRCodeModal from "./QRCodeModal";
// import EventDetailModal from "./EventDetailModal";
// import EmptyState from "./EmptyState";
// import LoadingState from "./LoadingState";
// import {
//   getApprovedEvents,
//   registerForEvent,
// } from "../../../../../lib/mongo/eventServices";

// const ITEMS_PER_PAGE = 6;

// const BrowseEvents = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     search: "",
//     mode: "",
//     category: "",
//     dateFrom: "",
//     dateTo: "",
//     sortBy: "date-asc",
//   });
//   const [isQRModalOpen, setIsQRModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch events
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     setIsLoading(true);
//     try {
//       const res = await getApprovedEvents();
//       if (res.success) setEvents(res.events);
//     } catch (err) {
//       console.error("Error fetching events:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (field, value) =>
//     setFilters((prev) => ({ ...prev, [field]: value }));

//   const handleClearFilters = () =>
//     setFilters({
//       search: "",
//       mode: "",
//       category: "",
//       dateFrom: "",
//       dateTo: "",
//       sortBy: "date-asc",
//     });

//   const handleRegisterEvent = async (event) => {
//     try {
//       const res = await registerForEvent(event._id);
//       if (res.success) {
//         setEvents((prevEvents) =>
//           prevEvents.map((e) =>
//             e._id === event._id
//               ? {
//                   ...e,
//                   isRegistered: true,
//                   userRegistrationId: res.registration._id,
//                 }
//               : e
//           )
//         );
//         setSelectedEvent({ ...event, registrationId: res.registration._id });
//         setIsQRModalOpen(true);
//       }
//     } catch (err) {
//       console.error("Error registering for event:", err);
//     }
//   };

//   const handleViewQR = (event) => {
//     setSelectedEvent({
//       ...event,
//       registrationId: event.userRegistrationId,
//     });
//     setIsQRModalOpen(true);
//   };

//   const handleViewDetails = (event) => {
//     setSelectedEvent(event);
//     setIsDetailModalOpen(true);
//   };

//   // Apply filters
//   const filteredEvents = events.filter((event) => {
//     if (
//       filters.search &&
//       !event.title.toLowerCase().includes(filters.search.toLowerCase())
//     )
//       return false;
//     if (filters.mode && event.mode !== filters.mode) return false;
//     if (filters.category && event.category !== filters.category) return false;
//     return true;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
//   const paginatedEvents = filteredEvents.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div>
//       <FilterControls
//         filters={filters}
//         onFilterChange={handleFilterChange}
//         onClearFilters={handleClearFilters}
//       />

//       {isLoading ? (
//         <LoadingState count={6} />
//       ) : filteredEvents.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {paginatedEvents.map((event) => (
//               <EventCard
//                 key={event._id}
//                 event={event}
//                 onRegister={handleRegisterEvent}
//                 onViewQR={() => handleViewQR(event)}
//                 onViewDetails={() => handleViewDetails(event)}
//                 isRegistered={event.isRegistered}
//               />
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center mt-6 gap-2">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-4 py-2 rounded ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       ) : (
//         <EmptyState
//           type="browse-events"
//           title="No Events Found"
//           description="No events match your current filters."
//         />
//       )}

//       <QRCodeModal
//         isOpen={isQRModalOpen}
//         onClose={() => setIsQRModalOpen(false)}
//         event={selectedEvent}
//       />

//       <EventDetailModal
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         event={selectedEvent}
//       />
//     </div>
//   );
// };

// export default BrowseEvents;
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import FilterControls from "./FilterControls";
import QRCodeModal from "./QRCodeModal";
import EventDetailModal from "./EventDetailModal";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import {
  getApprovedEvents,
  registerForEvent,
} from "../../../../../lib/mongo/eventServices";

const ITEMS_PER_PAGE = 6;

const BrowseEvents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    mode: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "date-asc",
  });
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await getApprovedEvents();
      if (res.success) setEvents(res.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); // reset to first page on filter change
  };

  const handleClearFilters = () =>
    setFilters({
      search: "",
      mode: "",
      category: "",
      dateFrom: "",
      dateTo: "",
      sortBy: "date-asc",
    });

  const handleRegisterEvent = async (event) => {
    try {
      const res = await registerForEvent(event._id);
      if (res.success) {
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e._id === event._id
              ? {
                  ...e,
                  isRegistered: true,
                  userRegistrationId: res.registration._id,
                }
              : e
          )
        );
        setSelectedEvent({ ...event, registrationId: res.registration._id });
        setIsQRModalOpen(true);
      }
    } catch (err) {
      console.error("Error registering for event:", err);
    }
  };

  const handleViewQR = (event) => {
    setSelectedEvent({
      ...event,
      registrationId: event.userRegistrationId,
    });
    setIsQRModalOpen(true);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  // 👉 Refactored Filter Logic
  const applyFilters = (events) => {
    return events.filter((event) => {
      const searchMatch = filters.search
        ? event.title.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      const modeMatch = filters.mode ? event.mode === filters.mode : true;

      const categoryMatch = filters.category
        ? event.category === filters.category
        : true;

      const dateFromMatch = filters.dateFrom
        ? new Date(event.startDate) >= new Date(filters.dateFrom)
        : true;

      const dateToMatch = filters.dateTo
        ? new Date(event.startDate) <= new Date(filters.dateTo)
        : true;

      return (
        searchMatch &&
        modeMatch &&
        categoryMatch &&
        dateFromMatch &&
        dateToMatch
      );
    });
  };

  const filteredEvents = applyFilters(events);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <FilterControls
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <LoadingState count={6} />
      ) : filteredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={handleRegisterEvent}
                onViewQR={() => handleViewQR(event)}
                onViewDetails={() => handleViewDetails(event)}
                isRegistered={event.isRegistered}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <EmptyState
          type="browse-events"
          title="No Events Found"
          description="No events match your current filters."
        />
      )}

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        event={selectedEvent}
      />

      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default BrowseEvents;
