// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// //import Header from "../../components/ui/Header";
// import EventHeader from "./components/EventHeader";
// import ParticipantsTable from "./components/ParticipantsTable";
// import AnalyticsDashboard from "./components/AnalyticsDashboard";
// import QRScanner from "./components/QRScanner";
// import Icon from "../../../AppIcon";

// const EventManage = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("participants");
//   const [event, setEvent] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   const [analytics, setAnalytics] = useState({});
//   const [user] = useState({
//     name: "John Organizer",
//     email: "john@eventhub.com",
//     role: "organizer",
//   });

//   // Mock event data
//   const mockEvent = {
//     id: "evt_001",
//     title: "Tech Innovation Summit 2025",
//     description:
//       "Annual technology conference featuring industry leaders and emerging trends in AI, blockchain, and sustainable tech solutions.",
//     date: "2025-01-15",
//     time: "10:00 AM",
//     mode: "hybrid",
//     location: "Tech Convention Center, San Francisco",
//     capacity: 150,
//     registered: 127,
//     attended: 89,
//     status: "active",
//   };

//   // Mock participants data
//   const mockParticipants = [
//     {
//       id: "p_001",
//       name: "Alice Johnson",
//       email: "alice.johnson@techcorp.com",
//       role: "Software Engineer",
//       registrationDate: "2025-01-10",
//       attended: true,
//       checkInTime: "2025-01-15 09:45 AM",
//     },
//     {
//       id: "p_002",
//       name: "Bob Smith",
//       email: "bob.smith@startup.io",
//       role: "Product Manager",
//       registrationDate: "2025-01-08",
//       attended: true,
//       checkInTime: "2025-01-15 10:15 AM",
//     },
//     {
//       id: "p_003",
//       name: "Carol Davis",
//       email: "carol.davis@enterprise.com",
//       role: "Data Scientist",
//       registrationDate: "2025-01-12",
//       attended: false,
//       checkInTime: null,
//     },
//     {
//       id: "p_004",
//       name: "David Wilson",
//       email: "david.wilson@consulting.com",
//       role: "Business Analyst",
//       registrationDate: "2025-01-09",
//       attended: true,
//       checkInTime: "2025-01-15 10:30 AM",
//     },
//     {
//       id: "p_005",
//       name: "Emma Brown",
//       email: "emma.brown@design.studio",
//       role: "UX Designer",
//       registrationDate: "2025-01-11",
//       attended: false,
//       checkInTime: null,
//     },
//     {
//       id: "p_006",
//       name: "Frank Miller",
//       email: "frank.miller@devops.com",
//       role: "DevOps Engineer",
//       registrationDate: "2025-01-07",
//       attended: true,
//       checkInTime: "2025-01-15 09:30 AM",
//     },
//     {
//       id: "p_007",
//       name: "Grace Lee",
//       email: "grace.lee@marketing.agency",
//       role: "Marketing Manager",
//       registrationDate: "2025-01-13",
//       attended: false,
//       checkInTime: null,
//     },
//     {
//       id: "p_008",
//       name: "Henry Taylor",
//       email: "henry.taylor@finance.corp",
//       role: "Financial Analyst",
//       registrationDate: "2025-01-06",
//       attended: true,
//       checkInTime: "2025-01-15 10:00 AM",
//     },
//   ];

//   // Mock analytics data
//   const mockAnalytics = {
//     totalRegistered: 127,
//     totalAttended: 89,
//     averageFeedback: 4.3,
//     attendanceRate: 70.1,
//     registrationTrend: [
//       { period: "Week 1", count: 23 },
//       { period: "Week 2", count: 45 },
//       { period: "Week 3", count: 38 },
//       { period: "Week 4", count: 21 },
//     ],
//     feedbackDistribution: [
//       { rating: 5, count: 45 },
//       { rating: 4, count: 28 },
//       { rating: 3, count: 12 },
//       { rating: 2, count: 3 },
//       { rating: 1, count: 1 },
//     ],
//   };

//   useEffect(() => {
//     // Simulate loading event data
//     setEvent(mockEvent);
//     setParticipants(mockParticipants);
//     setAnalytics(mockAnalytics);
//   }, [eventId]);

//   const handleUpdateAttendance = (participantId, attended) => {
//     setParticipants((prev) =>
//       prev?.map((participant) =>
//         participant?.id === participantId
//           ? {
//               ...participant,
//               attended,
//               checkInTime: attended ? new Date()?.toLocaleString() : null,
//             }
//           : participant
//       )
//     );

//     // Update event stats
//     setEvent((prev) => ({
//       ...prev,
//       attended: attended ? prev?.attended + 1 : Math.max(0, prev?.attended - 1),
//     }));
//   };

//   const handleQRScanSuccess = (scanData) => {
//     const participant = participants?.find(
//       (p) => p?.id === scanData?.participantId
//     );
//     if (participant && !participant?.attended) {
//       handleUpdateAttendance(scanData?.participantId, true);
//     }
//   };

//   const handleQRScanError = (error) => {
//     console.error("QR Scan Error:", error);
//   };

//   const handleLogout = () => {
//     navigate("/register");
//   };

//   const handleRoleSwitch = () => {
//     navigate("/event-dashboard");
//   };

//   const tabs = [
//     {
//       id: "participants",
//       label: "Participants",
//       icon: "Users",
//       count: participants?.length,
//     },
//     { id: "analytics", label: "Analytics", icon: "BarChart3" },
//     { id: "scanner", label: "QR Scanner", icon: "QrCode" },
//   ];

//   if (!event) {
//     return (
//       <div className="min-h-screen bg-background">
//         <div className="pt-16 flex items-center justify-center min-h-screen">
//           <div className="text-center">
//             <Icon
//               name="Loader2"
//               size={48}
//               className="mx-auto text-primary animate-spin mb-4"
//             />
//             <p className="text-muted-foreground">Loading event details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="pt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Event Header */}
//           <EventHeader event={event} />

//           {/* Tab Navigation */}
//           <div className="bg-card rounded-xl border border-border mb-6">
//             <div className="border-b border-border">
//               <nav className="flex space-x-8 px-6" aria-label="Tabs">
//                 {tabs?.map((tab) => (
//                   <button
//                     key={tab?.id}
//                     onClick={() => setActiveTab(tab?.id)}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center space-x-2 ${
//                       activeTab === tab?.id
//                         ? "border-primary text-primary"
//                         : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
//                     }`}
//                   >
//                     <Icon name={tab?.icon} size={16} />
//                     <span>{tab?.label}</span>
//                     {tab?.count !== undefined && (
//                       <span
//                         className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
//                           activeTab === tab?.id
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-muted-foreground"
//                         }`}
//                       >
//                         {tab?.count}
//                       </span>
//                     )}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Tab Content */}
//             <div className="p-6">
//               {activeTab === "participants" && (
//                 <ParticipantsTable
//                   participants={participants}
//                   onUpdateAttendance={handleUpdateAttendance}
//                 />
//               )}

//               {activeTab === "analytics" && (
//                 <AnalyticsDashboard analytics={analytics} />
//               )}

//               {activeTab === "scanner" && (
//                 <QRScanner
//                   onScanSuccess={handleQRScanSuccess}
//                   onScanError={handleQRScanError}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EventManage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventHeader from "./components/EventHeader";
import ParticipantsTable from "./components/ParticipantsTable";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import QRScanner from "./components/QRScanner";
import Icon from "../../../AppIcon";

// Import your API functions
import {
  getEventById,
  getEventParticipants,
  getEventAnalytics,
  updateAttendance,
  scanQR,
} from "../../../../lib/mongo/eventServices";

const EventManage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("participants");
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch event details
  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const eventRes = await getEventById(eventId);
      if (eventRes.success) setEvent(eventRes.event);

      const participantsRes = await getEventParticipants(eventId);
      if (participantsRes.success)
        setParticipants(participantsRes.participants);

      const analyticsRes = await getEventAnalytics(eventId);
      if (analyticsRes.success) setAnalytics(analyticsRes.analytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  // Update participant attendance locally + backend
  const handleUpdateAttendance = async (participantId, attended) => {
    try {
      await updateAttendance(eventId, participantId, attended);

      setParticipants((prev) =>
        prev.map((p) =>
          p.id === participantId
            ? {
                ...p,
                attended,
                checkInTime: attended ? new Date().toLocaleString() : null,
              }
            : p
        )
      );

      setEvent((prev) => ({
        ...prev,
        attended: attended ? prev.attended + 1 : Math.max(0, prev.attended - 1),
      }));
    } catch (err) {
      console.error("Failed to update attendance:", err);
    }
  };

  // QR Scan handlers
  const handleQRScanSuccess = async (scanData) => {
    try {
      const res = await scanQR({ qrCode: scanData.qrCode });
      if (res.success && res.registration) {
        handleUpdateAttendance(res.registration.participantId, true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQRScanError = (error) => {
    console.error("QR Scan Error:", error);
  };

  const tabs = [
    {
      id: "participants",
      label: "Participants",
      icon: "Users",
      count: participants.length,
    },
    { id: "analytics", label: "Analytics", icon: "BarChart3" },
    { id: "scanner", label: "QR Scanner", icon: "QrCode" },
  ];

  if (loading || !event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon
              name="Loader2"
              size={48}
              className="mx-auto text-primary animate-spin mb-4"
            />
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Event Header */}
          <EventHeader event={event} />

          {/* Tab Navigation */}
          <div className="bg-card rounded-xl border border-border mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span
                        className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "participants" && (
                <ParticipantsTable
                  participants={participants}
                  onUpdateAttendance={handleUpdateAttendance}
                />
              )}

              {activeTab === "analytics" && (
                <AnalyticsDashboard analytics={analytics} />
              )}

              {activeTab === "scanner" && (
                <QRScanner
                  onScanSuccess={handleQRScanSuccess}
                  onScanError={handleQRScanError}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventManage;
