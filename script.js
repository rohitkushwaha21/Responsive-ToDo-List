const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const darkModeBtn = document.getElementById("darkModeBtn");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
displayTasks();

// Add Task
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

// Display Tasks
function displayTasks(filter = "all") {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button onclick="toggleTask(${index})">
                    ${task.completed ? "↩️" : "✅"}
                </button>

                <button onclick="deleteTask(${index})">
                    🗑️
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Complete Task
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        displayTasks(btn.dataset.filter);
    });
});

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dark Mode
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Hamburger Menu
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
