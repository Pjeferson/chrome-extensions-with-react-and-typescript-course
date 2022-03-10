import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Button,
  Switch
} from "@material-ui/core";

import "fontsource-roboto";

import "./options.css";
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleSaveOptions = () => {
    setFormState("saving");
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  const handleHomeCityInputChange = (homeCity) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleAutoOverlayChanged = (hasAutoOverlay) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  }

  if (!options) return null;

  const isFieldsDisabled = formState === "saving";

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                value={options.homeCity}
                disabled={isFieldsDisabled}
                onChange={(event) =>
                  handleHomeCityInputChange(event.target.value)
                }
              />
            </Grid>

            <Grid item>
              <Typography variant="body1">Auto toggle overlay on webpage load</Typography>
              <Switch
                disabled={isFieldsDisabled}
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(_event, checked) => handleAutoOverlayChanged(checked)}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveOptions}
                disabled={isFieldsDisabled}
              >
                {isFieldsDisabled ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
