import React, { useState } from "react";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";

const QRScanner = () => {
  const [recentScans, setRecentScans] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");

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
        {/* Video Placeholder */}
        <div className="space-y-4">
          <div
            className="relative bg-muted rounded-xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Icon
                name="QrCode"
                size={64}
                className="text-muted-foreground mb-4"
              />
              <p className="text-sm text-muted-foreground">
                QR Scanner UI Placeholder
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button disabled className="flex-1">
              <Icon name="Camera" size={16} className="mr-2" /> Start Scanning
            </Button>
          </div>

          <input
            type="file"
            accept="image/*"
            disabled
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
