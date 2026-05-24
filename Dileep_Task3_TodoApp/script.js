const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed") {
      return task.completed;
    }

    if (currentFilter === "pending") {
      return !task.completed;
    }

    return true;
  });

  filteredTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.classList.add("task");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete-btn">✓</button>

                <button class="edit-btn">✎</button>

                <button class="delete-btn">🗑</button>

            </div>
        `;

    li.querySelector(".complete-btn").onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    li.querySelector(".delete-btn").onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.querySelector(".edit-btn").onclick = () => {
      const updatedTask = prompt("Edit task", task.text);

      if (updatedTask) {
        task.text = updatedTask;
        saveTasks();
        renderTasks();
      }
    };

    taskList.appendChild(li);
  });

  taskCount.innerText = `${tasks.length} Tasks`;
}

addBtn.onclick = () => {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskInput.value,
    completed: false,
  });

  taskInput.value = "";

  saveTasks();

  renderTasks();
};

clearBtn.onclick = () => {
  tasks = [];

  saveTasks();

  renderTasks();
};

themeBtn.onclick = () => {
  document.body.classList.toggle("light-mode");
};

searchInput.addEventListener("input", renderTasks);

filterButtons.forEach((button) => {
  button.onclick = () => {
    document.querySelector(".active").classList.remove("active");

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();
  };
});

renderTasks();
