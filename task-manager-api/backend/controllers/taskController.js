import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompleted,
} from "..sevices/taskService.js";
export function getTasks(req, res) {
  const tasks = getAllTasks(req.query);
  res.status(200).json(tasks);
}
