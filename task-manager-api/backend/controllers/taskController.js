import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompleted,
} from "../services/taskService.js";
export function getTasks(req, res) {
  const tasks = getAllTasks(req.query);
  res.status(200).json(tasks);
}
export function getTask(req, res) {
  const result = getTaskById(req.params.id);
  if (result.notFound) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
}
export function createTaskHandler(req, res) {
  const result = createTask(req.body);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.status(201).json(result);
}
export function updateTaskHandler(req, res) {
  const result = updateTask(req.params.id, req.body);
  if (result.notFound) {
    return res.status(404).json(result);
  }
  if (result.error) {
    return res.status(400).json(result);
  }
  res.status(200).json(result);
}
export function deleteTaskHandler(req, res) {
  const result = deleteTask(req.params.id);
  if (result.notFound) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
}

export function toggleTask(req, res) {
  const result = toggleTaskCompleted(req.params.id);
  if (result.notFound) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
}
