const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware"); // auth middleware
const { authorizeRole } = require("../middlewares/role.middleware");
const {
  createCampaign,
  getAllCampaigns,
  getPendingCampaigns,
  handleCampaignApproval,
  donateToCampaign,
  quickDonate,
  getCampaignDonors,
  getDonationAnalytics,
  getUnifiedRecentDonors,
  getUnifiedTopDonors,
  getDonorsByAmountLast30Days,
  getDonationStats,
  getCampaignProgress,
  getUserDonationData,
  getCampaignDetails,
  getAllDonationHistory,
  getRecurringDonations,
  getTaxDocuments,
  deleteCampaign,
} = require("../controllers/donation.controller");


// ===================== DONATIONS & CAMPAIGNS ===================== //

// Campaign routes
router.post("/campaigns", protect, createCampaign); // create campaign
router.get("/campaigns", getAllCampaigns); // get all approved campaigns
router.get(
  "/campaigns/pending",
  protect,
  authorizeRole("admin"),
  getPendingCampaigns
); // get pending campaigns (admin)

router.get("/analytics", protect, authorizeRole("admin"), getDonationAnalytics); // donation analytics
router.get("/donors/recent", protect, getUnifiedRecentDonors); // recent donors
router.get("/donors/top", protect, getUnifiedTopDonors); // top donors
router.get("/donors/last-30-days", protect, getDonorsByAmountLast30Days); // top donors last 30 days
router.get("/stats", protect, getDonationStats); // donation stats
router.get("/campaigns/progress", getCampaignProgress); // campaign progress
router.get("/user/donations", protect, getUserDonationData); // user donation data
router.post(
  "/campaigns/approve",
  protect,
  authorizeRole("admin"),
  handleCampaignApproval
); // approve/reject campaign
router.post("/campaigns/donate", protect, donateToCampaign); // donate to campaign
router.get("/campaigns/:campaignId/donors", getCampaignDonors); // get donors of a campaign
router.get("/campaigns/:campaignId/details", getCampaignDetails); // get campaign details

// Quick donations
router.post("/quick-donate", protect, quickDonate);

// New routes for donation history, recurring donations, and tax documentsrouter.get("/history", protect, getDonationHistory);
router.get("/history", protect, getAllDonationHistory);
router.get("/recurring", protect, getRecurringDonations);
router.get("/tax-documents", protect, getTaxDocuments);

router.delete("/campaigns/:campaignId", protect, authorizeRole("admin"), deleteCampaign); // delete a campaign (admin)
module.exports = router;
