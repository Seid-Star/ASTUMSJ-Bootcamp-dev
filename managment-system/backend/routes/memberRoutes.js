const express = require("express");
const {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();
router.get("/", protect, getMembers);
router.get("/:id", protect, getMemberById);
router.post("/", protect, authorize("admin"), createMember);
router.put("/:id", protect, authorize("admin"), updateMember);
router.delete("/:id", protect, authorize("admin"), deleteMember);
module.exports = router;
