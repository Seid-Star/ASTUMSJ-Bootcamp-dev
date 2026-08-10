const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({
      email: "admin2@test.com",
    });

    if (existingUser) {
      console.log("Admin already exists");
      return;
    }

    const admin = new User({
      fullName: "Test Admin",
      email: "admin2@test.com",
      password: "Admin123!",
      division: "CSE",
      year: "2",
      role: "admin",
    });

    await admin.save();

    console.log("Admin created successfully");
    console.log("Email: admin2@test.com");
    console.log("Password: Admin123!");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
