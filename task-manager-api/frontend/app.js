const API_URL = "https://task-manager-api-7wm6.onrender.com/api/tasks";
const taskList = document.getElementById("taskList");
const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const priorityInput = document.getElementById("priority");
const priorityFilter = document.getElementById("priorityFilter");
const completedFilter = document.getElementById("completedFilter");
async function fetchTasks() {
  let url = API_URL;
  const params = new URLSearchParams();
  if (priorityFilter.value) {
    params.append("priority", priorityFilter.value);
  }
  if (completedFilter.value) {
    params.append("completed", completedFilter.value);
  }
  if (params.toString()) {
    url += "?" + params.toString();
  }
  const response = await fetch(url);
  const tasks = await response.json();
  renderTasks(tasks);
}
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
            <div>
                <span>
                    ${task.title}
                </span>
                <span class="priority ${task.priority}">
                    ${task.priority}
                </span>
            </div>
            <div>
                <button data-id="${task.id}" class="toggle">
                    Toggle
                </button>
                <button data-id="${task.id}" class="delete">
                    Delete
                </button>
            </div>
        `;
    taskList.appendChild(li);
  });
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTask = {
    title: titleInput.value,
    priority: priorityInput.value,
  };
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  form.reset();

  fetchTasks();
});
taskList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  if (e.target.classList.contains("toggle")) {
    await fetch(`${API_URL}/${id}/toggle`, {
      method: "PATCH",
    });
  }
  if (e.target.classList.contains("delete")) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  }
  fetchTasks();
});
priorityFilter.addEventListener("change", fetchTasks);
completedFilter.addEventListener("change", fetchTasks);
fetchTasks();
