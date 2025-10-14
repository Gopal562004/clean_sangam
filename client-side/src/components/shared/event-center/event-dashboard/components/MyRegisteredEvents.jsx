import React, { useState, useEffect } from "react";
import { getMyRegisteredEvents } from "../../../../../lib/mongo/eventServices";
import EventCard from "./EventCard"; // Using the same modern card
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import QRCodeModal from "./QRCodeModal";

const MyRegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await getMyRegisteredEvents();
      setEvents(response?.events || []);
    } catch (err) {
      console.error("Error fetching registered events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleViewQR = (event) => {
    setSelectedEvent(event);
    setIsQRModalOpen(true);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingState type="my-events" count={3} />
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(({ event, registrationId, status }) => (
            <EventCard
              key={event._id}
              event={{ ...event, registrationId, status }}
              isRegistered={true}
              onViewQR={() =>
                handleViewQR({ ...event, registrationId, status })
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          type="my-events"
          title="No Registered Events"
          description="You haven't registered for any events yet."
        />
      )}

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default MyRegisteredEvents;
