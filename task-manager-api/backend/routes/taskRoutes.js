import express from "express";
import {
  getTasks,
  getTask,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  toggleTask,
} from "../controllers/taskController.js";
const router = express.Router();
router.get("/", getTasks);
router.post("/", createTaskHandler);
router.patch("/:id/toggle", toggleTask);
router.get("/:id", getTask);
router.patch("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
