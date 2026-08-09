const express = require("express");
const {
  getAttendance,
  markAttendance,
  updateAttendance,
} = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();
router.get("/", protect, getAttendance);
router.post("/", protect, authorize("admin", "supervisor"), markAttendance);
router.put("/:id", protect, authorize("admin", "supervisor"), updateAttendance);
module.exports = router;
