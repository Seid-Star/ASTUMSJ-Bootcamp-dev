const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const validator = require("validator");
const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword, division, year } =
      req.body;
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !division ||
      !year
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      division,
      year,
    });
    const token = generateToken(user._id, user.role);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({
      user: userResponse,
      token,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id, user.role);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({
      user: userResponse,
      token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, login };
