import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

import {
  fetchOpenWeatherData,
  getWeatherIconSrc,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";

import "./WheatherCard.css";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box my="16px">
      <Card>
        <CardContent>{children}</CardContent>

        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              <Typography className="WeatherCard-body">delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [wheaterData, setWheaterData] = useState<OpenWeatherData>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWheaterData(data);
        setCardState("ready");
      })
      .catch((err) => {
        setCardState("error");
      });
  }, [city, tempScale]);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="WeatherCard-title">{city}</Typography>
        <Typography className="WeatherCard-body">
          {cardState === "loading"
            ? "Loading..."
            : "Error: Could not retrieve weather data for this city."}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography className="WeatherCard-title">
            {wheaterData.name}
          </Typography>

          <Typography className="WeatherCard-temp">
            {Math.round(wheaterData.main.temp)}
          </Typography>

          <Typography className="WeatherCard-body">
            Feels like: {Math.round(wheaterData.main.feels_like)}
          </Typography>
        </Grid>

        <Grid item>
          {wheaterData.weather.length > 0 && (
            <>
              <img className="WeatherCard-tempIcon" src={getWeatherIconSrc(wheaterData.weather[0].icon)} />
              <Typography className="WeatherCard-body">
                {wheaterData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
