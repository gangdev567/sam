import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ResourceDisplay from "./ResourceDisplay";
import ResourceStorage from "./ResourceStorage";
import ResourceProducer from "./ResourceProducer";
import { AppContext } from "../../context/AppContext";

function ResourceManager() {
  const { appState, updateResources, updateBuildings } = useContext(AppContext);
  const { resources, buildings } = appState;

  const handleUseResource = (resource, amount) => {
    const newResources = resources.map((r) =>
      r.name === resource.name ? { ...r, amount: r.amount - amount } : r
    );
    updateResources(newResources);
  };

  const handleUpgradeResource = (resource, type) => {
    const newResources = resources.map((r) =>
      r.name === resource.name ? { ...r, [type]: r[type] + 1 } : r
    );
    updateResources(newResources);
  };

  const handleProduceResources = (building) => {
    const newBuildings = buildings.map((b) =>
      b.id === building.id
        ? {
            ...b,
            currentCapacity: Math.min(
              b.currentCapacity + b.productionRate,
              b.capacity
            ),
          }
        : b
    );
    updateBuildings(newBuildings);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">자원 관리</Typography>

      <Grid container spacing={2}>
        {/* 자원 표시 */}
        <Grid item xs={12} md={6} lg={4}>
          <ResourceDisplay
            resources={resources}
            onUse={handleUseResource}
            onUpgrade={handleUpgradeResource}
          />
        </Grid>

        {/* 자원 생산 건물 관리 */}
        <Grid item xs={12} md={6} lg={4}>
          <ResourceProducer
            buildings={buildings}
            onProduce={handleProduceResources}
          />
        </Grid>

        {/* 자원 저장소 관리 */}
        <Grid item xs={12}>
          <ResourceStorage resources={resources} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResourceManager;
