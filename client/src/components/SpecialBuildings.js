import { Card, CardContent, Grid, Typography } from "@mui/material";

const SpecialBuildingCard = ({ building }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardContent>
        <Typography variant="h6">{building.name}</Typography>
        <Typography variant="body1">설명: {building.description}</Typography>
        <Typography variant="body1">
          현재 레벨: {building.currentLevel}/{building.maxLevel}
        </Typography>
        <Typography variant="body1">효과: {building.effect}</Typography>
        {building.upgradeInfo && (
          <>
            <Typography variant="body1">
              업그레이드 비용: {building.upgradeInfo.cost} 골드
            </Typography>
            <Typography variant="body1">
              업그레이드 시간: {building.upgradeInfo.time} 분
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  </Grid>
);

const SpecialBuildings = ({ specialBuildings }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h5">특별 건물</Typography>
      <Grid container spacing={2}>
        {specialBuildings.map((building) => (
          <SpecialBuildingCard key={building.id} building={building} />
        ))}
      </Grid>
    </div>
  );
};

export default SpecialBuildings;
