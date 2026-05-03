const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Add Task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
if (e.key === "Enter") addTask();
});

function addTask() {
const text = taskInput.value.trim();
if (text === "") return;

const newTask = {
id: Date.now(),
text: text,
completed: false
};

tasks.push(newTask);
taskInput.value = "";
saveTasks();
}

// Render Tasks
function renderTasks() {
taskList.innerHTML = "";

const filteredTasks = tasks.filter(task => {
if (currentFilter === "pending") return !task.completed;
if (currentFilter === "completed") return task.completed;
return true;
});

filteredTasks.forEach(task => {
const li = document.createElement("li");
if (task.completed) li.classList.add("completed");

```
const span = document.createElement("span");
span.textContent = task.text;

// Toggle status
span.addEventListener("click", () => {
  task.completed = !task.completed;
  saveTasks();
});

// Delete button
const delBtn = document.createElement("button");
delBtn.textContent = "X";
delBtn.classList.add("delete-btn");
delBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => t.id !== task.id);
  saveTasks();
});

li.appendChild(span);
li.appendChild(delBtn);
taskList.appendChild(li);
```

});
}

// Save to localStorage
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTasks();
}

// Filter
document.querySelectorAll(".filters button").forEach(btn => {
btn.addEventListener("click", () => {
currentFilter = btn.dataset.filter;
renderTasks();
});
});

// Initial Load
renderTasks();
