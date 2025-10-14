// // // import React from "react";
// // // import { motion } from "framer-motion";
// // // import Button from "../../../../ui/Button";
// // // import Icon from "../../../../AppIcon";
// // // import Image from "../../../../AppImage";

// // // const EventDetailModal = ({ isOpen, onClose, event }) => {
// // //   if (!isOpen || !event) return null;

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// // //       <motion.div
// // //         initial={{ scale: 0.9, opacity: 0 }}
// // //         animate={{ scale: 1, opacity: 1 }}
// // //         className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-lg"
// // //       >
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center p-4 border-b border-border">
// // //           <h2 className="text-xl font-semibold">{event.title}</h2>
// // //           <Button variant="ghost" size="icon" onClick={onClose}>
// // //             <Icon name="X" size={20} />
// // //           </Button>
// // //         </div>

// // //         {/* Banner */}
// // //         {event.banner && (
// // //           <Image
// // //             src={event.banner}
// // //             alt={event.title}
// // //             className="w-full h-64 object-cover"
// // //           />
// // //         )}

// // //         {/* Content */}
// // //         <div className="p-6 space-y-4">
// // //           <p>{event.description}</p>
// // //           <div className="grid grid-cols-2 gap-4">
// // //             <div>
// // //               <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
// // //             </div>
// // //             <div>
// // //               <strong>Time:</strong> {event.time}
// // //             </div>
// // //             {event.location && (
// // //               <div>
// // //                 <strong>Location:</strong> {event.location}
// // //               </div>
// // //             )}
// // //             <div>
// // //               <strong>Mode:</strong> {event.mode}
// // //             </div>
// // //             <div>
// // //               <strong>Capacity:</strong> {event.capacity}
// // //             </div>
// // //             <div>
// // //               <strong>Status:</strong> {event.status}
// // //             </div>
// // //           </div>

// // //           <div className="flex justify-end gap-2">
// // //             <Button variant="outline" onClick={onClose}>
// // //               Close
// // //             </Button>
// // //             <Button variant="default">
// // //               {event.isRegistered ? "View Registration" : "Register"}
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default EventDetailModal;
// // import React from "react";

// // const EventDetailModal = ({ isOpen, onClose, event }) => {
// //   if (!isOpen || !event) return null;
// // console.log(event);
// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-3 right-3 text-gray-600 hover:text-black"
// //         >
// //           ✕
// //         </button>

// //         <img
// //           src={event.banner}
// //           alt={event.title}
// //           className="w-full h-64 object-cover rounded-lg mb-4"
// //         />
// //         <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
// //         <p className="text-sm text-gray-500 mb-4">
// //           {event.category} • {event.mode}
// //         </p>
// //         <p className="mb-4 text-gray-700">{event.description}</p>
// //         <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// //           <span>📅 {new Date(event.date).toLocaleDateString()}</span>
// //           <span>⏰ {event.time}</span>
// //           <span>📍 {event.location}</span>
// //           <span>👥 {event.maxParticipants} Participants</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EventDetailModal;
// import React from "react";

// const EventDetailModal = ({ isOpen, onClose, event, onRegister, onViewQR }) => {
//   if (!isOpen || !event) return null;

//   const {
//     title,
//     description,
//     banner,
//     mode,
//     location,
//     date,
//     time,
//     capacity,
//     registeredCount,
//     organizer,
//     tags,
//     isRegistered,
//   } = event;
// console.log(event);
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
//       <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-6 md:p-8 relative transform transition-transform scale-100 md:scale-100">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
//         >
//           ✕
//         </button>

//         {/* Event Banner */}
//         <img
//           src={banner}
//           alt={title}
//           className="w-full h-64 md:h-80 object-cover rounded-sm mb-6"
//         />

//         {/* Event Title & Info */}
//         <h2 className="text-3xl font-bold mb-2 text-gray-900">{title}</h2>
//         <p className="text-sm text-gray-500 mb-4">
//           {tags?.join(", ")} • {mode}
//         </p>

//         {/* Description */}
//         <p className="mb-6 text-gray-700 leading-relaxed">{description}</p>

//         {/* Event Details */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-gray-600 text-sm">
//           <span className="flex items-center gap-1">
//             📅 {new Date(date).toLocaleDateString()}
//           </span>
//           <span className="flex items-center gap-1">⏰ {time}</span>
//           <span className="flex items-center gap-1">📍 {location}</span>
//           <span className="flex items-center gap-1">
//             👥 {registeredCount}/{capacity}
//           </span>
//         </div>

//         {/* Organizer */}
//         {organizer && (
//           <div className="flex items-center gap-3 mb-6">
//             <img
//               src={organizer.avatar}
//               alt={organizer.name}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div>
//               <p className="text-gray-800 font-medium">{organizer.name}</p>
//               <p className="text-gray-500 text-sm">{organizer.email}</p>
//             </div>
//           </div>
//         )}

//         {/* Action Button */}
//         {isRegistered ? (
//           <button
//             onClick={() => onViewQR(event)}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
//           >
//             View QR
//           </button>
//         ) : (
//           <button
//             onClick={() => onRegister(event)}
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
//           >
//             Register
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventDetailModal;
import React, { useState } from "react";
import QRCodeModal from "./QRCodeModal"; // import the QR code modal

const EventDetailModal = ({ isOpen, onClose, event, onRegister }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  if (!isOpen || !event) return null;

  const {
    title,
    description,
    banner,
    mode,
    location,
    date,
    time,
    capacity,
    registeredCount,
    organizer,
    tags,
    isRegistered,
    userRegistrationId,
  } = event;

  const handleViewQR = () => {
    setIsQRModalOpen(true);
  };

  return (
    <>
      {/* Event Detail Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Event Banner */}
          <img
            src={banner}
            alt={title}
            className="w-full h-64 md:h-80 object-cover rounded-xl mb-6"
          />

          {/* Event Title & Info */}
          <h2 className="text-3xl font-bold mb-2 text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {tags?.join(", ")} • {mode}
          </p>

          {/* Description */}
          <p className="mb-6 text-gray-700 leading-relaxed">{description}</p>

          {/* Event Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-gray-600 text-sm">
            <span>📅 {new Date(date).toLocaleDateString()}</span>
            <span>⏰ {time}</span>
            <span>📍 {location}</span>
            <span>
              👥 {registeredCount}/{capacity}
            </span>
          </div>

          {/* Organizer */}
          {organizer && (
            <div className="flex items-center gap-3 mb-6">
              <img
                src={organizer.avatar}
                alt={organizer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800 font-medium">{organizer.name}</p>
                <p className="text-gray-500 text-sm">{organizer.email}</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          {isRegistered ? (
            <button
              onClick={handleViewQR}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              View QR
            </button>
          ) : (
            <button
              onClick={() => onRegister(event)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Register
            </button>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        event={{
          ...event,
          registrationId: userRegistrationId, // pass registrationId to QR modal
        }}
      />
    </>
  );
};

export default EventDetailModal;
