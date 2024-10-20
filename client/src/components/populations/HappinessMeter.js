import React, { useContext } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { AppContext } from "../../context/AppContext";

const HappinessMeter = () => {
  const { appState } = useContext(AppContext);

  const calculateAverageHappiness = () => {
    if (!appState.populations.length) return 0;

    const totalHappiness = appState.populations.reduce(
      (sum, pop) => sum + pop.happiness,
      0
    );
    return (
      Math.round((totalHappiness / appState.populations.length) * 100) / 100
    );
  };

  const averageHappiness = calculateAverageHappiness();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">인구 만족도</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CircularProgress
            variant="determinate"
            value={averageHappiness}
            size={120}
            thickness={6}
            sx={{ color: "primary.main" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h4">{averageHappiness}%</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            평균 인구 만족도: {averageHappiness}%
          </Typography>
          {appState.populations.map((pop, index) => (
            <Typography key={index} variant="body2">
              {pop.name}: {pop.happiness}%
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HappinessMeter;
