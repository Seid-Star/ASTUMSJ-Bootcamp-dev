const User = require("../models/User");

const getSettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      "theme autoAddCalendarEvents phonePublic",
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const { theme, autoAddCalendarEvents, phonePublic } = req.body;

    if (theme && !["light", "dark"].includes(theme)) {
      return res.status(400).json({
        success: false,
        message: "Theme must be either 'light' or 'dark'",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { theme, autoAddCalendarEvents, phonePublic },
      { new: true, runValidators: true },
    ).select("theme autoAddCalendarEvents phonePublic fullName email role");

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };
