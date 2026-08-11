const express = require("express");
const { body } = require("express-validator");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const router = express.Router();
const updateSettingsValidation = [
  body("theme")
    .optional()
    .isIn(["light", "dark"])
    .withMessage("Theme must be light or dark"),
  body("autoAddCalendarEvents")
    .optional()
    .isBoolean()
    .withMessage("autoAddCalendarEvents must be a boolean value"),
  body("phonePublic")
    .optional()
    .isBoolean()
    .withMessage("phonePublic must be a boolean value"),
  validate,
];

router.get("/", protect, authorize("admin"), getSettings);
router.put(
  "/",
  protect,
  authorize("admin"),
  updateSettingsValidation,
  updateSettings,
);

module.exports = router;
