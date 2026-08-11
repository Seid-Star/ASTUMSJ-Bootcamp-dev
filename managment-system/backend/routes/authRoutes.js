const express = require("express");
const { body } = require("express-validator");
const { signup, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const router = express.Router();
const signupValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("division").trim().notEmpty().withMessage("Division is required"),
  body("year").trim().notEmpty().withMessage("Year is required"),
  validate,
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", protect, getMe);

module.exports = router;
