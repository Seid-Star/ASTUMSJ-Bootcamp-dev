const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    excused: {
      type: Boolean,
      default: false,
    },
    group: {
      type: String,
      default: "Group 1",
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
