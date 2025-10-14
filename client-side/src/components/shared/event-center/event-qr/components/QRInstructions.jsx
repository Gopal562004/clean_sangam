import React from "react";
import Icon from "../../../components/AppIcon";

const QRInstructions = () => {
  const instructions = [
    {
      icon: "Smartphone",
      title: "Keep Your Phone Ready",
      description:
        "Ensure your phone screen is clean and brightness is at maximum for better scanning",
    },
    {
      icon: "Clock",
      title: "Arrive Early",
      description:
        "Present your QR code 15 minutes before the event start time for smooth check-in",
    },
    {
      icon: "Shield",
      title: "Keep It Secure",
      description:
        "Do not share your QR code with others as it contains your unique registration details",
    },
    {
      icon: "Wifi",
      title: "Offline Access",
      description:
        "Download or screenshot your QR code for offline access in case of network issues",
    },
  ];

  const troubleshooting = [
    {
      issue: "QR code not scanning?",
      solution:
        "Increase screen brightness and ensure the code is clearly visible",
    },
    {
      issue: "Scanner not working?",
      solution: "Try moving your phone closer or further from the scanner",
    },
    {
      issue: "Code appears blurry?",
      solution: "Clean your phone screen and hold it steady while scanning",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Instructions Section */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Info" size={20} className="text-primary" />
          <span>How to Use Your QR Code</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instructions?.map((instruction, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon
                  name={instruction?.icon}
                  size={18}
                  className="text-primary"
                />
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">
                  {instruction?.title}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {instruction?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Troubleshooting Section */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="HelpCircle" size={20} className="text-warning" />
          <span>Troubleshooting</span>
        </h4>

        <div className="space-y-3">
          {troubleshooting?.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-warning/5 border border-warning/20 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name="AlertTriangle"
                  size={16}
                  className="text-warning mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">
                    {item?.issue}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item?.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Support */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <div>
            <p className="font-medium text-foreground text-sm mb-1">
              Need Help?
            </p>
            <p className="text-sm text-muted-foreground">
              Contact event support at{" "}
              <span className="text-primary font-medium">
                support@eventhub.com
              </span>{" "}
              or call{" "}
              <span className="text-primary font-medium">
                +1 (555) 123-4567
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRInstructions;
