// // // import React, { useState, useRef, useEffect } from "react";
// // // import Icon from "../../../../AppIcon";
// // // import Button from "../../../../ui/Button";

// // // const QRScanner = ({ onScanSuccess = () => {}, onScanError = () => {} }) => {
// // //   const [isScanning, setIsScanning] = useState(false);
// // //   const [hasPermission, setHasPermission] = useState(null);
// // //   const [error, setError] = useState("");
// // //   const [scanResult, setScanResult] = useState(null);
// // //   const [recentScans, setRecentScans] = useState([]);
// // //   const videoRef = useRef(null);
// // //   const streamRef = useRef(null);

// // //   // Mock QR scanner functionality since react-qr-reader requires camera access
// // //   const mockQRCodes = [
// // //     {
// // //       id: "qr_001",
// // //       participantId: "p_001",
// // //       participantName: "John Smith",
// // //       eventId: "evt_001",
// // //     },
// // //     {
// // //       id: "qr_002",
// // //       participantId: "p_002",
// // //       participantName: "Sarah Johnson",
// // //       eventId: "evt_001",
// // //     },
// // //     {
// // //       id: "qr_003",
// // //       participantId: "p_003",
// // //       participantName: "Mike Davis",
// // //       eventId: "evt_001",
// // //     },
// // //     {
// // //       id: "qr_004",
// // //       participantId: "p_004",
// // //       participantName: "Emily Brown",
// // //       eventId: "evt_001",
// // //     },
// // //     {
// // //       id: "qr_005",
// // //       participantId: "p_005",
// // //       participantName: "David Wilson",
// // //       eventId: "evt_001",
// // //     },
// // //   ];

// // //   useEffect(() => {
// // //     return () => {
// // //       stopScanning();
// // //     };
// // //   }, []);

// // //   const requestCameraPermission = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices?.getUserMedia({
// // //         video: {
// // //           facingMode: "environment",
// // //           width: { ideal: 1280 },
// // //           height: { ideal: 720 },
// // //         },
// // //       });
// // //       setHasPermission(true);
// // //       setError("");
// // //       return stream;
// // //     } catch (err) {
// // //       setHasPermission(false);
// // //       setError(
// // //         "Camera access denied. Please allow camera permissions to scan QR codes."
// // //       );
// // //       return null;
// // //     }
// // //   };

// // //   const startScanning = async () => {
// // //     const stream = await requestCameraPermission();
// // //     if (stream && videoRef?.current) {
// // //       streamRef.current = stream;
// // //       videoRef.current.srcObject = stream;
// // //       setIsScanning(true);
// // //       setError("");

// // //       // Simulate QR code detection after 3 seconds
// // //       setTimeout(() => {
// // //         if (isScanning) {
// // //           simulateQRDetection();
// // //         }
// // //       }, 3000);
// // //     }
// // //   };

// // //   const stopScanning = () => {
// // //     if (streamRef?.current) {
// // //       streamRef?.current?.getTracks()?.forEach((track) => track?.stop());
// // //       streamRef.current = null;
// // //     }
// // //     if (videoRef?.current) {
// // //       videoRef.current.srcObject = null;
// // //     }
// // //     setIsScanning(false);
// // //   };

// // //   const simulateQRDetection = () => {
// // //     // Randomly select a mock QR code
// // //     const randomQR =
// // //       mockQRCodes?.[Math.floor(Math.random() * mockQRCodes?.length)];

// // //     // Check if this participant was already scanned recently
// // //     const alreadyScanned = recentScans?.some(
// // //       (scan) => scan?.participantId === randomQR?.participantId
// // //     );

// // //     if (alreadyScanned) {
// // //       setError(`${randomQR?.participantName} has already been checked in.`);
// // //       onScanError(
// // //         `Participant ${randomQR?.participantName} already checked in`
// // //       );
// // //     } else {
// // //       const scanData = {
// // //         ...randomQR,
// // //         timestamp: new Date()?.toISOString(),
// // //         status: "success",
// // //       };

// // //       setScanResult(scanData);
// // //       setRecentScans((prev) => [scanData, ...prev?.slice(0, 9)]); // Keep last 10 scans
// // //       onScanSuccess(scanData);

// // //       // Clear result after 3 seconds
// // //       setTimeout(() => {
// // //         setScanResult(null);
// // //       }, 3000);
// // //     }

// // //     stopScanning();
// // //   };

// // //   const handleManualEntry = () => {
// // //     // Simulate manual QR code entry
// // //     const randomQR =
// // //       mockQRCodes?.[Math.floor(Math.random() * mockQRCodes?.length)];
// // //     const scanData = {
// // //       ...randomQR,
// // //       timestamp: new Date()?.toISOString(),
// // //       status: "manual",
// // //     };

// // //     setScanResult(scanData);
// // //     setRecentScans((prev) => [scanData, ...prev?.slice(0, 9)]);
// // //     onScanSuccess(scanData);

// // //     setTimeout(() => {
// // //       setScanResult(null);
// // //     }, 3000);
// // //   };

// // //   const clearRecentScans = () => {
// // //     setRecentScans([]);
// // //   };

// // //   return (
// // //     <div className="bg-card rounded-xl border border-border p-6">
// // //       <div className="flex items-center space-x-3 mb-6">
// // //         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
// // //           <Icon name="QrCode" size={20} className="text-primary" />
// // //         </div>
// // //         <h3 className="text-lg font-semibold text-foreground">
// // //           QR Code Scanner
// // //         </h3>
// // //       </div>
// // //       {/* Scanner Interface */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         {/* Camera View */}
// // //         <div className="space-y-4">
// // //           <div
// // //             className="relative bg-muted rounded-xl overflow-hidden"
// // //             style={{ aspectRatio: "4/3" }}
// // //           >
// // //             {isScanning ? (
// // //               <div className="relative w-full h-full">
// // //                 <video
// // //                   ref={videoRef}
// // //                   autoPlay
// // //                   playsInline
// // //                   muted
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //                 <div className="absolute inset-0 flex items-center justify-center">
// // //                   <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
// // //                     <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
// // //                     <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
// // //                     <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
// // //                     <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
// // //                   </div>
// // //                 </div>
// // //                 <div className="absolute bottom-4 left-4 right-4 text-center">
// // //                   <p className="text-white text-sm bg-black/50 rounded px-3 py-1">
// // //                     Position QR code within the frame
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="w-full h-full flex items-center justify-center">
// // //                 <div className="text-center">
// // //                   <Icon
// // //                     name="QrCode"
// // //                     size={64}
// // //                     className="mx-auto text-muted-foreground mb-4"
// // //                   />
// // //                   <h4 className="text-lg font-medium text-foreground mb-2">
// // //                     Ready to Scan
// // //                   </h4>
// // //                   <p className="text-sm text-muted-foreground">
// // //                     Click start to begin scanning QR codes
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Scanner Controls */}
// // //           <div className="flex flex-col sm:flex-row gap-3">
// // //             {!isScanning ? (
// // //               <Button onClick={startScanning} className="flex-1">
// // //                 <Icon name="Camera" size={16} className="mr-2" />
// // //                 Start Scanning
// // //               </Button>
// // //             ) : (
// // //               <Button
// // //                 variant="destructive"
// // //                 onClick={stopScanning}
// // //                 className="flex-1"
// // //               >
// // //                 <Icon name="Square" size={16} className="mr-2" />
// // //                 Stop Scanning
// // //               </Button>
// // //             )}
// // //             <Button variant="outline" onClick={handleManualEntry}>
// // //               <Icon name="Edit" size={16} className="mr-2" />
// // //               Manual Entry
// // //             </Button>
// // //           </div>

// // //           {/* Error Display */}
// // //           {error && (
// // //             <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
// // //               <div className="flex items-center space-x-2">
// // //                 <Icon
// // //                   name="AlertCircle"
// // //                   size={16}
// // //                   className="text-destructive"
// // //                 />
// // //                 <span className="text-sm text-destructive font-medium">
// // //                   Error
// // //                 </span>
// // //               </div>
// // //               <p className="text-sm text-destructive mt-1">{error}</p>
// // //             </div>
// // //           )}

// // //           {/* Success Display */}
// // //           {scanResult && (
// // //             <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
// // //               <div className="flex items-center space-x-2 mb-2">
// // //                 <Icon name="CheckCircle" size={16} className="text-success" />
// // //                 <span className="text-sm text-success font-medium">
// // //                   Scan Successful
// // //                 </span>
// // //               </div>
// // //               <p className="text-sm text-foreground">
// // //                 <strong>{scanResult?.participantName}</strong> has been checked
// // //                 in
// // //               </p>
// // //               <p className="text-xs text-muted-foreground mt-1">
// // //                 {scanResult?.status === "manual"
// // //                   ? "Manual entry"
// // //                   : "QR code scanned"}{" "}
// // //                 at {new Date(scanResult.timestamp)?.toLocaleTimeString()}
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Recent Scans */}
// // //         <div className="space-y-4">
// // //           <div className="flex items-center justify-between">
// // //             <h4 className="text-lg font-medium text-foreground">
// // //               Recent Check-ins
// // //             </h4>
// // //             {recentScans?.length > 0 && (
// // //               <Button variant="ghost" size="sm" onClick={clearRecentScans}>
// // //                 <Icon name="Trash2" size={16} className="mr-2" />
// // //                 Clear
// // //               </Button>
// // //             )}
// // //           </div>

// // //           <div className="space-y-3 max-h-96 overflow-y-auto">
// // //             {recentScans?.length > 0 ? (
// // //               recentScans?.map((scan, index) => (
// // //                 <div
// // //                   key={index}
// // //                   className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
// // //                 >
// // //                   <div className="flex items-center space-x-3">
// // //                     <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
// // //                       <Icon
// // //                         name="CheckCircle"
// // //                         size={16}
// // //                         className="text-success"
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm font-medium text-foreground">
// // //                         {scan?.participantName}
// // //                       </p>
// // //                       <p className="text-xs text-muted-foreground">
// // //                         {new Date(scan.timestamp)?.toLocaleTimeString()} •{" "}
// // //                         {scan?.status === "manual" ? "Manual" : "QR Scan"}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <Icon
// // //                     name="User"
// // //                     size={16}
// // //                     className="text-muted-foreground"
// // //                   />
// // //                 </div>
// // //               ))
// // //             ) : (
// // //               <div className="text-center py-8">
// // //                 <Icon
// // //                   name="Scan"
// // //                   size={48}
// // //                   className="mx-auto text-muted-foreground mb-4"
// // //                 />
// // //                 <h4 className="text-lg font-medium text-foreground mb-2">
// // //                   No check-ins yet
// // //                 </h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Scanned participants will appear here
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //       {/* Scanner Instructions */}
// // //       <div className="mt-6 p-4 bg-muted/30 rounded-lg">
// // //         <h5 className="text-sm font-medium text-foreground mb-2">
// // //           Scanner Instructions
// // //         </h5>
// // //         <ul className="text-xs text-muted-foreground space-y-1">
// // //           <li>• Ensure good lighting for optimal scanning</li>
// // //           <li>• Hold the QR code steady within the frame</li>
// // //           <li>• The scanner will automatically detect and process QR codes</li>
// // //           <li>• Use manual entry if the QR code cannot be scanned</li>
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default QRScanner;
// // import React, { useEffect, useRef, useState } from "react";
// // import { BrowserQRCodeReader } from "@zxing/library";
// // import Icon from "../../../../AppIcon";
// // import Button from "../../../../ui/Button";

// // const QRScanner = ({ onScanSuccess = () => {}, onScanError = () => {} }) => {
// //   const videoRef = useRef(null);
// //   const codeReaderRef = useRef(null);
// //   const [isScanning, setIsScanning] = useState(false);
// //   const [scanResult, setScanResult] = useState(null);
// //   const [error, setError] = useState("");
// //   const [recentScans, setRecentScans] = useState([]);

// //   const startScanning = async () => {
// //     setError("");
// //     setIsScanning(true);

// //     codeReaderRef.current = new BrowserQRCodeReader();
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { facingMode: "environment" },
// //       });

// //       if (videoRef.current) videoRef.current.srcObject = stream;

// //       codeReaderRef.current.decodeFromVideoDevice(
// //         null,
// //         videoRef.current,
// //         (result, err) => {
// //           if (result) {
// //             const participantId = result.getText();
// //             const alreadyScanned = recentScans.some(
// //               (scan) => scan.participantId === participantId
// //             );
// //             if (alreadyScanned) {
// //               setError("Participant already scanned");
// //               onScanError(participantId);
// //             } else {
// //               const scanData = {
// //                 participantId,
// //                 participantName: participantId, // Replace if you have names
// //                 timestamp: new Date().toISOString(),
// //               };
// //               setScanResult(scanData);
// //               setRecentScans((prev) => [scanData, ...prev.slice(0, 9)]);
// //               onScanSuccess(scanData);
// //             }
// //           }
// //           if (err && !(err instanceof DOMException)) {
// //             console.error(err);
// //           }
// //         }
// //       );
// //     } catch (err) {
// //       setError("Camera access denied or not available");
// //       console.error(err);
// //       setIsScanning(false);
// //     }
// //   };

// //   const stopScanning = () => {
// //     if (codeReaderRef.current) {
// //       codeReaderRef.current.reset();
// //     }
// //     if (videoRef.current?.srcObject) {
// //       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
// //       videoRef.current.srcObject = null;
// //     }
// //     setIsScanning(false);
// //   };

// //   const clearRecentScans = () => setRecentScans([]);

// //   return (
// //     <div className="bg-card rounded-xl border border-border p-6">
// //       <div className="flex items-center space-x-3 mb-6">
// //         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
// //           <Icon name="QrCode" size={20} className="text-primary" />
// //         </div>
// //         <h3 className="text-lg font-semibold text-foreground">
// //           QR Code Scanner
// //         </h3>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Video */}
// //         <div className="space-y-4">
// //           <div
// //             className="relative bg-muted rounded-xl overflow-hidden"
// //             style={{ aspectRatio: "4/3" }}
// //           >
// //             <video
// //               ref={videoRef}
// //               className="w-full h-full object-cover"
// //               autoPlay
// //               muted
// //               playsInline
// //             />
// //             {!isScanning && (
// //               <div className="absolute inset-0 flex flex-col items-center justify-center">
// //                 <Icon
// //                   name="QrCode"
// //                   size={64}
// //                   className="text-muted-foreground mb-4"
// //                 />
// //                 <p className="text-sm text-muted-foreground">
// //                   Click start to scan QR codes
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex gap-3">
// //             {!isScanning ? (
// //               <Button onClick={startScanning} className="flex-1">
// //                 <Icon name="Camera" size={16} className="mr-2" />
// //                 Start Scanning
// //               </Button>
// //             ) : (
// //               <Button
// //                 variant="destructive"
// //                 onClick={stopScanning}
// //                 className="flex-1"
// //               >
// //                 <Icon name="Square" size={16} className="mr-2" />
// //                 Stop Scanning
// //               </Button>
// //             )}
// //           </div>

// //           {error && (
// //             <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
// //               <p className="text-sm text-destructive">{error}</p>
// //             </div>
// //           )}

// //           {scanResult && (
// //             <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
// //               <p>
// //                 <strong>{scanResult.participantName}</strong> checked in at{" "}
// //                 {new Date(scanResult.timestamp).toLocaleTimeString()}
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Recent Scans */}
// //         <div className="space-y-4">
// //           <div className="flex justify-between items-center">
// //             <h4 className="text-lg font-medium text-foreground">
// //               Recent Check-ins
// //             </h4>
// //             {recentScans.length > 0 && (
// //               <Button variant="ghost" size="sm" onClick={clearRecentScans}>
// //                 Clear
// //               </Button>
// //             )}
// //           </div>
// //           <div className="space-y-3 max-h-96 overflow-y-auto">
// //             {recentScans.length === 0 && (
// //               <p className="text-sm text-muted-foreground">No check-ins yet</p>
// //             )}
// //             {recentScans.map((scan, i) => (
// //               <div
// //                 key={i}
// //                 className="flex justify-between p-3 bg-muted/30 rounded-lg"
// //               >
// //                 <p>{scan.participantName}</p>
// //                 <p className="text-xs text-muted-foreground">
// //                   {new Date(scan.timestamp).toLocaleTimeString()}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default QRScanner;

// import React, { useRef, useState } from "react";
// import { BrowserQRCodeReader } from "@zxing/library";
// import Icon from "../../../../AppIcon";
// import Button from "../../../../ui/Button";

// const QRScanner = ({ onScanSuccess = () => {}, onScanError = () => {} }) => {
//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [scanResult, setScanResult] = useState(null);
//   const [error, setError] = useState("");
//   const [recentScans, setRecentScans] = useState([]);

//   const startScanning = async () => {
//     setError("");
//     setIsScanning(true);

//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       setError(
//         "Camera not supported. Use a modern browser with HTTPS or upload an image."
//       );
//       setIsScanning(false);
//       return;
//     }

//     codeReaderRef.current = new BrowserQRCodeReader();
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });

//       if (videoRef.current) videoRef.current.srcObject = stream;

//       codeReaderRef.current.decodeFromVideoDevice(
//         null,
//         videoRef.current,
//         (result, err) => {
//           if (result) handleQRCode(result.getText());
//           if (err && !(err instanceof DOMException)) console.error(err);
//         }
//       );
//     } catch (err) {
//       setError("Camera access denied or not available");
//       console.error(err);
//       setIsScanning(false);
//     }
//   };

//   const stopScanning = () => {
//     if (codeReaderRef.current) codeReaderRef.current.reset();
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsScanning(false);
//   };

//   const handleQRCode = (qrCode) => {
//     const alreadyScanned = recentScans.some((scan) => scan.qrCode === qrCode);

//     if (alreadyScanned) {
//       setError("Participant already scanned");
//       onScanError(qrCode);
//       return;
//     }

//     const scanData = {
//       qrCode,
//       participantName: qrCode, // You can replace with real name from backend
//       timestamp: new Date().toISOString(),
//     };
//     setScanResult(scanData);
//     setRecentScans((prev) => [scanData, ...prev.slice(0, 9)]);
//     onScanSuccess(scanData);
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       const codeReader = new BrowserQRCodeReader();
//       const result = await codeReader.decodeFromImage(file);
//       handleQRCode(result.getText());
//     } catch (err) {
//       console.error(err);
//       setError("Failed to read QR code from image");
//       onScanError(err);
//     }
//   };

//   const clearRecentScans = () => setRecentScans([]);

//   return (
//     <div className="bg-card rounded-xl border border-border p-6">
//       <div className="flex items-center space-x-3 mb-6">
//         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//           <Icon name="QrCode" size={20} className="text-primary" />
//         </div>
//         <h3 className="text-lg font-semibold text-foreground">
//           QR Code Scanner
//         </h3>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Video Scanner */}
//         <div className="space-y-4">
//           <div
//             className="relative bg-muted rounded-xl overflow-hidden"
//             style={{ aspectRatio: "4/3" }}
//           >
//             <video
//               ref={videoRef}
//               className="w-full h-full object-cover"
//               autoPlay
//               muted
//               playsInline
//             />
//             {!isScanning && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <Icon
//                   name="QrCode"
//                   size={64}
//                   className="text-muted-foreground mb-4"
//                 />
//                 <p className="text-sm text-muted-foreground">
//                   Click start to scan QR codes
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="flex gap-3">
//             {!isScanning ? (
//               <Button onClick={startScanning} className="flex-1">
//                 <Icon name="Camera" size={16} className="mr-2" />
//                 Start Scanning
//               </Button>
//             ) : (
//               <Button
//                 variant="destructive"
//                 onClick={stopScanning}
//                 className="flex-1"
//               >
//                 <Icon name="Square" size={16} className="mr-2" />
//                 Stop Scanning
//               </Button>
//             )}
//           </div>

//           <div className="flex gap-3">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className="flex-1"
//             />
//           </div>

//           {error && (
//             <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
//               <p className="text-sm text-destructive">{error}</p>
//             </div>
//           )}

//           {scanResult && (
//             <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
//               <p>
//                 <strong>{scanResult.participantName}</strong> checked in at{" "}
//                 {new Date(scanResult.timestamp).toLocaleTimeString()}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Recent Scans */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h4 className="text-lg font-medium text-foreground">
//               Recent Check-ins
//             </h4>
//             {recentScans.length > 0 && (
//               <Button variant="ghost" size="sm" onClick={clearRecentScans}>
//                 Clear
//               </Button>
//             )}
//           </div>
//           <div className="space-y-3 max-h-96 overflow-y-auto">
//             {recentScans.length === 0 && (
//               <p className="text-sm text-muted-foreground">No check-ins yet</p>
//             )}
//             {recentScans.map((scan, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between p-3 bg-muted/30 rounded-lg"
//               >
//                 <p>{scan.participantName}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {new Date(scan.timestamp).toLocaleTimeString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QRScanner;
import React, { useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";

const QRScanner = ({ onScanSuccess = () => {}, onScanError = () => {} }) => {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const [recentScans, setRecentScans] = useState([]);

  // Start scanning
  const startScanning = async () => {
    setError("");
    setIsScanning(true);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera not supported. Use HTTPS-enabled modern browser.");
      setIsScanning(false);
      return;
    }

    codeReaderRef.current = new BrowserQRCodeReader();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) videoRef.current.srcObject = stream;

      codeReaderRef.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) handleQRCode(result.getText());
          if (err && !(err instanceof DOMException)) console.error(err);
        }
      );
    } catch (err) {
      setError("Camera access denied or unavailable");
      console.error(err);
      setIsScanning(false);
    }
  };

  // Stop scanning
  const stopScanning = () => {
    if (codeReaderRef.current) codeReaderRef.current.reset();
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Handle QR code detection
  const handleQRCode = (qrCode) => {
    if (recentScans.some((scan) => scan.qrCode === qrCode)) {
      setError("Participant already scanned");
      onScanError(qrCode);
      return;
    }

    const scanData = {
      qrCode,
      participantName: qrCode, // replace with actual name from backend if needed
      timestamp: new Date().toISOString(),
    };

    setScanResult(scanData);
    setRecentScans((prev) => [scanData, ...prev.slice(0, 9)]);
    onScanSuccess(scanData);
  };

  // Handle image upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const codeReader = new BrowserQRCodeReader();
      const result = await codeReader.decodeFromImage(file);
      handleQRCode(result.getText());
    } catch (err) {
      console.error(err);
      setError("Failed to read QR code from image");
      onScanError(err);
    }
  };

  const clearRecentScans = () => setRecentScans([]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="QrCode" size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          QR Code Scanner
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Scanner */}
        <div className="space-y-4">
          <div
            className="relative bg-muted rounded-xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
            {!isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon
                  name="QrCode"
                  size={64}
                  className="text-muted-foreground mb-4"
                />
                <p className="text-sm text-muted-foreground">
                  Click start to scan QR codes
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {!isScanning ? (
              <Button onClick={startScanning} className="flex-1">
                <Icon name="Camera" size={16} className="mr-2" /> Start Scanning
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={stopScanning}
                className="flex-1"
              >
                <Icon name="Square" size={16} className="mr-2" /> Stop Scanning
              </Button>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="flex-1"
          />

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {scanResult && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <p>
                <strong>{scanResult.participantName}</strong> checked in at{" "}
                {new Date(scanResult.timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Recent Scans */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium text-foreground">
              Recent Check-ins
            </h4>
            {recentScans.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearRecentScans}>
                Clear
              </Button>
            )}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentScans.length === 0 && (
              <p className="text-sm text-muted-foreground">No check-ins yet</p>
            )}
            {recentScans.map((scan, i) => (
              <div
                key={i}
                className="flex justify-between p-3 bg-muted/30 rounded-lg"
              >
                <p>{scan.participantName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(scan.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
