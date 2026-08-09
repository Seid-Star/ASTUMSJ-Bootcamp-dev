const express = require("express");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();
router.get("/", protect, authorize("admin"), getSettings);
router.put("/", protect, authorize("admin"), updateSettings);
module.exports = router;
