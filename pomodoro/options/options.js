const pomodoroTime = document.getElementById("pomodoro-time");
pomodoroTime.addEventListener("change", (e) => {
  const value = e.target.value;

  if (value < 1 || value > 60) {
    pomodoroTime.value = 25;
  }
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    pomodoroTime: pomodoroTime.value,
    timer: 0,
    active: false,
  });
});

chrome.storage.local.get(["pomodoroTime"], ({ pomodoroTime: storedPomodoroTime }) => {
  pomodoroTime.value = storedPomodoroTime;
});
