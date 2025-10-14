// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
// // // import Button from "../../../components/ui/Button";
// // // import Icon from "../../../components/AppIcon";
// // // import CampaignCard from "./components/CampaignCard";
// // // import DonationStats from "./components/DonationStats";
// // // import QuickDonation from "./components/QuickDonation";
// // // import DonorRecognition from "./components/DonorRecognition";
// // // import CreateCampaignModal from "./components/CreateCampaignModal"; // ✅ your modal

// // // import {
// // //   getAllCampaigns,
// // //   getDonationStats,
// // //   quickDonate,
// // //   getDonorsByAmountLast30Days,
// // //   createCampaign, // ✅ import API function
// // // } from "../../../lib/mongo/donationServices";

// // // const Donation = () => {
// // //   const navigate = useNavigate();
// // //   const [user, setUser] = useState(null);
// // //   const [campaigns, setCampaigns] = useState([]);
// // //   const [donationStats, setDonationStats] = useState({});
// // //   const [topDonors, setTopDonors] = useState([]);
// // //   const [activeTab, setActiveTab] = useState("active");
// // //   const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
// // //     useState(false);

// // //   useEffect(() => {
// // //     setUser({
// // //       id: 1,
// // //       name: "Sarah Johnson",
// // //       email: "sarah.j@email.com",
// // //       role: "alumni",
// // //       avatar: "https://randomuser.me/api/portraits/women/32.jpg",
// // //     });
// // //   }, []);

// // //   // Fetch campaigns
// // //   useEffect(() => {
// // //     const fetchCampaigns = async () => {
// // //       try {
// // //         const data = await getAllCampaigns();
// // //         setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setCampaigns([]);
// // //       }
// // //     };
// // //     fetchCampaigns();
// // //   }, []);

// // //   // Fetch donation stats
// // //   useEffect(() => {
// // //     const fetchStats = async () => {
// // //       try {
// // //         const stats = await getDonationStats();
// // //         setDonationStats(stats?.stats || {});
// // //       } catch (err) {
// // //         console.error(err);
// // //         setDonationStats({});
// // //       }
// // //     };
// // //     fetchStats();
// // //   }, []);

// // //   // Fetch top donors
// // //   useEffect(() => {
// // //     const fetchTopDonors = async () => {
// // //       try {
// // //         const res = await getDonorsByAmountLast30Days();
// // //         const donors = res?.donors || [];

// // //         const donorMap = {};
// // //         donors.forEach((donation) => {
// // //           if (donorMap[donation.donorId]) {
// // //             donorMap[donation.donorId].amount += donation.amount;
// // //           } else {
// // //             donorMap[donation.donorId] = { ...donation };
// // //           }
// // //         });

// // //         const aggregatedDonors = Object.values(donorMap).sort(
// // //           (a, b) => b.amount - a.amount
// // //         );
// // //         setTopDonors(aggregatedDonors);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setTopDonors([]);
// // //       }
// // //     };
// // //     fetchTopDonors();
// // //   }, []);

// // //   const formatCurrency = (amount) =>
// // //     new Intl.NumberFormat("en-US", {
// // //       style: "currency",
// // //       currency: "USD",
// // //       minimumFractionDigits: 0,
// // //     }).format(amount);

// // //   const calculateProgress = (raised, target) =>
// // //     target > 0 ? Math.round((raised / target) * 100) : 0;

// // //   const filteredCampaigns = campaigns.filter((c) => {
// // //     switch (activeTab) {
// // //       case "featured":
// // //         return c?.featured;
// // //       case "scholarship":
// // //         return c?.category === "scholarship";
// // //       case "education":
// // //         return c?.category === "education";
// // //       case "infrastructure":
// // //         return c?.category === "infrastructure";
// // //       case "active":
// // //       default:
// // //         return c?.status === "approved";
// // //     }
// // //   });

// // //   const handleQuickDonation = async (amount, type) => {
// // //     try {
// // //       await quickDonate({ amount, category: type });
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleCreateCampaign = () => setIsCreateCampaignModalOpen(true);

// // //   const handleSubmitCampaign = async (formData) => {
// // //     try {
// // //       await createCampaign(formData); // ✅ backend call
// // //       setIsCreateCampaignModalOpen(false);

// // //       // Refresh campaigns
// // //       const data = await getAllCampaigns();
// // //       setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
// // //     } catch (err) {
// // //       console.error("Error creating campaign:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         <BreadcrumbTrail user={user} currentPage="Donation" />

// // //         {/* Header */}
// // //         <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
// // //           <div>
// // //             <h1 className="text-3xl font-bold text-text-primary">
// // //               Donation Center
// // //             </h1>
// // //             <p className="mt-2 text-text-secondary">
// // //               Support your alma mater through impactful giving and fundraising
// // //               campaigns
// // //             </p>
// // //           </div>
// // //           <div className="mt-4 sm:mt-0 flex space-x-3">
// // //             <Button variant="outline" iconName="Download">
// // //               Tax Receipts
// // //             </Button>
// // //             <Button
// // //               variant="default"
// // //               iconName="Plus"
// // //               onClick={handleCreateCampaign}
// // //             >
// // //               Create Campaign
// // //             </Button>
// // //           </div>
// // //         </div>

// // //         {/* Stats + Quick Donate */}
// // //         <DonationStats stats={donationStats} className="m-2" />
// // //         <QuickDonation onQuickDonate={handleQuickDonation} />

// // //         {/* Campaigns + Donors */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-10">
// // //           <div className="lg:col-span-2 space-y-8">
// // //             <div className="bg-card rounded-lg p-6 border border-border">
// // //               <div className="flex flex-wrap gap-2 mb-6">
// // //                 {[
// // //                   "active",
// // //                   "featured",
// // //                   "scholarship",
// // //                   "education",
// // //                   "infrastructure",
// // //                 ].map((tab) => (
// // //                   <Button
// // //                     key={tab}
// // //                     variant={activeTab === tab ? "default" : "outline"}
// // //                     size="sm"
// // //                     onClick={() => setActiveTab(tab)}
// // //                   >
// // //                     {tab.charAt(0).toUpperCase() + tab.slice(1)} Campaigns
// // //                   </Button>
// // //                 ))}
// // //               </div>

// // //               <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   {filteredCampaigns.length ? (
// // //                     filteredCampaigns.map((campaign) => (
// // //                       <CampaignCard
// // //                         key={campaign._id}
// // //                         campaign={campaign}
// // //                         onDonate={() => {}}
// // //                         onViewDetails={() => {}}
// // //                         formatCurrency={formatCurrency}
// // //                         calculateProgress={calculateProgress}
// // //                       />
// // //                     ))
// // //                   ) : (
// // //                     <div className="text-center py-12 col-span-2">
// // //                       <Icon
// // //                         name="Search"
// // //                         size={48}
// // //                         className="mx-auto text-text-secondary mb-4"
// // //                       />
// // //                       <h3 className="text-lg font-semibold text-text-primary mb-2">
// // //                         No campaigns found
// // //                       </h3>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="space-y-6">
// // //             <DonorRecognition donors={topDonors} />
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* ✅ Create Campaign Modal */}
// // //       <CreateCampaignModal
// // //         isOpen={isCreateCampaignModalOpen}
// // //         onClose={() => setIsCreateCampaignModalOpen(false)}
// // //         onSubmit={handleSubmitCampaign}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Donation;
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
// // import Button from "../../../components/ui/Button";
// // import Icon from "../../../components/AppIcon";
// // import CampaignCard from "./components/CampaignCard";
// // import DonationStats from "./components/DonationStats";
// // import QuickDonation from "./components/QuickDonation";
// // import DonorRecognition from "./components/DonorRecognition";
// // import CreateCampaignModal from "./components/CreateCampaignModal";

// // import {
// //   getAllCampaigns,
// //   getDonationStats,
// //   quickDonate,
// //   getDonorsByAmountLast30Days,
// //   createCampaign,
// // } from "../../../lib/mongo/donationServices";

// // const Donation = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);
// //   const [campaigns, setCampaigns] = useState([]);
// //   const [donationStats, setDonationStats] = useState({});
// //   const [topDonors, setTopDonors] = useState([]);
// //   const [activeTab, setActiveTab] = useState("active");
// //   const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
// //     useState(false);

// //   // ✅ search state
// //   const [searchQuery, setSearchQuery] = useState("");

// //   useEffect(() => {
// //     setUser({
// //       id: 1,
// //       name: "Sarah Johnson",
// //       email: "sarah.j@email.com",
// //       role: "alumni",
// //       avatar: "https://randomuser.me/api/portraits/women/32.jpg",
// //     });
// //   }, []);

// //   // Fetch campaigns (with search + tab filter)
// //   useEffect(() => {
// //     const fetchCampaigns = async () => {
// //       try {
// //         const data = await getAllCampaigns({
// //           search: searchQuery,
// //           category: activeTab !== "active" ? activeTab : "",
// //         });
// //         setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
// //       } catch (err) {
// //         console.error(err);
// //         setCampaigns([]);
// //       }
// //     };
// //     fetchCampaigns();
// //   }, [activeTab, searchQuery]);

// //   // Fetch donation stats
// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const stats = await getDonationStats();
// //         setDonationStats(stats?.stats || {});
// //       } catch (err) {
// //         console.error(err);
// //         setDonationStats({});
// //       }
// //     };
// //     fetchStats();
// //   }, []);

// //   // Fetch top donors
// //   useEffect(() => {
// //     const fetchTopDonors = async () => {
// //       try {
// //         const res = await getDonorsByAmountLast30Days();
// //         const donors = res?.donors || [];

// //         const donorMap = {};
// //         donors.forEach((donation) => {
// //           if (donorMap[donation.donorId]) {
// //             donorMap[donation.donorId].amount += donation.amount;
// //           } else {
// //             donorMap[donation.donorId] = { ...donation };
// //           }
// //         });

// //         const aggregatedDonors = Object.values(donorMap).sort(
// //           (a, b) => b.amount - a.amount
// //         );
// //         setTopDonors(aggregatedDonors);
// //       } catch (err) {
// //         console.error(err);
// //         setTopDonors([]);
// //       }
// //     };
// //     fetchTopDonors();
// //   }, []);

// //   const formatCurrency = (amount) =>
// //     new Intl.NumberFormat("en-US", {
// //       style: "currency",
// //       currency: "USD",
// //       minimumFractionDigits: 0,
// //     }).format(amount);

// //   const calculateProgress = (raised, target) =>
// //     target > 0 ? Math.round((raised / target) * 100) : 0;

// //   const handleQuickDonation = async (amount, type) => {
// //     try {
// //       await quickDonate({ amount, category: type });
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleCreateCampaign = () => setIsCreateCampaignModalOpen(true);

// //   const handleSubmitCampaign = async (formData) => {
// //     try {
// //       await createCampaign(formData);
// //       setIsCreateCampaignModalOpen(false);

// //       // Refresh campaigns
// //       const data = await getAllCampaigns({
// //         search: searchQuery,
// //         category: activeTab !== "active" ? activeTab : "",
// //       });
// //       setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
// //     } catch (err) {
// //       console.error("Error creating campaign:", err);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <BreadcrumbTrail user={user} currentPage="Donation" />

// //         {/* Header */}
// //         <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold text-text-primary">
// //               Donation Center
// //             </h1>
// //             <p className="mt-2 text-text-secondary">
// //               Support your alma mater through impactful giving and fundraising
// //               campaigns
// //             </p>
// //           </div>
// //           <div className="mt-4 sm:mt-0 flex space-x-3">
// //             <Button variant="outline" iconName="Download">
// //               Tax Receipts
// //             </Button>
// //             <Button
// //               variant="default"
// //               iconName="Plus"
// //               onClick={handleCreateCampaign}
// //             >
// //               Create Campaign
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Stats + Quick Donate */}
// //         <DonationStats stats={donationStats} className="m-2" />
// //         <QuickDonation onQuickDonate={handleQuickDonation} />

// //         {/* Campaigns + Donors */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-10">
// //           <div className="lg:col-span-2 space-y-8">
// //             <div className="bg-card rounded-lg p-6 border border-border">
// //               {/* Tabs */}
// //               <div className="flex flex-wrap gap-2 mb-6">
// //                 {[
// //                   "active",
// //                   "featured",
// //                   "scholarship",
// //                   "education",
// //                   "infrastructure",
// //                 ].map((tab) => (
// //                   <Button
// //                     key={tab}
// //                     variant={activeTab === tab ? "default" : "outline"}
// //                     size="sm"
// //                     onClick={() => setActiveTab(tab)}
// //                   >
// //                     {tab.charAt(0).toUpperCase() + tab.slice(1)} Campaigns
// //                   </Button>
// //                 ))}
// //               </div>

// //               {/* ✅ Search inside campaigns section */}
// //               <div className="mb-4 flex items-center gap-3">
// //                 <input
// //                   type="text"
// //                   placeholder="Search campaigns..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
// //                 />
// //                 {searchQuery && (
// //                   <Button
// //                     variant="outline"
// //                     iconName="X"
// //                     onClick={() => setSearchQuery("")}
// //                   >
// //                     Clear
// //                   </Button>
// //                 )}
// //               </div>

// //               {/* Campaign list */}
// //               <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {campaigns.length ? (
// //                     campaigns.map((campaign) => (
// //                       <CampaignCard
// //                         key={campaign._id}
// //                         campaign={campaign}
// //                         onDonate={() => {}}
// //                         onViewDetails={() => {}}
// //                         formatCurrency={formatCurrency}
// //                         calculateProgress={calculateProgress}
// //                       />
// //                     ))
// //                   ) : (
// //                     <div className="text-center py-12 col-span-2">
// //                       <Icon
// //                         name="Search"
// //                         size={48}
// //                         className="mx-auto text-text-secondary mb-4"
// //                       />
// //                       <h3 className="text-lg font-semibold text-text-primary mb-2">
// //                         No campaigns found
// //                       </h3>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <DonorRecognition donors={topDonors} />
// //           </div>
// //         </div>
// //       </main>

// //       {/* Create Campaign Modal */}
// //       <CreateCampaignModal
// //         isOpen={isCreateCampaignModalOpen}
// //         onClose={() => setIsCreateCampaignModalOpen(false)}
// //         onSubmit={handleSubmitCampaign}
// //       />
// //     </div>
// //   );
// // };

// // export default Donation;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
// import Button from "../../../components/ui/Button";
// import Icon from "../../../components/AppIcon";
// import CampaignCard from "./components/CampaignCard";
// import DonationStats from "./components/DonationStats";
// import QuickDonation from "./components/QuickDonation";
// import DonorRecognition from "./components/DonorRecognition";
// import CreateCampaignModal from "./components/CreateCampaignModal";
// import DonationTabs from "./components/DonationTabs"; // import the tabs component

// import {
//   getAllCampaigns,
//   getDonationStats,
//   quickDonate,
//   getDonorsByAmountLast30Days,
//   createCampaign,
//   getUserDonationData, // import your axios service
// } from "../../../lib/mongo/donationServices";

// const Donation = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [campaigns, setCampaigns] = useState([]);
//   const [donationStats, setDonationStats] = useState({});
//   const [topDonors, setTopDonors] = useState([]);
//   const [activeTab, setActiveTab] = useState("active");
//   const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
//     useState(false);
//   const [userTotalDonations, setUserTotalDonations] = useState(0);

//   const [searchQuery, setSearchQuery] = useState("");

//   // DonationTabs data
//   const [donationHistory, setDonationHistory] = useState([]);
//   const [recurringDonations, setRecurringDonations] = useState([]);
//   const [taxDocuments, setTaxDocuments] = useState([]);

//   useEffect(() => {
//     setUser({
//       id: 1,
//       name: "Sarah Johnson",
//       email: "sarah.j@email.com",
//       role: "alumni",
//       avatar: "https://randomuser.me/api/portraits/women/32.jpg",
//     });
//   }, []);

//   // Fetch campaigns
//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const data = await getAllCampaigns({
//           search: searchQuery,
//           category: activeTab !== "active" ? activeTab : "",
//         });
//         setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
//       } catch (err) {
//         console.error(err);
//         setCampaigns([]);
//       }
//     };
//     fetchCampaigns();
//   }, [activeTab, searchQuery]);

//   // Fetch donation stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const stats = await getDonationStats();
//         setDonationStats(stats?.stats || {});
//       } catch (err) {
//         console.error(err);
//         setDonationStats({});
//       }
//     };
//     fetchStats();
//   }, []);

//   // Fetch top donors
//   useEffect(() => {
//     const fetchTopDonors = async () => {
//       try {
//         const res = await getDonorsByAmountLast30Days();
//         const donors = res?.donors || [];
//         const donorMap = {};
//         donors.forEach((donation) => {
//           if (donorMap[donation.donorId]) {
//             donorMap[donation.donorId].amount += donation.amount;
//           } else {
//             donorMap[donation.donorId] = { ...donation };
//           }
//         });
//         setTopDonors(
//           Object.values(donorMap).sort((a, b) => b.amount - a.amount)
//         );
//       } catch (err) {
//         console.error(err);
//         setTopDonors([]);
//       }
//     };
//     fetchTopDonors();
//   }, []);

//   // Fetch donation tabs data
//   useEffect(() => {
//     const fetchDonationData = async () => {
//       try {
//         const res = await getUserDonationData();
//         setDonationHistory(res?.donationHistory || []);
//         setRecurringDonations(res?.recurringDonations || []);
//         setTaxDocuments(res?.taxDocuments || []);
//         setUserTotalDonations(res?.totalDonation || 0);
//         console.log(res.totalDonation);
//         console.log(
//           "User Total Donations in Main Component:",
//           userTotalDonations
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDonationData();
//   }, [userTotalDonations]);

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(amount);

//   const calculateProgress = (raised, target) =>
//     target > 0 ? Math.round((raised / target) * 100) : 0;

//   const handleQuickDonation = async (amount, type) => {
//     try {
//       await quickDonate({ amount, category: type });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCreateCampaign = () => setIsCreateCampaignModalOpen(true);

//   const handleSubmitCampaign = async (formData) => {
//     try {
//       await createCampaign(formData);
//       setIsCreateCampaignModalOpen(false);
//       const data = await getAllCampaigns({
//         search: searchQuery,
//         category: activeTab !== "active" ? activeTab : "",
//       });
//       setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
//     } catch (err) {
//       console.error("Error creating campaign:", err);
//     }
//   };

//   const handleExportReceipts = () => {
//     // TODO: implement receipt export logic
//     console.log("Export all receipts");
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <BreadcrumbTrail user={user} currentPage="Donation" />

//         {/* Header */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-text-primary">
//               Donation Center
//             </h1>
//             <p className="mt-2 text-text-secondary">
//               Support your alma mater through impactful giving and fundraising
//               campaigns
//             </p>
//           </div>
//           <div className="mt-4 sm:mt-0 flex space-x-3">
//             <Button variant="outline" iconName="Download">
//               Tax Receipts
//             </Button>
//             <Button
//               variant="default"
//               iconName="Plus"
//               onClick={handleCreateCampaign}
//             >
//               Create Campaign
//             </Button>
//           </div>
//         </div>

//         {/* Stats + Quick Donate */}
//         <DonationStats stats={donationStats} className="m-2" />
//         <QuickDonation onQuickDonate={handleQuickDonation} />

//         {/* Campaigns + Donors */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-10">
//           <div className="lg:col-span-2 space-y-8">
//             {/* Campaigns section */}
//             <div className="bg-card rounded-lg p-6 border border-border">
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {[
//                   "active",
//                   "featured",
//                   "scholarship",
//                   "education",
//                   "infrastructure",
//                 ].map((tab) => (
//                   <Button
//                     key={tab}
//                     variant={activeTab === tab ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => setActiveTab(tab)}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)} Campaigns
//                   </Button>
//                 ))}
//               </div>

//               {/* Search */}
//               <div className="mb-4 flex items-center gap-3">
//                 <input
//                   type="text"
//                   placeholder="Search campaigns..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
//                 />
//                 {searchQuery && (
//                   <Button
//                     variant="outline"
//                     iconName="X"
//                     onClick={() => setSearchQuery("")}
//                   >
//                     Clear
//                   </Button>
//                 )}
//               </div>

//               {/* Campaign list */}
//               <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {campaigns.length ? (
//                     campaigns.map((c) => (
//                       <CampaignCard
//                         key={c._id}
//                         campaign={c}
//                         onDonate={() => {}}
//                         onViewDetails={() => {}}
//                         formatCurrency={formatCurrency}
//                         calculateProgress={calculateProgress}
//                       />
//                     ))
//                   ) : (
//                     <div className="text-center py-12 col-span-2">
//                       <Icon
//                         name="Search"
//                         size={48}
//                         className="mx-auto text-text-secondary mb-4"
//                       />
//                       <h3 className="text-lg font-semibold text-text-primary mb-2">
//                         No campaigns found
//                       </h3>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Donation Tabs */}
//             <DonationTabs
//               donationHistory={donationHistory}
//               recurringDonations={recurringDonations}
//               taxDocuments={taxDocuments}
//               userTotalDonations={userTotalDonations}
//               totalPerCampaign={donationStats.totalPerCampaign || []}
//               totalQuick={
//                 donationStats.totalQuick || {
//                   totalAmount: 0,
//                   transactionCount: 0,
//                 }
//               }
//               onExportReceipts={handleExportReceipts}
//             />
//           </div>

//           <div className="space-y-6">
//             <DonorRecognition donors={topDonors} />
//           </div>
//         </div>
//       </main>

//       <CreateCampaignModal
//         isOpen={isCreateCampaignModalOpen}
//         onClose={() => setIsCreateCampaignModalOpen(false)}
//         onSubmit={handleSubmitCampaign}
//       />
//     </div>
//   );
// };

// export default Donation;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import CampaignCard from "./components/CampaignCard";
import DonationStats from "./components/DonationStats";
import QuickDonation from "./components/QuickDonation";
import DonorRecognition from "./components/DonorRecognition";
import CreateCampaignModal from "./components/CreateCampaignModal";
import DonationTabs from "./components/DonationTabs";

import {
  getAllCampaigns,
  getDonationStats,
  quickDonate,
  getDonorsByAmountLast30Days,
  createCampaign,
  getUserDonationData,
} from "../../../lib/mongo/donationServices";

const Donation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donationStats, setDonationStats] = useState({});
  const [topDonors, setTopDonors] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false);
  const [userTotalDonations, setUserTotalDonations] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  // DonationTabs data
  const [donationHistory, setDonationHistory] = useState([]);
  const [recurringDonations, setRecurringDonations] = useState([]);
  const [taxDocuments, setTaxDocuments] = useState([]);

  // Fetch user info
  useEffect(() => {
    setUser({
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "alumni",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    });
  }, []);

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getAllCampaigns({
          search: searchQuery,
          category: activeTab !== "active" ? activeTab : "",
        });
        setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
      } catch (err) {
        console.error(err);
        setCampaigns([]);
      }
    };
    fetchCampaigns();
  }, [activeTab, searchQuery]);

  // Fetch donation stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getDonationStats();
        setDonationStats(stats?.stats || {});
      } catch (err) {
        console.error(err);
        setDonationStats({});
      }
    };
    fetchStats();
  }, []);

  // Fetch top donors
  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const res = await getDonorsByAmountLast30Days();
        const donors = res?.donors || [];
        const donorMap = {};
        donors.forEach((donation) => {
          if (donorMap[donation.donorId]) {
            donorMap[donation.donorId].amount += donation.amount;
          } else {
            donorMap[donation.donorId] = { ...donation };
          }
        });
        setTopDonors(
          Object.values(donorMap).sort((a, b) => b.amount - a.amount)
        );
      } catch (err) {
        console.error(err);
        setTopDonors([]);
      }
    };
    fetchTopDonors();
  }, []);

  // Fetch donation tabs data
  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const res = await getUserDonationData();
        setDonationHistory(res?.donationHistory || []);
        setRecurringDonations(res?.recurringDonations || []);
        setTaxDocuments(res?.taxDocuments || []);
        setUserTotalDonations(res?.totalDonation || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonationData();
  }, []); // ✅ Only run once on mount

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  const calculateProgress = (raised, target) =>
    target > 0 ? Math.round((raised / target) * 100) : 0;

  const handleQuickDonation = async (amount, type) => {
    try {
      await quickDonate({ amount, category: type });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCampaign = () => setIsCreateCampaignModalOpen(true);

  const handleSubmitCampaign = async (formData) => {
    try {
      await createCampaign(formData);
      setIsCreateCampaignModalOpen(false);
      const data = await getAllCampaigns({
        search: searchQuery,
        category: activeTab !== "active" ? activeTab : "",
      });
      setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  const handleExportReceipts = () => {
    console.log("Export all receipts");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} currentPage="Donation" />

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Donation Center
            </h1>
            <p className="mt-2 text-text-secondary">
              Support your alma mater through impactful giving and fundraising
              campaigns
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline" iconName="Download">
              Tax Receipts
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              onClick={handleCreateCampaign}
            >
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Stats + Quick Donate */}
        <DonationStats stats={donationStats} className="m-2" />
        <QuickDonation onQuickDonate={handleQuickDonation} />

        {/* Campaigns + Donors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Campaigns section */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "active",
                  "featured",
                  "scholarship",
                  "education",
                  "infrastructure",
                ].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Campaigns
                  </Button>
                ))}
              </div>

              {/* Search */}
              <div className="mb-4 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {searchQuery && (
                  <Button
                    variant="outline"
                    iconName="X"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Campaign list */}
              <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaigns.length ? (
                    campaigns.map((c) => (
                      <CampaignCard
                        key={c._id}
                        campaign={c}
                        onDonate={() => {}}
                        onViewDetails={() => {}}
                        formatCurrency={formatCurrency}
                        calculateProgress={calculateProgress}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 col-span-2">
                      <Icon
                        name="Search"
                        size={48}
                        className="mx-auto text-text-secondary mb-4"
                      />
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        No campaigns found
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Donation Tabs */}
            <DonationTabs
              donationHistory={donationHistory}
              recurringDonations={recurringDonations}
              taxDocuments={taxDocuments}
              userTotalDonations={userTotalDonations} // ✅ Pass correct prop
              totalPerCampaign={donationStats.totalPerCampaign || []}
              totalQuick={
                donationStats.totalQuick || {
                  totalAmount: 0,
                  transactionCount: 0,
                }
              }
              onExportReceipts={handleExportReceipts}
            />
          </div>

          <div className="space-y-6">
            <DonorRecognition donors={topDonors} />
          </div>
        </div>
      </main>

      <CreateCampaignModal
        isOpen={isCreateCampaignModalOpen}
        onClose={() => setIsCreateCampaignModalOpen(false)}
        onSubmit={handleSubmitCampaign}
      />
    </div>
  );
};

export default Donation;
