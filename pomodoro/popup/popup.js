let tasks = [];

const time = document.getElementById("time");

function updateTime() {
  chrome.storage.local.get(
    ["timer", "pomodoroTime"],
    ({ timer, pomodoroTime }) => {
      const secondsLefting = pomodoroTime * 60 - timer;

      const minutes = Math.floor(secondsLefting / 60);
      const seconds = secondsLefting % 60;

      const minutesText = minutes.toString().padStart(2, "0");
      const secondsText = seconds.toString().padStart(2, "0");

      time.textContent = `${minutesText}:${secondsText}`;
    }
  );
}

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["active"], ({ active }) => {
    chrome.storage.local.set({ active: !active }, () => {
      setTimerBtnText(!active);
    });
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({ timer: 0, active: false }, () => {
    setTimerBtnText(false);
  });
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get("tasks", ({ tasks: storedTasks }) => {
  tasks = storedTasks ?? [];

  renderTasks();
});

chrome.storage.local.get(["active"], ({ active }) => {
  setTimerBtnText(active);
});

function setTimerBtnText(nextState) {
  startTimerBtn.textContent = nextState ? "Pause Timer" : "Start Timer";
}

function saveTasks() {
  chrome.storage.sync.set({ tasks });
}

function renderTask(taskIndex) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.className = "task-input";
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskIndex];
  text.addEventListener("change", () => {
    tasks[taskIndex] = text.value;

    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.className = "task-delete";
  deleteBtn.type = "button";
  deleteBtn.value = "x";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskIndex);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskIndex = tasks.length;
  tasks.push("");

  renderTask(taskIndex);

  saveTasks();
}

function deleteTask(taskIndex) {
  tasks.splice(taskIndex, 1);

  renderTasks();

  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");

  taskContainer.textContent = "";

  tasks.forEach((_task, taskIndex) => {
    renderTask(taskIndex);
  });
}
