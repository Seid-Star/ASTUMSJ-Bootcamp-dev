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
export function getTask(req, res) {
  const result = getTasksId(req.params.id);
  if (result.notFound) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
}
export function createTaskHandler(req, res) {
  const result = createTask(req.body);
  if (result.error) {
    return res.status(404).json(result);
  }
  res.status(201).json(result);
}
