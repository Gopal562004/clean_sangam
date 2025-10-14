// // // // // // // // // import React, { useState } from "react";
// // // // // // // // // import Button from "../../../components/ui/Button";
// // // // // // // // // import Icon from "../../../components/AppIcon";

// // // // // // // // // // Sample Job Data
// // // // // // // // // const jobsData = [
// // // // // // // // //   {
// // // // // // // // //     id: 1,
// // // // // // // // //     title: "Frontend Developer",
// // // // // // // // //     company: "Tech Solutions Inc.",
// // // // // // // // //     location: "Remote",
// // // // // // // // //     type: "Full-Time",
// // // // // // // // //     status: "active",
// // // // // // // // //     postedDate: "2025-09-01",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 2,
// // // // // // // // //     title: "Data Scientist",
// // // // // // // // //     company: "AI Labs",
// // // // // // // // //     location: "New York, NY",
// // // // // // // // //     type: "Part-Time",
// // // // // // // // //     status: "paused",
// // // // // // // // //     postedDate: "2025-08-25",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 3,
// // // // // // // // //     title: "Backend Engineer",
// // // // // // // // //     company: "CloudTech",
// // // // // // // // //     location: "San Francisco, CA",
// // // // // // // // //     type: "Full-Time",
// // // // // // // // //     status: "active",
// // // // // // // // //     postedDate: "2025-08-30",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 4,
// // // // // // // // //     title: "UI/UX Designer",
// // // // // // // // //     company: "Creative Minds",
// // // // // // // // //     location: "Remote",
// // // // // // // // //     type: "Contract",
// // // // // // // // //     status: "closed",
// // // // // // // // //     postedDate: "2025-08-20",
// // // // // // // // //   },
// // // // // // // // // ];

// // // // // // // // // const JobManagement = ({ onViewJob, onEditJob, onDeactivateJob }) => {
// // // // // // // // //   const [jobs, setJobs] = useState(jobsData);

// // // // // // // // //   const getStatusBadge = (status) => {
// // // // // // // // //     const badges = {
// // // // // // // // //       active: { label: "Active", color: "bg-success/10 text-success" },
// // // // // // // // //       paused: { label: "Paused", color: "bg-warning/10 text-warning" },
// // // // // // // // //       closed: { label: "Closed", color: "bg-error/10 text-error" },
// // // // // // // // //     };
// // // // // // // // //     return (
// // // // // // // // //       badges?.[status] || {
// // // // // // // // //         label: status,
// // // // // // // // //         color: "bg-muted text-text-secondary",
// // // // // // // // //       }
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="space-y-6">
// // // // // // // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // // // // // //         <h3 className="text-xl font-semibold text-text-primary">
// // // // // // // // //           Job Management
// // // // // // // // //         </h3>
// // // // // // // // //         <Button
// // // // // // // // //           variant="default"
// // // // // // // // //           iconName="Plus"
// // // // // // // // //           onClick={() => onEditJob(null)}
// // // // // // // // //         >
// // // // // // // // //           Post New Job
// // // // // // // // //         </Button>
// // // // // // // // //       </div>

// // // // // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // //         {jobs.map((job) => {
// // // // // // // // //           const statusBadge = getStatusBadge(job?.status);
// // // // // // // // //           return (
// // // // // // // // //             <div
// // // // // // // // //               key={job.id}
// // // // // // // // //               className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition"
// // // // // // // // //             >
// // // // // // // // //               <div className="flex justify-between items-start mb-2">
// // // // // // // // //                 <h4 className="text-lg font-semibold text-text-primary">
// // // // // // // // //                   {job.title}
// // // // // // // // //                 </h4>
// // // // // // // // //                 <span
// // // // // // // // //                   className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // // // // // // // //                 >
// // // // // // // // //                   {statusBadge.label}
// // // // // // // // //                 </span>
// // // // // // // // //               </div>
// // // // // // // // //               <p className="text-sm text-text-secondary">{job.company}</p>
// // // // // // // // //               <p className="text-sm text-text-secondary">
// // // // // // // // //                 {job.location} • {job.type}
// // // // // // // // //               </p>
// // // // // // // // //               <p className="text-xs text-text-secondary mt-2">
// // // // // // // // //                 Posted: {job.postedDate}
// // // // // // // // //               </p>

// // // // // // // // //               <div className="flex mt-4 space-x-2">
// // // // // // // // //                 <Button
// // // // // // // // //                   variant="ghost"
// // // // // // // // //                   size="sm"
// // // // // // // // //                   iconName="Eye"
// // // // // // // // //                   onClick={() => onViewJob(job.id)}
// // // // // // // // //                 >
// // // // // // // // //                   View
// // // // // // // // //                 </Button>
// // // // // // // // //                 <Button
// // // // // // // // //                   variant="default"
// // // // // // // // //                   size="sm"
// // // // // // // // //                   iconName="Edit"
// // // // // // // // //                   onClick={() => onEditJob(job.id)}
// // // // // // // // //                 >
// // // // // // // // //                   Edit
// // // // // // // // //                 </Button>
// // // // // // // // //                 {job.status !== "closed" && (
// // // // // // // // //                   <Button
// // // // // // // // //                     variant="destructive"
// // // // // // // // //                     size="sm"
// // // // // // // // //                     iconName="Ban"
// // // // // // // // //                     onClick={() => onDeactivateJob(job.id)}
// // // // // // // // //                   >
// // // // // // // // //                     Deactivate
// // // // // // // // //                   </Button>
// // // // // // // // //                 )}
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         })}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default JobManagement;
// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import Button from "../../../components/ui/Button";
// // // // // // // // import Icon from "../../../components/AppIcon";
// // // // // // // // import {
// // // // // // // //   getAllJobs,
// // // // // // // //   createJob,
// // // // // // // //   updateJob,
// // // // // // // //   deleteJob,
// // // // // // // //   approveJob,
// // // // // // // //   rejectJob,
// // // // // // // // } from "../../../lib/mongo/jobServices";
// // // // // // // // import JobFormModal from "../components/JobFormModal"; // ✅ Import modal

// // // // // // // // const JobManagement = () => {
// // // // // // // //   const [jobs, setJobs] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);

// // // // // // // //   // Fetch jobs
// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchJobs();
// // // // // // // //   }, []);

// // // // // // // //   const fetchJobs = async () => {
// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       const res = await getAllJobs();
// // // // // // // //       setJobs(res.jobs || []);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Failed to fetch jobs:", error);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Handle create job
// // // // // // // //   const handleCreateJob = async (jobData) => {
// // // // // // // //     try {
// // // // // // // //       await createJob(jobData);
// // // // // // // //       setIsModalOpen(false);
// // // // // // // //       fetchJobs();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Failed to create job:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleEditJob = async (jobId) => {
// // // // // // // //     try {
// // // // // // // //       await updateJob(jobId, { title: "Updated Job Title" });
// // // // // // // //       fetchJobs();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Failed to update job:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleDeactivateJob = async (jobId) => {
// // // // // // // //     try {
// // // // // // // //       await deleteJob(jobId);
// // // // // // // //       fetchJobs();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Failed to deactivate job:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleApprove = async (jobId) => {
// // // // // // // //     try {
// // // // // // // //       await approveJob(jobId);
// // // // // // // //       fetchJobs();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Failed to approve job:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleReject = async (jobId) => {
// // // // // // // //     try {
// // // // // // // //       await rejectJob(jobId);
// // // // // // // //       fetchJobs();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Failed to reject job:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const getStatusBadge = (status) => {
// // // // // // // //     const badges = {
// // // // // // // //       approved: { label: "Approved", color: "bg-success/10 text-success" },
// // // // // // // //       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
// // // // // // // //       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
// // // // // // // //     };
// // // // // // // //     return (
// // // // // // // //       badges?.[status] || {
// // // // // // // //         label: status,
// // // // // // // //         color: "bg-muted text-text-secondary",
// // // // // // // //       }
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="space-y-6">
// // // // // // // //       {/* Header */}
// // // // // // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // // // // //         <h3 className="text-xl font-semibold text-text-primary">
// // // // // // // //           Job Management
// // // // // // // //         </h3>
// // // // // // // //         <Button
// // // // // // // //           variant="default"
// // // // // // // //           iconName="Plus"
// // // // // // // //           onClick={() => setIsModalOpen(true)}
// // // // // // // //         >
// // // // // // // //           Post New Job
// // // // // // // //         </Button>
// // // // // // // //       </div>

// // // // // // // //       {/* Job Form Modal */}
// // // // // // // //       {isModalOpen && (
// // // // // // // //         <JobFormModal
// // // // // // // //           onClose={() => setIsModalOpen(false)}
// // // // // // // //           onSubmit={handleCreateJob}
// // // // // // // //         />
// // // // // // // //       )}

// // // // // // // //       {/* Loading */}
// // // // // // // //       {loading && <p className="text-text-secondary">Loading jobs...</p>}

// // // // // // // //       {/* Jobs Grid */}
// // // // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // //         {jobs.map((job) => {
// // // // // // // //           const statusBadge = getStatusBadge(job?.status);
// // // // // // // //           return (
// // // // // // // //             <div
// // // // // // // //               key={job._id}
// // // // // // // //               className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition"
// // // // // // // //             >
// // // // // // // //               <div className="flex justify-between items-start mb-2">
// // // // // // // //                 <h4 className="text-lg font-semibold text-text-primary">
// // // // // // // //                   {job.title}
// // // // // // // //                 </h4>
// // // // // // // //                 <span
// // // // // // // //                   className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // // // // // // //                 >
// // // // // // // //                   {statusBadge.label}
// // // // // // // //                 </span>
// // // // // // // //               </div>

// // // // // // // //               <p className="text-sm text-text-secondary">
// // // // // // // //                 {job.company?.name || "Unknown Company"}
// // // // // // // //               </p>
// // // // // // // //               <p className="text-sm text-text-secondary">
// // // // // // // //                 {job.location} • {job.employmentType}
// // // // // // // //               </p>
// // // // // // // //               <p className="text-xs text-text-secondary mt-2">
// // // // // // // //                 Posted:{" "}
// // // // // // // //                 {job.postedDate
// // // // // // // //                   ? new Date(job.postedDate).toLocaleDateString()
// // // // // // // //                   : "N/A"}
// // // // // // // //               </p>

// // // // // // // //               <div className="flex mt-4 flex-wrap gap-2">
// // // // // // // //                 <Button
// // // // // // // //                   variant="ghost"
// // // // // // // //                   size="sm"
// // // // // // // //                   iconName="Eye"
// // // // // // // //                   onClick={() => console.log("View job", job._id)}
// // // // // // // //                 >
// // // // // // // //                   View
// // // // // // // //                 </Button>
// // // // // // // //                 <Button
// // // // // // // //                   variant="default"
// // // // // // // //                   size="sm"
// // // // // // // //                   iconName="Edit"
// // // // // // // //                   onClick={() => handleEditJob(job._id)}
// // // // // // // //                 >
// // // // // // // //                   Edit
// // // // // // // //                 </Button>
// // // // // // // //                 <Button
// // // // // // // //                   variant="destructive"
// // // // // // // //                   size="sm"
// // // // // // // //                   iconName="Ban"
// // // // // // // //                   onClick={() => handleDeactivateJob(job._id)}
// // // // // // // //                 >
// // // // // // // //                   Deactivate
// // // // // // // //                 </Button>

// // // // // // // //                 {job.status === "pending" && (
// // // // // // // //                   <>
// // // // // // // //                     <Button
// // // // // // // //                       variant="success"
// // // // // // // //                       size="sm"
// // // // // // // //                       iconName="Check"
// // // // // // // //                       onClick={() => handleApprove(job._id)}
// // // // // // // //                     >
// // // // // // // //                       Approve
// // // // // // // //                     </Button>
// // // // // // // //                     <Button
// // // // // // // //                       variant="destructive"
// // // // // // // //                       size="sm"
// // // // // // // //                       iconName="X"
// // // // // // // //                       onClick={() => handleReject(job._id)}
// // // // // // // //                     >
// // // // // // // //                       Reject
// // // // // // // //                     </Button>
// // // // // // // //                   </>
// // // // // // // //                 )}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           );
// // // // // // // //         })}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default JobManagement;
// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import Button from "../../../components/ui/Button";
// // // // // // // import {
// // // // // // //   getAllJobs,
// // // // // // //   getPendingJobs,
// // // // // // //   createJob,
// // // // // // //   updateJob,
// // // // // // //   deleteJob,
// // // // // // //   approveJob,
// // // // // // //   rejectJob,
// // // // // // // } from "../../../lib/mongo/jobServices";
// // // // // // // import JobFormModal from "../components/JobFormModal"; // ✅ Import modal

// // // // // // // const JobManagement = () => {
// // // // // // //   const [jobs, setJobs] = useState([]);
// // // // // // //   const [pendingJobs, setPendingJobs] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);

// // // // // // //   // Fetch jobs on mount
// // // // // // //   useEffect(() => {
// // // // // // //     fetchJobs();
// // // // // // //     fetchPendingJobs();
// // // // // // //   }, []);

// // // // // // //   const fetchJobs = async () => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const res = await getAllJobs();
// // // // // // //       setJobs(res.jobs || []);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to fetch jobs:", error);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const fetchPendingJobs = async () => {
// // // // // // //     try {
// // // // // // //       const res = await getPendingJobs();
// // // // // // //       setPendingJobs(res.jobs || []);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to fetch pending jobs:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Handle create job
// // // // // // //   const handleCreateJob = async (jobData) => {
// // // // // // //     try {
// // // // // // //       await createJob(jobData);
// // // // // // //       setIsModalOpen(false);
// // // // // // //       fetchJobs();
// // // // // // //       fetchPendingJobs();
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to create job:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleEditJob = async (jobId) => {
// // // // // // //     try {
// // // // // // //       await updateJob(jobId, { title: "Updated Job Title" });
// // // // // // //       fetchJobs();
// // // // // // //       fetchPendingJobs();
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to update job:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleDeactivateJob = async (jobId) => {
// // // // // // //     try {
// // // // // // //       await deleteJob(jobId);
// // // // // // //       fetchJobs();
// // // // // // //       fetchPendingJobs();
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to deactivate job:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleApprove = async (jobId) => {
// // // // // // //     try {
// // // // // // //       await approveJob(jobId);
// // // // // // //       fetchJobs();
// // // // // // //       fetchPendingJobs();
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to approve job:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleReject = async (jobId) => {
// // // // // // //     try {
// // // // // // //       await rejectJob(jobId);
// // // // // // //       fetchJobs();
// // // // // // //       fetchPendingJobs();
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Failed to reject job:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getStatusBadge = (status) => {
// // // // // // //     const badges = {
// // // // // // //       approved: { label: "Approved", color: "bg-green-100 text-green-700" },
// // // // // // //       pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
// // // // // // //       rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
// // // // // // //     };
// // // // // // //     return (
// // // // // // //       badges?.[status] || {
// // // // // // //         label: status,
// // // // // // //         color: "bg-gray-100 text-gray-600",
// // // // // // //       }
// // // // // // //     );
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="space-y-10">
// // // // // // //       {/* Header */}
// // // // // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // // // //         <h3 className="text-xl font-semibold text-text-primary">
// // // // // // //           Job Management
// // // // // // //         </h3>
// // // // // // //         <Button
// // // // // // //           variant="default"
// // // // // // //           iconName="Plus"
// // // // // // //           onClick={() => setIsModalOpen(true)}
// // // // // // //         >
// // // // // // //           Post New Job
// // // // // // //         </Button>
// // // // // // //       </div>

// // // // // // //       {/* Job Form Modal */}
// // // // // // //       {isModalOpen && (
// // // // // // //         <JobFormModal
// // // // // // //           onClose={() => setIsModalOpen(false)}
// // // // // // //           onSubmit={handleCreateJob}
// // // // // // //         />
// // // // // // //       )}

// // // // // // //       {/* Loading */}
// // // // // // //       {loading && <p className="text-text-secondary">Loading jobs...</p>}

// // // // // // //       {/* ✅ Pending Jobs Section */}
// // // // // // //       <div>
// // // // // // //         <h4 className="text-lg font-semibold mb-4 text-yellow-600">
// // // // // // //           Pending Jobs (Needs Approval)
// // // // // // //         </h4>
// // // // // // //         {pendingJobs.length === 0 ? (
// // // // // // //           <p className="text-sm text-text-secondary">
// // // // // // //             No pending jobs for approval.
// // // // // // //           </p>
// // // // // // //         ) : (
// // // // // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //             {pendingJobs.map((job) => (
// // // // // // //               <div
// // // // // // //                 key={job._id}
// // // // // // //                 className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition"
// // // // // // //               >
// // // // // // //                 <div className="flex justify-between items-start mb-2">
// // // // // // //                   <h4 className="text-lg font-semibold text-text-primary">
// // // // // // //                     {job.title}
// // // // // // //                   </h4>
// // // // // // //                   <span
// // // // // // //                     className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
// // // // // // //                       getStatusBadge(job.status).color
// // // // // // //                     }`}
// // // // // // //                   >
// // // // // // //                     {getStatusBadge(job.status).label}
// // // // // // //                   </span>
// // // // // // //                 </div>
// // // // // // //                 <p className="text-sm text-text-secondary">
// // // // // // //                   {job.company?.name || "Unknown Company"}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-sm text-text-secondary">
// // // // // // //                   {job.location} • {job.employmentType}
// // // // // // //                 </p>

// // // // // // //                 <div className="flex mt-4 flex-wrap gap-2">
// // // // // // //                   <Button
// // // // // // //                     variant="success"
// // // // // // //                     size="sm"
// // // // // // //                     iconName="Check"
// // // // // // //                     onClick={() => handleApprove(job._id)}
// // // // // // //                   >
// // // // // // //                     Approve
// // // // // // //                   </Button>
// // // // // // //                   <Button
// // // // // // //                     variant="destructive"
// // // // // // //                     size="sm"
// // // // // // //                     iconName="X"
// // // // // // //                     onClick={() => handleReject(job._id)}
// // // // // // //                   >
// // // // // // //                     Reject
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* ✅ All Jobs Section */}
// // // // // // //       <div>
// // // // // // //         <h4 className="text-lg font-semibold mb-4 text-text-primary">
// // // // // // //           All Jobs
// // // // // // //         </h4>
// // // // // // //         {jobs.length === 0 ? (
// // // // // // //           <p className="text-sm text-text-secondary">No jobs found.</p>
// // // // // // //         ) : (
// // // // // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //             {jobs.map((job) => {
// // // // // // //               const statusBadge = getStatusBadge(job?.status);
// // // // // // //               return (
// // // // // // //                 <div
// // // // // // //                   key={job._id}
// // // // // // //                   className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition"
// // // // // // //                 >
// // // // // // //                   <div className="flex justify-between items-start mb-2">
// // // // // // //                     <h4 className="text-lg font-semibold text-text-primary">
// // // // // // //                       {job.title}
// // // // // // //                     </h4>
// // // // // // //                     <span
// // // // // // //                       className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // // // // // //                     >
// // // // // // //                       {statusBadge.label}
// // // // // // //                     </span>
// // // // // // //                   </div>

// // // // // // //                   <p className="text-sm text-text-secondary">
// // // // // // //                     {job.company?.name || "Unknown Company"}
// // // // // // //                   </p>
// // // // // // //                   <p className="text-sm text-text-secondary">
// // // // // // //                     {job.location} • {job.employmentType}
// // // // // // //                   </p>
// // // // // // //                   <p className="text-xs text-text-secondary mt-2">
// // // // // // //                     Posted:{" "}
// // // // // // //                     {job.postedDate
// // // // // // //                       ? new Date(job.postedDate).toLocaleDateString()
// // // // // // //                       : "N/A"}
// // // // // // //                   </p>

// // // // // // //                   <div className="flex mt-4 flex-wrap gap-2">
// // // // // // //                     <Button
// // // // // // //                       variant="ghost"
// // // // // // //                       size="sm"
// // // // // // //                       iconName="Eye"
// // // // // // //                       onClick={() => console.log("View job", job._id)}
// // // // // // //                     >
// // // // // // //                       View
// // // // // // //                     </Button>
// // // // // // //                     <Button
// // // // // // //                       variant="default"
// // // // // // //                       size="sm"
// // // // // // //                       iconName="Edit"
// // // // // // //                       onClick={() => handleEditJob(job._id)}
// // // // // // //                     >
// // // // // // //                       Edit
// // // // // // //                     </Button>
// // // // // // //                     <Button
// // // // // // //                       variant="destructive"
// // // // // // //                       size="sm"
// // // // // // //                       iconName="Ban"
// // // // // // //                       onClick={() => handleDeactivateJob(job._id)}
// // // // // // //                     >
// // // // // // //                       Deactivate
// // // // // // //                     </Button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               );
// // // // // // //             })}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default JobManagement;
// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import Button from "../../../components/ui/Button";
// // // // // // import Icon from "../../../components/AppIcon";
// // // // // // import JobFormModal from "../components/JobFormModal";
// // // // // // import {
// // // // // //   getAllJobs,
// // // // // //   getPendingJobs,
// // // // // //   createJob,
// // // // // //   updateJob,
// // // // // //   deleteJob,
// // // // // //   approveJob,
// // // // // //   rejectJob,
// // // // // // } from "../../../lib/mongo/jobServices";

// // // // // // // Reusable Job Card
// // // // // // const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
// // // // // //   const getStatusBadge = (status) => {
// // // // // //     const badges = {
// // // // // //       approved: { label: "Approved", color: "bg-success/10 text-success" },
// // // // // //       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
// // // // // //       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
// // // // // //     };
// // // // // //     return (
// // // // // //       badges?.[status] || {
// // // // // //         label: status,
// // // // // //         color: "bg-muted text-text-secondary",
// // // // // //       }
// // // // // //     );
// // // // // //   };

// // // // // //   const statusBadge = getStatusBadge(job.status);

// // // // // //   return (
// // // // // //     <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
// // // // // //       <div className="flex justify-between items-start mb-2">
// // // // // //         <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
// // // // // //         <span
// // // // // //           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // // // // //         >
// // // // // //           {statusBadge.label}
// // // // // //         </span>
// // // // // //       </div>

// // // // // //       <p className="text-sm text-text-secondary">
// // // // // //         {job.company?.name || "Unknown Company"}
// // // // // //       </p>
// // // // // //       <p className="text-sm text-text-secondary">
// // // // // //         {job.location} • {job.employmentType}
// // // // // //       </p>
// // // // // //       <p className="text-xs text-text-secondary mt-2">
// // // // // //         Posted:{" "}
// // // // // //         {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
// // // // // //       </p>

// // // // // //       <div className="flex mt-4 flex-wrap gap-2">
// // // // // //         {onEdit && (
// // // // // //           <Button
// // // // // //             variant="default"
// // // // // //             size="sm"
// // // // // //             iconName="Edit"
// // // // // //             onClick={() => onEdit(job._id)}
// // // // // //           >
// // // // // //             Edit
// // // // // //           </Button>
// // // // // //         )}
// // // // // //         {onDeactivate && (
// // // // // //           <Button
// // // // // //             variant="destructive"
// // // // // //             size="sm"
// // // // // //             iconName="Ban"
// // // // // //             onClick={() => onDeactivate(job._id)}
// // // // // //           >
// // // // // //             Deactivate
// // // // // //           </Button>
// // // // // //         )}
// // // // // //         {onApprove && (
// // // // // //           <Button
// // // // // //             variant="success"
// // // // // //             size="sm"
// // // // // //             iconName="Check"
// // // // // //             onClick={() => onApprove(job._id)}
// // // // // //           >
// // // // // //             Approve
// // // // // //           </Button>
// // // // // //         )}
// // // // // //         {onReject && (
// // // // // //           <Button
// // // // // //             variant="destructive"
// // // // // //             size="sm"
// // // // // //             iconName="X"
// // // // // //             onClick={() => onReject(job._id)}
// // // // // //           >
// // // // // //             Reject
// // // // // //           </Button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const JobManagement = () => {
// // // // // //   const [jobs, setJobs] = useState([]);
// // // // // //   const [pendingJobs, setPendingJobs] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     fetchJobs();
// // // // // //     fetchPendingJobs();
// // // // // //   }, []);

// // // // // //   const fetchJobs = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const res = await getAllJobs(); // fetch all jobs
// // // // // //       setJobs(res.jobs || []);
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to fetch jobs:", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchPendingJobs = async () => {
// // // // // //     try {
// // // // // //       const res = await getPendingJobs();
// // // // // //       setPendingJobs(res.jobs || []);
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to fetch pending jobs:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleCreateJob = async (jobData) => {
// // // // // //     try {
// // // // // //       await createJob(jobData);
// // // // // //       setIsModalOpen(false);
// // // // // //       fetchJobs();
// // // // // //       fetchPendingJobs();
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to create job:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleEditJob = async (jobId) => {
// // // // // //     try {
// // // // // //       await updateJob(jobId, { title: "Updated Job Title" }); // Example edit
// // // // // //       fetchJobs();
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to update job:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDeactivateJob = async (jobId) => {
// // // // // //     try {
// // // // // //       await deleteJob(jobId);
// // // // // //       fetchJobs();
// // // // // //       fetchPendingJobs();
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to deactivate job:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleApprove = async (jobId) => {
// // // // // //     try {
// // // // // //       await approveJob(jobId);
// // // // // //       fetchJobs();
// // // // // //       fetchPendingJobs();
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to approve job:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleReject = async (jobId) => {
// // // // // //     try {
// // // // // //       await rejectJob(jobId);
// // // // // //       fetchJobs();
// // // // // //       fetchPendingJobs();
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Failed to reject job:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-8">
// // // // // //       {/* Header */}
// // // // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // // //         <h3 className="text-xl font-semibold text-text-primary">
// // // // // //           Job Management
// // // // // //         </h3>
// // // // // //         <Button
// // // // // //           variant="default"
// // // // // //           iconName="Plus"
// // // // // //           onClick={() => setIsModalOpen(true)}
// // // // // //         >
// // // // // //           Post New Job
// // // // // //         </Button>
// // // // // //       </div>

// // // // // //       {/* Job Form Modal */}
// // // // // //       {isModalOpen && (
// // // // // //         <JobFormModal
// // // // // //           onClose={() => setIsModalOpen(false)}
// // // // // //           onSubmit={handleCreateJob}
// // // // // //         />
// // // // // //       )}

// // // // // //       {/* Loading */}
// // // // // //       {loading && <p className="text-text-secondary">Loading jobs...</p>}

// // // // // //       {/* Pending Jobs */}
// // // // // //       {pendingJobs.length > 0 && (
// // // // // //         <div>
// // // // // //           <h4 className="text-lg font-semibold mb-2 text-yellow-600">
// // // // // //             Pending Jobs (Needs Approval)
// // // // // //           </h4>
// // // // // //           <div className="max-h-[400px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //             {pendingJobs.map((job) => (
// // // // // //               <JobCard
// // // // // //                 key={job._id}
// // // // // //                 job={job}
// // // // // //                 onApprove={handleApprove}
// // // // // //                 onReject={handleReject}
// // // // // //               />
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* All Jobs */}
// // // // // //       <div>
// // // // // //         <h4 className="text-lg font-semibold mb-2 text-text-primary">
// // // // // //           All Jobs
// // // // // //         </h4>
// // // // // //         <div className="max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //           {jobs.map((job) => (
// // // // // //             <JobCard
// // // // // //               key={job._id}
// // // // // //               job={job}
// // // // // //               onEdit={handleEditJob}
// // // // // //               onDeactivate={handleDeactivateJob}
// // // // // //             />
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default JobManagement;
// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import Button from "../../../components/ui/Button";
// // // // // import JobFormModal from "../components/JobFormModal";
// // // // // import {
// // // // //   getAllJobs,
// // // // //   getPendingJobs,
// // // // //   createJob,
// // // // //   updateJob,
// // // // //   deleteJob,
// // // // //   approveJob,
// // // // //   rejectJob,
// // // // // } from "../../../lib/mongo/jobServices";

// // // // // // Reusable Job Card
// // // // // const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
// // // // //   const getStatusBadge = (status) => {
// // // // //     const badges = {
// // // // //       approved: { label: "Approved", color: "bg-success/10 text-success" },
// // // // //       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
// // // // //       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
// // // // //     };
// // // // //     return (
// // // // //       badges?.[status] || {
// // // // //         label: status,
// // // // //         color: "bg-muted text-text-secondary",
// // // // //       }
// // // // //     );
// // // // //   };

// // // // //   const statusBadge = getStatusBadge(job.status);

// // // // //   return (
// // // // //     <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
// // // // //       <div className="flex justify-between items-start mb-2">
// // // // //         <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
// // // // //         <span
// // // // //           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // // // //         >
// // // // //           {statusBadge.label}
// // // // //         </span>
// // // // //       </div>

// // // // //       <p className="text-sm text-text-secondary">
// // // // //         {job.company?.name || "Unknown Company"}
// // // // //       </p>
// // // // //       <p className="text-sm text-text-secondary">
// // // // //         {job.location} • {job.employmentType}
// // // // //       </p>
// // // // //       <p className="text-xs text-text-secondary mt-2">
// // // // //         Posted:{" "}
// // // // //         {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
// // // // //       </p>

// // // // //       <div className="flex mt-4 flex-wrap gap-2">
// // // // //         {onEdit && (
// // // // //           <Button
// // // // //             variant="default"
// // // // //             size="sm"
// // // // //             iconName="Edit"
// // // // //             onClick={() => onEdit(job)}
// // // // //           >
// // // // //             Edit
// // // // //           </Button>
// // // // //         )}
// // // // //         {onDeactivate && (
// // // // //           <Button
// // // // //             variant="destructive"
// // // // //             size="sm"
// // // // //             iconName="Ban"
// // // // //             onClick={() => onDeactivate(job._id)}
// // // // //           >
// // // // //             Deactivate
// // // // //           </Button>
// // // // //         )}
// // // // //         {onApprove && (
// // // // //           <Button
// // // // //             variant="success"
// // // // //             size="sm"
// // // // //             iconName="Check"
// // // // //             onClick={() => onApprove(job._id)}
// // // // //           >
// // // // //             Approve
// // // // //           </Button>
// // // // //         )}
// // // // //         {onReject && (
// // // // //           <Button
// // // // //             variant="destructive"
// // // // //             size="sm"
// // // // //             iconName="X"
// // // // //             onClick={() => onReject(job._id)}
// // // // //           >
// // // // //             Reject
// // // // //           </Button>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const JobManagement = () => {
// // // // //   const [jobs, setJobs] = useState([]);
// // // // //   const [pendingJobs, setPendingJobs] = useState([]);
// // // // //   const [page, setPage] = useState(1);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [hasMore, setHasMore] = useState(true);
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [editJobData, setEditJobData] = useState(null);

// // // // //   const allJobsRef = useRef();

// // // // //   useEffect(() => {
// // // // //     fetchJobs(page);
// // // // //     fetchPendingJobs();
// // // // //   }, [page]);

// // // // //   const fetchJobs = async (pageNum = 1) => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await getAllJobs({ page: pageNum, limit: 6 });
// // // // //       if (pageNum === 1) {
// // // // //         setJobs(res.jobs || []);
// // // // //       } else {
// // // // //         setJobs((prev) => [...prev, ...(res.jobs || [])]);
// // // // //       }
// // // // //       setHasMore(res.jobs.length === 6); // if less than 6, no more data
// // // // //     } catch (error) {
// // // // //       console.error("❌ Failed to fetch jobs:", error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchPendingJobs = async () => {
// // // // //     try {
// // // // //       const res = await getPendingJobs();
// // // // //       setPendingJobs(res.jobs || []);
// // // // //     } catch (error) {
// // // // //       console.error("❌ Failed to fetch pending jobs:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleCreateJob = async (jobData) => {
// // // // //     try {
// // // // //       if (editJobData) {
// // // // //         // Update existing job
// // // // //         await updateJob(editJobData._id, jobData);
// // // // //         setEditJobData(null);
// // // // //       } else {
// // // // //         await createJob(jobData);
// // // // //       }
// // // // //       setIsModalOpen(false);
// // // // //       fetchJobs(1);
// // // // //       fetchPendingJobs();
// // // // //     } catch (error) {
// // // // //       console.error("❌ Failed to create/update job:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleEditJob = (job) => {
// // // // //     setEditJobData(job);
// // // // //     setIsModalOpen(true);
// // // // //   };

// // // // //   const handleDeactivateJob = async (jobId) => {
// // // // //     try {
// // // // //       await deleteJob(jobId);
// // // // //       fetchJobs(1);
// // // // //       fetchPendingJobs();
// // // // //     } catch (error) {
// // // // //       console.error("❌ Failed to deactivate job:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleApprove = async (jobId) => {
// // // // //     try {
// // // // //       await approveJob(jobId);
// // // // //       fetchJobs(1);
// // // // //       fetchPendingJobs();
// // // // //     } catch (error) {
// // // // //       console.error("❌ Failed to approve job:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleReject = async (jobId) => {
// // // // //     try {
// // // // //       await rejectJob(jobId);
// // // // //       fetchJobs(1);
// // // // //       fetchPendingJobs();
// // // // //     } catch (error) {
// // // // //       console.error("❌ Failed to reject job:", error);
// // // // //     }
// // // // //   };

// // // // //   // Infinite scroll
// // // // //   const handleScroll = () => {
// // // // //     if (!hasMore || loading) return;
// // // // //     const bottom =
// // // // //       allJobsRef.current.scrollHeight - allJobsRef.current.scrollTop ===
// // // // //       allJobsRef.current.clientHeight;
// // // // //     if (bottom) {
// // // // //       setPage((prev) => prev + 1);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       {/* Header */}
// // // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //         <h3 className="text-xl font-semibold text-text-primary">
// // // // //           Job Management
// // // // //         </h3>
// // // // //         <Button
// // // // //           variant="default"
// // // // //           iconName="Plus"
// // // // //           onClick={() => setIsModalOpen(true)}
// // // // //         >
// // // // //           Post New Job
// // // // //         </Button>
// // // // //       </div>

// // // // //       {/* Job Form Modal */}
// // // // //       {isModalOpen && (
// // // // //         <JobFormModal
// // // // //           onClose={() => {
// // // // //             setIsModalOpen(false);
// // // // //             setEditJobData(null);
// // // // //           }}
// // // // //           onSubmit={handleCreateJob}
// // // // //           initialData={editJobData}
// // // // //         />
// // // // //       )}

// // // // //       {/* Pending Jobs */}
// // // // //       {pendingJobs.length > 0 && (
// // // // //         <div>
// // // // //           <h4 className="text-lg font-semibold mb-2 text-yellow-600">
// // // // //             Pending Jobs (Needs Approval)
// // // // //           </h4>
// // // // //           <div className="max-h-[400px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //             {pendingJobs.map((job) => (
// // // // //               <JobCard
// // // // //                 key={job._id}
// // // // //                 job={job}
// // // // //                 onApprove={handleApprove}
// // // // //                 onReject={handleReject}
// // // // //               />
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* All Jobs */}
// // // // //       <div>
// // // // //         <h4 className="text-lg font-semibold mb-2 text-text-primary">
// // // // //           All Jobs
// // // // //         </h4>
// // // // //         <div
// // // // //           ref={allJobsRef}
// // // // //           className="max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// // // // //           onScroll={handleScroll}
// // // // //         >
// // // // //           {jobs.map((job) => (
// // // // //             <JobCard
// // // // //               key={job._id}
// // // // //               job={job}
// // // // //               onEdit={handleEditJob}
// // // // //               onDeactivate={handleDeactivateJob}
// // // // //             />
// // // // //           ))}
// // // // //           {loading && (
// // // // //             <p className="text-text-secondary col-span-full">Loading...</p>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default JobManagement;
// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import Button from "../../../components/ui/Button";
// // // // import JobFormModal from "../components/JobFormModal";
// // // // import {
// // // //   getAllJobs,
// // // //   getPendingJobs,
// // // //   createJob,
// // // //   updateJob,
// // // //   deleteJob,
// // // //   approveJob,
// // // //   rejectJob,
// // // // } from "../../../lib/mongo/jobServices";

// // // // // Job Card (same as before)
// // // // const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
// // // //   const getStatusBadge = (status) => {
// // // //     const badges = {
// // // //       approved: { label: "Approved", color: "bg-success/10 text-success" },
// // // //       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
// // // //       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
// // // //     };
// // // //     return (
// // // //       badges?.[status] || {
// // // //         label: status,
// // // //         color: "bg-muted text-text-secondary",
// // // //       }
// // // //     );
// // // //   };

// // // //   const statusBadge = getStatusBadge(job.status);

// // // //   return (
// // // //     <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
// // // //       <div className="flex justify-between items-start mb-2">
// // // //         <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
// // // //         <span
// // // //           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // // //         >
// // // //           {statusBadge.label}
// // // //         </span>
// // // //       </div>
// // // //       <p className="text-sm text-text-secondary">
// // // //         {job.company?.name || "Unknown Company"}
// // // //       </p>
// // // //       <p className="text-sm text-text-secondary">
// // // //         {job.location} • {job.employmentType}
// // // //       </p>
// // // //       <p className="text-xs text-text-secondary mt-2">
// // // //         Posted:{" "}
// // // //         {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
// // // //       </p>
// // // //       <div className="flex mt-4 flex-wrap gap-2">
// // // //         {onEdit && (
// // // //           <Button
// // // //             variant="default"
// // // //             size="sm"
// // // //             iconName="Edit"
// // // //             onClick={() => onEdit(job)}
// // // //           >
// // // //             Edit
// // // //           </Button>
// // // //         )}
// // // //         {onDeactivate && (
// // // //           <Button
// // // //             variant="destructive"
// // // //             size="sm"
// // // //             iconName="Ban"
// // // //             onClick={() => onDeactivate(job._id)}
// // // //           >
// // // //             Deactivate
// // // //           </Button>
// // // //         )}
// // // //         {onApprove && (
// // // //           <Button
// // // //             variant="success"
// // // //             size="sm"
// // // //             iconName="Check"
// // // //             onClick={() => onApprove(job._id)}
// // // //           >
// // // //             Approve
// // // //           </Button>
// // // //         )}
// // // //         {onReject && (
// // // //           <Button
// // // //             variant="destructive"
// // // //             size="sm"
// // // //             iconName="X"
// // // //             onClick={() => onReject(job._id)}
// // // //           >
// // // //             Reject
// // // //           </Button>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const JobManagement = () => {
// // // //   const [jobs, setJobs] = useState([]);
// // // //   const [pendingJobs, setPendingJobs] = useState([]);
// // // //   const [page, setPage] = useState(1);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [hasMore, setHasMore] = useState(true);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [editJobData, setEditJobData] = useState(null);

// // // //   const allJobsRef = useRef();

// // // //   useEffect(() => {
// // // //     fetchJobs(page);
// // // //   }, [page]);
// // // //   useEffect(() => {
// // // //     fetchPendingJobs();
// // // //   }, []);

// // // //   const fetchJobs = async (pageNum = 1) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await getAllJobs({ page: pageNum, limit: 6 });
// // // //       if (pageNum === 1) setJobs(res.jobs || []);
// // // //       else setJobs((prev) => [...prev, ...(res.jobs || [])]);
// // // //       setHasMore(res.jobs.length === 6);
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchPendingJobs = async () => {
// // // //     try {
// // // //       const res = await getPendingJobs();
// // // //       setPendingJobs(res.jobs || []);
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const handleCreateJob = async (jobData) => {
// // // //     try {
// // // //       if (editJobData) await updateJob(editJobData._id, jobData);
// // // //       else await createJob(jobData);
// // // //       setIsModalOpen(false);
// // // //       setEditJobData(null);
// // // //       fetchJobs(1);
// // // //       fetchPendingJobs();
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const handleEditJob = (job) => {
// // // //     setEditJobData(job);
// // // //     setIsModalOpen(true);
// // // //   };
// // // //   const handleDeactivateJob = async (jobId) => {
// // // //     await deleteJob(jobId);
// // // //     fetchJobs(1);
// // // //     fetchPendingJobs();
// // // //   };
// // // //   const handleApprove = async (jobId) => {
// // // //     await approveJob(jobId);
// // // //     fetchJobs(1);
// // // //     fetchPendingJobs();
// // // //   };
// // // //   const handleReject = async (jobId) => {
// // // //     await rejectJob(jobId);
// // // //     fetchJobs(1);
// // // //     fetchPendingJobs();
// // // //   };

// // // //   const handleScroll = () => {
// // // //     if (!hasMore || loading) return;
// // // //     const bottom =
// // // //       allJobsRef.current.scrollTop + allJobsRef.current.clientHeight >=
// // // //       allJobsRef.current.scrollHeight;
// // // //     if (bottom) setPage((prev) => prev + 1);
// // // //   };

// // // //   return (
// // // //     <div className="space-y-8">
// // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //         <h3 className="text-xl font-semibold text-text-primary">
// // // //           Job Management
// // // //         </h3>
// // // //         <Button
// // // //           variant="default"
// // // //           iconName="Plus"
// // // //           onClick={() => setIsModalOpen(true)}
// // // //         >
// // // //           Post New Job
// // // //         </Button>
// // // //       </div>

// // // //       {isModalOpen && (
// // // //         <JobFormModal
// // // //           onClose={() => {
// // // //             setIsModalOpen(false);
// // // //             setEditJobData(null);
// // // //           }}
// // // //           onSubmit={handleCreateJob}
// // // //           initialData={editJobData}
// // // //         />
// // // //       )}

// // // //       {/* Pending Jobs */}
// // // //       {pendingJobs.length > 0 && (
// // // //         <div>
// // // //           <h4 className="text-lg font-semibold mb-2 text-yellow-600">
// // // //             Pending Jobs (Needs Approval)
// // // //           </h4>
// // // //           <div className="max-h-[400px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //             {pendingJobs.map((job) => (
// // // //               <JobCard
// // // //                 key={job._id}
// // // //                 job={job}
// // // //                 onApprove={handleApprove}
// // // //                 onReject={handleReject}
// // // //               />
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* All Jobs */}
// // // //       <div>
// // // //         <h4 className="text-lg font-semibold mb-2 text-text-primary">
// // // //           All Jobs
// // // //         </h4>
// // // //         <div
// // // //           ref={allJobsRef}
// // // //           className="max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// // // //           onScroll={handleScroll}
// // // //         >
// // // //           {jobs.map((job) => (
// // // //             <JobCard
// // // //               key={job._id}
// // // //               job={job}
// // // //               onEdit={handleEditJob}
// // // //               onDeactivate={handleDeactivateJob}
// // // //             />
// // // //           ))}
// // // //           {loading && (
// // // //             <p className="text-text-secondary col-span-full">Loading...</p>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default JobManagement;
// // // import React, { useState, useEffect, useRef } from "react";
// // // import Button from "../../../components/ui/Button";
// // // import JobFormModal from "../components/JobFormModal";
// // // import {
// // //   getAllJobs,
// // //   getPendingJobs,
// // //   createJob,
// // //   updateJob,
// // //   deleteJob,
// // //   approveJob,
// // //   rejectJob,
// // // } from "../../../lib/mongo/jobServices";

// // // const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
// // //   const getStatusBadge = (status) => {
// // //     const badges = {
// // //       approved: { label: "Approved", color: "bg-success/10 text-success" },
// // //       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
// // //       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
// // //     };
// // //     return (
// // //       badges?.[status] || {
// // //         label: status,
// // //         color: "bg-muted text-text-secondary",
// // //       }
// // //     );
// // //   };

// // //   const statusBadge = getStatusBadge(job.status);

// // //   return (
// // //     <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
// // //       <div className="flex justify-between items-start mb-2">
// // //         <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
// // //         <span
// // //           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// // //         >
// // //           {statusBadge.label}
// // //         </span>
// // //       </div>
// // //       <p className="text-sm text-text-secondary">
// // //         {job.company?.name || "Unknown Company"}
// // //       </p>
// // //       <p className="text-sm text-text-secondary">
// // //         {job.location} • {job.employmentType}
// // //       </p>
// // //       <p className="text-xs text-text-secondary mt-2">
// // //         Posted:{" "}
// // //         {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
// // //       </p>
// // //       <div className="flex mt-4 flex-wrap gap-2">
// // //         {onEdit && (
// // //           <Button
// // //             variant="default"
// // //             size="sm"
// // //             iconName="Edit"
// // //             onClick={() => onEdit(job)}
// // //           >
// // //             Edit
// // //           </Button>
// // //         )}
// // //         {onDeactivate && (
// // //           <Button
// // //             variant="destructive"
// // //             size="sm"
// // //             iconName="Ban"
// // //             onClick={() => onDeactivate(job._id)}
// // //           >
// // //             Deactivate
// // //           </Button>
// // //         )}
// // //         {onApprove && (
// // //           <Button
// // //             variant="success"
// // //             size="sm"
// // //             iconName="Check"
// // //             onClick={() => onApprove(job._id)}
// // //           >
// // //             Approve
// // //           </Button>
// // //         )}
// // //         {onReject && (
// // //           <Button
// // //             variant="destructive"
// // //             size="sm"
// // //             iconName="X"
// // //             onClick={() => onReject(job._id)}
// // //           >
// // //             Reject
// // //           </Button>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const JobManagement = () => {
// // //   const [allJobs, setAllJobs] = useState([]);
// // //   const [pendingJobs, setPendingJobs] = useState([]);

// // //   const [allPage, setAllPage] = useState(1);
// // //   const [pendingPage, setPendingPage] = useState(1);

// // //   const [loadingAll, setLoadingAll] = useState(false);
// // //   const [loadingPending, setLoadingPending] = useState(false);

// // //   const [hasMoreAll, setHasMoreAll] = useState(true);
// // //   const [hasMorePending, setHasMorePending] = useState(true);

// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [editJobData, setEditJobData] = useState(null);

// // //   const allJobsRef = useRef();
// // //   const pendingJobsRef = useRef();

// // //   // Initial fetch
// // //   useEffect(() => {
// // //     fetchAllJobs(1);
// // //     fetchPendingJobs(1);
// // //   }, []);

// // //   // Fetch All Jobs
// // //   const fetchAllJobs = async (pageNum = 1) => {
// // //     if (loadingAll || !hasMoreAll) return;
// // //     setLoadingAll(true);
// // //     try {
// // //       const res = await getAllJobs({ page: pageNum, limit: 6 });
// // //       setAllJobs((prev) => (pageNum === 1 ? res.jobs : [...prev, ...res.jobs]));
// // //       setHasMoreAll(res.jobs.length === 6);
// // //     } catch (error) {
// // //       console.error(error);
// // //     } finally {
// // //       setLoadingAll(false);
// // //     }
// // //   };

// // //   // Fetch Pending Jobs
// // //   const fetchPendingJobs = async (pageNum = 1) => {
// // //     if (loadingPending || !hasMorePending) return;
// // //     setLoadingPending(true);
// // //     try {
// // //       const res = await getPendingJobs({ page: pageNum, limit: 6 });
// // //       setPendingJobs((prev) =>
// // //         pageNum === 1 ? res.jobs : [...prev, ...res.jobs]
// // //       );
// // //       setHasMorePending(res.jobs.length === 6);
// // //     } catch (error) {
// // //       console.error(error);
// // //     } finally {
// // //       setLoadingPending(false);
// // //     }
// // //   };

// // //   // Handlers
// // //   const handleCreateJob = async (jobData) => {
// // //     try {
// // //       if (editJobData) await updateJob(editJobData._id, jobData);
// // //       else await createJob(jobData);
// // //       setIsModalOpen(false);
// // //       setEditJobData(null);
// // //       fetchAllJobs(1);
// // //       fetchPendingJobs(1);
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   };

// // //   const handleEditJob = (job) => {
// // //     setEditJobData(job);
// // //     setIsModalOpen(true);
// // //   };
// // //   const handleDeactivateJob = async (jobId) => {
// // //     await deleteJob(jobId);
// // //     fetchAllJobs(1);
// // //     fetchPendingJobs(1);
// // //   };
// // //   const handleApprove = async (jobId) => {
// // //     await approveJob(jobId);
// // //     fetchAllJobs(1);
// // //     fetchPendingJobs(1);
// // //   };
// // //   const handleReject = async (jobId) => {
// // //     await rejectJob(jobId);
// // //     fetchAllJobs(1);
// // //     fetchPendingJobs(1);
// // //   };

// // //   // Infinite Scroll for All Jobs
// // //   const handleAllScroll = () => {
// // //     const el = allJobsRef.current;
// // //     if (!el || loadingAll || !hasMoreAll) return;
// // //     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
// // //       setAllPage((prev) => {
// // //         fetchAllJobs(prev + 1);
// // //         return prev + 1;
// // //       });
// // //     }
// // //   };

// // //   // Infinite Scroll for Pending Jobs
// // //   const handlePendingScroll = () => {
// // //     const el = pendingJobsRef.current;
// // //     if (!el || loadingPending || !hasMorePending) return;
// // //     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
// // //       setPendingPage((prev) => {
// // //         fetchPendingJobs(prev + 1);
// // //         return prev + 1;
// // //       });
// // //     }
// // //   };
// // //   return (
// // //     <div className="space-y-8">
// // //       {/* Header */}
// // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //         <h3 className="text-xl font-semibold text-text-primary">
// // //           Job Management
// // //         </h3>
// // //         <Button
// // //           variant="default"
// // //           iconName="Plus"
// // //           onClick={() => setIsModalOpen(true)}
// // //         >
// // //           Post New Job
// // //         </Button>
// // //       </div>

// // //       {isModalOpen && (
// // //         <JobFormModal
// // //           onClose={() => {
// // //             setIsModalOpen(false);
// // //             setEditJobData(null);
// // //           }}
// // //           onSubmit={handleCreateJob}
// // //           initialData={editJobData}
// // //         />
// // //       )}

// // //       {/* Pending Jobs */}
// // //       <div>
// // //         <h4 className="text-lg font-semibold mb-2 text-yellow-600">
// // //           Pending Jobs (Needs Approval)
// // //         </h4>
// // //         <div
// // //           ref={pendingJobsRef}
// // //           className="max-h-[400px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// // //           onScroll={handlePendingScroll}
// // //         >
// // //           {pendingJobs.map((job) => (
// // //             <JobCard
// // //               key={job._id}
// // //               job={job}
// // //               onApprove={handleApprove}
// // //               onReject={handleReject}
// // //             />
// // //           ))}
// // //           {loadingPending && (
// // //             <p className="text-text-secondary col-span-full">Loading...</p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* All Jobs */}
// // //       <div>
// // //         <h4 className="text-lg font-semibold mb-2 text-text-primary">
// // //           All Jobs
// // //         </h4>
// // //         <div
// // //           ref={allJobsRef}
// // //           className="max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// // //           onScroll={handleAllScroll}
// // //         >
// // //           {allJobs.map((job) => (
// // //             <JobCard
// // //               key={job._id}
// // //               job={job}
// // //               onEdit={handleEditJob}
// // //               onDeactivate={handleDeactivateJob}
// // //             />
// // //           ))}
// // //           {loadingAll && (
// // //             <p className="text-text-secondary col-span-full">Loading...</p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default JobManagement;
// // import React, { useState, useEffect, useRef } from "react";
// // import Button from "../../../components/ui/Button";
// // import JobFormModal from "../components/JobFormModal";
// // import {
// //   getAllJobs,
// //   getPendingJobs,
// //   createJob,
// //   updateJob,
// //   deleteJob,
// //   approveJob,
// //   rejectJob,
// // } from "../../../lib/mongo/jobServices";

// // const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
// //   const getStatusBadge = (status) => {
// //     const badges = {
// //       approved: { label: "Approved", color: "bg-success/10 text-success" },
// //       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
// //       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
// //     };
// //     return (
// //       badges?.[status] || {
// //         label: status,
// //         color: "bg-muted text-text-secondary",
// //       }
// //     );
// //   };
// //   const statusBadge = getStatusBadge(job.status);

// //   return (
// //     <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
// //       <div className="flex justify-between items-start mb-2">
// //         <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
// //         <span
// //           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
// //         >
// //           {statusBadge.label}
// //         </span>
// //       </div>
// //       <p className="text-sm text-text-secondary">
// //         {job.company?.name || "Unknown Company"}
// //       </p>
// //       <p className="text-sm text-text-secondary">
// //         {job.location} • {job.employmentType}
// //       </p>
// //       <p className="text-xs text-text-secondary mt-2">
// //         Posted:{" "}
// //         {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
// //       </p>
// //       <div className="flex mt-4 flex-wrap gap-2">
// //         {onEdit && (
// //           <Button
// //             variant="default"
// //             size="sm"
// //             iconName="Edit"
// //             onClick={() => onEdit(job)}
// //           >
// //             Edit
// //           </Button>
// //         )}
// //         {onDeactivate && (
// //           <Button
// //             variant="destructive"
// //             size="sm"
// //             iconName="Ban"
// //             onClick={() => onDeactivate(job._id)}
// //           >
// //             Deactivate
// //           </Button>
// //         )}
// //         {onApprove && (
// //           <Button
// //             variant="success"
// //             size="sm"
// //             iconName="Check"
// //             onClick={() => onApprove(job._id)}
// //           >
// //             Approve
// //           </Button>
// //         )}
// //         {onReject && (
// //           <Button
// //             variant="destructive"
// //             size="sm"
// //             iconName="X"
// //             onClick={() => onReject(job._id)}
// //           >
// //             Reject
// //           </Button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const SCROLL_LIMIT = 6; // fetch 6 per scroll

// // const JobManagement = () => {
// //   const [allJobs, setAllJobs] = useState([]);
// //   const [pendingJobs, setPendingJobs] = useState([]);
// //   const [allPage, setAllPage] = useState(1);
// //   const [pendingPage, setPendingPage] = useState(1);
// //   const [loadingAll, setLoadingAll] = useState(false);
// //   const [loadingPending, setLoadingPending] = useState(false);
// //   const [hasMoreAll, setHasMoreAll] = useState(true);
// //   const [hasMorePending, setHasMorePending] = useState(true);

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editJobData, setEditJobData] = useState(null);

// //   const allRef = useRef();
// //   const pendingRef = useRef();

// //   // Initial fetch
// //   useEffect(() => {
// //     fetchAllJobs(1);
// //     fetchPendingJobs(1);
// //   }, []);

// //   const fetchAllJobs = async (pageNum = 1) => {
// //     if (loadingAll || !hasMoreAll) return;
// //     setLoadingAll(true);
// //     try {
// //       const res = await getAllJobs({ page: pageNum, limit: SCROLL_LIMIT });
// //       setAllJobs((prev) => (pageNum === 1 ? res.jobs : [...prev, ...res.jobs]));
// //       setHasMoreAll(res.jobs.length === SCROLL_LIMIT);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoadingAll(false);
// //     }
// //   };

// //   const fetchPendingJobs = async (pageNum = 1) => {
// //     if (loadingPending || !hasMorePending) return;
// //     setLoadingPending(true);
// //     try {
// //       const res = await getPendingJobs({ page: pageNum, limit: SCROLL_LIMIT });
// //       setPendingJobs((prev) =>
// //         pageNum === 1 ? res.jobs : [...prev, ...res.jobs]
// //       );
// //       setHasMorePending(res.jobs.length === SCROLL_LIMIT);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoadingPending(false);
// //     }
// //   };

// //   // Scroll handlers
// //   const handleScroll = (ref, fetchFn, page, setPage, hasMore, loading) => {
// //     const el = ref.current;
// //     if (!el || loading || !hasMore) return;
// //     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
// //       const nextPage = page + 1;
// //       setPage(nextPage);
// //       fetchFn(nextPage);
// //     }
// //   };

// //   // Job Actions
// //   const handleCreateJob = async (jobData) => {
// //     try {
// //       if (editJobData) await updateJob(editJobData._id, jobData);
// //       else await createJob(jobData);
// //       setIsModalOpen(false);
// //       setEditJobData(null);
// //       fetchAllJobs(1);
// //       fetchPendingJobs(1);
// //       setAllPage(1);
// //       setPendingPage(1);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const handleEditJob = (job) => {
// //     setEditJobData(job);
// //     setIsModalOpen(true);
// //   };
// //   const handleDeactivateJob = async (id) => {
// //     await deleteJob(id);
// //     fetchAllJobs(1);
// //     fetchPendingJobs(1);
// //   };
// //   const handleApprove = async (id) => {
// //     await approveJob(id);
// //     fetchAllJobs(1);
// //     fetchPendingJobs(1);
// //   };
// //   const handleReject = async (id) => {
// //     await rejectJob(id);
// //     fetchAllJobs(1);
// //     fetchPendingJobs(1);
// //   };

// //   return (
// //     <div className="space-y-8">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <h3 className="text-xl font-semibold text-text-primary">
// //           Job Management
// //         </h3>
// //         <Button
// //           variant="default"
// //           iconName="Plus"
// //           onClick={() => setIsModalOpen(true)}
// //         >
// //           Post New Job
// //         </Button>
// //       </div>

// //       {isModalOpen && (
// //         <JobFormModal
// //           onClose={() => {
// //             setIsModalOpen(false);
// //             setEditJobData(null);
// //           }}
// //           onSubmit={handleCreateJob}
// //           initialData={editJobData}
// //         />
// //       )}

// //       {/* Pending Jobs */}
// //       <div>
// //         <h4 className="text-lg font-semibold mb-2 text-yellow-600">
// //           Pending Jobs (Needs Approval)
// //         </h4>
// //         <div
// //           ref={pendingRef}
// //           className="overflow-auto border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
// //           style={{ maxHeight: "400px" }}
// //           onScroll={() =>
// //             handleScroll(
// //               pendingRef,
// //               fetchPendingJobs,
// //               pendingPage,
// //               setPendingPage,
// //               hasMorePending,
// //               loadingPending
// //             )
// //           }
// //         >
// //           {pendingJobs.map((job) => (
// //             <JobCard
// //               key={job._id}
// //               job={job}
// //               onApprove={handleApprove}
// //               onReject={handleReject}
// //             />
// //           ))}
// //           {loadingPending && (
// //             <p className="col-span-full text-center text-text-secondary">
// //               Loading...
// //             </p>
// //           )}
// //         </div>
// //       </div>

// //       {/* All Jobs */}
// //       <div>
// //         <h4 className="text-lg font-semibold mb-2 text-text-primary">
// //           All Jobs
// //         </h4>
// //         <div
// //           ref={allRef}
// //           className="overflow-auto border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
// //           style={{ maxHeight: "500px" }}
// //           onScroll={() =>
// //             handleScroll(
// //               allRef,
// //               fetchAllJobs,
// //               allPage,
// //               setAllPage,
// //               hasMoreAll,
// //               loadingAll
// //             )
// //           }
// //         >
// //           {allJobs.map((job) => (
// //             <JobCard
// //               key={job._id}
// //               job={job}
// //               onEdit={handleEditJob}
// //               onDeactivate={handleDeactivateJob}
// //             />
// //           ))}
// //           {loadingAll && (
// //             <p className="col-span-full text-center text-text-secondary">
// //               Loading...
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default JobManagement;
// import React, { useState, useEffect, useRef } from "react";
// import Button from "../../../components/ui/Button";
// import JobFormModal from "../components/JobFormModal";
// import {
//   getAllJobs,
//   getPendingJobs,
//   createJob,
//   updateJob,
//   deleteJob,
//   approveJob,
//   rejectJob,
// } from "../../../lib/mongo/jobServices";

// const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
//   const getStatusBadge = (status) => {
//     const badges = {
//       approved: { label: "Approved", color: "bg-success/10 text-success" },
//       pending: { label: "Pending", color: "bg-warning/10 text-warning" },
//       rejected: { label: "Rejected", color: "bg-error/10 text-error" },
//     };
//     return (
//       badges?.[status] || {
//         label: status,
//         color: "bg-muted text-text-secondary",
//       }
//     );
//   };

//   const statusBadge = getStatusBadge(job.status);

//   return (
//     <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
//       <div className="flex justify-between items-start mb-2">
//         <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
//         <span
//           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
//         >
//           {statusBadge.label}
//         </span>
//       </div>
//       <p className="text-sm text-text-secondary">
//         {job.company?.name || "Unknown Company"}
//       </p>
//       <p className="text-sm text-text-secondary">
//         {job.location} • {job.employmentType}
//       </p>
//       <p className="text-xs text-text-secondary mt-2">
//         Posted:{" "}
//         {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
//       </p>
//       <div className="flex mt-4 flex-wrap gap-2">
//         {onEdit && (
//           <Button
//             variant="default"
//             size="sm"
//             iconName="Edit"
//             onClick={() => onEdit(job)}
//           >
//             Edit
//           </Button>
//         )}
//         {onDeactivate && (
//           <Button
//             variant="destructive"
//             size="sm"
//             iconName="Ban"
//             onClick={() => onDeactivate(job._id)}
//           >
//             Deactivate
//           </Button>
//         )}
//         {onApprove && (
//           <Button
//             variant="success"
//             size="sm"
//             iconName="Check"
//             onClick={() => onApprove(job._id)}
//           >
//             Approve
//           </Button>
//         )}
//         {onReject && (
//           <Button
//             variant="destructive"
//             size="sm"
//             iconName="X"
//             onClick={() => onReject(job._id)}
//           >
//             Reject
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// const SCROLL_LIMIT = 6;

// const JobManagement = () => {
//   const [allJobs, setAllJobs] = useState([]);
//   const [pendingJobs, setPendingJobs] = useState([]);
//   const [allPage, setAllPage] = useState(1);
//   const [pendingPage, setPendingPage] = useState(1);
//   const [hasMoreAll, setHasMoreAll] = useState(true);
//   const [hasMorePending, setHasMorePending] = useState(true);
//   const [loadingAll, setLoadingAll] = useState(false);
//   const [loadingPending, setLoadingPending] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editJobData, setEditJobData] = useState(null);

//   const allRef = useRef();
//   const pendingRef = useRef();

//   // Initial fetch
//   useEffect(() => {
//     fetchAllJobs(1);
//     fetchPendingJobs(1);
//   }, []);

//   // Fetch all jobs
//   const fetchAllJobs = async (pageNum = 1) => {
//     if (loadingAll || !hasMoreAll) return;
//     setLoadingAll(true);
//     try {
//       const res = await getAllJobs({ page: pageNum, limit: SCROLL_LIMIT });
//       setAllJobs((prev) => (pageNum === 1 ? res.jobs : [...prev, ...res.jobs]));
//       setHasMoreAll(pageNum < res.pages);
//       setAllPage(pageNum);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingAll(false);
//     }
//   };

//   // Fetch pending jobs
//   const fetchPendingJobs = async (pageNum = 1) => {
//     if (loadingPending || !hasMorePending) return;
//     setLoadingPending(true);
//     try {
//       const res = await getPendingJobs({ page: pageNum, limit: SCROLL_LIMIT });
//       setPendingJobs((prev) =>
//         pageNum === 1 ? res.jobs : [...prev, ...res.jobs]
//       );
//       setHasMorePending(pageNum < res.pages);
//       setPendingPage(pageNum);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingPending(false);
//     }
//   };

//   // Scroll handler
//   const handleScroll = (ref, fetchFn, page, hasMore, loading) => {
//     const el = ref.current;
//     if (!el || loading || !hasMore) return;
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
//       fetchFn(page + 1);
//     }
//   };

//   // Job actions
//   const handleCreateJob = async (jobData) => {
//     try {
//       if (editJobData) await updateJob(editJobData._id, jobData);
//       else await createJob(jobData);
//       setIsModalOpen(false);
//       setEditJobData(null);
//       fetchAllJobs(1);
//       fetchPendingJobs(1);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEditJob = (job) => {
//     setEditJobData(job);
//     setIsModalOpen(true);
//   };
//   const handleDeactivateJob = async (id) => {
//     await deleteJob(id);
//     fetchAllJobs(1);
//     fetchPendingJobs(1);
//   };
//   const handleApprove = async (id) => {
//     await approveJob(id);
//     fetchAllJobs(1);
//     fetchPendingJobs(1);
//   };
//   const handleReject = async (id) => {
//     await rejectJob(id);
//     fetchAllJobs(1);
//     fetchPendingJobs(1);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h3 className="text-xl font-semibold text-text-primary">
//           Job Management
//         </h3>
//         <Button
//           variant="default"
//           iconName="Plus"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Post New Job
//         </Button>
//       </div>

//       {isModalOpen && (
//         <JobFormModal
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditJobData(null);
//           }}
//           onSubmit={handleCreateJob}
//           initialData={editJobData}
//         />
//       )}

//       {/* Pending Jobs */}
//       <div>
//         <h4 className="text-lg font-semibold mb-2 text-yellow-600">
//           Pending Jobs (Needs Approval)
//         </h4>
//         <div
//           ref={pendingRef}
//           className="overflow-auto border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
//           style={{ maxHeight: "400px" }}
//           onScroll={() =>
//             handleScroll(
//               pendingRef,
//               fetchPendingJobs,
//               pendingPage,
//               hasMorePending,
//               loadingPending
//             )
//           }
//         >
//           {pendingJobs.map((job) => (
//             <JobCard
//               key={job._id}
//               job={job}
//               onApprove={handleApprove}
//               onReject={handleReject}
//             />
//           ))}
//           {loadingPending && (
//             <p className="col-span-full text-center text-text-secondary">
//               Loading...
//             </p>
//           )}
//         </div>
//       </div>

//       {/* All Jobs */}
//       <div>
//         <h4 className="text-lg font-semibold mb-2 text-text-primary">
//           All Jobs
//         </h4>
//         <div
//           ref={allRef}
//           className="overflow-auto border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
//           style={{ maxHeight: "500px" }}
//           onScroll={() =>
//             handleScroll(allRef, fetchAllJobs, allPage, hasMoreAll, loadingAll)
//           }
//         >
//           {allJobs.map((job) => (
//             <JobCard
//               key={job._id}
//               job={job}
//               onEdit={handleEditJob}
//               onDeactivate={handleDeactivateJob}
//             />
//           ))}
//           {loadingAll && (
//             <p className="col-span-full text-center text-text-secondary">
//               Loading...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobManagement;
import React, { useState, useEffect, useRef } from "react";
import Button from "../../../components/ui/Button";
import JobFormModal from "../components/JobFormModal";
import {
  getAllJobs,
  getPendingJobs,
  createJob,
  updateJob,
  deleteJob,
  approveJob,
  rejectJob,
} from "../../../lib/mongo/jobServices";

const JobCard = ({ job, onEdit, onDeactivate, onApprove, onReject }) => {
  const getStatusBadge = (status) => {
    const badges = {
      approved: { label: "Approved", color: "bg-success/10 text-success" },
      pending: { label: "Pending", color: "bg-warning/10 text-warning" },
      rejected: { label: "Rejected", color: "bg-error/10 text-error" },
    };
    return (
      badges[status] || { label: status, color: "bg-muted text-text-secondary" }
    );
  };

  const statusBadge = getStatusBadge(job.status);

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-text-primary">{job.title}</h4>
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
        >
          {statusBadge.label}
        </span>
      </div>
      <p className="text-sm text-text-secondary">
        {job.company?.name || "Unknown Company"}
      </p>
      <p className="text-sm text-text-secondary">
        {job.location} • {job.employmentType}
      </p>
      <p className="text-xs text-text-secondary mt-2">
        Posted:{" "}
        {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
      </p>
      <div className="flex mt-4 flex-wrap gap-2">
        {onEdit && (
          <Button
            variant="default"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(job)}
          >
            Edit
          </Button>
        )}
        {onDeactivate && (
          <Button
            variant="destructive"
            size="sm"
            iconName="Ban"
            onClick={() => onDeactivate(job._id)}
          >
            Deactivate
          </Button>
        )}
        {onApprove && (
          <Button
            variant="success"
            size="sm"
            iconName="Check"
            onClick={() => onApprove(job._id)}
          >
            Approve
          </Button>
        )}
        {onReject && (
          <Button
            variant="destructive"
            size="sm"
            iconName="X"
            onClick={() => onReject(job._id)}
          >
            Reject
          </Button>
        )}
      </div>
    </div>
  );
};

const SCROLL_LIMIT = 6;

const JobManagement = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [allPage, setAllPage] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const [hasMorePending, setHasMorePending] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editJobData, setEditJobData] = useState(null);

  const pendingRef = useRef();

  // Initial fetch
  useEffect(() => {
    fetchAllJobs(1);
    fetchPendingJobs(1);
  }, []);

  // Fetch All Jobs (with pagination)
  const fetchAllJobs = async (pageNum = 1) => {
    setLoadingAll(true);
    try {
      const res = await getAllJobs({ page: pageNum, limit: SCROLL_LIMIT });
      setAllJobs(res.jobs);
      setAllPages(res.pages);
      setAllPage(pageNum);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAll(false);
    }
  };

  // Fetch Pending Jobs (infinite scroll)
  const fetchPendingJobs = async (pageNum = 1) => {
    if (loadingPending || !hasMorePending) return;
    setLoadingPending(true);
    try {
      const res = await getPendingJobs({ page: pageNum, limit: SCROLL_LIMIT });
      setPendingJobs((prev) =>
        pageNum === 1 ? res.jobs : [...prev, ...res.jobs]
      );
      setHasMorePending(pageNum < res.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPending(false);
    }
  };

  const handleScroll = (ref, page) => {
    const el = ref.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      fetchPendingJobs(page + 1);
    }
  };

  // Job actions
  const handleCreateJob = async (jobData) => {
    try {
      if (editJobData) await updateJob(editJobData._id, jobData);
      else await createJob(jobData);
      setIsModalOpen(false);
      setEditJobData(null);
      fetchAllJobs(allPage);
      fetchPendingJobs(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditJob = (job) => {
    setEditJobData(job);
    setIsModalOpen(true);
  };

  const handleDeactivateJob = async (id) => {
    await deleteJob(id);
    fetchAllJobs(allPage);
    fetchPendingJobs(1);
  };

  const handleApprove = async (id) => {
    await approveJob(id);
    fetchAllJobs(allPage);
    fetchPendingJobs(1);
  };

  const handleReject = async (id) => {
    await rejectJob(id);
    fetchAllJobs(allPage);
    fetchPendingJobs(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold text-text-primary">
          Job Management
        </h3>
        <Button
          variant="default"
          iconName="Plus"
          onClick={() => setIsModalOpen(true)}
        >
          Post New Job
        </Button>
      </div>

      {isModalOpen && (
        <JobFormModal
          onClose={() => {
            setIsModalOpen(false);
            setEditJobData(null);
          }}
          onSubmit={handleCreateJob}
          initialData={editJobData}
        />
      )}

      {/* Pending Jobs */}
      <div>
        <h4 className="text-lg font-semibold mb-2 text-yellow-600">
          Pending Jobs (Needs Approval)
        </h4>
        <div
          ref={pendingRef}
          className="overflow-auto border border-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ maxHeight: "400px" }}
          onScroll={() =>
            handleScroll(pendingRef, pendingJobs.length / SCROLL_LIMIT)
          }
        >
          {pendingJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
          {loadingPending && (
            <p className="col-span-full text-center text-text-secondary">
              Loading...
            </p>
          )}
        </div>
      </div>

      {/* All Jobs (with pagination) */}
      <div>
        <h4 className="text-lg font-semibold mb-2 text-text-primary">
          All Jobs
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {loadingAll ? (
            <p className="col-span-full text-center text-text-secondary">
              Loading...
            </p>
          ) : (
            allJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={handleEditJob}
                onDeactivate={handleDeactivateJob}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-2 rounded-none">
          <Button
            size="sm"
            variant="default"
            disabled={allPage === 1}
            className="rounded-none"
            onClick={() => fetchAllJobs(allPage - 1)}
          >
            Prev
          </Button>

          {[...Array(allPages)].map((_, idx) => (
            <Button
              key={idx}
              size="sm"
              className="rounded-none"
              variant={allPage === idx + 1 ? "primary" : "default"}
              onClick={() => fetchAllJobs(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="default"
            className="rounded-none"
            disabled={allPage === allPages}
            onClick={() => fetchAllJobs(allPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobManagement;
