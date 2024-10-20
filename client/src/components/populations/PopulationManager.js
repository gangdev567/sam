import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import PopulationChart from "./PopulationChart";
import HousingManager from "./HousingManager";
import HappinessMeter from "./HappinessMeter";

const PopulationManager = () => {
  const { appState } = useContext(AppContext);

  const totalPopulation = appState.populations.reduce(
    (sum, pop) => sum + pop.currentCount,
    0
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">인구 관리</Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">총 인구</Typography>
            <Typography variant="h4" align="center">
              {totalPopulation.toLocaleString()}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <HappinessMeter />
        </Grid>

        <Grid item xs={12}>
          <PopulationChart />
        </Grid>

        <Grid item xs={12}>
          <HousingManager />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopulationManager;
