// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../../../ui/Button";
// import MyEventCard from "./MyEventCard";
// import EventCreationModal from "./EventCreationModal";
// import EmptyState from "./EmptyState";
// import LoadingState from "./LoadingState";
// import {
//   getMyEvents as fetchMyEventsAPI,
//   createEvent as createEventAPI,
//   deleteEvent as deleteEventAPI,
//   updateEventStatus as updateEventStatusAPI,
// } from "../../../../../lib/mongo/eventServices";

// const MyEvents = () => {
//   const [myEvents, setMyEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const fetchEvents = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetchMyEventsAPI();
//       setMyEvents(Array.isArray(response?.events) ? response.events : []);
//     } catch (err) {
//       console.error("Error fetching events:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleCreateEvent = async (eventData) => {
//     try {
//       const newEvent = await createEventAPI(eventData);
//       setMyEvents((prev) => [newEvent, ...prev]);
//       setIsCreateModalOpen(false);
//     } catch (err) {
//       console.error("Error creating event:", err);
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await deleteEventAPI(eventId);
//         setMyEvents((prev) => prev.filter((e) => e._id !== eventId));
//       } catch (err) {
//         console.error("Error deleting event:", err);
//       }
//     }
//   };

//   const handleEditEvent = async (eventId, updatedData) => {
//     try {
//       const updatedEvent = await updateEventStatusAPI(eventId, updatedData);
//       setMyEvents((prev) =>
//         prev.map((e) => (e._id === eventId ? updatedEvent : e))
//       );
//     } catch (err) {
//       console.error("Error updating event:", err);
//     }
//   };

//   const openEventDetail = (event) => {
//     navigate(`${event._id}`);

//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-foreground">My Events</h1>
//         <Button
//           variant="default"
//           size="lg"
//           iconName="PlusCircle"
//           iconPosition="left"
//           onClick={() => setIsCreateModalOpen(true)}
//         >
//           Create Event
//         </Button>
//       </div>

//       {/* Event Grid */}
//       {isLoading ? (
//         <LoadingState type="my-events" count={3} />
//       ) : myEvents.length === 0 ? (
//         <EmptyState
//           type="my-events"
//           title="No Events"
//           description="You haven't created any events yet."
//           actionLabel="Create Your First Event"
//           onAction={() => setIsCreateModalOpen(true)}
//         />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {myEvents.map((event) => (
//             <MyEventCard
//               key={event._id}
//               event={event}
//               onEdit={() => handleEditEvent(event._id, { status: "approved" })}
//               onDelete={() => handleDeleteEvent(event._id)}
//               onClick={() => openEventDetail(event)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Create Event Modal */}
//       <EventCreationModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onCreateEvent={handleCreateEvent}
//       />
//     </div>
//   );
// };

// export default MyEvents;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/Button";
import MyEventCard from "./MyEventCard";
import EventCreationModal from "./EventCreationModal";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import {
  getMyEvents as fetchMyEventsAPI,
  createEvent as createEventAPI,
  deleteEvent as deleteEventAPI,
  updateEventStatus as updateEventStatusAPI,
} from "../../../../../lib/mongo/eventServices";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetchMyEventsAPI();
      setMyEvents(Array.isArray(response?.events) ? response.events : []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const newEvent = await createEventAPI(eventData);
      setMyEvents((prev) => [newEvent, ...prev]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEventAPI(eventId);
        setMyEvents((prev) => prev.filter((e) => e._id !== eventId));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  const handleEditEvent = async (eventId, updatedData) => {
    try {
      const updatedEvent = await updateEventStatusAPI(eventId, updatedData);
      setMyEvents((prev) =>
        prev.map((e) => (e._id === eventId ? updatedEvent : e))
      );
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const openEventDetail = (event) => navigate(`${event._id}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Events</h1>
        <Button
          variant="default"
          size="lg"
          iconName="PlusCircle"
          iconPosition="left"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Event
        </Button>
      </div>

      {/* Events */}
      {isLoading ? (
        <LoadingState type="my-events" count={3} />
      ) : myEvents.length === 0 ? (
        <EmptyState
          type="my-events"
          title="No Events"
          description="You haven't created any events yet."
          actionLabel="Create Your First Event"
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => (
            <MyEventCard
              key={event._id}
              event={event}
              onEdit={() => handleEditEvent(event._id, { status: "approved" })}
              onDelete={() => handleDeleteEvent(event._id)}
              onClick={() => openEventDetail(event)}
            />
          ))}
        </div>
      )}

      <EventCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
};

export default MyEvents;
