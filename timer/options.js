const saveButton = document.getElementById("saveButton");
const nameInput = document.getElementById("nameInput");
const timeInput = document.getElementById("timeInput");

chrome.storage.local.get(["userName", "notificationTime"], ({ userName, notificationTime }) => {
  if (userName) {
    nameInput.value = userName;
  }

  timeInput.value = notificationTime ?? 1000;
});

saveButton.addEventListener("click", () => {
  const userName = nameInput.value;
  const notificationTime = timeInput.value;

  chrome.storage.local.set({ userName, notificationTime });
});
