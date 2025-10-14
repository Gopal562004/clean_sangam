// // // import React, { useState, useEffect } from "react";
// // // import SearchBar from "./components/SearchBar";
// // // import FilterSidebar from "./components/FilterSidebar";
// // // import JobCard from "./components/JobCard";
// // // import JobDetailsModal from "./components/JobDetailsModal";
// // // import ApplicationModal from "./components/ApplicationModal";
// // // import JobAlerts from "./components/JobAlerts";
// // // import Icon from "../../AppIcon";
// // // import Button from "../../ui/Button";
// // // import BreadcrumbTrail from "../../ui/BreadcrumbTrail";
// // // import {
// // //   getAllJobs,
// // //   applyJob,
// // //   saveJob,
// // //   getSavedJobs,
// // //   createJobAlert,
// // // } from "../../../lib/mongo/jobServices";

// // // const JobSearchAndApplicationPortal = () => {
// // //   const [jobs, setJobs] = useState([]);
// // //   const [filteredJobs, setFilteredJobs] = useState([]);
// // //   const [filters, setFilters] = useState({});
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [searchLocation, setSearchLocation] = useState("");
// // //   const [selectedJob, setSelectedJob] = useState(null);
// // //   const [showJobDetails, setShowJobDetails] = useState(false);
// // //   const [showApplication, setShowApplication] = useState(false);
// // //   const [showJobAlerts, setShowJobAlerts] = useState(false);
// // //   const [savedJobs, setSavedJobs] = useState(new Set());
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [sortBy, setSortBy] = useState("relevance");
// // //   const [viewType, setViewType] = useState("grid");

// // //   // Pagination state
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const pageSize = 3; // ✅ only 3 per page

// // //   // Mock current user
// // //   const currentUser = {
// // //     id: 1,
// // //     name: "Sarah Johnson",
// // //     email: "sarah.johnson@university.edu",
// // //     role: "student",
// // //     profileImage:
// // //       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
// // //   };

// // //   // Fetch jobs with pagination
// // //   const fetchJobs = async (page = 1) => {
// // //     setIsLoading(true);
// // //     try {
// // //       const data = await getAllJobs({ page, limit: pageSize });
// // //       setJobs(data.jobs);
// // //       setFilteredJobs(data.jobs);
// // //       setTotalPages(data.pages || 1);
// // //       setCurrentPage(page);
// // //     } catch (err) {
// // //       console.error("Failed to fetch jobs:", err);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Fetch saved jobs
// // //   const fetchSavedJobs = async () => {
// // //     try {
// // //       const data = await getSavedJobs();
// // //       const savedSet = new Set(data.savedJobs.map((job) => job._id || job.id));
// // //       setSavedJobs(savedSet);
// // //     } catch (err) {
// // //       console.error("Failed to fetch saved jobs:", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchJobs(currentPage);
// // //     fetchSavedJobs();
// // //   }, []);

// // //   // Filter and sort jobs
// // //   useEffect(() => {
// // //     let filtered = jobs?.filter((job) => {
// // //       const matchesSearch =
// // //         !searchQuery ||
// // //         job?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
// // //         job?.company?.name
// // //           ?.toLowerCase()
// // //           ?.includes(searchQuery.toLowerCase()) ||
// // //         job?.keyRequirements?.some((req) =>
// // //           req?.toLowerCase()?.includes(searchQuery.toLowerCase())
// // //         );

// // //       const matchesLocation =
// // //         !searchLocation ||
// // //         job?.location?.toLowerCase()?.includes(searchLocation.toLowerCase());

// // //       const matchesJobType =
// // //         !filters?.jobType?.length ||
// // //         filters?.jobType?.includes(job?.employmentType?.toLowerCase());

// // //       const matchesSalary =
// // //         (!filters?.salary?.min ||
// // //           job?.salary?.max >= parseInt(filters?.salary?.min)) &&
// // //         (!filters?.salary?.max ||
// // //           job?.salary?.min <= parseInt(filters?.salary?.max));

// // //       return (
// // //         matchesSearch && matchesLocation && matchesJobType && matchesSalary
// // //       );
// // //     });

// // //     switch (sortBy) {
// // //       case "date":
// // //         filtered = filtered?.sort(
// // //           (a, b) => new Date(b?.postedDate) - new Date(a?.postedDate)
// // //         );
// // //         break;
// // //       case "salary":
// // //         filtered = filtered?.sort(
// // //           (a, b) => (b?.salary?.max || 0) - (a?.salary?.max || 0)
// // //         );
// // //         break;
// // //       case "match":
// // //         filtered = filtered?.sort(
// // //           (a, b) => (b?.matchScore || 0) - (a?.matchScore || 0)
// // //         );
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     setFilteredJobs(filtered);
// // //   }, [jobs, filters, searchQuery, searchLocation, sortBy]);

// // //   // Handlers
// // //   const handleSearch = (query, location) => {
// // //     setSearchQuery(query);
// // //     setSearchLocation(location);
// // //   };

// // //   const handleFiltersChange = (newFilters) => setFilters(newFilters);

// // //   const handleSaveJob = async (jobId, save) => {
// // //     try {
// // //       const res = await saveJob(jobId);
// // //       const updatedSet = new Set(savedJobs);
// // //       if (res.isSaved) updatedSet.add(jobId);
// // //       else updatedSet.delete(jobId);
// // //       setSavedJobs(updatedSet);
// // //     } catch (err) {
// // //       console.error("Failed to save job:", err);
// // //     }
// // //   };

// // //   const handleApply = (job) => {
// // //     setSelectedJob(job);
// // //     setShowApplication(true);
// // //     setShowJobDetails(false);
// // //   };

// // // const handleApplicationSubmit = async (formData) => {
// // //   try {
// // //     if (!selectedJob) throw new Error("No job selected");

// // //     // Map answers properly
// // //     const answersArray = (selectedJob.customQuestions || []).map((q) => {
// // //       const ansObj = formData.customAnswers.find(
// // //         (a) => a.questionId === (q._id || q.id)
// // //       );
// // //       return {
// // //         questionId: q._id || q.id,
// // //         answer: ansObj?.answer || "",
// // //       };
// // //     });

// // //     // Send JSON payload
// // //     await applyJob(selectedJob._id || selectedJob.id, {
// // //       firstName: formData.firstName,
// // //       lastName: formData.lastName,
// // //       email: formData.email,
// // //       phone: formData.phone,
// // //       coverLetter: formData.coverLetter,
// // //       resume: formData.resume ? formData.resume.name : "",
// // //       answers: answersArray,
// // //     });

// // //     toast.success("Application submitted successfully!");

// // //     setShowApplication(false);
// // //   } catch (err) {
// // //     console.error("Failed to apply:", err.response?.data || err.message);
// // //     toast.error(err.response?.data?.message || "Failed to apply");
// // //   }
// // // };


// // //   const handleJobAlertSave = async (alertData) => {
// // //     try {
// // //       await createJobAlert(alertData);
// // //       setShowJobAlerts(false);
// // //     } catch (err) {
// // //       console.error("Failed to create job alert:", err);
// // //     }
// // //   };

// // //   const handlePageChange = (page) => {
// // //     if (page < 1 || page > totalPages) return;
// // //     fetchJobs(page);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <main className="pt-16">
// // //         <BreadcrumbTrail user={currentUser} />

// // //         <div className="max-w-7xl mx-auto px-6 py-8">
// // //           {/* Search Bar */}
// // //           <div className="mb-8">
// // //             <SearchBar
// // //               onSearch={handleSearch}
// // //               onLocationChange={setSearchLocation}
// // //               savedJobs={Array.from(savedJobs).map((jobId) => {
// // //                 const job = jobs.find((j) => (j._id || j.id) === jobId);
// // //                 return {
// // //                   title: job?.title || "Saved Job",
// // //                   location: job?.location || "N/A",
// // //                   company: job?.company?.name || "Company",
// // //                 };
// // //               })}
// // //             />
// // //           </div>

// // //           <div className="flex flex-col lg:flex-row gap-6">
// // //             {/* Sidebar */}
// // //             <div className="lg:w-80 flex-shrink-0">
// // //               <FilterSidebar
// // //                 filters={filters}
// // //                 onFiltersChange={handleFiltersChange}
// // //               />
// // //             </div>

// // //             {/* Job List */}
// // //             <div className="flex-1">
// // //               {/* Controls */}
// // //               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
// // //                 <h2 className="text-xl font-semibold text-foreground">
// // //                   {isLoading
// // //                     ? "Searching..."
// // //                     : `${filteredJobs?.length} Jobs Found`}
// // //                 </h2>

// // //                 <div className="flex items-center space-x-4 mt-4 sm:mt-0">
// // //                   {/* Grid/List Toggle */}
// // //                   <div className="flex items-center bg-muted rounded-md p-1">
// // //                     <button
// // //                       onClick={() => setViewType("grid")}
// // //                       className={`p-2 rounded ${
// // //                         viewType === "grid"
// // //                           ? "bg-background shadow-sm"
// // //                           : "hover:bg-background/50"
// // //                       }`}
// // //                     >
// // //                       <Icon name="Grid3X3" size={16} />
// // //                     </button>
// // //                     <button
// // //                       onClick={() => setViewType("list")}
// // //                       className={`p-2 rounded ${
// // //                         viewType === "list"
// // //                           ? "bg-background shadow-sm"
// // //                           : "hover:bg-background/50"
// // //                       }`}
// // //                     >
// // //                       <Icon name="List" size={16} />
// // //                     </button>
// // //                   </div>

// // //                   {/* Sort */}
// // //                   <select
// // //                     value={sortBy}
// // //                     onChange={(e) => setSortBy(e.target.value)}
// // //                     className="px-3 py-2 border border-border rounded-md text-sm bg-background"
// // //                   >
// // //                     <option value="relevance">Most Relevant</option>
// // //                     <option value="date">Newest First</option>
// // //                     <option value="salary">Highest Salary</option>
// // //                     <option value="match">Best Match</option>
// // //                   </select>

// // //                   {/* Alerts */}
// // //                   <Button
// // //                     variant="outline"
// // //                     size="sm"
// // //                     onClick={() => setShowJobAlerts(true)}
// // //                     iconName="Bell"
// // //                     iconPosition="left"
// // //                   >
// // //                     Create Alert
// // //                   </Button>
// // //                 </div>
// // //               </div>

// // //               {/* Job Cards */}
// // //               {isLoading ? (
// // //                 <div>Loading...</div>
// // //               ) : filteredJobs?.length > 0 ? (
// // //                 <div className="space-y-4">
// // //                   {filteredJobs.map((job) => (
// // //                     <JobCard
// // //                       key={job._id || job.id}
// // //                       job={job}
// // //                       onSave={handleSaveJob}
// // //                       onApply={handleApply}
// // //                       onViewDetails={(job) => {
// // //                         setSelectedJob(job);
// // //                         setShowJobDetails(true);
// // //                       }}
// // //                       isSaved={savedJobs.has(job._id || job.id)}
// // //                     />
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <div className="text-center py-12">
// // //                   <Icon name="Search" size={48} className="mx-auto mb-4" />
// // //                   <h3 className="text-lg font-medium mb-2">No jobs found</h3>
// // //                   <Button
// // //                     variant="outline"
// // //                     onClick={() => {
// // //                       setFilters({});
// // //                       setSearchQuery("");
// // //                       setSearchLocation("");
// // //                     }}
// // //                   >
// // //                     Clear All Filters
// // //                   </Button>
// // //                 </div>
// // //               )}

// // //               {/* Pagination */}
// // //               {totalPages > 1 && (
// // //                 <div className="flex justify-center items-center space-x-2 mt-6">
// // //                   <Button
// // //                     onClick={() => handlePageChange(currentPage - 1)}
// // //                     disabled={currentPage === 1}
// // //                   >
// // //                     &lt;
// // //                   </Button>
// // //                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
// // //                     (page) => (
// // //                       <Button
// // //                         key={page}
// // //                         onClick={() => handlePageChange(page)}
// // //                         className={`${
// // //                           currentPage === page ? "bg-primary text-white" : ""
// // //                         }`}
// // //                       >
// // //                         {page}
// // //                       </Button>
// // //                     )
// // //                   )}
// // //                   <Button
// // //                     onClick={() => handlePageChange(currentPage + 1)}
// // //                     disabled={currentPage === totalPages}
// // //                   >
// // //                     &gt;
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Modals */}
// // //       {showJobDetails && (
// // //         <JobDetailsModal
// // //           job={selectedJob}
// // //           isOpen={showJobDetails}
// // //           onClose={() => setShowJobDetails(false)}
// // //           onApply={handleApply}
// // //           onSave={handleSaveJob}
// // //           isSaved={savedJobs.has(selectedJob?._id || selectedJob?.id)}
// // //         />
// // //       )}

// // //       {showApplication && (
// // //         <ApplicationModal
// // //           job={selectedJob}
// // //           isOpen={showApplication}
// // //           onClose={() => setShowApplication(false)}
// // //           onSubmit={handleApplicationSubmit}
// // //         />
// // //       )}

// // //       {showJobAlerts && (
// // //         <JobAlerts
// // //           isOpen={showJobAlerts}
// // //           onClose={() => setShowJobAlerts(false)}
// // //           onSave={handleJobAlertSave}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default JobSearchAndApplicationPortal;
// // import React, { useState, useEffect } from "react";
// // import SearchBar from "./components/SearchBar";
// // import FilterSidebar from "./components/FilterSidebar";
// // import JobCard from "./components/JobCard";
// // import JobDetailsModal from "./components/JobDetailsModal";
// // import ApplicationModal from "./components/ApplicationModal";
// // import JobAlerts from "./components/JobAlerts";
// // import Icon from "../../AppIcon";
// // import Button from "../../ui/Button";
// // import BreadcrumbTrail from "../../ui/BreadcrumbTrail";
// // import {
// //   getAllJobs,
// //   applyJob,
// //   saveJob,
// //   getSavedJobs,
// //   createJobAlert,
// // } from "../../../lib/mongo/jobServices";
// // import { toast } from "react-hot-toast";

// // const JobSearchAndApplicationPortal = () => {
// //   const [jobs, setJobs] = useState([]);
// //   const [filters, setFilters] = useState({});
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchLocation, setSearchLocation] = useState("");
// //   const [selectedJob, setSelectedJob] = useState(null);
// //   const [showJobDetails, setShowJobDetails] = useState(false);
// //   const [showApplication, setShowApplication] = useState(false);
// //   const [showJobAlerts, setShowJobAlerts] = useState(false);
// //   const [savedJobs, setSavedJobs] = useState(new Set());
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [sortBy, setSortBy] = useState("relevance");
// //   const [viewType, setViewType] = useState("grid");

// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const pageSize = 3; // jobs per page

// //   // Mock current user
// //   const currentUser = {
// //     id: 1,
// //     name: "Sarah Johnson",
// //     email: "sarah.johnson@university.edu",
// //     role: "student",
// //     profileImage:
// //       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
// //   };

// //   // Fetch jobs from backend
// //   const fetchJobs = async (page = 1) => {
// //     setIsLoading(true);
// //     try {
// //       const data = await getAllJobs({
// //         page,
// //         limit: pageSize,
// //         search: searchQuery,
// //         location: searchLocation,
// //         jobType: filters.jobType,
// //         salaryMin: filters.salary?.min,
// //         salaryMax: filters.salary?.max,
// //         sortBy,
// //       });

// //       setJobs(data.jobs);
// //       setTotalPages(data.pages || 1);
// //       setCurrentPage(page);
// //     } catch (err) {
// //       console.error("Failed to fetch jobs:", err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Fetch saved jobs
// //   const fetchSavedJobs = async () => {
// //     try {
// //       const data = await getSavedJobs();
// //       const savedSet = new Set(data.savedJobs.map((job) => job._id || job.id));
// //       setSavedJobs(savedSet);
// //     } catch (err) {
// //       console.error("Failed to fetch saved jobs:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchJobs(1);
// //     fetchSavedJobs();
// //   }, []);

// //   // Trigger new fetch whenever search, filters, or sort changes
// //   useEffect(() => {
// //     fetchJobs(1);
// //   }, [searchQuery, searchLocation, filters, sortBy]);

// //   // Handlers
// //   const handleSearch = (query, location) => {
// //     setSearchQuery(query);
// //     setSearchLocation(location);
// //   };

// //   const handleFiltersChange = (newFilters) => setFilters(newFilters);

// //   const handleSaveJob = async (jobId) => {
// //     try {
// //       const res = await saveJob(jobId);
// //       const updatedSet = new Set(savedJobs);
// //       if (res.isSaved) updatedSet.add(jobId);
// //       else updatedSet.delete(jobId);
// //       setSavedJobs(updatedSet);
// //     } catch (err) {
// //       console.error("Failed to save job:", err);
// //     }
// //   };

// //   const handleApply = (job) => {
// //     setSelectedJob(job);
// //     setShowApplication(true);
// //     setShowJobDetails(false);
// //   };

// //   const handleApplicationSubmit = async (formData) => {
// //     try {
// //       if (!selectedJob) throw new Error("No job selected");

// //       const answersArray = (selectedJob.customQuestions || []).map((q) => {
// //         const ansObj = formData.customAnswers.find(
// //           (a) => a.questionId === (q._id || q.id)
// //         );
// //         return {
// //           questionId: q._id || q.id,
// //           answer: ansObj?.answer || "",
// //         };
// //       });

// //       await applyJob(selectedJob._id || selectedJob.id, {
// //         firstName: formData.firstName,
// //         lastName: formData.lastName,
// //         email: formData.email,
// //         phone: formData.phone,
// //         coverLetter: formData.coverLetter,
// //         resume: formData.resume ? formData.resume.name : "",
// //         answers: answersArray,
// //       });

// //       toast.success("Application submitted successfully!");
// //       setShowApplication(false);
// //     } catch (err) {
// //       console.error("Failed to apply:", err.response?.data || err.message);
// //       toast.error(err.response?.data?.message || "Failed to apply");
// //     }
// //   };

// //   const handleJobAlertSave = async (alertData) => {
// //     try {
// //       await createJobAlert(alertData);
// //       setShowJobAlerts(false);
// //     } catch (err) {
// //       console.error("Failed to create job alert:", err);
// //     }
// //   };

// //   const handlePageChange = (page) => {
// //     if (page < 1 || page > totalPages) return;
// //     fetchJobs(page);
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <main className="pt-16">
// //         <BreadcrumbTrail user={currentUser} />

// //         <div className="max-w-7xl mx-auto px-6 py-8">
// //           {/* Search Bar */}
// //           <div className="mb-8">
// //             <SearchBar
// //               onSearch={handleSearch}
// //               onLocationChange={setSearchLocation}
// //               savedJobs={Array.from(savedJobs).map((jobId) => {
// //                 const job = jobs.find((j) => (j._id || j.id) === jobId);
// //                 return {
// //                   title: job?.title || "Saved Job",
// //                   location: job?.location || "N/A",
// //                   company: job?.company?.name || "Company",
// //                 };
// //               })}
// //             />
// //           </div>

// //           <div className="flex flex-col lg:flex-row gap-6">
// //             {/* Sidebar */}
// //             <div className="lg:w-80 flex-shrink-0">
// //               <FilterSidebar
// //                 filters={filters}
// //                 onFiltersChange={handleFiltersChange}
// //               />
// //             </div>

// //             {/* Job List */}
// //             <div className="flex-1">
// //               {/* Controls */}
// //               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
// //                 <h2 className="text-xl font-semibold text-foreground">
// //                   {isLoading ? "Searching..." : `${jobs?.length} Jobs Found`}
// //                 </h2>

// //                 <div className="flex items-center space-x-4 mt-4 sm:mt-0">
// //                   {/* Grid/List Toggle */}
// //                   <div className="flex items-center bg-muted rounded-md p-1">
// //                     <button
// //                       onClick={() => setViewType("grid")}
// //                       className={`p-2 rounded ${
// //                         viewType === "grid"
// //                           ? "bg-background shadow-sm"
// //                           : "hover:bg-background/50"
// //                       }`}
// //                     >
// //                       <Icon name="Grid3X3" size={16} />
// //                     </button>
// //                     <button
// //                       onClick={() => setViewType("list")}
// //                       className={`p-2 rounded ${
// //                         viewType === "list"
// //                           ? "bg-background shadow-sm"
// //                           : "hover:bg-background/50"
// //                       }`}
// //                     >
// //                       <Icon name="List" size={16} />
// //                     </button>
// //                   </div>

// //                   {/* Sort */}
// //                   <select
// //                     value={sortBy}
// //                     onChange={(e) => setSortBy(e.target.value)}
// //                     className="px-3 py-2 border border-border rounded-md text-sm bg-background"
// //                   >
// //                     <option value="relevance">Most Relevant</option>
// //                     <option value="date">Newest First</option>
// //                     <option value="salary">Highest Salary</option>
// //                     <option value="match">Best Match</option>
// //                   </select>

// //                   {/* Alerts */}
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => setShowJobAlerts(true)}
// //                     iconName="Bell"
// //                     iconPosition="left"
// //                   >
// //                     Create Alert
// //                   </Button>
// //                 </div>
// //               </div>

// //               {/* Job Cards */}
// //               {isLoading ? (
// //                 <div>Loading...</div>
// //               ) : jobs?.length > 0 ? (
// //                 <div className="space-y-4">
// //                   {jobs.map((job) => (
// //                     <JobCard
// //                       key={job._id || job.id}
// //                       job={job}
// //                       onSave={handleSaveJob}
// //                       onApply={handleApply}
// //                       onViewDetails={(job) => {
// //                         setSelectedJob(job);
// //                         setShowJobDetails(true);
// //                       }}
// //                       isSaved={savedJobs.has(job._id || job.id)}
// //                     />
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-12">
// //                   <Icon name="Search" size={48} className="mx-auto mb-4" />
// //                   <h3 className="text-lg font-medium mb-2">No jobs found</h3>
// //                   <Button
// //                     variant="outline"
// //                     onClick={() => {
// //                       setFilters({});
// //                       setSearchQuery("");
// //                       setSearchLocation("");
// //                     }}
// //                   >
// //                     Clear All Filters
// //                   </Button>
// //                 </div>
// //               )}

// //               {/* Pagination */}
// //               {totalPages > 1 && (
// //                 <div className="flex justify-center items-center space-x-2 mt-6">
// //                   <Button
// //                     onClick={() => handlePageChange(currentPage - 1)}
// //                     disabled={currentPage === 1}
// //                   >
// //                     &lt; Prev
// //                   </Button>
// //                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
// //                     (page) => (
// //                       <Button
// //                         key={page}
// //                         onClick={() => handlePageChange(page)}
// //                         className={`${
// //                           currentPage === page ? "bg-primary text-white" : ""
// //                         }`}
// //                       >
// //                         {page}
// //                       </Button>
// //                     )
// //                   )}
// //                   <Button
// //                     onClick={() => handlePageChange(currentPage + 1)}
// //                     disabled={currentPage === totalPages}
// //                   >
// //                     Next &gt;
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       {/* Modals */}
// //       {showJobDetails && (
// //         <JobDetailsModal
// //           job={selectedJob}
// //           isOpen={showJobDetails}
// //           onClose={() => setShowJobDetails(false)}
// //           onApply={handleApply}
// //           onSave={handleSaveJob}
// //           isSaved={savedJobs.has(selectedJob?._id || selectedJob?.id)}
// //         />
// //       )}

// //       {showApplication && (
// //         <ApplicationModal
// //           job={selectedJob}
// //           isOpen={showApplication}
// //           onClose={() => setShowApplication(false)}
// //           onSubmit={handleApplicationSubmit}
// //         />
// //       )}

// //       {showJobAlerts && (
// //         <JobAlerts
// //           isOpen={showJobAlerts}
// //           onClose={() => setShowJobAlerts(false)}
// //           onSave={handleJobAlertSave}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default JobSearchAndApplicationPortal;
// import React, { useState, useEffect } from "react";
// import SearchBar from "./components/SearchBar";
// import FilterSidebar from "./components/FilterSidebar";
// import JobCard from "./components/JobCard";
// import JobDetailsModal from "./components/JobDetailsModal";
// import ApplicationModal from "./components/ApplicationModal";
// import JobAlerts from "./components/JobAlerts";
// import Icon from "../../AppIcon";
// import Button from "../../ui/Button";
// import BreadcrumbTrail from "../../ui/BreadcrumbTrail";
// import {
//   getAllJobs,
//   applyJob,
//   saveJob,
//   getSavedJobs,
//   createJobAlert,
// } from "../../../lib/mongo/jobServices";
// import { toast } from "react-hot-toast";

// const JobSearchAndApplicationPortal = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showJobDetails, setShowJobDetails] = useState(false);
//   const [showApplication, setShowApplication] = useState(false);
//   const [showJobAlerts, setShowJobAlerts] = useState(false);
//   const [savedJobs, setSavedJobs] = useState(new Set());
//   const [isLoading, setIsLoading] = useState(false);
//   const [sortBy, setSortBy] = useState("relevance");
//   const [viewType, setViewType] = useState("grid");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 3;

//   const currentUser = {
//     id: 1,
//     name: "Sarah Johnson",
//     email: "sarah.johnson@university.edu",
//     role: "student",
//     profileImage:
//       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//   };

//   // Fetch jobs
//   const fetchJobs = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       const data = await getAllJobs({
//         page,
//         limit: pageSize,
//         search: searchQuery,
//         location: searchLocation,
//         jobType: filters.jobType,
//         experience: filters.experience,
//         companySize: filters.companySize,
//         posted: filters.posted,
//         salaryMin: filters.salary?.min,
//         salaryMax: filters.salary?.max,
//         sortBy,
//       });
//       setJobs(data.jobs);
//       setTotalPages(data.pages || 1);
//       setCurrentPage(page);
//     } catch (err) {
//       console.error("Failed to fetch jobs:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch saved jobs
//   const fetchSavedJobs = async () => {
//     try {
//       const data = await getSavedJobs();
//       const savedSet = new Set(data.savedJobs.map((job) => job._id || job.id));
//       setSavedJobs(savedSet);
//     } catch (err) {
//       console.error("Failed to fetch saved jobs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchJobs(1);
//     fetchSavedJobs();
//   }, []);

//   useEffect(() => {
//     fetchJobs(1);
//   }, [searchQuery, searchLocation, filters, sortBy]);

//   // Handlers
//   const handleSearch = (query, location) => {
//     setSearchQuery(query);
//     setSearchLocation(location);
//   };

//   const handleFiltersChange = (newFilters) => setFilters(newFilters);

//   const handleSaveJob = async (jobId) => {
//     try {
//       const res = await saveJob(jobId);
//       const updatedSet = new Set(savedJobs);
//       if (res.isSaved) updatedSet.add(jobId);
//       else updatedSet.delete(jobId);
//       setSavedJobs(updatedSet);
//     } catch (err) {
//       console.error("Failed to save job:", err);
//     }
//   };

//   const handleApply = (job) => {
//     setSelectedJob(job);
//     setShowApplication(true);
//     setShowJobDetails(false);
//   };

//   const handleApplicationSubmit = async (formData) => {
//     try {
//       if (!selectedJob) throw new Error("No job selected");

//       const answersArray = (selectedJob.customQuestions || []).map((q) => {
//         const ansObj = formData.customAnswers.find(
//           (a) => a.questionId === (q._id || q.id)
//         );
//         return {
//           questionId: q._id || q.id,
//           answer: ansObj?.answer || "",
//         };
//       });

//       await applyJob(selectedJob._id || selectedJob.id, {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         coverLetter: formData.coverLetter,
//         resume: formData.resume ? formData.resume.name : "",
//         answers: answersArray,
//       });

//       toast.success("Application submitted successfully!");
//       setShowApplication(false);
//     } catch (err) {
//       console.error("Failed to apply:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Failed to apply");
//     }
//   };

//   const handleJobAlertSave = async (alertData) => {
//     try {
//       await createJobAlert(alertData);
//       setShowJobAlerts(false);
//     } catch (err) {
//       console.error("Failed to create job alert:", err);
//     }
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     fetchJobs(page);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="pt-16">
//         <BreadcrumbTrail user={currentUser} />

//         <div className="max-w-7xl mx-auto px-6 py-8">
//           {/* Search */}
//           <div className="mb-8">
//             <SearchBar
//               onSearch={handleSearch}
//               onLocationChange={setSearchLocation}
//               savedJobs={Array.from(savedJobs).map((jobId) => {
//                 const job = jobs.find((j) => (j._id || j.id) === jobId);
//                 return {
//                   title: job?.title || "Saved Job",
//                   location: job?.location || "N/A",
//                   company: job?.company?.name || "Company",
//                 };
//               })}
//             />
//           </div>

//           <div className="flex flex-col lg:flex-row gap-6">
//             <div className="lg:w-80 flex-shrink-0">
//               <FilterSidebar
//                 filters={filters}
//                 onFiltersChange={handleFiltersChange}
//               />
//             </div>

//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-foreground">
//                   {isLoading ? "Searching..." : `${jobs?.length} Jobs Found`}
//                 </h2>

//                 <div className="flex items-center space-x-4 mt-4 sm:mt-0">
//                   <div className="flex items-center bg-muted rounded-md p-1">
//                     <button
//                       onClick={() => setViewType("grid")}
//                       className={`p-2 rounded ${
//                         viewType === "grid"
//                           ? "bg-background shadow-sm"
//                           : "hover:bg-background/50"
//                       }`}
//                     >
//                       <Icon name="Grid3X3" size={16} />
//                     </button>
//                     <button
//                       onClick={() => setViewType("list")}
//                       className={`p-2 rounded ${
//                         viewType === "list"
//                           ? "bg-background shadow-sm"
//                           : "hover:bg-background/50"
//                       }`}
//                     >
//                       <Icon name="List" size={16} />
//                     </button>
//                   </div>

//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-3 py-2 border border-border rounded-md text-sm bg-background"
//                   >
//                     <option value="relevance">Most Relevant</option>
//                     <option value="date">Newest First</option>
//                     <option value="salary">Highest Salary</option>
//                     <option value="match">Best Match</option>
//                   </select>

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setShowJobAlerts(true)}
//                     iconName="Bell"
//                     iconPosition="left"
//                   >
//                     Create Alert
//                   </Button>
//                 </div>
//               </div>

//               {/* Job Cards */}
//               {isLoading ? (
//                 <div>Loading...</div>
//               ) : jobs?.length > 0 ? (
//                 <div className="space-y-4">
//                   {jobs.map((job) => (
//                     <JobCard
//                       key={job._id || job.id}
//                       job={job}
//                       onSave={handleSaveJob}
//                       onApply={handleApply}
//                       onViewDetails={(job) => {
//                         setSelectedJob(job);
//                         setShowJobDetails(true);
//                       }}
//                       isSaved={savedJobs.has(job._id || job.id)}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <Icon name="Search" size={48} className="mx-auto mb-4" />
//                   <h3 className="text-lg font-medium mb-2">No jobs found</h3>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setFilters({});
//                       setSearchQuery("");
//                       setSearchLocation("");
//                     }}
//                   >
//                     Clear All Filters
//                   </Button>
//                 </div>
//               )}

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center space-x-2 mt-6">
//                   <Button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   >
//                     &lt; Prev
//                   </Button>
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (page) => (
//                       <Button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`${
//                           currentPage === page ? "bg-primary text-white" : ""
//                         }`}
//                       >
//                         {page}
//                       </Button>
//                     )
//                   )}
//                   <Button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   >
//                     Next &gt;
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Modals */}
//       {showJobDetails && (
//         <JobDetailsModal
//           job={selectedJob}
//           isOpen={showJobDetails}
//           onClose={() => setShowJobDetails(false)}
//           onApply={handleApply}
//           onSave={handleSaveJob}
//           isSaved={savedJobs.has(selectedJob?._id || selectedJob?.id)}
//         />
//       )}

//       {showApplication && (
//         <ApplicationModal
//           job={selectedJob}
//           isOpen={showApplication}
//           onClose={() => setShowApplication(false)}
//           onSubmit={handleApplicationSubmit}
//         />
//       )}

//       {showJobAlerts && (
//         <JobAlerts
//           isOpen={showJobAlerts}
//           onClose={() => setShowJobAlerts(false)}
//           onSave={handleJobAlertSave}
//         />
//       )}
//     </div>
//   );
// };

// export default JobSearchAndApplicationPortal;
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import FilterSidebar from "./components/FilterSidebar";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import ApplicationModal from "./components/ApplicationModal";
import JobAlerts from "./components/JobAlerts";
import Icon from "../../AppIcon";
import Button from "../../ui/Button";
import BreadcrumbTrail from "../../ui/BreadcrumbTrail";
import {
  getAllJobs,
  applyJob,
  saveJob,
  getSavedJobs,
  createJobAlert,
} from "../../../lib/mongo/jobServices";
import { toast } from "react-hot-toast";

const JobSearchAndApplicationPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [showJobAlerts, setShowJobAlerts] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewType, setViewType] = useState("grid");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;

  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  };

  // Fetch jobs
  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getAllJobs({
        page,
        limit: pageSize,
        search: searchQuery,
        location: searchLocation,
        jobType: filters.jobType,
        experience: filters.experience,
        companySize: filters.companySize,
        posted: filters.posted,
        salaryMin: filters.salary?.min,
        salaryMax: filters.salary?.max,
        sortBy,
      });
      setJobs(data.jobs);
      setTotalPages(data.pages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      const data = await getSavedJobs();
      const savedSet = new Set(data.savedJobs.map((job) => job._id || job.id));
      setSavedJobs(savedSet);
    } catch (err) {
      console.error("Failed to fetch saved jobs:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchJobs(1);
    fetchSavedJobs();
  }, []);

  // Refetch on filters/search/sort
  useEffect(() => {
    fetchJobs(1);
  }, [searchQuery, searchLocation, filters, sortBy]);

  // Handlers
  const handleSearch = (query = searchQuery, location = searchLocation) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  const handleSaveJob = async (jobId) => {
    try {
      const res = await saveJob(jobId);
      const updatedSet = new Set(savedJobs);
      if (res.isSaved) updatedSet.add(jobId);
      else updatedSet.delete(jobId);
      setSavedJobs(updatedSet);
    } catch (err) {
      console.error("Failed to save job:", err);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
    setShowJobDetails(false);
  };

  const handleApplicationSubmit = async (formData) => {
    try {
      if (!selectedJob) throw new Error("No job selected");

      const answersArray = (selectedJob.customQuestions || []).map((q) => {
        const ansObj = formData.customAnswers.find(
          (a) => a.questionId === (q._id || q.id)
        );
        return {
          questionId: q._id || q.id,
          answer: ansObj?.answer || "",
        };
      });

      await applyJob(selectedJob._id || selectedJob.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resume: formData.resume ? formData.resume.name : "",
        answers: answersArray,
      });

      toast.success("Application submitted successfully!");
      setShowApplication(false);
    } catch (err) {
      console.error("Failed to apply:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleJobAlertSave = async (alertData) => {
    try {
      await createJobAlert(alertData);
      setShowJobAlerts(false);
    } catch (err) {
      console.error("Failed to create job alert:", err);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchJobs(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <BreadcrumbTrail user={currentUser} />

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              onLocationChange={(loc) => handleSearch(searchQuery, loc)}
              savedJobs={Array.from(savedJobs).map((jobId) => {
                const job = jobs.find((j) => (j._id || j.id) === jobId);
                return {
                  title: job?.title || "Saved Job",
                  location: job?.location || "N/A",
                  company: job?.company?.name || "Company",
                };
              })}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {isLoading ? "Searching..." : `${jobs?.length} Jobs Found`}
                </h2>

                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center bg-muted rounded-md p-1">
                    <button
                      onClick={() => setViewType("grid")}
                      className={`p-2 rounded ${
                        viewType === "grid"
                          ? "bg-background shadow-sm"
                          : "hover:bg-background/50"
                      }`}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewType("list")}
                      className={`p-2 rounded ${
                        viewType === "list"
                          ? "bg-background shadow-sm"
                          : "hover:bg-background/50"
                      }`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md text-sm bg-background"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="date">Newest First</option>
                    <option value="salary">Highest Salary</option>
                    <option value="match">Best Match</option>
                  </select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowJobAlerts(true)}
                    iconName="Bell"
                    iconPosition="left"
                  >
                    Create Alert
                  </Button>
                </div>
              </div>

              {/* Job Cards */}
              {isLoading ? (
                <div>Loading...</div>
              ) : jobs?.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id || job.id}
                      job={job}
                      onSave={handleSaveJob}
                      onApply={handleApply}
                      onViewDetails={(job) => {
                        setSelectedJob(job);
                        setShowJobDetails(true);
                      }}
                      isSaved={savedJobs.has(job._id || job.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({});
                      setSearchQuery("");
                      setSearchLocation("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-none"
                  >
                    &lt; Prev
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${
                          currentPage === page ? "bg-blue-950 text-white rounded-none" : "rounded-none"
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-none"
                  >
                    Next &gt;
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showJobDetails && (
        <JobDetailsModal
          job={selectedJob}
          isOpen={showJobDetails}
          onClose={() => setShowJobDetails(false)}
          onApply={handleApply}
          onSave={handleSaveJob}
          isSaved={savedJobs.has(selectedJob?._id || selectedJob?.id)}
        />
      )}

      {showApplication && (
        <ApplicationModal
          job={selectedJob}
          isOpen={showApplication}
          onClose={() => setShowApplication(false)}
          onSubmit={handleApplicationSubmit}
        />
      )}

      {showJobAlerts && (
        <JobAlerts
          isOpen={showJobAlerts}
          onClose={() => setShowJobAlerts(false)}
          onSave={handleJobAlertSave}
        />
      )}
    </div>
  );
};

export default JobSearchAndApplicationPortal;
