import React from "react";
import Icon from "../../../../AppIcon";
import Button from "../../../../ui/Button";
import Select from "../../../../ui/Select";
import Input from "../../../../ui/Input";

const FilterControls = ({
  filters,
  onFilterChange,
  onClearFilters,
  showCreateButton = false,
  onCreateEvent = () => {},
}) => {
  const modeOptions = [
    { value: "", label: "All Modes" },
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "networking", label: "Networking" },
    { value: "workshop", label: "Workshop" },
    { value: "conference", label: "Conference" },
    { value: "seminar", label: "Seminar" },
    { value: "webinar", label: "Webinar" },
  ];

  const sortOptions = [
    { value: "date-asc", label: "Date (Earliest First)" },
    { value: "date-desc", label: "Date (Latest First)" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "popularity", label: "Most Popular" },
  ];

  const hasActiveFilters =
    filters?.search ||
    filters?.mode ||
    filters?.category ||
    filters?.dateFrom ||
    filters?.dateTo;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Events
        </h2>
        {showCreateButton && (
          <Button
            variant="default"
            onClick={onCreateEvent}
            iconName="PlusCircle"
            iconPosition="left"
          >
            Create Event
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <Input
            type="search"
            placeholder="Search events..."
            value={filters?.search}
            onChange={(e) => onFilterChange("search", e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Mode Filter */}
        <div>
          <Select
            placeholder="Mode"
            options={modeOptions}
            value={filters?.mode}
            onChange={(value) => onFilterChange("mode", value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <Select
            placeholder="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange("category", value)}
          />
        </div>

        {/* Date From */}
        <div>
          <Input
            type="date"
            placeholder="From Date"
            value={filters?.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e?.target?.value)}
          />
        </div>

        {/* Date To */}
        <div>
          <Input
            type="date"
            placeholder="To Date"
            value={filters?.dateTo}
            onChange={(e) => onFilterChange("dateTo", e?.target?.value)}
          />
        </div>
      </div>
      {/* Sort and Clear Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange("sortBy", value)}
            className="w-48"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            size="sm"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterControls;
