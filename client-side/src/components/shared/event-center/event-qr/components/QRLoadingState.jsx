import React from "react";
import Icon from "../../../components/AppIcon";

const QRLoadingState = ({ message = "Generating your QR code..." }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Loading Animation */}
        <div className="relative">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="QrCode" size={32} className="text-primary" />
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Loading Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{message}</h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your digital ticket
          </p>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3 w-full max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              Verifying registration
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              Processing event details
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground font-medium">
              Generating QR code
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRLoadingState;
