chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(["timer", "active"], ({ timer, active = true }) => {
    if (!active) {
      return;
    }

    const time = (timer ?? 0) + 1;

    chrome.storage.local.set({ timer: time });

    chrome.action.setBadgeText({
      text: String(time),
    });

    chrome.storage.local.get(
      ["notificationTime"],
      ({ notificationTime = 1000 }) => {
        if (time % notificationTime == 0) {
          this.registration.showNotification("Chrome Time Extension", {
            body: `${notificationTime} seconds passed!`,
            icon: "icon.png",
          });

          chrome.storage.local.set({ timer: 0 });
        }
      }
    );
  });
});
