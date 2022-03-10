import { fetchOpenWeatherData } from "../utils/api";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    // homeCity: "",
    homeCity: "Natal",
    tempScale: "metric",
    hasAutoOverlay: false,
  });

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

// We need registrate it every time the service worker is turned on
chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});

function setBadgeTemp() {
  getStoredOptions().then((options) => {
    if (!options.homeCity) return;

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbol = options.tempScale === "metric" ? "\u2103" : "\u2109";

      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      });
    });
  });
}

setBadgeTemp();
chrome.alarms.onAlarm.addListener(() => setBadgeTemp);