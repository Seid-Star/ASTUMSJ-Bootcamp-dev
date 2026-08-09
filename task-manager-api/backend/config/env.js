import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 3000;
export const APP_NAME = process.env.APP_NAME || "Task Manager API";
