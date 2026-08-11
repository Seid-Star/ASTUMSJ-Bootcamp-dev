const express = require("express");
const { body, param } = require("express-validator");
const {
  getAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");

const router = express.Router();

const markAttendanceValidation = [
  body("attendance")
    .isArray({ min: 1 })
    .withMessage("Attendance must be a non-empty array"),
  body("attendance.*.status")
    .isIn(["Present", "Absent"])
    .withMessage("Status must be Present or Absent"),
  body("attendance.*.excused")
    .optional()
    .isBoolean()
    .withMessage("Excused must be a boolean"),
  body("date").optional().isISO8601().withMessage("Invalid date format"),
  validate,
];

const updateAttendanceValidation = [
  param("id").isMongoId().withMessage("Invalid attendance record ID"),
  body("status")
    .optional()
    .isIn(["Present", "Absent"])
    .withMessage("Status must be Present or Absent"),
  body("excused")
    .optional()
    .isBoolean()
    .withMessage("Excused must be a boolean"),
  validate,
];

const deleteAttendanceValidation = [
  param("id").isMongoId().withMessage("Invalid attendance record ID"),
  validate,
];

router.get("/", protect, getAttendance);
router.post(
  "/",
  protect,
  authorize("admin", "supervisor"),
  markAttendanceValidation,
  markAttendance,
);
router.put(
  "/:id",
  protect,
  authorize("admin", "supervisor"),
  updateAttendanceValidation,
  updateAttendance,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteAttendanceValidation,
  deleteAttendance,
);

module.exports = router;
