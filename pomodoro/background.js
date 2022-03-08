chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(
      ["timer", "active", "pomodoroTime"],
      ({ timer: storedTimer, active: storedActive, pomodoroTime }) => {
        if (storedActive) {
          let timer = storedTimer + 1;
          let active = storedActive;

          if (timer == 60 * pomodoroTime) {
            this.registration.showNotification("Pomodoro Timer", {
              body: `${pomodoroTime} minute(s) has passed!`,
              icon: "icon.png",
            });

            timer = 0;
            active = false;
          }

          chrome.storage.local.set({ timer, active });
        }
      }
    );
  }
});

chrome.storage.local.get(
  ["timer", "active"],
  ({ timer = 0, active = false }) => {
    chrome.storage.local.set({ timer, active });
  }
);
