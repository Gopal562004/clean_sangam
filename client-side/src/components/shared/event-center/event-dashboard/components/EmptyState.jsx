import React from "react";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";

const EmptyState = ({
  type = "events",
  title,
  description,
  actionLabel,
  onAction,
  icon = "Calendar",
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case "browse-events":
        return {
          title: "No Events Found",
          description:
            "No events match your current filters. Try adjusting your search criteria or check back later for new events.",
          icon: "Search",
        };
      case "my-events":
        return {
          title: "No Events Created",
          description:
            "You haven't created any events yet. Start by creating your first event to engage with your audience.",
          actionLabel: "Create Your First Event",
          icon: "PlusCircle",
        };
      case "search-results":
        return {
          title: "No Results Found",
          description:
            "We couldn't find any events matching your search. Try different keywords or browse all events.",
          icon: "SearchX",
        };
      default:
        return {
          title: "No Events Available",
          description:
            "There are currently no events to display. Please check back later.",
          icon: "Calendar",
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent?.title;
  const finalDescription = description || defaultContent?.description;
  const finalActionLabel = actionLabel || defaultContent?.actionLabel;
  const finalIcon = icon || defaultContent?.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={finalIcon} size={32} className="text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-3">
        {finalTitle}
      </h3>

      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {finalDescription}
      </p>

      {finalActionLabel && onAction && (
        <Button
          variant="default"
          onClick={onAction}
          iconName="PlusCircle"
          iconPosition="left"
        >
          {finalActionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
