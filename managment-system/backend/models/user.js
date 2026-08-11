const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    division: {
      type: String,
      enum: ["development", "cyber", "ai", "networking"], // Check exact casing here!
      required: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "supervisor", "user"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
    theme: {
      type: String,
      enum: {
        values: ["light", "dark"],
        message: "{VALUE} is not a valid theme",
      },
      default: "light",
    },
    autoAddCalendarEvents: {
      type: Boolean,
      default: true,
    },
    phonePublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
