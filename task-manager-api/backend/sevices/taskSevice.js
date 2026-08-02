import { error } from "node:console";
import { title } from "node:process";

const { type } = require("node:os");
const { tasks, getnextId } = require("../data/tasksData");
export function getAllTasks(filters = {}) {
  let result = [...tasks];
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
export function getTaskById(id) {
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  return task;
}
export function createTask(data) {
  const { title, priority } = data;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return { error: "Title is required and must be non-empty string" };
  }
  const allowedPriority = ["low", "medium", "high"];
  if (!allowedPriority.includes(priority)) {
    return { error: "priority must be high,low or medium" };
  }

  const newTask = {
    id: getnextId(),
    title: title.trim(),
    completed: false,
    priority,
  };
  tasks.push(newTask);
  return newTask;
}
export function updateTask(id, updates) {
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    return { notFound: true };
  }
  if (updates.title != undefined) {
    if (typeof updates.title !== "string" || updates.title.trim == "") {
      return { error: "invalid title" };
    }
    task.title == updates.title.trim();
  }
  if (updates.priority !== undefined) {
    const allowedPriority = ["low", "medium", "high"];
    if (!allowedPriority.includes(updates.priority)) {
      return { error: "Invalid priority" };
    }
    task.priority = updates.priority;
  }
  if (updates.completed !== undefined) {
    task.completed == updates.completed;
  }
  return task;
}
export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) {
    return { notFound: true };
  }
  const deletedTask = tasks.splice(index, 1);
  return deletedTask[0];
}
export function toggleTaskCompleted(id) {
  const task = task.find((task) => task.id === Number(id));
  if (!task) {
    return { notFound: true };
  }
  task.completed = !task.completed;
  return task;
}
