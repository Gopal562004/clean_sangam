import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalNavigationController from "../../components/ui/ModalNavigationController";
import QRCodeCard from "./components/QRCodeCard";
import QRInstructions from "./components/QRInstructions";
import QRLoadingState from "./components/QRLoadingState";
import QRErrorState from "./components/QRErrorState";

const QRCodeDisplayModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrValue, setQrValue] = useState("");

  // Mock event data - in real app, this would come from props or API
  const mockEvent = {
    id: "evt_001",
    title: "React Developer Conference 2025",
    description:
      "Join us for an exciting day of React development insights, networking, and hands-on workshops with industry experts.",
    date: "2025-01-15",
    time: "09:00",
    mode: "hybrid",
    location: "Tech Convention Center, San Francisco",
    capacity: 500,
    registeredCount: 342,
    tags: ["React", "JavaScript", "Frontend", "Networking"],
    banner:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    organizer: {
      name: "Tech Events Inc.",
      email: "events@techevents.com",
    },
  };

  // Mock user registration data
  const mockRegistration = {
    userId: "user_123",
    eventId: "evt_001",
    registrationId: "reg_456789",
    registeredAt: "2025-01-10T14:30:00Z",
    status: "confirmed",
    attendanceStatus: "pending",
  };

  useEffect(() => {
    // Simulate QR code generation
    const generateQRCode = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate QR code value with registration details
        const qrData = {
          eventId: mockEvent?.id,
          registrationId: mockRegistration?.registrationId,
          userId: mockRegistration?.userId,
          eventTitle: mockEvent?.title,
          eventDate: mockEvent?.date,
          eventTime: mockEvent?.time,
          checkInUrl: `https://eventhub.com/checkin/${mockRegistration?.registrationId}`,
          timestamp: new Date()?.toISOString(),
        };

        setQrValue(JSON.stringify(qrData));
        setIsLoading(false);
      } catch (err) {
        setError(
          "Failed to generate QR code. Please check your internet connection and try again."
        );
        setIsLoading(false);
      }
    };

    generateQRCode();
  }, []);

  const handleClose = () => {
    navigate("/event-dashboard");
  };

  const handleDownload = () => {
    // Create a canvas element to convert QR code to image
    const canvas = document.createElement("canvas");
    const ctx = canvas?.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;

    // Fill white background
    ctx.fillStyle = "white";
    ctx?.fillRect(0, 0, 300, 300);

    // Create download link
    const link = document.createElement("a");
    link.download = `${mockEvent?.title?.replace(/\s+/g, "_")}_QR_Code.png`;
    link.href = canvas?.toDataURL();
    link?.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Code for ${mockEvent?.title}`,
          text: `My QR code for ${mockEvent?.title} on ${new Date(
            mockEvent.date
          )?.toLocaleDateString()}`,
          url: window.location?.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      alert("QR code link copied to clipboard!");
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);

    // Retry QR code generation
    setTimeout(() => {
      const qrData = {
        eventId: mockEvent?.id,
        registrationId: mockRegistration?.registrationId,
        userId: mockRegistration?.userId,
        eventTitle: mockEvent?.title,
        eventDate: mockEvent?.date,
        eventTime: mockEvent?.time,
        checkInUrl: `https://eventhub.com/checkin/${mockRegistration?.registrationId}`,
        timestamp: new Date()?.toISOString(),
      };

      setQrValue(JSON.stringify(qrData));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ModalNavigationController
      isOpen={true}
      onClose={handleClose}
      title="Your Event QR Code"
      returnPath="/event-dashboard"
      showBackButton={true}
    >
      <div className="p-6 bg-background min-h-[600px]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <div className="space-y-6">
              {isLoading && (
                <QRLoadingState message="Generating your QR code..." />
              )}

              {error && (
                <QRErrorState
                  error={error}
                  onRetry={handleRetry}
                  onClose={handleClose}
                />
              )}

              {!isLoading && !error && qrValue && (
                <QRCodeCard
                  event={mockEvent}
                  qrValue={qrValue}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              )}
            </div>

            {/* Instructions Section */}
            <div className="space-y-6">
              <QRInstructions />
            </div>
          </div>

          {/* Additional Information */}
          {!isLoading && !error && (
            <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
              <div className="text-center space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Registration Confirmed
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Registration ID</p>
                    <p className="font-mono text-foreground">
                      {mockRegistration?.registrationId}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Registered On</p>
                    <p className="text-foreground">
                      {new Date(
                        mockRegistration.registeredAt
                      )?.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Status</p>
                    <p className="text-success font-medium capitalize">
                      {mockRegistration?.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalNavigationController>
  );
};

export default QRCodeDisplayModal;
