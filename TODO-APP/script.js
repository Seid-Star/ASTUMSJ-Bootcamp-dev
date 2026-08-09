const addBtn=document.getElementById("addBtn")
const taskInput=document.getElementById("taskInput");
const errorMsg=document.getElementById("errorMsg");
const taskList=document.getElementById("taskList");
const remainingCount=document.getElementById("remainingCount");
const clearBtn=document.getElementById("clearBtn");
const allDoneMsg=document.getElementById("allDoneMsg");
const colorCircles=document.querySelectorAll(".color-circle");
const doneCounter = document.createElement("p");
doneCounter.id = "doneCounter";
doneCounter.style.fontSize = "13px";
doneCounter.style.color = "#888";
doneCounter.style.marginBottom = "16px";
document.getElementById("counter").insertAdjacentElement("afterend", doneCounter);
let tasks = [];

function addTask() {
  const value=taskInput.value.trim();
  if (!value) {
    errorMsg.textContent="Please type a task first";
    return;
  }
  const alreadyExists=tasks.some(task => task.text.toLowerCase()===value.toLowerCase());
  
  if (alreadyExists) {
    errorMsg.textContent="This task already exists!";
    return;
  }
  errorMsg.textContent="";
  tasks.push({text:value,done:false});
  taskInput.value = "";
  render();
}
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});


function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function render() {
  taskList.textContent = "";
  const remaining=tasks.filter(task => !task.done).length;
  const doneCount=tasks.length - remaining;
  for (let i = 0;i<tasks.length; i++) {
    const task=tasks[i];
    const li=document.createElement("li");
    li.className = "task-item";
    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";
    doneBtn.textContent = task.done ? "Undo" : "Done";
    doneBtn.addEventListener("click", () => toggleDone(i));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(i));

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
  remainingCount.textContent = remaining;

  doneCounter.textContent = `${doneCount} of ${tasks.length} tasks completed`;

  if (tasks.length > 0 && remaining === 0) {
    allDoneMsg.classList.add("visible");
  } else {
    allDoneMsg.classList.remove("visible");
  }
}
clearBtn.addEventListener("click", () => {
  tasks = [];
  render();
});
colorCircles.forEach(circle => {
  circle.addEventListener("click", () => {
    document.body.style.backgroundColor = circle.dataset.color;
    colorCircles.forEach(c => c.classList.remove("active"));
    circle.classList.add("active");
  });
});
render();