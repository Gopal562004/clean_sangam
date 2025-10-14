// // // import React, { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import { useNavigate } from "react-router-dom";
// // // import Icon from "../../../../AppIcon";
// // // import Image from "../../../../AppImage";
// // // import Button from "../../../../ui/Button";

// // // const MyEventCard = ({ event, onEdit, onDelete }) => {
// // //   const [isHovered, setIsHovered] = useState(false);
// // //   const navigate = useNavigate();

// // //   const formatDate = (dateString) => {
// // //     const date = new Date(dateString);
// // //     return date?.toLocaleDateString("en-US", {
// // //       weekday: "short",
// // //       month: "short",
// // //       day: "numeric",
// // //       year: "numeric",
// // //     });
// // //   };

// // //   const formatTime = (timeString) => {
// // //     const time = new Date(`2000-01-01T${timeString}`);
// // //     return time?.toLocaleTimeString("en-US", {
// // //       hour: "numeric",
// // //       minute: "2-digit",
// // //       hour12: true,
// // //     });
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status?.toLowerCase()) {
// // //       case "approved":
// // //         return "text-green-600 bg-green-50";
// // //       case "pending":
// // //         return "text-yellow-600 bg-yellow-50";
// // //       case "rejected":
// // //         return "text-red-600 bg-red-50";
// // //       default:
// // //         return "text-gray-600 bg-gray-50";
// // //     }
// // //   };

// // //   const getModeIcon = (mode) => {
// // //     switch (mode?.toLowerCase()) {
// // //       case "online":
// // //         return "Monitor";
// // //       case "offline":
// // //         return "MapPin";
// // //       case "hybrid":
// // //         return "Globe";
// // //       default:
// // //         return "Calendar";
// // //     }
// // //   };

// // //   const handleManageEvent = () => {
// // //     navigate("/event-management", { state: { eventId: event?.id } });
// // //   };

// // //   const attendanceRate =
// // //     event?.registeredCount > 0
// // //       ? Math.round((event?.attendedCount / event?.registeredCount) * 100)
// // //       : 0;

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.3 }}
// // //       onMouseEnter={() => setIsHovered(true)}
// // //       onMouseLeave={() => setIsHovered(false)}
// // //       className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
// // //     >
// // //       {/* Event Banner */}
// // //       <div className="relative h-40 overflow-hidden">
// // //         <Image
// // //           src={event?.banner}
// // //           alt={event?.title}
// // //           className="w-full h-full object-cover transition-transform duration-300"
// // //           style={{
// // //             transform: isHovered ? "scale(1.05)" : "scale(1)",
// // //           }}
// // //         />
// // //         <div className="absolute top-3 right-3">
// // //           <span
// // //             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
// // //               event?.status
// // //             )}`}
// // //           >
// // //             <Icon
// // //               name={
// // //                 event?.status === "approved"
// // //                   ? "CheckCircle"
// // //                   : event?.status === "pending"
// // //                   ? "Clock"
// // //                   : "XCircle"
// // //               }
// // //               size={12}
// // //               className="mr-1"
// // //             />
// // //             {event?.status}
// // //           </span>
// // //         </div>
// // //         <div className="absolute top-3 left-3">
// // //           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-50">
// // //             <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />
// // //             {event?.mode}
// // //           </span>
// // //         </div>
// // //       </div>
// // //       {/* Event Content */}
// // //       <div className="p-5">
// // //         <div className="flex items-start justify-between mb-3">
// // //           <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
// // //             {event?.title}
// // //           </h3>
// // //         </div>

// // //         <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
// // //           {event?.description}
// // //         </p>

// // //         {/* Event Details */}
// // //         <div className="space-y-2 mb-4">
// // //           <div className="flex items-center text-sm text-muted-foreground">
// // //             <Icon name="Calendar" size={14} className="mr-2" />
// // //             <span>{formatDate(event?.date)}</span>
// // //             <Icon name="Clock" size={14} className="ml-4 mr-2" />
// // //             <span>{formatTime(event?.time)}</span>
// // //           </div>
// // //           {event?.location && (
// // //             <div className="flex items-center text-sm text-muted-foreground">
// // //               <Icon name="MapPin" size={14} className="mr-2" />
// // //               <span className="line-clamp-1">{event?.location}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Statistics */}
// // //         <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted rounded-lg">
// // //           <div className="text-center">
// // //             <div className="text-lg font-semibold text-foreground">
// // //               {event?.registeredCount}
// // //             </div>
// // //             <div className="text-xs text-muted-foreground">Registered</div>
// // //           </div>
// // //           <div className="text-center">
// // //             <div className="text-lg font-semibold text-foreground">
// // //               {event?.attendedCount}
// // //             </div>
// // //             <div className="text-xs text-muted-foreground">Attended</div>
// // //           </div>
// // //           <div className="text-center">
// // //             <div className="text-lg font-semibold text-foreground">
// // //               {attendanceRate}%
// // //             </div>
// // //             <div className="text-xs text-muted-foreground">Rate</div>
// // //           </div>
// // //         </div>

// // //         {/* Action Buttons */}
// // //         <div className="flex gap-2">
// // //           <Button
// // //             variant="default"
// // //             onClick={handleManageEvent}
// // //             className="flex-1"
// // //             iconName="Settings"
// // //             iconPosition="left"
// // //             size="sm"
// // //           >
// // //             Manage
// // //           </Button>
// // //           <Button
// // //             variant="outline"
// // //             onClick={() => onEdit(event)}
// // //             size="sm"
// // //             iconName="Edit"
// // //             iconPosition="left"
// // //           >
// // //             Edit
// // //           </Button>
// // //           <Button
// // //             variant="ghost"
// // //             onClick={() => onDelete(event)}
// // //             size="icon"
// // //             className="text-muted-foreground hover:text-destructive"
// // //           >
// // //             <Icon name="Trash2" size={16} />
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default MyEventCard;
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import Icon from "../../../../AppIcon";
// // import Image from "../../../../AppImage";
// // import Button from "../../../../ui/Button";

// // const MyEventCard = ({ event, onEdit, onDelete }) => {
// //   const [isHovered, setIsHovered] = useState(false);
// //   const navigate = useNavigate();

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date?.toLocaleDateString("en-US", {
// //       weekday: "short",
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };

// //   const formatTime = (timeString) => {
// //     const time = new Date(`2000-01-01T${timeString}`);
// //     return time?.toLocaleTimeString("en-US", {
// //       hour: "numeric",
// //       minute: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "approved":
// //         return "text-green-600 bg-green-50";
// //       case "pending":
// //         return "text-yellow-600 bg-yellow-50";
// //       case "rejected":
// //         return "text-red-600 bg-red-50";
// //       default:
// //         return "text-gray-600 bg-gray-50";
// //     }
// //   };

// //   const getModeIcon = (mode) => {
// //     switch (mode?.toLowerCase()) {
// //       case "online":
// //         return "Monitor";
// //       case "offline":
// //         return "MapPin";
// //       case "hybrid":
// //         return "Globe";
// //       default:
// //         return "Calendar";
// //     }
// //   };

// //   const handleManageEvent = () => {
// //     navigate("/event-management", { state: { eventId: event?._id } });
// //   };

// //   const attendanceRate =
// //     event?.registeredCount > 0
// //       ? Math.round((event?.attendedCount / event?.registeredCount) * 100)
// //       : 0;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //       className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
// //     >
// //       {/* Event Banner */}
// //       <div className="relative h-40 overflow-hidden">
// //         <Image
// //           src={event?.banner}
// //           alt={event?.title}
// //           className="w-full h-full object-cover transition-transform duration-300"
// //           style={{
// //             transform: isHovered ? "scale(1.05)" : "scale(1)",
// //           }}
// //         />
// //         <div className="absolute top-3 right-3">
// //           <span
// //             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
// //               event?.status
// //             )}`}
// //           >
// //             <Icon
// //               name={
// //                 event?.status === "approved"
// //                   ? "CheckCircle"
// //                   : event?.status === "pending"
// //                   ? "Clock"
// //                   : "XCircle"
// //               }
// //               size={12}
// //               className="mr-1"
// //             />
// //             {event?.status}
// //           </span>
// //         </div>
// //         <div className="absolute top-3 left-3">
// //           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-50">
// //             <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />
// //             {event?.mode}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Event Content */}
// //       <div className="p-5">
// //         <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
// //           {event?.title}
// //         </h3>
// //         <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
// //           {event?.description}
// //         </p>

// //         {/* Event Details */}
// //         <div className="space-y-2 mb-4">
// //           <div className="flex items-center text-sm text-muted-foreground">
// //             <Icon name="Calendar" size={14} className="mr-2" />
// //             <span>{formatDate(event?.date)}</span>
// //             <Icon name="Clock" size={14} className="ml-4 mr-2" />
// //             <span>{formatTime(event?.time)}</span>
// //           </div>
// //           {event?.location && (
// //             <div className="flex items-center text-sm text-muted-foreground">
// //               <Icon name="MapPin" size={14} className="mr-2" />
// //               <span className="line-clamp-1">{event?.location}</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Statistics */}
// //         <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted rounded-lg">
// //           <div className="text-center">
// //             <div className="text-lg font-semibold text-foreground">
// //               {event?.registeredCount}
// //             </div>
// //             <div className="text-xs text-muted-foreground">Registered</div>
// //           </div>
// //           <div className="text-center">
// //             <div className="text-lg font-semibold text-foreground">
// //               {event?.attendedCount}
// //             </div>
// //             <div className="text-xs text-muted-foreground">Attended</div>
// //           </div>
// //           <div className="text-center">
// //             <div className="text-lg font-semibold text-foreground">
// //               {attendanceRate}%
// //             </div>
// //             <div className="text-xs text-muted-foreground">Rate</div>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="flex gap-2">
// //           <Button
// //             variant="default"
// //             onClick={handleManageEvent}
// //             className="flex-1"
// //             iconName="Settings"
// //             iconPosition="left"
// //             size="sm"
// //           >
// //             Manage
// //           </Button>
// //           <Button
// //             variant="outline"
// //             onClick={() => onEdit(event)}
// //             size="sm"
// //             iconName="Edit"
// //             iconPosition="left"
// //           >
// //             Edit
// //           </Button>
// //           <Button
// //             variant="ghost"
// //             onClick={() => onDelete(event)}
// //             size="icon"
// //             className="text-muted-foreground hover:text-destructive"
// //           >
// //             <Icon name="Trash2" size={16} />
// //           </Button>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default MyEventCard;
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Icon from "../../../../AppIcon";
// import Image from "../../../../AppImage";
// import Button from "../../../../ui/Button";

// const MyEventCard = ({ event, onEdit, onDelete, onClick }) => {
//   const [hovered, setHovered] = useState(false);

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "text-green-600 bg-green-50";
//       case "pending":
//         return "text-yellow-600 bg-yellow-50";
//       case "rejected":
//         return "text-red-600 bg-red-50";
//       default:
//         return "text-gray-600 bg-gray-50";
//     }
//   };

//   const getModeIcon = (mode) => {
//     switch (mode?.toLowerCase()) {
//       case "online":
//         return "Monitor";
//       case "offline":
//         return "MapPin";
//       default:
//         return "Globe";
//     }
//   };

//   const attendanceRate =
//     event?.registeredCount > 0
//       ? Math.round((event?.attendedCount / event?.registeredCount) * 100)
//       : 0;

//   return (
//     <motion.div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className="bg-card border border-border rounded-xl shadow-sm hover:shadow-lg overflow-hidden cursor-pointer transition-all"
//       onClick={() => onClick(event)}
//     >
//       {/* Banner */}
//       <div className="relative h-40 overflow-hidden">
//         {event.banner && (
//           <Image
//             src={event.banner}
//             alt={event.title}
//             className="w-full h-full object-cover transition-transform duration-300"
//             style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
//           />
//         )}
//         <span
//           className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//             event.status
//           )}`}
//         >
//           {event.status}
//         </span>
//         <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
//           {event.mode}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {event.description}
//         </p>

//         {/* Stats */}
//         <div className="flex justify-between mt-3 mb-3 p-2 bg-muted rounded-lg text-center text-sm">
//           <div>
//             <div className="font-semibold">{event.registeredCount}</div>
//             Registered
//           </div>
//           <div>
//             <div className="font-semibold">{event.attendedCount}</div>
//             Attended
//           </div>
//           <div>
//             <div className="font-semibold">{attendanceRate}%</div>
//             Rate
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit();
//             }}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete();
//             }}
//           >
//             Delete
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MyEventCard;
import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../../AppIcon";
import Image from "../../../../AppImage";
import Button from "../../../../ui/Button";

const MyEventCard = ({ event, onEdit, onDelete, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const attendanceRate =
    event?.registeredCount > 0
      ? Math.round((event?.attendedCount / event?.registeredCount) * 100)
      : 0;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card border border-border rounded-xl shadow-sm hover:shadow-lg overflow-hidden cursor-pointer transition-all"
      onClick={() => onClick(event)}
    >
      {/* Banner */}
      <div className="relative h-40 overflow-hidden">
        {event.banner && (
          <Image
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
        )}
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            event.status
          )}`}
        >
          {event.status}
        </span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
          {event.mode}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        {/* Stats */}
        <div className="flex justify-between mt-3 mb-3 p-2 bg-muted rounded-lg text-center text-sm">
          <div>
            <div className="font-semibold">{event.registeredCount}</div>
            Registered
          </div>
          <div>
            <div className="font-semibold">{event.attendedCount}</div>
            Attended
          </div>
          <div>
            <div className="font-semibold">{attendanceRate}%</div>
            Rate
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyEventCard;
