import { Button, Typography } from "@mui/material";

const TerritoryExpansion = ({ territoryInfo, expandTerritory }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <Typography variant="h6">영지 확장</Typography>
      <Typography variant="body1">
        현재 영지 크기: {territoryInfo.currentSIze} 칸
      </Typography>
      <Typography variant="body1">
        확장 가능 여부: {territoryInfo.currentSize} 칸
      </Typography>
      {territoryInfo.canExpand && (
        <>
          <Typography variant="body1">
            확장 비용: {territoryInfo.expansionCost} 골드
          </Typography>
          <Typography variant="body1">
            확장 효과: {territoryInfo.expansionEffect}
          </Typography>
          <Button onClick={expandTerritory} variant="contained" color="primary">
            영지 확장하기
          </Button>
        </>
      )}
    </div>
  );
};

export default TerritoryExpansion;
