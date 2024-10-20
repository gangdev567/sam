import React from "react";
import { Box, Grid, Typography, Paper, LinearProgress } from "@mui/material";

function ResourceDisplay({ resources, onUse, onUpgrade }) {
  const handleSelectResource = (resource) => {
    return {
      use: () => onUse(resource, 100), // 예시로 100 단위 사용
      upgrade: (type) => onUpgrade(resource, type),
    };
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">현재 자원 상태</Typography>

      <Grid container spacing={2} mt={2}>
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={resource.name}>
            <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6">{resource.name}</Typography>

              <LinearProgress
                variant="determinate"
                value={(resource.amount / resource.maxCapacity) * 100}
                color={
                  resource.amount >= resource.maxCapacity * 0.8
                    ? "error"
                    : "primary"
                }
                sx={{ mt: 1 }}
              />

              <Typography align="right">
                {`${resource.amount.toFixed(2)} / ${resource.maxCapacity}`}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                생산 속도: {resource.productionRate.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ResourceDisplay;
