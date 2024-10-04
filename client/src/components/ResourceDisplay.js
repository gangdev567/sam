import { Grid, Typography } from "@mui/material";

const ResourceDisplay = ({ resources }) => {
  return (
    <Grid container spacing={2}>
      {resources.map((resource) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={resource.type}>
          <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            <Typography variant="h6">{resource.name}</Typography>
            <Typography variant="body1">
              현재 양: {resource.currentAmount} {resource.unit}
            </Typography>
            <Typography variant="body1">
              생산 속도: {resource.productionRate} {resource.unit}/분
            </Typography>
          </div>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h6">
          총 생산 속도: {calculateTotalProduction(resources)}
        </Typography>
      </Grid>
    </Grid>
  );
};

const calculateTotalProduction = (resources) => {
  return resources.reduce((sum, resource) => sum + resource.productionRate, 0);
};

export default ResourceDisplay;
