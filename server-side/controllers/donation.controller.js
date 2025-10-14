const mongoose = require("mongoose");
const DonationCampaign = require("../models/DonationCampaign.model");
const QuickDonation = require("../models/QuickDonation.model");
const Transaction = require("../models/Transaction.model");

// Create a new campaign (any user)
const createCampaign = async (req, res) => {
  try {
    const { title, description, targetAmount, daysRemaining, category, image } =
      req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const campaign = new DonationCampaign({
      title,
      description,
      targetAmount,
      daysRemaining,
      category,
      image,
      createdBy: userId,
      status: userRole === "admin" ? "approved" : "pending",
    });

    await campaign.save();
    res.status(201).json({
      message:
        userRole === "admin"
          ? "Campaign created and automatically approved"
          : "Campaign created and pending approval",
      campaign,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create campaign", error: error.message });
  }
};

// // Get all campaigns (filtered, paginated, sorted by ending soon)
// const getAllCampaigns = async (req, res) => {
//   try {
//     const { category, page = 1, limit = 10 } = req.query;

//     // Build filter
//     const filter = { status: "approved" };
//     if (category) filter.category = category;

//     // Sorting: campaigns ending soon first, then by raisedAmount descending
//     const sort = { daysRemaining: 1, raisedAmount: -1 };

//     // Fetch campaigns
//     const campaigns = await DonationCampaign.find(filter)
//       .populate("createdBy", "name email avatar")
//       .sort(sort)
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//       .lean();

//     // Total matching campaigns
//     const total = await DonationCampaign.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       total,                 // total matching campaigns
//       page: Number(page),
//       limit: Number(limit),
//       pages: Math.ceil(total / limit),
//       count: campaigns.length,
//       campaigns,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch campaigns",
//       error: error.message,
//     });
//   }
// };
// const getAllCampaigns = async (req, res) => {
//   try {
//     const { category, search, page = 1, limit = 10 } = req.query;

//     // Base filter (only approved campaigns)
//     const filter = { status: "approved" };

//     // Filter by category if provided
//     if (category) filter.category = category;

//     // Filter by campaign name if search is provided
//     if (search) {
//       filter.title = { $regex: search, $options: "i" }; // case-insensitive search
//     }

//     // Sorting: campaigns ending soon first, then by raisedAmount descending
//     const sort = { daysRemaining: 1, raisedAmount: -1 };

//     // Fetch campaigns
//     const campaigns = await DonationCampaign.find(filter)
//       .populate("createdBy", "name email avatar")
//       .sort(sort)
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//       .lean();

//     // Total matching campaigns
//     const total = await DonationCampaign.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       total, // total matching campaigns
//       page: Number(page),
//       limit: Number(limit),
//       pages: Math.ceil(total / limit),
//       count: campaigns.length,
//       campaigns,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch campaigns",
//       error: error.message,
//     });
//   }
// };

const getAllCampaigns = async (req, res) => {
  try {
    const { category = "", search = "", page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const filter = { status: "approved" };

    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const sort = { daysRemaining: 1, raisedAmount: -1 };

    const campaigns = await DonationCampaign.find(filter)
      .populate("createdBy", "name email avatar")
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const total = await DonationCampaign.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      campaigns,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch campaigns",
      error: error.message,
    });
  }
};

// Get all pending campaigns (admin)
// const getPendingCampaigns = async (req, res) => {
//   try {
//     const campaigns = await DonationCampaign.find({
//       status: "pending",
//     }).populate("createdBy", "name email avatar");
//     res.status(200).json({ count: campaigns.length, campaigns });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to fetch pending campaigns",
//       error: error.message,
//     });
//   }
// };
// 📌 Get all pending campaigns with pagination
const getPendingCampaigns = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await DonationCampaign.countDocuments({ status: "pending" });

    // Fetch campaigns with pagination
    const campaigns = await DonationCampaign.find({ status: "pending" })
      .populate("createdBy", "name email avatar")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      count: campaigns.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      campaigns,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch pending campaigns",
      error: error.message,
    });
  }
};


// Admin: Approve or reject campaign
const handleCampaignApproval = async (req, res) => {
  try {
    const { campaignId, action } = req.body; // 'approve' or 'reject'
    const campaign = await DonationCampaign.findById(campaignId);

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    campaign.status = action === "approve" ? "approved" : "rejected";
    await campaign.save();
    res
      .status(200)
      .json({ message: `Campaign ${campaign.status} successfully`, campaign });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update campaign", error: error.message });
  }
};

// Donate to a campaign
// const donateToCampaign = async (req, res) => {
//   try {
//     const { campaignId, amount } = req.body;
//     const userId = req.user.id;

//     if (!campaignId || !amount)
//       return res
//         .status(400)
//         .json({ message: "Campaign ID and amount are required" });

//     const campaign = await DonationCampaign.findById(campaignId);
//     if (!campaign || campaign.status !== "approved")
//       return res
//         .status(404)
//         .json({ message: "Campaign not found or not approved" });

//     // Check if user already donated → add amount
//     const existingDonor = campaign.donors.find(
//       (d) => d.userId.toString() === userId
//     );
//     if (existingDonor) {
//       existingDonor.amount += amount;
//     } else {
//       campaign.donors.push({ userId, amount });
//       campaign.donorCount += 1;
//     }
//     campaign.raisedAmount += amount;

//     await campaign.save();
//     res.status(200).json({ message: "Donation successful", campaign });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to donate", error: error.message });
//   }
// };
// Campaign Donation
const donateToCampaign = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let transaction = null;

  try {
    const { campaignId, amount } = req.body;
    const userId = req.user.id;

    if (!campaignId || !amount)
      return res.status(400).json({ message: "Campaign ID and amount required" });

    const campaign = await DonationCampaign.findById(campaignId).session(session);
    if (!campaign || campaign.status !== "approved")
      return res.status(404).json({ message: "Campaign not found or not approved" });

    // 1️⃣ Create transaction as pending
    transaction = new Transaction({
      userId,
      type: "campaign",
      campaignName: campaign.title,
      amount,
      status: "pending",
      receipt: `REC-${new mongoose.Types.ObjectId().toString().slice(0, 6)}`,
    });
    await transaction.save({ session });

    // 2️⃣ Update campaign donation
    const existingDonor = campaign.donors.find((d) => d.userId.toString() === userId);
    if (existingDonor) {
      existingDonor.amount += amount;
    } else {
      campaign.donors.push({ userId, amount });
      campaign.donorCount += 1;
    }
    campaign.raisedAmount += amount;

    await campaign.save({ session });

    // 3️⃣ Success → mark transaction completed
    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Donation successful", campaign, transaction });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // 4️⃣ Failed transaction
    if (transaction) {
      transaction.status = "failed";
      await transaction.save();
    }

    res.status(500).json({ message: "Failed to donate", error: error.message });
  }
};

// Quick donation (any user)
// const quickDonate = async (req, res) => {
//   try {
//     const { amount, category, message } = req.body;
//     const donor = req.user.id;

//     const donation = new QuickDonation({ donor, amount, category, message });
//     await donation.save();

//     res.status(201).json({ message: "Donation successful", donation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to donate", error: error.message });
//   }
// };
// const quickDonate = async (req, res) => {
//   try {
//     const { amount, category, message } = req.body;
//     const donor = req.user.id;

//     // Prevent duplicate donation (e.g., same user, same amount, same category, last 5 sec)
//     const fiveSecondsAgo = new Date(Date.now() - 5000);
//     const existing = await QuickDonation.findOne({
//       donor,
//       category,
//       amount,
//       createdAt: { $gte: fiveSecondsAgo },
//     });

//     if (existing) {
//       return res.status(400).json({ message: "Donation already processed" });
//     }

//     const donation = new QuickDonation({ donor, amount, category, message });
//     await donation.save();

//     res.status(201).json({ message: "Donation successful", donation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to donate", error: error.message });
//   }
// };
// Quick Donation
const quickDonate = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let transaction;
  try {
    const { amount, category, message } = req.body;
    const userId = req.user.id;

    // Prevent rapid duplicate donations
    const fiveSecondsAgo = new Date(Date.now() - 5000);
    const existing = await QuickDonation.findOne({
      donor: userId,
      category,
      amount,
      createdAt: { $gte: fiveSecondsAgo },
    }).session(session);

    if (existing) {
      return res
        .status(400)
        .json({ message: "Donation already processed recently" });
    }

    // 1️⃣ Create transaction as pending
    transaction = new Transaction({
      userId,
      type: "quick",
      campaignName: category || "Quick Donation",
      amount,
      status: "pending",
      receipt: `REC-${new mongoose.Types.ObjectId().toString().slice(0, 6)}`,
    });
    await transaction.save({ session });

    // 2️⃣ Process donation
    const donation = new QuickDonation({
      donor: userId,
      amount,
      category,
      message,
    });
    await donation.save({ session });

    // 3️⃣ Mark transaction completed
    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Donation successful", transaction });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (transaction) {
      transaction.status = "failed";
      await transaction.save();
    }

    res.status(500).json({ message: "Failed to donate", error: error.message });
  }
};

// Get donors of a campaign
const getCampaignDonors = async (req, res) => {
  try {
    const campaign = await DonationCampaign.findById(
      req.params.campaignId
    ).populate("donors.userId", "name email avatar");
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    res.status(200).json({ donors: campaign.donors });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch donors", error: error.message });
  }
};

// 📌 Unified: Get Recent Donors (from both Campaign + Quick Donation)
// const getUnifiedRecentDonors = async (req, res) => {
//   try {
//     // Campaign donors
//     const campaignDonors = await DonationCampaign.find(
//       { "donors.0": { $exists: true } }, // only campaigns with donors
//       { title: 1, donors: 1 }
//     )
//       .populate("donors.userId", "name email imageUrl")
//       .lean();

//     let donorsList = [];
//     campaignDonors.forEach((c) => {
//       c.donors.forEach((d) => {
//         donorsList.push({
//           donorId: d.userId?._id,
//           name: d.userId?.name,
//           email: d.userId?.email,
//           image: d.userId?.imageUrl,
//           campaignTitle: c.title,
//           amount: d.amount,
//           donatedAt: d.donatedAt,
//           source: "campaign",
//         });
//       });
//     });

//     // Quick donations
//     const quickDonors = await QuickDonation.find()
//       .populate("donor", "name email imageUrl")
//       .lean();

//     quickDonors.forEach((d) => {
//       donorsList.push({
//         donorId: d.donor?._id,
//         name: d.donor?.name,
//         email: d.donor?.email,
//         image: d.donor?.imageUrl,
//         campaignTitle: "Quick Donation",
//         amount: d.amount,
//         donatedAt: d.createdAt,
//         source: "quick",
//       });
//     });

//     // Sort by latest donation date
//     donorsList.sort((a, b) => new Date(b.donatedAt) - new Date(a.donatedAt));

//     res.status(200).json({
//       success: true,
//       donors: donorsList.slice(0, 10), // latest 10 donors
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // 📌 Unified: Get All Donors (sorted by amount descending)
// // 📌 Unified: Get All Donors Like Recent, But Sorted by Amount
// const getUnifiedTopDonors = async (req, res) => {
//   try {
//     const allDonations = [];

//     // Campaign donations
//     const campaigns = await DonationCampaign.find({}, { title: 1, donors: 1 })
//       .populate("donors.userId", "name email imageUrl")
//       .lean();

//     campaigns.forEach((c) => {
//       c.donors.forEach((d) => {
//         if (!d.userId) return;
//         allDonations.push({
//           donorId: d.userId._id.toString(),
//           name: d.userId.name,
//           email: d.userId.email,
//           image: d.userId.imageUrl,
//           campaignTitle: c.title,
//           amount: d.amount,
//           donatedAt: d.donatedAt,
//           source: "campaign",
//         });
//       });
//     });

//     // Quick donations
//     const quickDonations = await QuickDonation.find()
//       .populate("donor", "name email imageUrl")
//       .lean();

//     quickDonations.forEach((d) => {
//       if (!d.donor) return;
//       allDonations.push({
//         donorId: d.donor._id.toString(),
//         name: d.donor.name,
//         email: d.donor.email,
//         image: d.donor.imageUrl,
//         campaignTitle: "Quick Donation",
//         amount: d.amount,
//         donatedAt: d.createdAt,
//         source: "quick",
//       });
//     });

//     // ✅ Sort by amount (descending)
//     allDonations.sort((a, b) => b.amount - a.amount);

//     res.status(200).json({ success: true, donors: allDonations });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// Get recent donors (with pagination)
const getUnifiedRecentDonors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Campaign donors
    const campaignDonors = await DonationCampaign.find(
      { "donors.0": { $exists: true } },
      { title: 1, donors: 1 }
    )
      .populate("donors.userId", "name email imageUrl")
      .lean();

    let donorsList = [];
    campaignDonors.forEach((c) => {
      c.donors.forEach((d) => {
        donorsList.push({
          donorId: d.userId?._id,
          name: d.userId?.name,
          email: d.userId?.email,
          image: d.userId?.imageUrl,
          campaignTitle: c.title,
          amount: d.amount,
          donatedAt: d.donatedAt,
          source: "campaign",
        });
      });
    });

    // Quick donations
    const quickDonors = await QuickDonation.find()
      .populate("donor", "name email imageUrl")
      .lean();

    quickDonors.forEach((d) => {
      donorsList.push({
        donorId: d.donor?._id,
        name: d.donor?.name,
        email: d.donor?.email,
        image: d.donor?.imageUrl,
        campaignTitle: "Quick Donation",
        amount: d.amount,
        donatedAt: d.createdAt,
        source: "quick",
      });
    });

    // Sort by latest donation date
    donorsList.sort((a, b) => new Date(b.donatedAt) - new Date(a.donatedAt));

    const paginatedDonors = donorsList.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total: donorsList.length,
      donors: paginatedDonors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get top donors (by amount, with pagination)
const getUnifiedTopDonors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const allDonations = [];

    // Campaign donations
    const campaigns = await DonationCampaign.find({}, { title: 1, donors: 1 })
      .populate("donors.userId", "name email imageUrl")
      .lean();

    campaigns.forEach((c) => {
      c.donors.forEach((d) => {
        if (!d.userId) return;
        allDonations.push({
          donorId: d.userId._id.toString(),
          name: d.userId.name,
          email: d.userId.email,
          image: d.userId.imageUrl,
          campaignTitle: c.title,
          amount: d.amount,
          donatedAt: d.donatedAt,
          source: "campaign",
        });
      });
    });

    // Quick donations
    const quickDonations = await QuickDonation.find()
      .populate("donor", "name email imageUrl")
      .lean();

    quickDonations.forEach((d) => {
      if (!d.donor) return;
      allDonations.push({
        donorId: d.donor._id.toString(),
        name: d.donor.name,
        email: d.donor.email,
        image: d.donor.imageUrl,
        campaignTitle: "Quick Donation",
        amount: d.amount,
        donatedAt: d.createdAt,
        source: "quick",
      });
    });

    // Sort by amount descending
    allDonations.sort((a, b) => b.amount - a.amount);

    const paginatedDonors = allDonations.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total: allDonations.length,
      donors: paginatedDonors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Unified: Get Donors (last 30 days, sorted by amount)
// const getDonorsByAmountLast30Days = async (req, res) => {
//   try {
//     const allDonations = [];
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - 30); // last 30 days

//     // Campaign donations (filter by last 30 days)
//     const campaigns = await DonationCampaign.find(
//       { "donors.donatedAt": { $gte: cutoffDate } },
//       { title: 1, donors: 1 }
//     )
//       .populate("donors.userId", "name email imageUrl")
//       .lean();

//     campaigns.forEach((c) => {
//       c.donors.forEach((d) => {
//         if (!d.userId) return;
//         if (new Date(d.donatedAt) < cutoffDate) return; // extra check
//         allDonations.push({
//           donorId: d.userId._id.toString(),
//           name: d.userId.name,
//           email: d.userId.email,
//           image: d.userId.imageUrl,
//           campaignTitle: c.title,
//           amount: d.amount,
//           donatedAt: d.donatedAt,
//           source: "campaign",
//         });
//       });
//     });

//     // Quick donations (filter by last 30 days)
//     const quickDonations = await QuickDonation.find({
//       createdAt: { $gte: cutoffDate },
//     })
//       .populate("donor", "name email imageUrl")
//       .lean();

//     quickDonations.forEach((d) => {
//       if (!d.donor) return;
//       allDonations.push({
//         donorId: d.donor._id.toString(),
//         name: d.donor.name,
//         email: d.donor.email,
//         image: d.donor.imageUrl,
//         campaignTitle: "Quick Donation",
//         amount: d.amount,
//         donatedAt: d.createdAt,
//         source: "quick",
//       });
//     });

//     // ✅ Sort by amount (descending)
//     allDonations.sort((a, b) => b.amount - a.amount);

//     res.status(200).json({ success: true, donors: allDonations });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const getDonorsByAmountLast30Days = async (req, res) => {
  try {
    const allDonations = [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // last 30 days

    // Campaign donations
    const campaigns = await DonationCampaign.find(
      { "donors.donatedAt": { $gte: cutoffDate } },
      { title: 1, donors: 1 }
    )
      .populate("donors.userId", "name email imageUrl") // get avatar
      .lean();

    campaigns.forEach((c) => {
      c.donors.forEach((d) => {
        if (!d.userId) return;
        if (new Date(d.donatedAt) < cutoffDate) return; // extra check
        allDonations.push({
          donorId: d.userId._id.toString(),
          name: d.userId.name,
          email: d.userId.email,
          avatar: d.userId.imageUrl || null, // renamed to avatar
          campaignTitle: c.title,
          amount: d.amount,
          donatedAt: d.donatedAt,
          source: "campaign",
        });
      });
    });

    // Quick donations
    const quickDonations = await QuickDonation.find({
      createdAt: { $gte: cutoffDate },
    })
      .populate("donor", "name email avatar") // get avatar
      .lean();

    quickDonations.forEach((d) => {
      if (!d.donor) return;
      allDonations.push({
        donorId: d.donor._id.toString(),
        name: d.donor.name,
        email: d.donor.email,
        avatar: d.donor.avatar || null, // renamed to avatar
        campaignTitle: "Quick Donation",
        amount: d.amount,
        donatedAt: d.createdAt,
        source: "quick",
      });
    });

    // Sort by amount descending
    allDonations.sort((a, b) => b.amount - a.amount);

    res.status(200).json({ success: true, donors: allDonations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDonationAnalytics = async (req, res) => {
  try {
    // Get approved campaigns with donors
    const campaigns = await DonationCampaign.find({ status: "approved" })
      .populate("donors.userId", "name email role")
      .lean();

    // Get quick donations
    const quickDonations = await QuickDonation.find()
      .populate("donor", "name email role")
      .lean();

    const allDonations = [];

    // Campaign donations
    campaigns.forEach((c) => {
      c.donors.forEach((d) => {
        allDonations.push({
          donor: d.userId?.name,
          email: d.userId?.email,
          role: d.userId?.role,
          campaign: c.title,
          amount: d.amount,
          date: d.donatedAt,
        });
      });
    });

    // Quick donations
    quickDonations.forEach((d) => {
      allDonations.push({
        donor: d.donor?.name,
        email: d.donor?.email,
        role: d.donor?.role,
        campaign: "Quick Donation",
        amount: d.amount,
        date: d.createdAt,
      });
    });

    // ---- Analytics ----
    const totalDonation = allDonations.reduce((sum, d) => sum + d.amount, 0);

    const donationsByRole = allDonations.reduce((acc, d) => {
      if (!d.role) return acc;
      acc[d.role] = (acc[d.role] || 0) + d.amount;
      return acc;
    }, {});

    const topDonation = [...allDonations].sort(
      (a, b) => b.amount - a.amount
    )[0];

    // Chart Data
    const donationTrendData = allDonations.map((d) => ({
      name: new Date(d.date).toISOString().split("T")[0], // yyyy-mm-dd
      value: d.amount,
    }));

    const donationRoleData = Object.keys(donationsByRole).map((role) => ({
      name: role,
      value: donationsByRole[role],
    }));

    res.status(200).json({
      totalDonation,
      donationsByRole,
      topDonation,
      donationTrendData,
      donationRoleData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch donation analytics",
      error: error.message,
    });
  }
};
// 📌 Dashboard Donation Stats (Public View)
const getDonationStats = async (req, res) => {
  try {
    const now = new Date();

    // Calculate date ranges for "this month" and "last month"
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Aggregate overall stats
    const overall = await DonationCampaign.aggregate([
      { $unwind: "$donors" },
      {
        $group: {
          _id: null,
          totalRaised: { $sum: "$donors.amount" },
          totalDonations: { $sum: 1 },
          uniqueDonors: { $addToSet: "$donors.userId" },
        },
      },
    ]);

    const totalRaised = overall[0]?.totalRaised || 0;
    const totalDonations = overall[0]?.totalDonations || 0;
    const totalDonors = overall[0]?.uniqueDonors.length || 0;
    const avgDonation = totalDonations > 0 ? totalRaised / totalDonations : 0;

    // Active campaigns
    const activeCampaigns = await DonationCampaign.countDocuments({
      status: { $in: ["active", "approved"] },
    });

    // Compare with last month
    const lastMonth = await DonationCampaign.aggregate([
      { $unwind: "$donors" },
      {
        $match: {
          "donors.donatedAt": { $gte: startOfLastMonth, $lte: endOfLastMonth },
        },
      },
      {
        $group: {
          _id: null,
          raised: { $sum: "$donors.amount" },
          donations: { $sum: 1 },
          donors: { $addToSet: "$donors.userId" },
        },
      },
    ]);

    const lastRaised = lastMonth[0]?.raised || 0;
    const lastDonors = lastMonth[0]?.donors.length || 0;
    const lastDonations = lastMonth[0]?.donations || 0;

    // % change helpers
    const percentChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return (((current - previous) / previous) * 100).toFixed(1);
    };

    res.status(200).json({
      success: true,
      stats: {
        totalRaised: {
          value: totalRaised,
          change: percentChange(totalRaised, lastRaised) + "%",
        },
        totalDonors: {
          value: totalDonors,
          change: percentChange(totalDonors, lastDonors) + "%",
        },
        activeCampaigns: {
          value: activeCampaigns,
          change: "+3", // you can dynamically calculate new campaigns too
        },
        avgDonation: {
          value: avgDonation.toFixed(2),
          change: percentChange(totalDonations, lastDonations) + "%",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// 📌 Get Campaign Progress for Dashboard (formatted like screenshot)
const getCampaignProgress = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 1️⃣ All active campaigns for overview stats
    const overviewCampaigns = await DonationCampaign.find({
      status: { $in: ["active", "approved"] },
    })
      .select("raisedAmount targetAmount donorCount")
      .lean();

    const totalRaised = overviewCampaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
    const totalTarget = overviewCampaigns.reduce((sum, c) => sum + c.targetAmount, 0);
    const totalDonors = overviewCampaigns.reduce((sum, c) => sum + c.donorCount, 0);
    const totalCampaigns = overviewCampaigns.length;

    const overallProgress = totalTarget
      ? ((totalRaised / totalTarget) * 100).toFixed(1)
      : 0;

    // 2️⃣ Campaigns ending this month or earliest ending
    let endingCampaigns = await DonationCampaign.find({
      status: { $in: ["active", "approved"] },
    })
      .sort({ startDate: 1 })
      .limit(4)
      .lean();

    // 3️⃣ Format campaign details
    const campaigns = endingCampaigns.map((c) => {
      const completion = c.targetAmount
        ? ((c.raisedAmount / c.targetAmount) * 100).toFixed(1)
        : 0;

      // Assign color based on category/type
      const statusColor =
        ["general", "scholarship"].includes(c.category) ? "blue" : "orange";

      return {
        id: c._id,
        title: c.title,
        raisedAmount: c.raisedAmount,
        targetAmount: c.targetAmount,
        donorCount: c.donorCount,
        daysRemaining: c.daysRemaining,
        image: c.image,
        completion: parseFloat(completion), // like 67.5
        statusColor, // "blue" or "orange"
      };
    });

    res.status(200).json({
      success: true,
      overview: {
        totalRaised,
        totalTarget,
        totalDonors,
        totalCampaigns,
        overallProgress: parseFloat(overallProgress),
      },
      campaigns,
    });
  } catch (error) {
    console.error("Error in getCampaignProgress:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// 📌 Get User Donation Data (History, Recurring, Tax Docs)
// const getUserDonationData = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Donation history (flatten donors array per campaign)
//     const history = await DonationCampaign.aggregate([
//       { $unwind: "$donors" },
//       { $match: { "donors.userId": new mongoose.Types.ObjectId(userId) } },
//       {
//         $project: {
//           _id: 0,
//           id: "$donors._id",
//           campaign: "$title",
//           amount: "$donors.amount", // keep numeric
//           date: "$donors.donatedAt",
//           status: { $literal: "completed" },
//           receipt: {
//             $concat: [
//               "REC-",
//               { $substr: [{ $toString: "$donors._id" }, 0, 6] }
//             ]
//           }
//         }
//       },
//       { $sort: { date: -1 } }
//     ]);

//     // Recurring donations (mock for now)
//     const recurringDonations = [
//       {
//         id: 1,
//         campaign: "Annual Scholarship Fund",
//         amount: 50, // numeric, format in frontend
//         frequency: "Monthly",
//         nextPayment: "2025-10-15",
//         status: "active"
//       },
//       {
//         id: 2,
//         campaign: "General Fund",
//         amount: 25,
//         frequency: "Quarterly",
//         nextPayment: "2025-12-01",
//         status: "active"
//       }
//     ];

//     // Tax documents (aggregate yearly total)
//     const taxDocs = await DonationCampaign.aggregate([
//       { $unwind: "$donors" },
//       { $match: { "donors.userId": new mongoose.Types.ObjectId(userId) } },
//       {
//         $group: {
//           _id: { $year: "$donors.donatedAt" },
//           totalDonation: { $sum: "$donors.amount" },
//           documentCount: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: -1 } },
//       {
//         $project: {
//           id: "$_id",
//           year: "$_id",
//           totalDonation: "$totalDonation", // numeric
//           documentCount: 1,
//           status: { $literal: "available" }
//         }
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       donationHistory: history,
//       recurringDonations,
//       taxDocuments: taxDocs
//     });
//   } catch (error) {
//     console.error("Error in getUserDonationData:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const getUserDonationData = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Fetch all transactions of the user, sorted by date descending
    const donationHistory = await Transaction.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ date: -1 })
      .lean();

    // 2️⃣ Compute total donation
    const totalDonation = donationHistory.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // 3️⃣ Compute total per campaign
    const campaignTotalsMap = {};
    donationHistory.forEach((tx) => {
      if (tx.type === "campaign") {
        if (!campaignTotalsMap[tx.campaignName]) {
          campaignTotalsMap[tx.campaignName] = {
            totalAmount: 0,
            transactionCount: 0,
          };
        }
        campaignTotalsMap[tx.campaignName].totalAmount += tx.amount;
        campaignTotalsMap[tx.campaignName].transactionCount += 1;
      }
    });

    const totalPerCampaign = Object.entries(campaignTotalsMap).map(
      ([campaign, data]) => ({
        campaign,
        totalAmount: data.totalAmount,
        transactionCount: data.transactionCount,
      })
    );

    // 4️⃣ Total quick donations
    const quickTransactions = donationHistory.filter(
      (tx) => tx.type === "quick"
    );
    const totalQuick = {
      campaign: "Quick Donations",
      totalAmount: quickTransactions.reduce((sum, tx) => sum + tx.amount, 0),
      transactionCount: quickTransactions.length,
    };

    // 5️⃣ Recurring Donations (mocked)
    const recurringDonations = [
      {
        id: 1,
        campaign: "Annual Scholarship Fund",
        amount: 50,
        frequency: "Monthly",
        nextPayment: "2025-10-15",
        status: "active",
      },
      {
        id: 2,
        campaign: "General Fund",
        amount: 25,
        frequency: "Quarterly",
        nextPayment: "2025-12-01",
        status: "active",
      },
    ];

    // 6️⃣ Tax documents per year
    const taxDocsMap = {};
    donationHistory.forEach((tx) => {
      const year = new Date(tx.date).getFullYear();
      if (!taxDocsMap[year])
        taxDocsMap[year] = { totalDonation: 0, documentCount: 0 };
      taxDocsMap[year].totalDonation += tx.amount;
      taxDocsMap[year].documentCount += 1;
    });

    const taxDocuments = Object.entries(taxDocsMap)
      .sort(([a], [b]) => b - a)
      .map(([year, data]) => ({
        id: year,
        year: Number(year),
        totalDonation: data.totalDonation,
        documentCount: data.documentCount,
        status: "available",
      }));

    res.status(200).json({
      success: true,
      donationHistory,
      totalDonation,
      totalPerCampaign,
      totalQuick,
      recurringDonations,
      taxDocuments,
    });
  } catch (err) {
    console.error("Error in getUserDonationData:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// 📌 Get details of a single campaign
const getCampaignDetails = async (req, res) => {
  try {
    const { campaignId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ success: false, message: "Invalid campaign ID" });
    }

    const campaign = await DonationCampaign.findById(campaignId)
      .populate("donors.userId", "name email avatar") // populate donor info
      .lean();

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    // Calculate percentage raised
    const progress = (campaign.raisedAmount / campaign.targetAmount) * 100;

    // Optional: Sort donors by donatedAt descending
    const sortedDonors = (campaign.donors || []).sort(
      (a, b) => new Date(b.donatedAt) - new Date(a.donatedAt)
    );

    res.status(200).json({
      success: true,
      campaign: {
        id: campaign._id,
        title: campaign.title,
        description: campaign.description,
        targetAmount: campaign.targetAmount,
        raisedAmount: campaign.raisedAmount,
        donorCount: campaign.donorCount,
        daysRemaining: campaign.daysRemaining,
        category: campaign.category,
        image: campaign.image,
        progress: progress.toFixed(1),
        donors: sortedDonors.map((d) => ({
          id: d._id,
          user: d.userId ? { id: d.userId._id, name: d.userId.name, email: d.userId.email, avatar: d.userId.avatar } : null,
          amount: d.amount,
          donatedAt: d.donatedAt,
        })),
      },
    });
  } catch (error) {
    console.error("Error in getCampaignDetails:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get donation history for a user
// 📌 Get donation history for logged-in user
// 📌 Admin: Get all users' donation history with pagination

// Admin: Get all users' donation history with pagination
const getAllDonationHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Transaction.countDocuments();

    const history = await Transaction.find()
      .populate("userId", "name email avatar") // populate user info
      .populate("campaignId", "title category image","userId") // populate campaign info
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      history,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get recurring donations for a user
const getRecurringDonations = async (req, res) => {
  try {
    const userId = req.user.id;

    const recurring = await Donation.find({ donor: userId, recurring: true })
      .lean();

    res.status(200).json({ success: true, recurring });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tax documents
const getTaxDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    // You can aggregate or compute tax info based on donations
    const donations = await Donation.find({ donor: userId }).lean();

    const documents = [];
    const byYear = {};

    donations.forEach(d => {
      const year = new Date(d.date).getFullYear();
      if (!byYear[year]) byYear[year] = { total: 0, count: 0 };
      byYear[year].total += d.amount;
      byYear[year].count += 1;
    });

    for (let year in byYear) {
      documents.push({
        year,
        totalDonation: byYear[year].total,
        documentCount: byYear[year].count,
        status: "available"
      });
    }

    res.status(200).json({ success: true, documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// 📌 Delete a campaign
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const campaign = await DonationCampaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Only admin or campaign creator can delete
    if (userRole !== "admin" && campaign.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this campaign" });
    }

    await DonationCampaign.findByIdAndDelete(id);

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete campaign", error: error.message });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getPendingCampaigns,
  handleCampaignApproval,
  getDonationAnalytics,
  donateToCampaign,
  quickDonate,
  getCampaignDonors,
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
};
