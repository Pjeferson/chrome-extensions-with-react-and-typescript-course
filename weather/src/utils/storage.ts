import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity: string;
  tempScale: OpenWeatherTempScale;
  hasAutoOverlay: boolean;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const value: LocalStorage = { cities };

  return new Promise((resolve) => {
    chrome.storage.local.set(value, () => resolve());
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, ({ cities }: LocalStorage) =>
      resolve(cities)
    );
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const value: LocalStorage = { options };

  return new Promise((resolve) => {
    chrome.storage.local.set(value, () => resolve());
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, ({ options }: LocalStorage) =>
      resolve(options)
    );
  });
}
