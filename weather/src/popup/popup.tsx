import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from "@material-ui/icons";
import "fontsource-roboto";

import WeatherCard from "../components/WheatherCard";
import {
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

import { Messages } from "../utils/messages";

import "./popup.css";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  const handleAddCity = () => {
    if (cityInput === "") {
      return;
    }

    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleDeleteCity = (deletedCity) => {
    const updatedCities = cities.filter((city) => city !== deletedCity);

    setStoredCities(updatedCities).then(() => setCities(updatedCities));
  };

  const handleTempScaleToggle = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };

    setStoredOptions(updatedOptions).then(() => setOptions(updatedOptions));
  };

  const handleOverlayButton = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) return null;

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-between">
        <Grid item>
          <Paper>
            <Box px="16px" py="4px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleAddCity}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton onClick={handleTempScaleToggle}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton onClick={handleOverlayButton}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {options.homeCity !== "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}

      {cities.map((city) => (
        <WeatherCard
          key={city}
          city={city}
          tempScale={options.tempScale}
          onDelete={() => handleDeleteCity(city)}
        />
      ))}

      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
