const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");
const userNameElement = document.getElementById("userName");

chrome.storage.local.get(["userName"], ({ userName }) => {
  console.log("userName currently is " + userName);

  userNameElement.textContent = userName || "???";
});

function updateTimeElements() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is: ${currentTime}`;

  chrome.storage.local.get(["timer"], ({ timer }) => {
    const currentTime = timer ?? 0;

    timerElement.textContent = `Timer: ${currentTime}`;
  });
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

startButton.addEventListener("click", () => {
  chrome.storage.local.set({ active: true });
});

stopButton.addEventListener("click", () => {
  chrome.storage.local.set({ active: false });
});

resetButton.addEventListener("click", () => {
  chrome.storage.local.set({ active: true, timer: 0 });
});
