import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../AppIcon";
import Input from "../../../ui/Input";

const SearchBar = ({ onSearch, onLocationChange, savedJobs = [] }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const searchRef = useRef(null);

  const suggestions = [
    "Software Developer",
    "Product Manager",
    "UI/UX Designer",
    "Data Analyst",
    "Marketing Manager",
    "Sales Representative",
    "HR Manager",
    "Business Analyst",
    "DevOps Engineer",
  ];

  const filteredSuggestions = suggestions?.filter(
    (suggestion) =>
      suggestion?.toLowerCase()?.includes(query?.toLowerCase()) &&
      query?.length > 0
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setShowSavedJobs(false);
      }
    };

    document?.addEventListener("mousedown", handleClickOutside);
    return () => document?.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery = query) => {
    onSearch?.(searchQuery, location);
    setShowSuggestions(false);
    setShowSavedJobs(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleSavedJobClick = (job) => {
    setQuery(job?.title || "");
    setLocation(job?.location || "");
    onSearch?.(job?.title, job?.location);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-4 p-6 bg-card rounded-lg shadow-md border border-border">
        {/* Job Title/Keywords Search */}
        <div className="flex-1 relative">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => {
                setQuery(e?.target?.value);
                setShowSuggestions(e?.target?.value?.length > 0);
                setShowSavedJobs(false);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => {
                if (query?.length > 0) setShowSuggestions(true);
              }}
              className="pl-10 h-12"
            />
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && filteredSuggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-20">
              {filteredSuggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 hover:bg-muted text-sm text-foreground border-b border-border last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Search"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="lg:w-64 relative">
          <div className="relative">
            <Icon
              name="MapPin"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => {
                setLocation(e?.target?.value);
                onLocationChange?.(e?.target?.value);
              }}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Search Actions */}
        <div className="flex items-center space-x-3">
          {/* Saved Jobs */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSavedJobs(!showSavedJobs);
                setShowSuggestions(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md border border-border h-12"
            >
              <Icon name="Bookmark" size={16} />
              <span>Saved Jobs</span>
            </button>

            {/* Saved Jobs Dropdown */}
            {showSavedJobs && (
              <div className="absolute top-full right-0 mt-1 w-96 bg-card border border-border rounded-lg shadow-lg z-20">
                <div className="p-3 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">
                    Saved Jobs
                  </h3>
                </div>
                {savedJobs?.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto">
                    {savedJobs?.map((job, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 hover:bg-muted border-b border-border last:border-b-0"
                        onClick={() => handleSavedJobClick(job)}
                      >
                        <div className="text-sm font-medium text-foreground mb-1">
                          {job?.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {job?.company} • {job?.location}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No saved jobs yet
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium h-12 transition-colors"
          >
            <Icon name="Search" size={16} />
            <span>Search Jobs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
