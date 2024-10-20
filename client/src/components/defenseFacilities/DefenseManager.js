// src/components/DefenseManager.js

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DefenseFacilityList from "./DefenseFacilityList";
import DefenseFacilityConstructor from "./DefenseFacilityConstructor";
import DefenseFacilityDetail from "./DefenseFacilityDetail";
import defenseFacilities from "../../data/DefenseFacilities";
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";

function DefenseManager() {
  const { appState } = useContext(AppContext);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // 전체 방어력 계산
  const totalDefenseValue = appState.defenseFacilities.reduce(
    (sum, facility) =>
      sum + facility.defenseValue * (facility.isDamaged ? 0.5 : 1),
    0
  );

  // 손상된 시설 수 계산
  const damagedFacilitiesCount = appState.defenseFacilities.filter(
    (facility) => facility.isDamaged
  ).length;

  const handleSelectFacility = (facility) => {
    setSelectedFacility(facility);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4">방어 시설 관리</Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">전체 방어 상황</Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Chip label={`총 방어력: ${totalDefenseValue.toFixed(2)}`} color="primary" />
                <Chip label={`손상된 시설 수: ${damagedFacilitiesCount}`} color="warning" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <DefenseFacilityList onSelectFacility={handleSelectFacility} />
        </Grid>

        <Grid item xs={12} md={6}>
          <DefenseFacilityConstructor facilities={defenseFacilities} />
        </Grid>
      </Grid>

      {selectedFacility && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">선택된 방어 시설 상세 정보</Typography>
          <DefenseFacilityDetail selectedFacility={selectedFacility} />
        </Box>
      )}
    </Box>
  );
}

export default DefenseManager;
