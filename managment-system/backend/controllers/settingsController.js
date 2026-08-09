const User = require("../models/User");
const getSettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      "theme autoAddCalendarEvents phonePublic",
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      theme: user.theme,
      autoAddCalendarEvents: user.autoAddCalendarEvents,
      phonePublic: user.phonePublic,
    });
  } catch (error) {
    next(error);
  }
};
const updateSettings = async (req, res, next) => {
  try {
    const { theme, autoAddCalendarEvents, phonePublic } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (theme !== undefined) {
      user.theme = theme;
    }
    if (autoAddCalendarEvents !== undefined) {
      user.autoAddCalendarEvents = autoAddCalendarEvents;
    }
    if (phonePublic !== undefined) {
      user.phonePublic = phonePublic;
    }
    await user.save();
    res.status(200).json({
      theme: user.theme,
      autoAddCalendarEvents: user.autoAddCalendarEvents,
      phonePublic: user.phonePublic,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getSettings,
  updateSettings,
};
