// // // // import React, { useState } from "react";
// // // // import { motion } from "framer-motion";
// // // // import Icon from "../../../../AppIcon";
// // // // import Image from "../../../../AppImage";
// // // // import Button from "../../../../ui/Button";

// // // // const EventCard = ({ event, onRegister, onViewQR, isRegistered = false }) => {
// // // //   const [isHovered, setIsHovered] = useState(false);

// // // //   const formatDate = (dateString) => {
// // // //     const date = new Date(dateString);
// // // //     return date?.toLocaleDateString("en-US", {
// // // //       weekday: "short",
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       year: "numeric",
// // // //     });
// // // //   };

// // // //   const formatTime = (timeString) => {
// // // //     const time = new Date(`2000-01-01T${timeString}`);
// // // //     return time?.toLocaleTimeString("en-US", {
// // // //       hour: "numeric",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     });
// // // //   };

// // // //   const getModeIcon = (mode) => {
// // // //     switch (mode?.toLowerCase()) {
// // // //       case "online":
// // // //         return "Monitor";
// // // //       case "offline":
// // // //         return "MapPin";
// // // //       case "hybrid":
// // // //         return "Globe";
// // // //       default:
// // // //         return "Calendar";
// // // //     }
// // // //   };

// // // //   const getModeColor = (mode) => {
// // // //     switch (mode?.toLowerCase()) {
// // // //       case "online":
// // // //         return "text-blue-600 bg-blue-50";
// // // //       case "offline":
// // // //         return "text-green-600 bg-green-50";
// // // //       case "hybrid":
// // // //         return "text-purple-600 bg-purple-50";
// // // //       default:
// // // //         return "text-gray-600 bg-gray-50";
// // // //     }
// // // //   };

// // // //   return (
// // // //     <motion.div
// // // //       initial={{ opacity: 0, y: 20 }}
// // // //       animate={{ opacity: 1, y: 0 }}
// // // //       transition={{ duration: 0.3 }}
// // // //       onMouseEnter={() => setIsHovered(true)}
// // // //       onMouseLeave={() => setIsHovered(false)}
// // // //       className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
// // // //     >
// // // //       {/* Event Banner */}
// // // //       <div className="relative h-48 overflow-hidden">
// // // //         <Image
// // // //           src={event?.banner}
// // // //           alt={event?.title}
// // // //           className="w-full h-full object-cover transition-transform duration-300"
// // // //           style={{
// // // //             transform: isHovered ? "scale(1.05)" : "scale(1)",
// // // //           }}
// // // //         />
// // // //         <div className="absolute top-4 right-4">
// // // //           <span
// // // //             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModeColor(
// // // //               event?.mode
// // // //             )}`}
// // // //           >
// // // //             <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />
// // // //             {event?.mode}
// // // //           </span>
// // // //         </div>
// // // //         {isRegistered && (
// // // //           <div className="absolute top-4 left-4">
// // // //             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
// // // //               <Icon name="CheckCircle" size={12} className="mr-1" />
// // // //               Registered
// // // //             </span>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //       {/* Event Content */}
// // // //       <div className="p-6">
// // // //         <div className="flex items-start justify-between mb-3">
// // // //           <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
// // // //             {event?.title}
// // // //           </h3>
// // // //           <div className="ml-2 flex items-center text-muted-foreground">
// // // //             <Icon name="Users" size={16} className="mr-1" />
// // // //             <span className="text-sm">
// // // //               {event?.registeredCount}/{event?.capacity}
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
// // // //           {event?.description}
// // // //         </p>

// // // //         {/* Event Details */}
// // // //         <div className="space-y-2 mb-4">
// // // //           <div className="flex items-center text-sm text-muted-foreground">
// // // //             <Icon name="Calendar" size={16} className="mr-2" />
// // // //             <span>{formatDate(event?.date)}</span>
// // // //           </div>
// // // //           <div className="flex items-center text-sm text-muted-foreground">
// // // //             <Icon name="Clock" size={16} className="mr-2" />
// // // //             <span>{formatTime(event?.time)}</span>
// // // //           </div>
// // // //           {event?.location && (
// // // //             <div className="flex items-center text-sm text-muted-foreground">
// // // //               <Icon name="MapPin" size={16} className="mr-2" />
// // // //               <span className="line-clamp-1">{event?.location}</span>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Tags */}
// // // //         {event?.tags && event?.tags?.length > 0 && (
// // // //           <div className="flex flex-wrap gap-2 mb-4">
// // // //             {event?.tags?.slice(0, 3)?.map((tag, index) => (
// // // //               <span
// // // //                 key={index}
// // // //                 className="inline-block px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-md"
// // // //               >
// // // //                 {tag}
// // // //               </span>
// // // //             ))}
// // // //             {event?.tags?.length > 3 && (
// // // //               <span className="inline-block px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-md">
// // // //                 +{event?.tags?.length - 3} more
// // // //               </span>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* Action Buttons */}
// // // //         <div className="flex gap-2">
// // // //           {isRegistered ? (
// // // //             <Button
// // // //               variant="outline"
// // // //               onClick={() => onViewQR(event)}
// // // //               className="flex-1"
// // // //               iconName="QrCode"
// // // //               iconPosition="left"
// // // //             >
// // // //               View QR Code
// // // //             </Button>
// // // //           ) : (
// // // //             <Button
// // // //               variant="default"
// // // //               onClick={() => onRegister(event)}
// // // //               disabled={event?.registeredCount >= event?.capacity}
// // // //               className="flex-1"
// // // //               iconName="UserPlus"
// // // //               iconPosition="left"
// // // //             >
// // // //               {event?.registeredCount >= event?.capacity
// // // //                 ? "Event Full"
// // // //                 : "Register"}
// // // //             </Button>
// // // //           )}
// // // //           <Button
// // // //             variant="ghost"
// // // //             size="icon"
// // // //             className="text-muted-foreground hover:text-foreground"
// // // //           >
// // // //             <Icon name="Heart" size={18} />
// // // //           </Button>
// // // //         </div>
// // // //       </div>
// // // //     </motion.div>
// // // //   );
// // // // };

// // // // export default EventCard;
// // // import React, { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import Icon from "../../../../AppIcon";
// // // import Image from "../../../../AppImage";
// // // import Button from "../../../../ui/Button";

// // // const EventCard = ({ event, onRegister, onViewQR, isRegistered = false }) => {
// // //   const [isHovered, setIsHovered] = useState(false);

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

// // //   const getModeColor = (mode) => {
// // //     switch (mode?.toLowerCase()) {
// // //       case "online":
// // //         return "text-blue-600 bg-blue-50";
// // //       case "offline":
// // //         return "text-green-600 bg-green-50";
// // //       case "hybrid":
// // //         return "text-purple-600 bg-purple-50";
// // //       default:
// // //         return "text-gray-600 bg-gray-50";
// // //     }
// // //   };

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
// // //       <div className="relative h-48 overflow-hidden">
// // //         <Image
// // //           src={event?.banner}
// // //           alt={event?.title}
// // //           className="w-full h-full object-cover transition-transform duration-300"
// // //           style={{
// // //             transform: isHovered ? "scale(1.05)" : "scale(1)",
// // //           }}
// // //         />
// // //         <div className="absolute top-4 right-4">
// // //           <span
// // //             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModeColor(
// // //               event?.mode
// // //             )}`}
// // //           >
// // //             <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />
// // //             {event?.mode}
// // //           </span>
// // //         </div>
// // //         {isRegistered && (
// // //           <div className="absolute top-4 left-4">
// // //             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
// // //               <Icon name="CheckCircle" size={12} className="mr-1" />
// // //               Registered
// // //             </span>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Event Content */}
// // //       <div className="p-6">
// // //         <div className="flex items-start justify-between mb-3">
// // //           <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
// // //             {event?.title}
// // //           </h3>
// // //           <div className="ml-2 flex items-center text-muted-foreground">
// // //             <Icon name="Users" size={16} className="mr-1" />
// // //             <span className="text-sm">
// // //               {event?.registeredCount}/{event?.capacity}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
// // //           {event?.description}
// // //         </p>

// // //         {/* Organizer and Guests */}
// // //         <div className="mb-4 text-sm text-muted-foreground space-y-1">
// // //           <div className="flex items-center">
// // //             <Icon name="User" size={14} className="mr-1" />
// // //             <span>
// // //               <strong>Organizer:</strong> {event?.organizer || "TBA"}
// // //             </span>
// // //           </div>
// // //           {event?.guests?.length > 0 && (
// // //             <div>
// // //               <strong>Guests:</strong>
// // //               <ul className="list-disc ml-5">
// // //                 {event.guests.map((guest, index) => (
// // //                   <li key={index}>
// // //                     {guest.name} {guest.role ? `- ${guest.role}` : ""}
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Event Details */}
// // //         <div className="space-y-2 mb-4">
// // //           <div className="flex items-center text-sm text-muted-foreground">
// // //             <Icon name="Calendar" size={16} className="mr-2" />
// // //             <span>{formatDate(event?.date)}</span>
// // //           </div>
// // //           <div className="flex items-center text-sm text-muted-foreground">
// // //             <Icon name="Clock" size={16} className="mr-2" />
// // //             <span>{formatTime(event?.time)}</span>
// // //           </div>
// // //           {event?.location && (
// // //             <div className="flex items-center text-sm text-muted-foreground">
// // //               <Icon name="MapPin" size={16} className="mr-2" />
// // //               <span className="line-clamp-1">{event?.location}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Tags */}
// // //         {event?.tags && event?.tags?.length > 0 && (
// // //           <div className="flex flex-wrap gap-2 mb-4">
// // //             {event?.tags?.slice(0, 3)?.map((tag, index) => (
// // //               <span
// // //                 key={index}
// // //                 className="inline-block px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-md"
// // //               >
// // //                 {tag}
// // //               </span>
// // //             ))}
// // //             {event?.tags?.length > 3 && (
// // //               <span className="inline-block px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-md">
// // //                 +{event?.tags?.length - 3} more
// // //               </span>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Action Buttons */}
// // //         <div className="flex gap-2">
// // //           {isRegistered ? (
// // //             <Button
// // //               variant="outline"
// // //               onClick={() => onViewQR(event)}
// // //               className="flex-1"
// // //               iconName="QrCode"
// // //               iconPosition="left"
// // //             >
// // //               View QR Code
// // //             </Button>
// // //           ) : (
// // //             <Button
// // //               variant="default"
// // //               onClick={() => onRegister(event)}
// // //               disabled={event?.registeredCount >= event?.capacity}
// // //               className="flex-1"
// // //               iconName="UserPlus"
// // //               iconPosition="left"
// // //             >
// // //               {event?.registeredCount >= event?.capacity
// // //                 ? "Event Full"
// // //                 : "Register"}
// // //             </Button>
// // //           )}
// // //           <Button
// // //             variant="ghost"
// // //             size="icon"
// // //             className="text-muted-foreground hover:text-foreground"
// // //           >
// // //             <Icon name="Heart" size={18} />
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default EventCard;
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import Icon from "../../../../AppIcon";
// // import Image from "../../../../AppImage";
// // import Button from "../../../../ui/Button";

// // const EventCard = ({ event, onRegister, onViewQR, isRegistered = false }) => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   // Format date
// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date?.toLocaleDateString("en-US", {
// //       weekday: "short",
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };

// //   // Format time
// //   const formatTime = (timeString) => {
// //     const time = new Date(`2000-01-01T${timeString}`);
// //     return time?.toLocaleTimeString("en-US", {
// //       hour: "numeric",
// //       minute: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   // Event mode icon
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

// //   // Event mode color
// //   const getModeColor = (mode) => {
// //     switch (mode?.toLowerCase()) {
// //       case "online":
// //         return "text-blue-600 bg-blue-50";
// //       case "offline":
// //         return "text-green-600 bg-green-50";
// //       case "hybrid":
// //         return "text-purple-600 bg-purple-50";
// //       default:
// //         return "text-gray-600 bg-gray-50";
// //     }
// //   };

// //   // Confirm before registering
// //   const handleRegister = (event) => {
// //     const confirmRegister = window.confirm(
// //       `Are you sure you want to register for "${event.title}"?`
// //     );
// //     if (confirmRegister) {
// //       onRegister(event); // Call parent function to register
// //     }
// //   };

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
// //       <div className="relative h-48 overflow-hidden">
// //         <Image
// //           src={event?.banner}
// //           alt={event?.title}
// //           className="w-full h-full object-cover transition-transform duration-300"
// //           style={{
// //             transform: isHovered ? "scale(1.05)" : "scale(1)",
// //           }}
// //         />
// //         <div className="absolute top-4 right-4">
// //           <span
// //             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModeColor(
// //               event?.mode
// //             )}`}
// //           >
// //             <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />
// //             {event?.mode}
// //           </span>
// //         </div>
// //         {isRegistered && (
// //           <div className="absolute top-4 left-4">
// //             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
// //               <Icon name="CheckCircle" size={12} className="mr-1" />
// //               Registered
// //             </span>
// //           </div>
// //         )}
// //       </div>

// //       {/* Event Content */}
// //       <div className="p-6">
// //         <div className="flex items-start justify-between mb-3">
// //           <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
// //             {event?.title}
// //           </h3>
// //           <div className="ml-2 flex items-center text-muted-foreground">
// //             <Icon name="Users" size={16} className="mr-1" />
// //             <span className="text-sm">
// //               {event?.registeredCount}/{event?.capacity}
// //             </span>
// //           </div>
// //         </div>

// //         <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
// //           {event?.description}
// //         </p>

// //         {/* Event Details */}
// //         <div className="space-y-2 mb-4">
// //           <div className="flex items-center text-sm text-muted-foreground">
// //             <Icon name="Calendar" size={16} className="mr-2" />
// //             <span>{formatDate(event?.date)}</span>
// //           </div>
// //           <div className="flex items-center text-sm text-muted-foreground">
// //             <Icon name="Clock" size={16} className="mr-2" />
// //             <span>{formatTime(event?.time)}</span>
// //           </div>
// //           {event?.location && (
// //             <div className="flex items-center text-sm text-muted-foreground">
// //               <Icon name="MapPin" size={16} className="mr-2" />
// //               <span className="line-clamp-1">{event?.location}</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Tags */}
// //         {event?.tags && event?.tags?.length > 0 && (
// //           <div className="flex flex-wrap gap-2 mb-4">
// //             {event?.tags?.slice(0, 3)?.map((tag, index) => (
// //               <span
// //                 key={index}
// //                 className="inline-block px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-md"
// //               >
// //                 {tag}
// //               </span>
// //             ))}
// //             {event?.tags?.length > 3 && (
// //               <span className="inline-block px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-md">
// //                 +{event?.tags?.length - 3} more
// //               </span>
// //             )}
// //           </div>
// //         )}

// //         {/* Action Buttons */}
// //         <div className="flex gap-2">
// //           {isRegistered ? (
// //             <Button
// //               variant="outline"
// //               onClick={() => onViewQR(event)}
// //               className="flex-1"
// //               iconName="QrCode"
// //               iconPosition="left"
// //             >
// //               View QR Code
// //             </Button>
// //           ) : (
// //             <Button
// //               variant="default"
// //               onClick={() => handleRegister(event)}
// //               disabled={event?.registeredCount >= event?.capacity}
// //               className="flex-1"
// //               iconName="UserPlus"
// //               iconPosition="left"
// //             >
// //               {event?.registeredCount >= event?.capacity
// //                 ? "Event Full"
// //                 : "Register"}
// //             </Button>
// //           )}
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="text-muted-foreground hover:text-foreground"
// //           >
// //             <Icon name="Heart" size={18} />
// //           </Button>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default EventCard;
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Icon from "../../../../AppIcon";
// import Image from "../../../../AppImage";
// import Button from "../../../../ui/Button";

// const EventCard = ({ event, onRegister, onViewQR, isRegistered = false }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   const formatTime = (timeString) =>
//     new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//   const getModeIcon = (mode) => {
//     switch (mode?.toLowerCase()) {
//       case "online":
//         return "Monitor";
//       case "offline":
//         return "MapPin";
//       case "hybrid":
//         return "Globe";
//       default:
//         return "Calendar";
//     }
//   };

//   const getModeColor = (mode) => {
//     switch (mode?.toLowerCase()) {
//       case "online":
//         return "text-blue-600 bg-blue-50";
//       case "offline":
//         return "text-green-600 bg-green-50";
//       case "hybrid":
//         return "text-purple-600 bg-purple-50";
//       default:
//         return "text-gray-600 bg-gray-50";
//     }
//   };

//   const handleRegister = () => {
//     if (window.confirm(`Register for "${event.title}"?`)) onRegister(event);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//     >
//       {/* Banner */}
//       <div className="relative h-48 overflow-hidden">
//         <Image
//           src={event?.banner}
//           alt={event?.title}
//           className="w-full h-full object-cover transition-transform duration-300"
//           style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
//         />
//         <div className="absolute top-4 right-4">
//           <span
//             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModeColor(
//               event?.mode
//             )}`}
//           >
//             <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />{" "}
//             {event?.mode}
//           </span>
//         </div>
//         {isRegistered && (
//           <div className="absolute top-4 left-4">
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
//               <Icon name="CheckCircle" size={12} className="mr-1" /> Registered
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
//             {event?.title}
//           </h3>
//           <div className="ml-2 flex items-center text-muted-foreground">
//             <Icon name="Users" size={16} className="mr-1" />{" "}
//             <span className="text-sm">
//               {event?.registeredCount}/{event?.capacity}
//             </span>
//           </div>
//         </div>
//         <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
//           {event?.description}
//         </p>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-center text-sm text-muted-foreground">
//             <Icon name="Calendar" size={16} className="mr-2" />
//             <span>{formatDate(event?.date)}</span>
//           </div>
//           <div className="flex items-center text-sm text-muted-foreground">
//             <Icon name="Clock" size={16} className="mr-2" />
//             <span>{formatTime(event?.time)}</span>
//           </div>
//           {event?.location && (
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Icon name="MapPin" size={16} className="mr-2" />
//               <span className="line-clamp-1">{event?.location}</span>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-2">
//           {isRegistered ? (
//             <Button
//               variant="outline"
//               onClick={() => onViewQR(event)}
//               className="flex-1"
//               iconName="QrCode"
//               iconPosition="left"
//             >
//               View QR Code
//             </Button>
//           ) : (
//             <Button
//               variant="default"
//               onClick={handleRegister}
//               disabled={event?.registeredCount >= event?.capacity}
//               className="flex-1"
//               iconName="UserPlus"
//               iconPosition="left"
//             >
//               {event?.registeredCount >= event?.capacity
//                 ? "Event Full"
//                 : "Register"}
//             </Button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default EventCard;
import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../../AppIcon";
import Image from "../../../../AppImage";
import Button from "../../../../ui/Button";

const EventCard = ({
  event,
  onRegister,
  onViewDetails,
  onViewQR,
  isRegistered = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (timeString) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const getModeIcon = (mode) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return "Monitor";
      case "offline":
        return "MapPin";
      case "hybrid":
        return "Globe";
      default:
        return "Calendar";
    }
  };

  const getModeColor = (mode) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return "text-blue-600 bg-blue-50";
      case "offline":
        return "text-green-600 bg-green-50";
      case "hybrid":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleRegister = () => {
    if (window.confirm(`Register for "${event.title}"?`)) onRegister(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.banner}
          alt={event?.title}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          onClick={() => onViewDetails(event)}
        />
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModeColor(
              event?.mode
            )}`}
          >
            <Icon name={getModeIcon(event?.mode)} size={12} className="mr-1" />{" "}
            {event?.mode}
          </span>
        </div>
        {isRegistered && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
              <Icon name="CheckCircle" size={12} className="mr-1" /> Registered
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {event?.title}
          </h3>
          <div className="ml-2 flex items-center text-muted-foreground">
            <Icon name="Users" size={16} className="mr-1" />{" "}
            <span className="text-sm">
              {event?.registeredCount}/{event?.capacity}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {event?.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} className="mr-2" />
            <span>{formatDate(event?.date)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Clock" size={16} className="mr-2" />
            <span>{formatTime(event?.time)}</span>
          </div>
          {event?.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} className="mr-2" />
              <span className="line-clamp-1">{event?.location}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isRegistered ? (
            <Button
              variant="outline"
              onClick={() => onViewQR(event)}
              className="flex-1"
              iconName="QrCode"
              iconPosition="left"
            >
              View QR Code
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleRegister}
              disabled={event?.registeredCount >= event?.capacity}
              className="flex-1"
              iconName="UserPlus"
              iconPosition="left"
            >
              {event?.registeredCount >= event?.capacity
                ? "Event Full"
                : "Register"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
