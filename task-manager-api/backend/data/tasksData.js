const tasks = [
  {
    id: 1,
    title: "Finish lecture 2 homework",
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Build Task Manager API",
    completed: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Practice Express routes",
    completed: true,
    priority: "low",
  },
  {
    id: 4,
    title: "Review Node.js concepts",
    completed: false,
    priority: "medium",
  },
];
let nextId = 5;
export function getNextId() {
  return nextId++;
}
export { tasks };
