import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

function ResourceProducer({ buildings, onProduce }) {
  const handleSelectBuilding = (building) => {
    return {
      produce: () => onProduce(building),
    };
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">자원 생산 건물 관리</Typography>

      <Grid container spacing={2}>
        {/* 건물 목록 */}
        {buildings.map((building) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={building.id}>
            <Card onClick={() => handleSelectBuilding(building)}>
              <CardContent>
                <Typography variant="h6">{building.name}</Typography>
                <Typography>{`레벨: ${building.level}`}</Typography>
                <Typography>{`용량: ${building.currentCapacity}/${building.capacity}`}</Typography>
                <Typography>{`생산 속도: ${building.productionRate}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ResourceProducer;
