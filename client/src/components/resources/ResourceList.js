import { Box, Grid, Paper, Typography } from "@mui/material";
import ResourceCard from "./ResourceCard";

function ResourceList({ resources, onUpgrade }) {
  const totalProduction = resources
    .reduce((sum, resource) => sum + resource.productionRate, 0)
    .toFixed(2);
  const totalCapacity = resources.reduce(
    (sum, resource) => sum + resource.maxCapacity,
    0
  );

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h4" gutterBottom>
        리소스 목록
      </Typography>

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          전체 리소스 상태
        </Typography>
        <Typography variant="body1">
          총 생산 속도: {totalProduction} / 초
        </Typography>
        <Typography variant="body1">총 최대 용량: {totalCapacity}</Typography>
      </Box>

      <Grid container spacing={2}>
        {resources.map((resource, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ResourceCard resource={resource} onUpgrade={onUpgrade} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default ResourceList;
