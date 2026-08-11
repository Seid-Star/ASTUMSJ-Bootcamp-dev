const express = require("express");
const { body, param } = require("express-validator");
const {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");

const router = express.Router();

const createMemberValidation = [
  body("name").trim().notEmpty().withMessage("Member name is required"),
  body("memberId").trim().notEmpty().withMessage("Member ID is required"),
  body("division")
    .isIn(["Design", "Development", "CPD", "Cyber", "Data Science"])
    .withMessage("Invalid division selected"),
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("attendanceStatus")
    .optional()
    .isIn(["Active", "Needs Attention", "Inactive"])
    .withMessage("Invalid attendance status"),
  body("campusStatus")
    .optional()
    .isIn(["On Campus", "Off Campus", "Withdrawn"])
    .withMessage("Invalid campus status"),
  validate,
];

const updateMemberValidation = [
  param("id").isMongoId().withMessage("Invalid member ID format"),
  body("division")
    .optional()
    .isIn(["Design", "Development", "CPD", "Cyber", "Data Science"])
    .withMessage("Invalid division selected"),
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("attendanceStatus")
    .optional()
    .isIn(["Active", "Needs Attention", "Inactive"])
    .withMessage("Invalid attendance status"),
  body("campusStatus")
    .optional()
    .isIn(["On Campus", "Off Campus", "Withdrawn"])
    .withMessage("Invalid campus status"),
  validate,
];

const mongoIdValidation = [
  param("id").isMongoId().withMessage("Invalid member ID format"),
  validate,
];

router.get("/", protect, getMembers);
router.get("/:id", protect, mongoIdValidation, getMemberById);
router.post(
  "/",
  protect,
  authorize("admin"),
  createMemberValidation,
  createMember,
);
router.put(
  "/:id",
  protect,
  authorize("admin", "supervisor"),
  updateMemberValidation,
  updateMember,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  mongoIdValidation,
  deleteMember,
);

module.exports = router;
