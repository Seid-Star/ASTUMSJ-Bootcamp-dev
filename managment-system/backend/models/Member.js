const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    memberId: {
      type: String,
      required: true,
      unique: true,
    },
    division: {
      type: String,
      required: true,
      enum: ["Design", "Development", "CPD", "Cyber", "Data Science"],
    },
    attendanceStatus: {
      type: String,
      enum: ["Active", "Needs Attention", "Inactive"],
    },
    year: {
      type: String,
    },
    campusStatus: {
      type: String,
      enum: ["On Campus", "Off Campus", "Withdrawn"],
    },
  },
  {
    timestamps: true,
  },
);
const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
