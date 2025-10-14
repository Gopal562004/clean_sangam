import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
import FilterPanel from "./components/FilterPanel";
import SortControls from "./components/SortControls";
import AlumniGrid from "./components/AlumniGrid";
import Button from "../../../components/ui/Button";

import {
  getAllMentors,
  sendMenteeRequest,
} from "../../../lib/mongo/mentorServices"; // Using profileServices

const Directory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Filters & Sorting
  const [filters, setFilters] = useState({
    search: "",
    graduationYear: "",
    department: "",
    industry: "",
    location: "",
    skills: "",
    availableForMentorship: false,
    availableForSpeaking: false,
    availableForRecruiting: false,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOrder, setSortOrder] = useState("desc");

  const [mentors, setMentors] = useState([]);

  // Mock current user
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    role: "student",
  };

  // Fetch mentors from API
  const fetchMentors = async () => {
    setLoading(true);
    try {
      const params = { ...filters, page, limit, sortBy, sortOrder };
      const data = await getAllMentors(params);
      setMentors(data.mentors || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [filters, sortBy, sortOrder, page]);

  // Filter & Sorting Handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      graduationYear: "",
      department: "",
      industry: "",
      location: "",
      skills: "",
      availableForMentorship: false,
      availableForSpeaking: false,
      availableForRecruiting: false,
    });
    setPage(1);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  // Navigate to Public Profile
  const handleVisitProfile = (mentorId) => {
    navigate(`/users/view/${mentorId}`);
  };

  // Single connect request
  const handleConnect = async (mentorId) => {
    try {
      const response = await sendMenteeRequest(mentorId.id);
      console.log(response.message);
    } catch (error) {
      alert(error);
    }
  };

  // Bulk connect requests
  const handleBulkConnect = async () => {
    if (!selectedMentors.length) return alert("No mentors selected");
    try {
      for (let mentorId of selectedMentors) {
        await sendMenteeRequest(mentorId);
      }
      alert("Mentee requests sent successfully!");
      setSelectedMentors([]);
    } catch (error) {
      alert(error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={currentUser} />

        {/* Page Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Mentors Directory
            </h1>
            <p className="text-text-secondary max-w-2xl">
              Connect with available mentors, filter by skills, department, or
              availability.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Directory
            </Button>
            <Button variant="default" iconName="UserPlus" iconPosition="left">
              Invite Mentors
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
              totalResults={mentors.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              selectedCount={selectedMentors.length}
              onBulkAction={handleBulkConnect}
              totalResults={mentors.length}
            />

            <AlumniGrid
              alumni={mentors}
              viewMode={viewMode}
              onConnect={handleConnect}
              onMessage={(mentor) => handleVisitProfile(mentor.id)}
              selectedAlumni={selectedMentors}
              onSelectionChange={setSelectedMentors}
              loading={loading}
              onVisitProfile={handleVisitProfile}
            />

            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-4">
              <Button onClick={() => handlePageChange(page - 1)}>Prev</Button>
              <span className="px-3 py-1 border rounded">{page}</span>
              <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Directory;
