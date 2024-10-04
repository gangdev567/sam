import { Button, Grid, Typography } from "@mui/material";

const ConstructionOptions = ({ availableBuildings, constructBuilding }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">건물 건설 옵션</Typography>
      </Grid>
      {availableBuildings.map((building) => (
        <Grid item key={building.id} xs={12} sm={6} md={4}>
          <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            <Typography variant="body1">{building.name}</Typography>
            <Typography variant="body2">
              건설 비용: {building.constructionCost} 골드
            </Typography>
            <Typography variant="body2">
              건설 시간: {building.constructionTime} 분
            </Typography>
            <Button
              onClick={() => constructBuilding(building)}
              variant="contained"
              color="primary"
            >
              건설하기
            </Button>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ConstructionOptions;
