import React from "react";
import QRCode from "qrcode.react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QRCodeCard = ({
  event,
  qrValue,
  onDownload = () => {},
  onShare = () => {},
}) => {
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

  const getModeIcon = (mode) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return "Monitor";
      case "offline":
        return "MapPin";
      case "hybrid":
        return "Zap";
      default:
        return "Calendar";
    }
  };

  const getModeColor = (mode) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return "text-blue-600";
      case "offline":
        return "text-green-600";
      case "hybrid":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8 text-center">
      {/* QR Code Section */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Icon name="QrCode" size={32} className="text-primary" />
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 inline-block mb-4">
          <QRCode
            value={qrValue}
            size={200}
            level="M"
            includeMargin={true}
            renderAs="svg"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Present this QR code at the event entrance for quick check-in
        </p>
      </div>
      {/* Event Details */}
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {event?.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{formatDate(event?.date)}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{formatTime(event?.time)}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <Icon
              name={getModeIcon(event?.mode)}
              size={16}
              className={getModeColor(event?.mode)}
            />
            <span
              className={`capitalize font-medium ${getModeColor(event?.mode)}`}
            >
              {event?.mode}
            </span>
          </div>

          {event?.location && (
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-foreground truncate">
                {event?.location}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onDownload}
          iconName="Download"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Download QR
        </Button>

        <Button
          variant="outline"
          onClick={onShare}
          iconName="Share2"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default QRCodeCard;
