import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QRErrorState = ({
  error = "Failed to generate QR code",
  onRetry = () => {},
  onClose = () => {},
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <Icon name="AlertCircle" size={32} className="text-destructive" />
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            QR Code Generation Failed
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {error}. Please try again or contact support if the problem
            persists.
          </p>
        </div>

        {/* Error Details */}
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg w-full max-w-md">
          <div className="flex items-start space-x-3">
            <Icon
              name="Info"
              size={16}
              className="text-destructive mt-0.5 flex-shrink-0"
            />
            <div className="text-left">
              <p className="font-medium text-foreground text-sm mb-1">
                Possible causes:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Network connection issues</li>
                <li>• Server temporarily unavailable</li>
                <li>• Invalid registration data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button
            variant="default"
            onClick={onRetry}
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1"
          >
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            Close
          </Button>
        </div>

        {/* Support Contact */}
        <div className="pt-4 border-t border-border w-full">
          <p className="text-xs text-muted-foreground">
            Need help?{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRErrorState;
