import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import BuildingUpgrader from "./BuildingUpgrader";

const BuildingDetail = ({ building }) => {
  const {
    name,
    level,
    capacity,
    productionRate,
    workerCount,
    workerCapacity,
    currentCapacity,
    resourceProduction,
    resourceStorage,
  } = building;

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {name} (Level {level})
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Worker Capacity</Typography>
              <Typography variant="body1">
                {workerCount}/{workerCapacity}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Current Capacity</Typography>
              <Typography variant="body1">
                {currentCapacity.toFixed(2)}/{capacity.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom>
          Production Rate: {productionRate.toFixed(2)}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Resource Production:
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.entries(resourceProduction).map(([resource, rate]) => (
            <li key={resource}>
              {resource}: {rate.toFixed(2)}
            </li>
          ))}
        </ul>

        <Typography variant="subtitle1" gutterBottom>
          Resource Storage:
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.entries(resourceStorage).map(([resource, amount]) => (
            <li key={resource}>
              {resource}: {amount.toFixed(2)}
            </li>
          ))}
        </ul>
        <Box mt={2}>
          <BuildingUpgrader building={building} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BuildingDetail;
