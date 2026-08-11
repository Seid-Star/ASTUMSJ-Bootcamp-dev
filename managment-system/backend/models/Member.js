const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    memberId: {
      type: String,
      required: [true, "Member ID is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },

    division: {
      type: String,
      enum: ["development", "cyber", "ai", "networking"], // Check exact casing here!
      required: true,
    },
    attendanceStatus: {
      type: String,
      enum: {
        values: ["Active", "Needs Attention", "Inactive"],
        message: "{VALUE} is not a valid attendance status",
      },
      default: "Active",
    },
    year: {
      type: String,
      trim: true,
    },
    campusStatus: {
      type: String,
      enum: {
        values: ["On Campus", "Off Campus", "Withdrawn"],
        message: "{VALUE} is not a valid campus status",
      },
      default: "On Campus",
    },
  },
  {
    timestamps: true,
  },
);

memberSchema.index({ name: "text", memberId: "text", email: "text" });

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
