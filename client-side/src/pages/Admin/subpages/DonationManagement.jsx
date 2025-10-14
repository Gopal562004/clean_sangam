// // // import React, { useState } from "react";
// // // import Button from "../../../components/ui/Button";
// // // import Icon from "../../../components/AppIcon";
// // // import AnalyticsChart from "../components/AnalyticsChart";

// // // // Sample donation & campaign data
// // // const sampleDonations = [
// // //   {
// // //     id: 1,
// // //     donor: "Michael Rodriguez",
// // //     email: "michael.r@email.com",
// // //     role: "alumni",
// // //     campaign: "Annual Fundraiser",
// // //     amount: 500,
// // //     status: "completed",
// // //     date: "2025-09-01",
// // //   },
// // //   {
// // //     id: 2,
// // //     donor: "Emily Chen",
// // //     email: "emily.chen@email.com",
// // //     role: "student",
// // //     campaign: "Library Upgrade",
// // //     amount: 200,
// // //     status: "pending",
// // //     date: "2025-09-03",
// // //   },
// // //   {
// // //     id: 3,
// // //     donor: "David Thompson",
// // //     email: "david.t@email.com",
// // //     role: "faculty",
// // //     campaign: "Scholarship Fund",
// // //     amount: 1000,
// // //     status: "completed",
// // //     date: "2025-09-05",
// // //   },
// // //   {
// // //     id: 4,
// // //     donor: "Lisa Park",
// // //     email: "lisa.park@email.com",
// // //     role: "alumni",
// // //     campaign: "Library Upgrade",
// // //     amount: 300,
// // //     status: "completed",
// // //     date: "2025-09-06",
// // //   },
// // //   {
// // //     id: 5,
// // //     donor: "James Wilson",
// // //     email: "james.w@email.com",
// // //     role: "student",
// // //     campaign: "Scholarship Fund",
// // //     amount: 150,
// // //     status: "pending",
// // //     date: "2025-09-07",
// // //   },
// // // ];

// // // const sampleCampaigns = [
// // //   {
// // //     id: 1,
// // //     title: "New Library Fund",
// // //     requestedBy: "Lisa Park (Alumni)",
// // //     requestedDate: "2025-09-07",
// // //     description: "Upgrade library resources and equipment.",
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Scholarship Drive",
// // //     requestedBy: "Dr. David Thompson (Faculty)",
// // //     requestedDate: "2025-09-08",
// // //     description: "Provide scholarships for meritorious students.",
// // //   },
// // // ];

// // // const DonationManagement = () => {
// // //   const [donations, setDonations] = useState(sampleDonations);
// // //   const [campaigns, setCampaigns] = useState(sampleCampaigns);
// // //   const [selectedDonation, setSelectedDonation] = useState(null);

// // //   // Aggregate totals
// // //   const totalDonation = donations.reduce((sum, d) => sum + d.amount, 0);
// // //   const donationsByRole = donations.reduce((acc, d) => {
// // //     acc[d.role] = (acc[d.role] || 0) + d.amount;
// // //     return acc;
// // //   }, {});
// // //   const topDonation = [...donations].sort((a, b) => b.amount - a.amount)[0];

// // //   const getStatusBadge = (status) => {
// // //     const badges = {
// // //       completed: "bg-success/10 text-success",
// // //       pending: "bg-warning/10 text-warning",
// // //       failed: "bg-error/10 text-error",
// // //     };
// // //     return badges[status] || "bg-muted text-text-secondary";
// // //   };

// // //   const handleViewDonation = (donation) => setSelectedDonation(donation);
// // //   const handleApproveDonation = (id) =>
// // //     setDonations((prev) =>
// // //       prev.map((d) => (d.id === id ? { ...d, status: "completed" } : d))
// // //     );
// // //   const handleRejectDonation = (id) =>
// // //     setDonations((prev) => prev.filter((d) => d.id !== id));
// // //   const handleApproveCampaign = (id) =>
// // //     setCampaigns((prev) => prev.filter((c) => c.id !== id));
// // //   const handleRejectCampaign = (id) =>
// // //     setCampaigns((prev) => prev.filter((c) => c.id !== id));

// // //   // Chart data
// // //   const donationTrendData = donations.map((d) => ({
// // //     name: d.date,
// // //     value: d.amount,
// // //   }));
// // //   const donationRoleData = Object.keys(donationsByRole).map((role) => ({
// // //     name: role,
// // //     value: donationsByRole[role],
// // //   }));

// // //   return (
// // //     <div className="space-y-10">
// // //       {/* Metrics */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
// // //           <Icon name="DollarSign" size={24} className="text-accent" />
// // //           <div>
// // //             <h4 className="text-sm text-text-secondary">Total Donations</h4>
// // //             <p className="text-xl font-semibold">${totalDonation}</p>
// // //           </div>
// // //         </div>
// // //         {["alumni", "faculty", "student"].map((role) => (
// // //           <div
// // //             key={role}
// // //             className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3"
// // //           >
// // //             <Icon name="User" size={24} className="text-primary" />
// // //             <div>
// // //               <h4 className="text-sm text-text-secondary">
// // //                 {role.charAt(0).toUpperCase() + role.slice(1)} Donations
// // //               </h4>
// // //               <p className="text-xl font-semibold">
// // //                 ${donationsByRole[role] || 0}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
// // //           <Icon name="Star" size={24} className="text-warning" />
// // //           <div>
// // //             <h4 className="text-sm text-text-secondary">Top Donation</h4>
// // //             <p className="text-xl font-semibold">${topDonation?.amount}</p>
// // //             <p className="text-sm">{topDonation?.donor}</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Charts */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <AnalyticsChart
// // //           data={donationTrendData}
// // //           type="line"
// // //           title="Donations Over Time"
// // //           height={300}
// // //         />
// // //         <AnalyticsChart
// // //           data={donationRoleData}
// // //           type="pie"
// // //           title="Donations by Role"
// // //           height={300}
// // //         />
// // //       </div>

// // //       {/* Donations Table */}
// // //       <div className="overflow-x-auto bg-card rounded-lg border border-border p-4">
// // //         <h3 className="text-xl font-semibold text-text-primary mb-4">
// // //           All Donations
// // //         </h3>
// // //         <table className="w-full border-collapse table-auto">
// // //           <thead className="bg-muted">
// // //             <tr>
// // //               {[
// // //                 "Donor",
// // //                 "Email",
// // //                 "Role",
// // //                 "Campaign",
// // //                 "Amount",
// // //                 "Status",
// // //                 "Date",
// // //                 "Actions",
// // //               ].map((h) => (
// // //                 <th
// // //                   key={h}
// // //                   className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase"
// // //                 >
// // //                   {h}
// // //                 </th>
// // //               ))}
// // //             </tr>
// // //           </thead>
// // //           <tbody className="divide-y divide-border">
// // //             {donations.map((d) => (
// // //               <tr key={d.id} className="hover:bg-muted/50">
// // //                 <td className="px-4 py-2">{d.donor}</td>
// // //                 <td className="px-4 py-2">{d.email}</td>
// // //                 <td className="px-4 py-2">{d.role}</td>
// // //                 <td className="px-4 py-2">{d.campaign}</td>
// // //                 <td className="px-4 py-2">${d.amount}</td>
// // //                 <td className="px-4 py-2">
// // //                   <span
// // //                     className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
// // //                       d.status
// // //                     )}`}
// // //                   >
// // //                     {d.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="px-4 py-2">{d.date}</td>
// // //                 <td className="px-4 py-2">
// // //                   <div className="flex flex-wrap gap-1">
// // //                     <Button
// // //                       variant="ghost"
// // //                       size="sm"
// // //                       className="min-w-[60px]"
// // //                       onClick={() => handleViewDonation(d)}
// // //                     >
// // //                       View
// // //                     </Button>
// // //                     {d.status === "pending" && (
// // //                       <>
// // //                         <Button
// // //                           variant="default"
// // //                           size="sm"
// // //                           className="min-w-[60px]"
// // //                           onClick={() => handleApproveDonation(d.id)}
// // //                         >
// // //                           Approve
// // //                         </Button>
// // //                         <Button
// // //                           variant="destructive"
// // //                           size="sm"
// // //                           className="min-w-[60px]"
// // //                           onClick={() => handleRejectDonation(d.id)}
// // //                         >
// // //                           Reject
// // //                         </Button>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Pending Campaign Approvals */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         {campaigns.map((c) => (
// // //           <div
// // //             key={c.id}
// // //             className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between"
// // //           >
// // //             <div>
// // //               <h4 className="text-lg font-semibold">{c.title}</h4>
// // //               <p className="text-sm text-text-secondary">{c.description}</p>
// // //               <p className="text-xs text-text-secondary">
// // //                 Requested by: {c.requestedBy}
// // //               </p>
// // //               <p className="text-xs text-text-secondary">
// // //                 Date: {c.requestedDate}
// // //               </p>
// // //             </div>
// // //             <div className="mt-2 flex space-x-2">
// // //               <Button
// // //                 variant="default"
// // //                 size="sm"
// // //                 onClick={() => handleApproveCampaign(c.id)}
// // //               >
// // //                 Approve
// // //               </Button>
// // //               <Button
// // //                 variant="destructive"
// // //                 size="sm"
// // //                 onClick={() => handleRejectCampaign(c.id)}
// // //               >
// // //                 Reject
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Donation Details Modal */}
// // //       {selectedDonation && (
// // //         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
// // //           <div className="bg-card p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h4 className="text-lg font-semibold">Donation Details</h4>
// // //               <Button variant="ghost" onClick={() => setSelectedDonation(null)}>
// // //                 Close
// // //               </Button>
// // //             </div>
// // //             <div className="space-y-2">
// // //               {Object.entries(selectedDonation).map(([k, v]) => (
// // //                 <p key={k}>
// // //                   <span className="font-medium">{k}:</span> {v}
// // //                 </p>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DonationManagement;
// // // src/pages/admin/DonationManagement.jsx
// // import React, { useEffect, useState } from "react";
// // import Button from "../../../components/ui/Button";
// // import Icon from "../../../components/AppIcon";
// // import AnalyticsChart from "../components/AnalyticsChart";
// // import {
// //   getDonationAnalytics,
// //   getUserDonationData,
// //   getPendingCampaigns,
// //   handleCampaignApproval,
// //   getAllCampaigns,
// //   deleteCampaign,
// // } from "../../../lib/mongo/donationServices"; // <-- adjust path if needed
// // import { toast } from "react-hot-toast";

// // /**
// //  * DonationManagement
// //  * - Loads analytics for metrics & charts
// //  * - Loads current user's donation history (for admin view this can be replaced)
// //  * - Loads pending campaign approvals and lets admin approve/reject/delete
// //  */

// // const DonationManagement = () => {
// //   const [analytics, setAnalytics] = useState(null);
// //   const [userDonationData, setUserDonationData] = useState(null);
// //   const [pendingCampaigns, setPendingCampaigns] = useState([]);
// //   const [allCampaigns, setAllCampaigns] = useState([]);
// //   const [loading, setLoading] = useState({
// //     analytics: false,
// //     userDonations: false,
// //     pending: false,
// //     campaigns: false,
// //   });
// //   const [selectedDonation, setSelectedDonation] = useState(null);

// //   // Fetch analytics
// //   const loadAnalytics = async () => {
// //     setLoading((s) => ({ ...s, analytics: true }));
// //     try {
// //       const res = await getDonationAnalytics();
// //       setAnalytics(res);
// //     } catch (err) {
// //       console.error("Failed to load donation analytics", err);
// //       toast.error("Failed to load donation analytics");
// //     } finally {
// //       setLoading((s) => ({ ...s, analytics: false }));
// //     }
// //   };

// //   // Fetch current user's donation data (or admin can use other endpoints)
// //   const loadUserDonations = async () => {
// //     setLoading((s) => ({ ...s, userDonations: true }));
// //     try {
// //       const res = await getUserDonationData();
// //       setUserDonationData(res);
// //     } catch (err) {
// //       console.error("Failed to load user donations", err);
// //       toast.error("Failed to load user donations");
// //     } finally {
// //       setLoading((s) => ({ ...s, userDonations: false }));
// //     }
// //   };

// //   // Fetch pending campaigns
// //   const loadPendingCampaigns = async () => {
// //     setLoading((s) => ({ ...s, pending: true }));
// //     try {
// //       const res = await getPendingCampaigns();
// //       setPendingCampaigns(res.campaigns || []);
// //     } catch (err) {
// //       console.error("Failed to load pending campaigns", err);
// //       toast.error("Failed to load pending campaigns");
// //     } finally {
// //       setLoading((s) => ({ ...s, pending: false }));
// //     }
// //   };

// //   // Optionally load paginated/all campaigns (uses getAllCampaigns)
// //   const loadAllCampaigns = async (params = { page: 1, limit: 20 }) => {
// //     setLoading((s) => ({ ...s, campaigns: true }));
// //     try {
// //       const res = await getAllCampaigns(params);
// //       // If API returns { campaigns, count } or similar adapt accordingly
// //       setAllCampaigns(res.campaigns || res.data || []);
// //     } catch (err) {
// //       console.error("Failed to load campaigns", err);
// //       toast.error("Failed to load campaigns");
// //     } finally {
// //       setLoading((s) => ({ ...s, campaigns: false }));
// //     }
// //   };

// //   useEffect(() => {
// //     loadAnalytics();
// //     loadUserDonations();
// //     loadPendingCampaigns();
// //     loadAllCampaigns();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // Approve / Reject campaign handler
// //   const handleApproveRejectCampaign = async (campaignId, action) => {
// //     const confirmMessage =
// //       action === "approve"
// //         ? "Approve this campaign? It will be visible to everyone."
// //         : "Reject this campaign? This will set status to rejected.";
// //     if (!window.confirm(confirmMessage)) return;

// //     try {
// //       const res = await handleCampaignApproval(campaignId, action);
// //       // optimistic update: remove from pending list
// //       setPendingCampaigns((prev) => prev.filter((c) => c._id !== campaignId));
// //       toast.success(res.message || `Campaign ${action}d`);
// //     } catch (err) {
// //       console.error("Error approving/rejecting campaign", err);
// //       toast.error(err?.message || "Failed to update campaign");
// //     }
// //   };

// //   // Delete campaign (admin)
// //   const handleDeleteCampaign = async (campaignId) => {
// //     if (!window.confirm("Delete campaign permanently? This can't be undone.")) return;
// //     try {
// //       const res = await deleteCampaign(campaignId);
// //       // remove from UI lists
// //       setPendingCampaigns((p) => p.filter((c) => c._id !== campaignId));
// //       setAllCampaigns((c) => c.filter((x) => x._id !== campaignId && x.id !== campaignId));
// //       toast.success(res.message || "Campaign deleted");
// //     } catch (err) {
// //       console.error("Failed to delete campaign", err);
// //       toast.error(err?.message || "Failed to delete campaign");
// //     }
// //   };

// //   // Helper badges
// //   const getStatusBadge = (status) => {
// //     const badges = {
// //       completed: "bg-success/10 text-success",
// //       pending: "bg-warning/10 text-warning",
// //       failed: "bg-error/10 text-error",
// //     };
// //     return badges[status] || "bg-muted text-text-secondary";
// //   };

// //   // Prepare chart data from analytics (safe fallbacks)
// //   const donationTrendData =
// //     analytics?.donationTrendData?.map((d) => ({ name: d.name, value: d.value })) || [];
// //   const donationRoleData =
// //     analytics?.donationRoleData?.map((d) => ({ name: d.name, value: d.value })) || [];

// //   // For table: use userDonationData.donationHistory if available
// //   const donations = userDonationData?.donationHistory || [];

// //   return (
// //     <div className="space-y-8">
// //       {/* Top row metrics */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
// //           <Icon name="DollarSign" size={24} className="text-accent" />
// //           <div>
// //             <h4 className="text-sm text-text-secondary">Total Donations</h4>
// //             <p className="text-xl font-semibold">
// //               {loading.analytics ? "Loading..." : analytics?.totalDonation ?? 0}
// //             </p>
// //           </div>
// //         </div>

// //         {(analytics?.donationsByRole || { alumni: 0, faculty: 0, student: 0 }).alumni !== undefined && (
// //           <>
// //             <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
// //               <Icon name="User" size={24} className="text-primary" />
// //               <div>
// //                 <h4 className="text-sm text-text-secondary">Alumni Donations</h4>
// //                 <p className="text-xl font-semibold">
// //                   {analytics?.donationsByRole?.alumni ?? 0}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
// //               <Icon name="User" size={24} className="text-primary" />
// //               <div>
// //                 <h4 className="text-sm text-text-secondary">Faculty Donations</h4>
// //                 <p className="text-xl font-semibold">
// //                   {analytics?.donationsByRole?.faculty ?? 0}
// //                 </p>
// //               </div>
// //             </div>
// //           </>
// //         )}

// //         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
// //           <Icon name="Star" size={24} className="text-warning" />
// //           <div>
// //             <h4 className="text-sm text-text-secondary">Top Donation</h4>
// //             <p className="text-xl font-semibold">
// //               {analytics?.topDonation?.amount ?? "—"}
// //             </p>
// //             <p className="text-sm">{analytics?.topDonation?.donor ?? ""}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <AnalyticsChart
// //           data={donationTrendData}
// //           type="line"
// //           title="Donations Over Time"
// //           height={320}
// //         />
// //         <AnalyticsChart
// //           data={donationRoleData}
// //           type="pie"
// //           title="Donations by Role"
// //           height={320}
// //         />
// //       </div>

// //       {/* Donations table (user donation history) */}
// //       <div className="overflow-x-auto bg-card rounded-lg border border-border p-4">
// //         <div className="flex items-center justify-between mb-4">
// //           <h3 className="text-xl font-semibold text-text-primary">Donation History</h3>
// //           <div className="text-sm text-text-secondary">
// //             {loading.userDonations ? "Loading..." : `Total: ₹${userDonationData?.totalDonation ?? 0}`}
// //           </div>
// //         </div>

// //         <table className="w-full border-collapse table-auto">
// //           <thead className="bg-muted">
// //             <tr>
// //               {["Receipt", "Campaign", "Amount", "Status", "Date", "Actions"].map((h) => (
// //                 <th key={h} className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase">
// //                   {h}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-border">
// //             {donations.length === 0 && (
// //               <tr>
// //                 <td colSpan={6} className="px-4 py-6 text-center text-text-secondary">
// //                   No donations found.
// //                 </td>
// //               </tr>
// //             )}

// //             {donations.map((d) => (
// //               <tr key={d._id} className="hover:bg-muted/50">
// //                 <td className="px-4 py-2">{d.receipt}</td>
// //                 <td className="px-4 py-2">{d.campaignName}</td>
// //                 <td className="px-4 py-2">₹{d.amount}</td>
// //                 <td className="px-4 py-2">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(d.status)}`}>
// //                     {d.status}
// //                   </span>
// //                 </td>
// //                 <td className="px-4 py-2">{new Date(d.date).toLocaleString()}</td>
// //                 <td className="px-4 py-2">
// //                   <div className="flex gap-2">
// //                     <Button variant="ghost" size="sm" onClick={() => setSelectedDonation(d)}>
// //                       View
// //                     </Button>
// //                     {/* If admin controls for donation exist, add them here */}
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pending Campaign Approvals */}
// //       <div>
// //         <h3 className="text-lg font-semibold mb-4">Pending Campaigns</h3>
// //         {loading.pending ? (
// //           <div className="text-text-secondary">Loading pending campaigns...</div>
// //         ) : pendingCampaigns.length === 0 ? (
// //           <div className="text-text-secondary">No pending campaigns.</div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {pendingCampaigns.map((c) => (
// //               <div key={c._id} className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between">
// //                 <div>
// //                   <h4 className="text-lg font-semibold">{c.title}</h4>
// //                   <p className="text-sm text-text-secondary">{c.description}</p>
// //                   <p className="text-xs text-text-secondary mt-1">
// //                     Requested by: {c.createdBy?.name ?? "Unknown"}
// //                   </p>
// //                   <p className="text-xs text-text-secondary">Start: {c.startDate ? new Date(c.startDate).toLocaleString() : "—"}</p>
// //                 </div>
// //                 <div className="mt-3 flex gap-2">
// //                   <Button variant="default" size="sm" onClick={() => handleApproveRejectCampaign(c._id, "approve")}>
// //                     Approve
// //                   </Button>
// //                   <Button variant="destructive" size="sm" onClick={() => handleApproveRejectCampaign(c._id, "reject")}>
// //                     Reject
// //                   </Button>
// //                   <Button variant="ghost" size="sm" onClick={() => handleDeleteCampaign(c._id)}>
// //                     Delete
// //                   </Button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* All Campaigns (optional list) */}
// //       <div>
// //         <h3 className="text-lg font-semibold mb-4">All Campaigns</h3>
// //         {loading.campaigns ? (
// //           <div className="text-text-secondary">Loading campaigns...</div>
// //         ) : allCampaigns.length === 0 ? (
// //           <div className="text-text-secondary">No campaigns found.</div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {allCampaigns.map((c) => (
// //               <div key={c._id || c.id} className="bg-card border border-border p-4 rounded-lg">
// //                 <div className="flex justify-between items-start">
// //                   <div>
// //                     <h4 className="font-semibold">{c.title}</h4>
// //                     <p className="text-sm text-text-secondary">{c.description}</p>
// //                     <p className="text-xs text-text-secondary mt-1">Target: ₹{c.targetAmount ?? c.target}</p>
// //                   </div>
// //                   <div className="text-right text-xs">
// //                     <div>{c.status}</div>
// //                     <div className="text-text-secondary">{c.donorCount ?? 0} donors</div>
// //                   </div>
// //                 </div>
// //                 <div className="mt-3 flex gap-2">
// //                   <Button variant="ghost" size="sm" onClick={() => toast("Open campaign detail modal (not implemented)")}>
// //                     View
// //                   </Button>
// //                   <Button variant="destructive" size="sm" onClick={() => handleDeleteCampaign(c._id || c.id)}>
// //                     Delete
// //                   </Button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Donation Details Modal */}
// //       {selectedDonation && (
// //         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
// //           <div className="bg-card p-6 rounded-lg w-full max-w-2xl">
// //             <div className="flex justify-between items-center mb-4">
// //               <h4 className="text-lg font-semibold">Donation Details</h4>
// //               <Button variant="ghost" onClick={() => setSelectedDonation(null)}>
// //                 Close
// //               </Button>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //               {Object.entries(selectedDonation).map(([k, v]) => (
// //                 <div key={k} className="text-sm">
// //                   <div className="text-xs text-text-secondary">{k}</div>
// //                   <div className="font-medium">{String(v)}</div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DonationManagement;
// import React, { useEffect, useState } from "react";
// import Button from "../../../components/ui/Button";
// import Icon from "../../../components/AppIcon";
// import AnalyticsChart from "../components/AnalyticsChart";
// import { toast } from "react-hot-toast";
// import {
//   getDonationAnalytics,
//   getPendingCampaigns,
//   handleCampaignApproval,
//   getAllCampaigns,
//   deleteCampaign,
//   getAllDonationHistory,
//   createCampaign,
// } from "../../../lib/mongo/donationServices";

// const ITEMS_PER_PAGE = 4;

// const DonationManagement = () => {
//   // ---------- State ----------
//   const [analytics, setAnalytics] = useState(null);

//   const [donations, setDonations] = useState([]);
//   const [donationPage, setDonationPage] = useState(1);
//   const [donationTotalPages, setDonationTotalPages] = useState(1);

//   const [pendingCampaigns, setPendingCampaigns] = useState([]);
//   const [pendingPage, setPendingPage] = useState(1);
//   const [pendingTotalPages, setPendingTotalPages] = useState(1);

//   const [allCampaigns, setAllCampaigns] = useState([]);
//   const [campaignPage, setCampaignPage] = useState(1);
//   const [campaignTotalPages, setCampaignTotalPages] = useState(1);

//   const [loading, setLoading] = useState({
//     analytics: false,
//     donations: false,
//     pending: false,
//     campaigns: false,
//   });

//   const [selectedDonation, setSelectedDonation] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newCampaignData, setNewCampaignData] = useState({
//     title: "",
//     description: "",
//     targetAmount: "",
//     daysRemaining: "",
//     category: "general",
//     image: "",
//   });

//   // ---------- Loaders ----------
//   const loadAnalytics = async () => {
//     setLoading((s) => ({ ...s, analytics: true }));
//     try {
//       const res = await getDonationAnalytics();
//       setAnalytics(res);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load analytics");
//     } finally {
//       setLoading((s) => ({ ...s, analytics: false }));
//     }
//   };

//   const loadDonations = async (page = 1) => {
//     setLoading((s) => ({ ...s, donations: true }));
//     try {
//       const res = await getAllDonationHistory(page, ITEMS_PER_PAGE);
//       setDonations(res.history || []);
//       setDonationPage(res.page);
//       setDonationTotalPages(res.totalPages);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load donation history");
//     } finally {
//       setLoading((s) => ({ ...s, donations: false }));
//     }
//   };

//   const loadPendingCampaigns = async (page = 1) => {
//     setLoading((s) => ({ ...s, pending: true }));
//     try {
//       const res = await getPendingCampaigns({ page, limit: ITEMS_PER_PAGE });
//       setPendingCampaigns(res.campaigns || []);
//       setPendingPage(res.page || page);
//       setPendingTotalPages(res.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load pending campaigns");
//     } finally {
//       setLoading((s) => ({ ...s, pending: false }));
//     }
//   };

//   const loadAllCampaigns = async (page = 1) => {
//     setLoading((s) => ({ ...s, campaigns: true }));
//     try {
//       const res = await getAllCampaigns({ page, limit: ITEMS_PER_PAGE });
//       setAllCampaigns(res.campaigns || res.data || []);
//       setCampaignPage(res.page || page);
//       setCampaignTotalPages(res.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load campaigns");
//     } finally {
//       setLoading((s) => ({ ...s, campaigns: false }));
//     }
//   };

//   useEffect(() => {
//     loadAnalytics();
//     loadDonations();
//     loadPendingCampaigns();
//     loadAllCampaigns();
//   }, []);

//   // ---------- Handlers ----------
//   const handleApproveRejectCampaign = async (campaignId, action) => {
//     if (!window.confirm(`Are you sure you want to ${action} this campaign?`))
//       return;
//     try {
//       const res = await handleCampaignApproval(campaignId, action);
//       toast.success(res.message || `Campaign ${action}d`);
//       loadPendingCampaigns(pendingPage);
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.message || "Failed to update campaign");
//     }
//   };

//   const handleDeleteCampaign = async (campaignId) => {
//     if (!window.confirm("Delete campaign permanently?")) return;
//     try {
//       const res = await deleteCampaign(campaignId);
//       toast.success(res.message || "Campaign deleted");
//       loadPendingCampaigns(pendingPage);
//       loadAllCampaigns(campaignPage);
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.message || "Failed to delete campaign");
//     }
//   };

//   const handleCreateCampaign = async () => {
//     try {
//       await createCampaign(newCampaignData);
//       toast.success("Campaign created!");
//       setShowCreateModal(false);
//       setNewCampaignData({
//         title: "",
//         description: "",
//         targetAmount: "",
//         daysRemaining: "",
//         category: "general",
//         image: "",
//       });
//       loadAllCampaigns();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to create campaign");
//     }
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       completed: "bg-success/10 text-success",
//       pending: "bg-warning/10 text-warning",
//       failed: "bg-error/10 text-error",
//     };
//     return badges[status] || "bg-muted text-text-secondary";
//   };

//   // ---------- Render ----------
//   return (
//     <div className="space-y-8">
//       {/* ---------- Analytics Section ---------- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="DollarSign" size={24} className="text-accent" />
//           <div>
//             <h4 className="text-sm text-text-secondary">Total Donations</h4>
//             <p className="text-xl font-semibold">
//               {analytics?.totalDonation ?? 0}
//             </p>
//           </div>
//         </div>
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="User" size={24} className="text-primary" />
//           <div>
//             <h4 className="text-sm text-text-secondary">Alumni Donations</h4>
//             <p className="text-xl font-semibold">
//               {analytics?.donationsByRole?.alumni ?? 0}
//             </p>
//           </div>
//         </div>
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="User" size={24} className="text-primary" />
//           <div>
//             <h4 className="text-sm text-text-secondary">Faculty Donations</h4>
//             <p className="text-xl font-semibold">
//               {analytics?.donationsByRole?.faculty ?? 0}
//             </p>
//           </div>
//         </div>
//         <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
//           <Icon name="Star" size={24} className="text-warning" />
//           <div>
//             <h4 className="text-sm text-text-secondary">Top Donation</h4>
//             <p className="text-xl font-semibold">
//               {analytics?.topDonation?.amount ?? "—"}
//             </p>
//             <p className="text-sm">{analytics?.topDonation?.donor ?? ""}</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <AnalyticsChart
//           data={
//             analytics?.donationTrendData?.map((d) => ({
//               name: d.name,
//               value: d.value,
//             })) || []
//           }
//           type="line"
//           title="Donations Over Time"
//           height={320}
//         />
//         <AnalyticsChart
//           data={
//             analytics?.donationRoleData?.map((d) => ({
//               name: d.name,
//               value: d.value,
//             })) || []
//           }
//           type="pie"
//           title="Donations by Role"
//           height={320}
//         />
//       </div>

//       {/* ---------- Donation History Table ---------- */}
//       <div className="overflow-x-auto bg-card rounded-lg border border-border p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-text-primary">
//             Donation History
//           </h3>
//           <Button
//             size="sm"
//             variant="default"
//             onClick={() => loadDonations(donationPage)}
//           >
//             Refresh
//           </Button>
//         </div>

//         <table className="w-full border-collapse table-auto">
//           <thead className="bg-muted">
//             <tr>
//               {[
//                 "Receipt",
//                 "User",
//                 "Campaign",
//                 "Amount",
//                 "Status",
//                 "Date",
//                 "Actions",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border">
//             {donations.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="px-4 py-6 text-center text-text-secondary"
//                 >
//                   No donations found.
//                 </td>
//               </tr>
//             ) : (
//               donations.map((d) => (
//                 <tr key={d._id} className="hover:bg-muted/50">
//                   <td className="px-4 py-2">{d.receipt}</td>
//                   <td className="px-4 py-2">{d.userId?.name}</td>
//                   <td className="px-4 py-2">{d.campaignName}</td>
//                   <td className="px-4 py-2">₹{d.amount}</td>
//                   <td className="px-4 py-2">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
//                         d.status
//                       )}`}
//                     >
//                       {d.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2">
//                     {new Date(d.date).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setSelectedDonation(d)}
//                     >
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="mt-2 flex justify-end space-x-2">
//           <Button
//             size="sm"
//             variant="default"
//             disabled={donationPage <= 1}
//             onClick={() => loadDonations(donationPage - 1)}
//           >
//             Prev
//           </Button>
//           <span className="px-2 py-1">
//             {donationPage} / {donationTotalPages}
//           </span>
//           <Button
//             size="sm"
//             variant="default"
//             disabled={donationPage >= donationTotalPages}
//             onClick={() => loadDonations(donationPage + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* ---------- Pending Campaigns ---------- */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Pending Campaigns</h3>
//           <Button
//             size="sm"
//             variant="default"
//             onClick={() => loadPendingCampaigns(pendingPage)}
//           >
//             Refresh
//           </Button>
//         </div>
//         {pendingCampaigns.length === 0 ? (
//           <div className="text-text-secondary">No pending campaigns.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {pendingCampaigns.map((c) => (
//               <div
//                 key={c._id}
//                 className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between"
//               >
//                 <div>
//                   <h4 className="text-lg font-semibold">{c.title}</h4>
//                   <p className="text-sm text-text-secondary">{c.description}</p>
//                   <p className="text-xs text-text-secondary mt-1">
//                     Requested by: {c.createdBy?.name ?? "Unknown"}
//                   </p>
//                   <p className="text-xs text-text-secondary">
//                     Start:{" "}
//                     {c.startDate ? new Date(c.startDate).toLocaleString() : "—"}
//                   </p>
//                 </div>
//                 <div className="mt-3 flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="default"
//                     onClick={() =>
//                       handleApproveRejectCampaign(c._id, "approve")
//                     }
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => handleApproveRejectCampaign(c._id, "reject")}
//                   >
//                     Reject
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => handleDeleteCampaign(c._id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-2 flex justify-end space-x-2">
//           <Button
//             size="sm"
//             variant="default"
//             disabled={pendingPage <= 1}
//             onClick={() => loadPendingCampaigns(pendingPage - 1)}
//           >
//             Prev
//           </Button>
//           <span className="px-2 py-1">
//             {pendingPage} / {pendingTotalPages}
//           </span>
//           <Button
//             size="sm"
//             variant="default"
//             disabled={pendingPage >= pendingTotalPages}
//             onClick={() => loadPendingCampaigns(pendingPage + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* ---------- All Campaigns ---------- */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">All Campaigns</h3>
//           <Button
//             size="sm"
//             variant="default"
//             onClick={() => loadAllCampaigns(campaignPage)}
//           >
//             Refresh
//           </Button>
//           <Button
//             size="sm"
//             variant="primary"
//             onClick={() => setShowCreateModal(true)}
//           >
//             Create Campaign
//           </Button>
//         </div>
//         {allCampaigns.length === 0 ? (
//           <div className="text-text-secondary">No campaigns found.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {allCampaigns.map((c) => (
//               <div
//                 key={c._id}
//                 className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between"
//               >
//                 <div>
//                   <h4 className="text-lg font-semibold">{c.title}</h4>
//                   <p className="text-sm text-text-secondary">{c.description}</p>
//                   <p className="text-xs text-text-secondary mt-1">
//                     Category: {c.category}
//                   </p>
//                   <p className="text-xs text-text-secondary">
//                     Target: ₹{c.targetAmount}
//                   </p>
//                   <p className="text-xs text-text-secondary">
//                     Days Remaining: {c.daysRemaining}
//                   </p>
//                 </div>
//                 <div className="mt-3 flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => handleDeleteCampaign(c._id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-2 flex justify-end space-x-2">
//           <Button
//             size="sm"
//             variant="default"
//             disabled={campaignPage <= 1}
//             onClick={() => loadAllCampaigns(campaignPage - 1)}
//           >
//             Prev
//           </Button>
//           <span className="px-2 py-1">
//             {campaignPage} / {campaignTotalPages}
//           </span>
//           <Button
//             size="sm"
//             variant="default"
//             disabled={campaignPage >= campaignTotalPages}
//             onClick={() => loadAllCampaigns(campaignPage + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* ---------- Modals ---------- */}
//       {selectedDonation && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-card p-6 rounded-lg w-96 relative">
//             <h4 className="text-lg font-semibold mb-4">Donation Details</h4>
//             <p>
//               <strong>User:</strong> {selectedDonation.userId?.name}
//             </p>
//             <p>
//               <strong>Campaign:</strong> {selectedDonation.campaignName}
//             </p>
//             <p>
//               <strong>Amount:</strong> ₹{selectedDonation.amount}
//             </p>
//             <p>
//               <strong>Status:</strong> {selectedDonation.status}
//             </p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(selectedDonation.date).toLocaleString()}
//             </p>
//             <Button
//               className="mt-4"
//               size="sm"
//               variant="default"
//               onClick={() => setSelectedDonation(null)}
//             >
//               Close
//             </Button>
//           </div>
//         </div>
//       )}

//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-card p-6 rounded-lg w-96 relative space-y-4">
//             <h4 className="text-lg font-semibold mb-2">Create Campaign</h4>
//             {[
//               "title",
//               "description",
//               "targetAmount",
//               "daysRemaining",
//               "image",
//             ].map((field) => (
//               <input
//                 key={field}
//                 type={
//                   field.includes("Amount") || field === "daysRemaining"
//                     ? "number"
//                     : "text"
//                 }
//                 placeholder={field}
//                 className="w-full border border-border rounded px-3 py-2 text-text-primary"
//                 value={newCampaignData[field]}
//                 onChange={(e) =>
//                   setNewCampaignData((d) => ({ ...d, [field]: e.target.value }))
//                 }
//               />
//             ))}
//             <select
//               className="w-full border border-border rounded px-3 py-2 text-text-primary"
//               value={newCampaignData.category}
//               onChange={(e) =>
//                 setNewCampaignData((d) => ({ ...d, category: e.target.value }))
//               }
//             >
//               {["general", "scholarship", "emergency", "infrastructure"].map(
//                 (c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 )
//               )}
//             </select>
//             <div className="flex justify-end gap-2">
//               <Button
//                 size="sm"
//                 variant="default"
//                 onClick={() => setShowCreateModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 size="sm"
//                 variant="primary"
//                 onClick={handleCreateCampaign}
//               >
//                 Create
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DonationManagement;
import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import AnalyticsChart from "../components/AnalyticsChart";
import { toast } from "react-hot-toast";
import {
  getDonationAnalytics,
  getPendingCampaigns,
  handleCampaignApproval,
  getAllCampaigns,
  deleteCampaign,
  getAllDonationHistory,
  createCampaign,
  getUnifiedRecentDonors,
  getUnifiedTopDonors,
} from "../../../lib/mongo/donationServices";

const ITEMS_PER_PAGE = 4;

const DonationManagement = () => {
  // ---------- State ----------
  const [analytics, setAnalytics] = useState(null);

  const [donations, setDonations] = useState([]);
  const [donationPage, setDonationPage] = useState(1);
  const [donationTotalPages, setDonationTotalPages] = useState(1);

  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingTotalPages, setPendingTotalPages] = useState(1);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [campaignPage, setCampaignPage] = useState(1);
  const [campaignTotalPages, setCampaignTotalPages] = useState(1);

  const [recentDonors, setRecentDonors] = useState([]);
  const [recentDonorPage, setRecentDonorPage] = useState(1);
  const [recentDonorTotalPages, setRecentDonorTotalPages] = useState(1);

  const [topDonors, setTopDonors] = useState([]);
  const [topDonorPage, setTopDonorPage] = useState(1);
  const [topDonorTotalPages, setTopDonorTotalPages] = useState(1);

  const [loading, setLoading] = useState({
    analytics: false,
    donations: false,
    pending: false,
    campaigns: false,
    donors: false,
  });

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaignData, setNewCampaignData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    daysRemaining: "",
    category: "general",
    image: "",
  });

  // ---------- Loaders ----------
  const loadAnalytics = async () => {
    setLoading((s) => ({ ...s, analytics: true }));
    try {
      const res = await getDonationAnalytics();
      setAnalytics(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load analytics");
    } finally {
      setLoading((s) => ({ ...s, analytics: false }));
    }
  };

  const loadDonations = async (page = 1) => {
    setLoading((s) => ({ ...s, donations: true }));
    try {
      const res = await getAllDonationHistory(page, ITEMS_PER_PAGE);
      setDonations(res.history || []);
      setDonationPage(res.page);
      setDonationTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load donation history");
    } finally {
      setLoading((s) => ({ ...s, donations: false }));
    }
  };

  const loadPendingCampaigns = async (page = 1) => {
    setLoading((s) => ({ ...s, pending: true }));
    try {
      const res = await getPendingCampaigns({ page, limit: ITEMS_PER_PAGE });
      setPendingCampaigns(res.campaigns || []);
      setPendingPage(res.page || page);
      setPendingTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pending campaigns");
    } finally {
      setLoading((s) => ({ ...s, pending: false }));
    }
  };

  const loadAllCampaigns = async (page = 1) => {
    setLoading((s) => ({ ...s, campaigns: true }));
    try {
      const res = await getAllCampaigns({ page, limit: ITEMS_PER_PAGE });
      setAllCampaigns(res.campaigns || res.data || []);
      setCampaignPage(res.page || page);
      setCampaignTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading((s) => ({ ...s, campaigns: false }));
    }
  };

  const loadRecentDonors = async (page = 1) => {
    setLoading((s) => ({ ...s, donors: true }));
    try {
      const res = await getUnifiedRecentDonors(page, ITEMS_PER_PAGE);
      setRecentDonors(res.donors || []);
      setRecentDonorPage(res.page || page);
      setRecentDonorTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load recent donors");
    } finally {
      setLoading((s) => ({ ...s, donors: false }));
    }
  };

  const loadTopDonors = async (page = 1) => {
    setLoading((s) => ({ ...s, donors: true }));
    try {
      const res = await getUnifiedTopDonors(page, ITEMS_PER_PAGE);
      setTopDonors(res.donors || []);
      setTopDonorPage(res.page || page);
      setTopDonorTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load top donors");
    } finally {
      setLoading((s) => ({ ...s, donors: false }));
    }
  };

  useEffect(() => {
    loadAnalytics();
    loadDonations();
    loadPendingCampaigns();
    loadAllCampaigns();
    loadRecentDonors();
    loadTopDonors();
  }, []);

  // ---------- Handlers ----------
  const handleApproveRejectCampaign = async (campaignId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this campaign?`))
      return;
    try {
      const res = await handleCampaignApproval(campaignId, action);
      toast.success(res.message || `Campaign ${action}d`);
      loadPendingCampaigns(pendingPage);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to update campaign");
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm("Delete campaign permanently?")) return;
    try {
      const res = await deleteCampaign(campaignId);
      toast.success(res.message || "Campaign deleted");
      loadPendingCampaigns(pendingPage);
      loadAllCampaigns(campaignPage);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to delete campaign");
    }
  };

  const handleCreateCampaign = async () => {
    try {
      await createCampaign(newCampaignData);
      toast.success("Campaign created!");
      setShowCreateModal(false);
      setNewCampaignData({
        title: "",
        description: "",
        targetAmount: "",
        daysRemaining: "",
        category: "general",
        image: "",
      });
      loadAllCampaigns();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create campaign");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      failed: "bg-error/10 text-error",
    };
    return badges[status] || "bg-muted text-text-secondary";
  };

  // ---------- Render ----------
return (
  <div className="space-y-8">
    {/* ---------- Create Campaign Button on Top ---------- */}
    <div className="flex justify-end">
      <Button
        size="sm"
        variant="primary"
        onClick={() => setShowCreateModal(true)}
      >
        Create Campaign
      </Button>
    </div>

    {/* ---------- Analytics Section ---------- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
        <Icon name="DollarSign" size={24} className="text-accent" />
        <div>
          <h4 className="text-sm text-text-secondary">Total Donations</h4>
          <p className="text-xl font-semibold">
            {analytics?.totalDonation ?? 0}
          </p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
        <Icon name="User" size={24} className="text-primary" />
        <div>
          <h4 className="text-sm text-text-secondary">Alumni Donations</h4>
          <p className="text-xl font-semibold">
            {analytics?.donationsByRole?.alumni ?? 0}
          </p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
        <Icon name="User" size={24} className="text-primary" />
        <div>
          <h4 className="text-sm text-text-secondary">Faculty Donations</h4>
          <p className="text-xl font-semibold">
            {analytics?.donationsByRole?.faculty ?? 0}
          </p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
        <Icon name="Star" size={24} className="text-warning" />
        <div>
          <h4 className="text-sm text-text-secondary">Top Donation</h4>
          <p className="text-xl font-semibold">
            {analytics?.topDonation?.amount ?? "—"}
          </p>
          <p className="text-sm">{analytics?.topDonation?.donor ?? ""}</p>
        </div>
      </div>
    </div>

    {/* ---------- Charts ---------- */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AnalyticsChart
        data={
          analytics?.donationTrendData?.map((d) => ({
            name: d.name,
            value: d.value,
          })) || []
        }
        type="line"
        title="Donations Over Time"
        height={320}
      />
      <AnalyticsChart
        data={
          analytics?.donationRoleData?.map((d) => ({
            name: d.name,
            value: d.value,
          })) || []
        }
        type="pie"
        title="Donations by Role"
        height={320}
      />
    </div>

    {/* ---------- Donation History ---------- */}
    <div className="overflow-x-auto bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-text-primary">
          Donation History
        </h3>
        <Button
          size="sm"
          variant="default"
          onClick={() => loadDonations(donationPage)}
        >
          Refresh
        </Button>
      </div>
      <table className="w-full border-collapse table-auto">
        <thead className="bg-muted">
          <tr>
            {[
              "Receipt",
              "User",
              "Campaign",
              "Amount",
              "Status",
              "Date",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {donations.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-6 text-center text-text-secondary"
              >
                No donations found.
              </td>
            </tr>
          ) : (
            donations.map((d) => (
              <tr key={d._id} className="hover:bg-muted/50">
                <td className="px-4 py-2">{d.receipt}</td>
                <td className="px-4 py-2">{d.userId?.name}</td>
                <td className="px-4 py-2">{d.campaignName}</td>
                <td className="px-4 py-2">₹{d.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                      d.status
                    )}`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(d.date).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDonation(d)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-2 flex justify-end space-x-2">
        <Button
          size="sm"
          variant="default"
          disabled={donationPage <= 1}
          onClick={() => loadDonations(donationPage - 1)}
        >
          Prev
        </Button>
        <span className="px-2 py-1">
          {donationPage} / {donationTotalPages}
        </span>
        <Button
          size="sm"
          variant="default"
          disabled={donationPage >= donationTotalPages}
          onClick={() => loadDonations(donationPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>

    {/* ---------- Pending Campaigns ---------- */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Pending Campaigns</h3>
        <Button
          size="sm"
          variant="default"
          onClick={() => loadPendingCampaigns(pendingPage)}
        >
          Refresh
        </Button>
      </div>
      {pendingCampaigns.length === 0 ? (
        <div className="text-text-secondary">No pending campaigns.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingCampaigns.map((c) => (
            <div
              key={c._id}
              className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold">{c.title}</h4>
                <p className="text-sm text-text-secondary">{c.description}</p>
                <p className="text-xs text-text-secondary mt-1">
                  Requested by: {c.createdBy?.name ?? "Unknown"}
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleApproveRejectCampaign(c._id, "approve")}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleApproveRejectCampaign(c._id, "reject")}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteCampaign(c._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex justify-end space-x-2">
        <Button
          size="sm"
          variant="default"
          disabled={pendingPage <= 1}
          onClick={() => loadPendingCampaigns(pendingPage - 1)}
        >
          Prev
        </Button>
        <span className="px-2 py-1">
          {pendingPage} / {pendingTotalPages}
        </span>
        <Button
          size="sm"
          variant="default"
          disabled={pendingPage >= pendingTotalPages}
          onClick={() => loadPendingCampaigns(pendingPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>

    {/* ---------- All Campaigns ---------- */}
    <div>
      {allCampaigns.length === 0 ? (
        <div className="text-text-secondary">No campaigns found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allCampaigns.map((c) => (
            <div
              key={c._id}
              className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold">{c.title}</h4>
                <p className="text-sm text-text-secondary">{c.description}</p>
                <p className="text-xs text-text-secondary mt-1">
                  Category: {c.category}
                </p>
                <p className="text-xs text-text-secondary">
                  Target: ₹{c.targetAmount}
                </p>
                <p className="text-xs text-text-secondary">
                  Days Remaining: {c.daysRemaining}
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteCampaign(c._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex justify-end space-x-2">
        <Button
          size="sm"
          variant="default"
          disabled={campaignPage <= 1}
          onClick={() => loadAllCampaigns(campaignPage - 1)}
        >
          Prev
        </Button>
        <span className="px-2 py-1">
          {campaignPage} / {campaignTotalPages}
        </span>
        <Button
          size="sm"
          variant="default"
          disabled={campaignPage >= campaignTotalPages}
          onClick={() => loadAllCampaigns(campaignPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>

    {/* ---------- Donation Details Modal ---------- */}
    {selectedDonation && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-card p-6 rounded-lg w-96 relative">
          <h4 className="text-lg font-semibold mb-4">Donation Details</h4>
          <p>
            <strong>User:</strong> {selectedDonation.userId?.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedDonation.userId?.email}
          </p>
          <p>
            <strong>Campaign:</strong> {selectedDonation.campaignName}
          </p>
          <p>
            <strong>Amount:</strong> ₹{selectedDonation.amount}
          </p>
          <p>
            <strong>Status:</strong> {selectedDonation.status}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(selectedDonation.date).toLocaleString()}
          </p>
          <Button
            className="mt-4"
            size="sm"
            variant="default"
            onClick={() => setSelectedDonation(null)}
          >
            Close
          </Button>
        </div>
      </div>
    )}

    {/* ---------- Create Campaign Modal ---------- */}
    {showCreateModal && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-card p-6 rounded-lg w-96 relative space-y-4">
          <h4 className="text-lg font-semibold mb-2">Create Campaign</h4>
          {[
            "title",
            "description",
            "targetAmount",
            "daysRemaining",
            "image",
          ].map((field) => (
            <input
              key={field}
              type={
                field.includes("Amount") || field === "daysRemaining"
                  ? "number"
                  : "text"
              }
              placeholder={field}
              className="w-full border border-border rounded px-3 py-2 text-text-primary"
              value={newCampaignData[field]}
              onChange={(e) =>
                setNewCampaignData((d) => ({ ...d, [field]: e.target.value }))
              }
            />
          ))}
          <select
            className="w-full border border-border rounded px-3 py-2 text-text-primary"
            value={newCampaignData.category}
            onChange={(e) =>
              setNewCampaignData((d) => ({ ...d, category: e.target.value }))
            }
          >
            {["general", "scholarship", "emergency", "infrastructure"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </select>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleCreateCampaign}>
              Create
            </Button>
          </div>
        </div>
      </div>
    )}
    <div className="space-y-8">
      {/* ---------- Top Donors ---------- */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Top Donors</h3>
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              variant="default"
              disabled={topDonorPage <= 1}
              onClick={() => loadTopDonors(topDonorPage - 1)}
            >
              Prev
            </Button>
            <span>
              {topDonorPage} / {topDonorTotalPages}
            </span>
            <Button
              size="sm"
              variant="default"
              disabled={topDonorPage >= topDonorTotalPages}
              onClick={() => loadTopDonors(topDonorPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-muted">
            <tr>
              {["Name", "Email", "Campaign", "Amount", "Date", "Source"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {topDonors.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-text-secondary"
                >
                  No top donors found.
                </td>
              </tr>
            ) : (
              topDonors.map((d) => (
                <tr
                  key={`${d.donorId}-${d.donatedAt}`}
                  className="hover:bg-muted/50"
                >
                  <td className="px-4 py-2">{d.name}</td>
                  <td className="px-4 py-2">{d.email}</td>
                  <td className="px-4 py-2">{d.campaignTitle}</td>
                  <td className="px-4 py-2">₹{d.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(d.donatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{d.source}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- Recent Donors ---------- */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Donors</h3>
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              variant="default"
              disabled={recentDonorPage <= 1}
              onClick={() => loadRecentDonors(recentDonorPage - 1)}
            >
              Prev
            </Button>
            <span>
              {recentDonorPage} / {recentDonorTotalPages}
            </span>
            <Button
              size="sm"
              variant="default"
              disabled={recentDonorPage >= recentDonorTotalPages}
              onClick={() => loadRecentDonors(recentDonorPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-muted">
            <tr>
              {["Name", "Email", "Campaign", "Amount", "Date", "Source"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentDonors.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-text-secondary"
                >
                  No recent donors found.
                </td>
              </tr>
            ) : (
              recentDonors.map((d) => (
                <tr
                  key={`${d.donorId}-${d.donatedAt}`}
                  className="hover:bg-muted/50"
                >
                  <td className="px-4 py-2">{d.name}</td>
                  <td className="px-4 py-2">{d.email}</td>
                  <td className="px-4 py-2">{d.campaignTitle}</td>
                  <td className="px-4 py-2">₹{d.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(d.donatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{d.source}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

};

export default DonationManagement;
