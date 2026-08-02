require("dotenv").config();
const PORT = process.env.PORT || 3000;
const API_NAME = process.env.API_NAME || "Task Manager API";
module.exports = {
  PORT,
  API_NAME,
};
