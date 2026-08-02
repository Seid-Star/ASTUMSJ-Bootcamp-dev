const tasks = [
  {
    id: 1,
    title: "Finish lecture 2 homework",
    completed: false,
  },
  {
    id: 2,
    title: "Build Task Manager API",
    completed: false,
  },
  {
    id: 3,
    title: "Practice Express routes",
    completed: true,
  },
  {
    id: 4,
    title: "Review Node.js concepts",
    completed: false,
  },
];
let nextId = 5;
module.exports = {
  tasks,
  nextId,
};
