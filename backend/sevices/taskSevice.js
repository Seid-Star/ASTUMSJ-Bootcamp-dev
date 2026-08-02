const { type } = require("node:os");
const { tasks } = require("../data/tasksData");
function getAllTasks(filters = {}) {
  let result = tasks;
  if (filters.priority) {
    result = result.filter((task) => task.priority === filters.priority);
  }
  if (filters.completed !== undefined) {
    result = result.filter(
      (task) => task.completed === (filters.completed === "true"),
    );
  }
  return result;
}
function getTaskById(id) {
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  return task;
}
function createTask(taskData) {
    if (!taskData.title || typeof taskData.title!=="string") {