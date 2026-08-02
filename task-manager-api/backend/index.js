import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import { PORT, APP_NAME } from "./config/env.js";
const app = express();
app.use(cors());
app.use(express.json);
app.use(".api/tasks", taskRoutes);
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
  });
});
app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
