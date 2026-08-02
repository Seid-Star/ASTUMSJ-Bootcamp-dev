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
router.get("/:id", getTask);
router.post("/", createTaskHandler);
router.patch("/:id/toogle", toggleTask);
router.patch("/:id", deleteTaskHandler);

export default router;
