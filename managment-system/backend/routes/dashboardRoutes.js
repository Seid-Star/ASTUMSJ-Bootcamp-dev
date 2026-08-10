const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAttendanceOverview,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
router.get("/stats", protect, getDashboardStats);
router.get("/attendance-overview", protect, getAttendanceOverview);
module.exports = router;
