import React, { useContext, useState } from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { AppContext } from "../../context/AppContext";

const HousingManager = () => {
  const { appState, updatePopulations } = useContext(AppContext);
  const [newHousingCapacity, setNewHousingCapacity] = useState("");

  const handleHousingCapacityChange = (event) => {
    setNewHousingCapacity(event.target.value);
  };

  const updateHousingCapacity = (populationIndex) => {
    const newPopulations = [...appState.populations];
    newPopulations[populationIndex].updateHousingCapacity(
      parseInt(newHousingCapacity)
    );

    updatePopulations(newPopulations);
    setNewHousingCapacity("");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">주거 공간 관리</Typography>
      <Grid container spacing={2}>
        {appState.populations.map((pop, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}>
              <Typography variant="body1">{pop.name}</Typography>
              <Typography variant="body2">
                현재 주거 용량: {pop.housingCapacity}
              </Typography>
              <TextField
                label="새로운 주거 용량"
                value={newHousingCapacity}
                onChange={handleHousingCapacityChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={() => updateHousingCapacity(index)}
                disabled={
                  !newHousingCapacity || isNaN(parseInt(newHousingCapacity))
                }
              >
                주거 용량 업데이트
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HousingManager;
