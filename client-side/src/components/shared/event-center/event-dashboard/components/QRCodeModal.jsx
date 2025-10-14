// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // //import QRCode from "qrcode.react";
// // import QRCode from "react-qr-code"; 
// // import Icon from "../../../../AppIcon";
// // import Button from "../../../../ui/Button";

// // const QRCodeModal = ({ isOpen, onClose, event }) => {
// //   const [qrValue, setQrValue] = useState("");
// //   const [isDownloading, setIsDownloading] = useState(false);

// //   useEffect(() => {
// //     if (event) {
// //       // Generate QR code value with event registration data
// //       const registrationData = {
// //         eventId: event?.id,
// //         eventTitle: event?.title,
// //         userId: "user123", // This would come from auth context
// //         registrationId: `reg_${event?.id}_${Date.now()}`,
// //         timestamp: new Date()?.toISOString(),
// //       };
// //       setQrValue(JSON.stringify(registrationData));
// //     }
// //   }, [event]);

// //   const handleDownloadQR = async () => {
// //     setIsDownloading(true);
// //     try {
// //       const canvas = document.getElementById("qr-code-canvas");
// //       const url = canvas?.toDataURL("image/png");
// //       const link = document.createElement("a");
// //       link.download = `${event?.title?.replace(/\s+/g, "_")}_QR.png`;
// //       link.href = url;
// //       document.body?.appendChild(link);
// //       link?.click();
// //       document.body?.removeChild(link);
// //     } catch (error) {
// //       console.error("Error downloading QR code:", error);
// //     } finally {
// //       setIsDownloading(false);
// //     }
// //   };

// //   const handleShareQR = async () => {
// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: `QR Code for ${event?.title}`,
// //           text: `My registration QR code for ${event?.title}`,
// //           url: window.location?.href,
// //         });
// //       } catch (error) {
// //         console.error("Error sharing:", error);
// //       }
// //     } else {
// //       // Fallback: copy to clipboard
// //       navigator.clipboard?.writeText(qrValue);
// //       // You could show a toast notification here
// //     }
// //   };

// //   const handleBackdropClick = (e) => {
// //     if (e?.target === e?.currentTarget) {
// //       onClose();
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date?.toLocaleDateString("en-US", {
// //       weekday: "long",
// //       year: "numeric",
// //       month: "long",
// //       day: "numeric",
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

// //   if (!isOpen || !event) return null;

// //   return (
// //     <div
// //       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in"
// //       onClick={handleBackdropClick}
// //     >
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.95 }}
// //         transition={{ duration: 0.2 }}
// //         className="relative w-full max-w-md mx-4 bg-card rounded-xl shadow-xl overflow-hidden"
// //       >
// //         {/* Modal Header */}
// //         <div className="flex items-center justify-between p-6 border-b border-border">
// //           <h2 className="text-xl font-semibold text-foreground flex items-center">
// //             <Icon name="QrCode" size={24} className="mr-2" />
// //             Event QR Code
// //           </h2>
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             onClick={onClose}
// //             className="text-muted-foreground hover:text-foreground"
// //           >
// //             <Icon name="X" size={20} />
// //           </Button>
// //         </div>

// //         {/* Modal Content */}
// //         <div className="p-6 text-center">
// //           {/* Event Info */}
// //           <div className="mb-6">
// //             <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
// //               {event?.title}
// //             </h3>
// //             <div className="space-y-1 text-sm text-muted-foreground">
// //               <div className="flex items-center justify-center">
// //                 <Icon name="Calendar" size={16} className="mr-2" />
// //                 <span>{formatDate(event?.date)}</span>
// //               </div>
// //               <div className="flex items-center justify-center">
// //                 <Icon name="Clock" size={16} className="mr-2" />
// //                 <span>{formatTime(event?.time)}</span>
// //               </div>
// //               {event?.location && (
// //                 <div className="flex items-center justify-center">
// //                   <Icon name="MapPin" size={16} className="mr-2" />
// //                   <span className="line-clamp-1">{event?.location}</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* QR Code */}
// //           <div className="flex justify-center mb-6">
// //             <div className="p-4 bg-white rounded-lg shadow-sm">
// //               <QRCode
// //                 id="qr-code-canvas"
// //                 value={qrValue}
// //                 size={200}
// //                 level="M"
// //                 includeMargin={true}
// //                 renderAs="canvas"
// //               />
// //             </div>
// //           </div>

// //           {/* Instructions */}
// //           <div className="mb-6 p-4 bg-muted rounded-lg">
// //             <div className="flex items-start text-left">
// //               <Icon
// //                 name="Info"
// //                 size={16}
// //                 className="mr-2 mt-0.5 text-primary flex-shrink-0"
// //               />
// //               <div className="text-sm text-muted-foreground">
// //                 <p className="font-medium text-foreground mb-1">
// //                   How to use this QR code:
// //                 </p>
// //                 <ul className="space-y-1 text-xs">
// //                   <li>• Show this QR code at the event entrance</li>
// //                   <li>• Event staff will scan it to mark your attendance</li>
// //                   <li>• Keep this code accessible on your device</li>
// //                   <li>• Download for offline access if needed</li>
// //                 </ul>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Registration Status */}
// //           <div className="mb-6">
// //             <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-green-600 bg-green-50">
// //               <Icon name="CheckCircle" size={16} className="mr-2" />
// //               Successfully Registered
// //             </div>
// //           </div>
// //         </div>

// //         {/* Modal Footer */}
// //         <div className="flex items-center justify-center gap-3 p-6 border-t border-border">
// //           <Button
// //             variant="outline"
// //             onClick={handleDownloadQR}
// //             loading={isDownloading}
// //             iconName="Download"
// //             iconPosition="left"
// //           >
// //             Download
// //           </Button>
// //           <Button
// //             variant="default"
// //             onClick={handleShareQR}
// //             iconName="Share"
// //             iconPosition="left"
// //           >
// //             Share
// //           </Button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default QRCodeModal;
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import QRCode from "react-qr-code";
// import Icon from "../../../../AppIcon";
// import Button from "../../../../ui/Button";
// import { getQR } from "../../../../../lib/mongo/eventServices";

// const QRCodeModal = ({ isOpen, onClose, event }) => {
//   const [qrValue, setQrValue] = useState("");
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {
//     const fetchQR = async () => {
//       if (event?.registrationId) {
//         try {
//           const res = await getQR(event.registrationId);
//           if (res.success) {
//             setQrValue(JSON.stringify(res.qrData));
//           }
//         } catch (err) {
//           console.error("Error fetching QR:", err);
//         }
//       }
//     };

//     fetchQR();
//   }, [event]);

//   const handleDownloadQR = async () => {
//     setIsDownloading(true);
//     try {
//       const canvas = document.getElementById("qr-code-canvas");
//       const url = canvas?.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.download = `${event?.title?.replace(/\s+/g, "_")}_QR.png`;
//       link.href = url;
//       document.body?.appendChild(link);
//       link?.click();
//       document.body?.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading QR code:", error);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleShareQR = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: `QR Code for ${event?.title}`,
//           text: `My registration QR code for ${event?.title}`,
//           url: window.location?.href,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       navigator.clipboard?.writeText(qrValue);
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e?.target === e?.currentTarget) onClose();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date?.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString) => {
//     const time = new Date(`2000-01-01T${timeString}`);
//     return time?.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   if (!isOpen || !event) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in"
//       onClick={handleBackdropClick}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         transition={{ duration: 0.2 }}
//         className="relative w-full max-w-md mx-4 bg-card rounded-xl shadow-xl overflow-y-auto max-h-[90vh] scrollbar-hide " // <-- updated
//       >
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-6 border-b border-border">
//           <h2 className="text-xl font-semibold text-foreground flex items-center">
//             <Icon name="QrCode" size={24} className="mr-2" />
//             Event QR Code
//           </h2>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onClose}
//             className="text-muted-foreground hover:text-foreground"
//           >
//             <Icon name="X" size={20} />
//           </Button>
//         </div>

//         {/* Modal Content */}
//         <div className="p-6 text-center">
//           {/* Event Info */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
//               {event?.title}
//             </h3>
//             <div className="space-y-1 text-sm text-muted-foreground">
//               <div className="flex items-center justify-center">
//                 <Icon name="Calendar" size={16} className="mr-2" />
//                 <span>{formatDate(event?.date)}</span>
//               </div>
//               <div className="flex items-center justify-center">
//                 <Icon name="Clock" size={16} className="mr-2" />
//                 <span>{formatTime(event?.time)}</span>
//               </div>
//               {event?.location && (
//                 <div className="flex items-center justify-center">
//                   <Icon name="MapPin" size={16} className="mr-2" />
//                   <span className="line-clamp-1">{event?.location}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* QR Code */}
//           <div className="flex justify-center mb-6">
//             <div className="p-4 bg-white rounded-lg shadow-sm">
//               <QRCode
//                 id="qr-code-canvas"
//                 value={qrValue}
//                 size={200}
//                 level="M"
//                 includeMargin={true}
//                 renderAs="canvas"
//               />
//             </div>
//           </div>

//           {/* Instructions */}
//           <div className="mb-6 p-4 bg-muted rounded-lg">
//             <div className="flex items-start text-left">
//               <Icon
//                 name="Info"
//                 size={16}
//                 className="mr-2 mt-0.5 text-primary flex-shrink-0"
//               />
//               <div className="text-sm text-muted-foreground">
//                 <p className="font-medium text-foreground mb-1">
//                   How to use this QR code:
//                 </p>
//                 <ul className="space-y-1 text-xs">
//                   <li>• Show this QR code at the event entrance</li>
//                   <li>• Event staff will scan it to mark your attendance</li>
//                   <li>• Keep this code accessible on your device</li>
//                   <li>• Download for offline access if needed</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Registration Status */}
//           <div className="mb-6">
//             <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-green-600 bg-green-50">
//               <Icon name="CheckCircle" size={16} className="mr-2" />
//               Successfully Registered
//             </div>
//           </div>
//         </div>

//         {/* Modal Footer */}
//         <div className="flex items-center justify-center gap-3 p-6 border-t border-border">
//           <Button
//             variant="outline"
//             onClick={handleDownloadQR}
//             loading={isDownloading}
//             iconName="Download"
//             iconPosition="left"
//           >
//             Download
//           </Button>
//           <Button
//             variant="default"
//             onClick={handleShareQR}
//             iconName="Share"
//             iconPosition="left"
//           >
//             Share
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default QRCodeModal;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";
import { getQR } from "../../../../../lib/mongo/eventServices";

const QRCodeModal = ({ isOpen, onClose, event }) => {
  const [qrValue, setQrValue] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchQR = async () => {
      if (event?.registrationId) {
        try {
          const res = await getQR(event.registrationId);
          if (res.success) {
            setQrValue(JSON.stringify(res.qrData));
          }
        } catch (err) {
          console.error("Error fetching QR:", err);
        }
      }
    };

    fetchQR();
  }, [event]);

  const handleDownloadQR = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.getElementById("qr-code-canvas");
      const url = canvas?.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${event?.title?.replace(/\s+/g, "_")}_QR.png`;
      link.href = url;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Code for ${event?.title}`,
          text: `My registration QR code for ${event?.title}`,
          url: window.location?.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard?.writeText(qrValue);
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md mx-4 bg-card rounded-xl shadow-xl overflow-y-auto max-h-[90vh] scrollbar-hide"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Icon name="QrCode" size={24} className="mr-2" />
            Event QR Code
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 text-center">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
              {event?.title}
            </h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Icon name="Calendar" size={16} className="mr-2" />
                <span>{formatDate(event?.date)}</span>
              </div>
              <div className="flex items-center justify-center">
                <Icon name="Clock" size={16} className="mr-2" />
                <span>{formatTime(event?.time)}</span>
              </div>
              {event?.location && (
                <div className="flex items-center justify-center">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  <span className="line-clamp-1">{event?.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <QRCode
                id="qr-code-canvas"
                value={qrValue}
                size={200}
                level="M"
                includeMargin={true}
                renderAs="canvas"
              />
            </div>
          </div>

          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-start text-left">
              <Icon
                name="Info"
                size={16}
                className="mr-2 mt-0.5 text-primary flex-shrink-0"
              />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  How to use this QR code:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Show this QR code at the event entrance</li>
                  <li>• Event staff will scan it to mark your attendance</li>
                  <li>• Keep this code accessible on your device</li>
                  <li>• Download for offline access if needed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-green-600 bg-green-50">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Successfully Registered
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleDownloadQR}
            loading={isDownloading}
            iconName="Download"
            iconPosition="left"
          >
            Download
          </Button>
          <Button
            variant="default"
            onClick={handleShareQR}
            iconName="Share"
            iconPosition="left"
          >
            Share
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default QRCodeModal;
