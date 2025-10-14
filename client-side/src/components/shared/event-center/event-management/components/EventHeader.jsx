import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";

const EventHeader = ({ event = {} }) => {
  const {
    title = "Event Management",
    description = "Manage your event participants and track attendance",
    date = "2025-01-15",
    time = "10:00 AM",
    mode = "hybrid",
    location = "Conference Center, New York",
    capacity = 100,
    registered = 0,
    attended = 0,
  } = event;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case "online":
        return "Monitor";
      case "offline":
        return "MapPin";
      case "hybrid":
        return "Wifi";
      default:
        return "Calendar";
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case "online":
        return "text-blue-600";
      case "offline":
        return "text-green-600";
      case "hybrid":
        return "text-purple-600";
      default:
        return "text-muted-foreground";
    }
  };

  const attendanceRate = registered > 0 ? (attended / registered) * 100 : 0;

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <Link
          to="/event-dashboard"
          className="hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
        <Icon name="ChevronRight" size={16} />
        <span className="text-foreground">Event Management</span>
      </div>
      {/* Event Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Event Details */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <Link to="/event-dashboard">
              <Button variant="ghost" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Event Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(date)}
                </p>
                <p className="text-sm text-muted-foreground">{time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon
                  name={getModeIcon(mode)}
                  size={20}
                  className={getModeColor(mode)}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground capitalize">
                  {mode} Event
                </p>
                <p className="text-sm text-muted-foreground">
                  {mode === "online"
                    ? "Virtual attendance"
                    : mode === "offline"
                    ? location
                    : "Hybrid format"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Registration Status
              </span>
              <span className="text-sm text-muted-foreground">
                {registered}/{capacity}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((registered / capacity) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {capacity - registered} spots remaining
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Attendance Rate
              </span>
              <span className="text-sm text-muted-foreground">
                {attended}/{registered}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  attendanceRate >= 70
                    ? "bg-success"
                    : attendanceRate >= 50
                    ? "bg-warning"
                    : "bg-destructive"
                }`}
                style={{ width: `${Math.min(attendanceRate, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {attendanceRate?.toFixed(1)}% attendance rate
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <div className="text-lg font-bold text-success">{attended}</div>
              <div className="text-xs text-muted-foreground">Attended</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-foreground">
                {registered - attended}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
