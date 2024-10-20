// src/components/defenseFacilities/DefenseFacilityConstructor.js

import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

function DefenseFacilityConstructor({ facilities }) {
  const { appState, setAppState } = useContext(AppContext);

  const handleConstruct = (facility) => {
    if (!appState.buildings.find((b) => b.name === facility.name)) {
      // 자원 확인 및 사용
      let hasEnoughResources = true;
      Object.entries(facility.upgradeCost).forEach(([resourceType, cost]) => {
        const resource = appState.resources[resourceType];
        if (!resource || resource.amount < cost) {
          hasEnoughResources = false;
        }
      });

      if (hasEnoughResources) {
        // 자원 사용
        Object.entries(facility.upgradeCost).forEach(([resourceType, cost]) => {
          appState.resources[resourceType].use(cost);
        });

        // 새로운 방어 시설 추가
        setAppState((prevState) => ({
          ...prevState,
          resources: { ...prevState.resources },
          buildings: [...prevState.buildings, facility],
        }));

        console.log(`${facility.name} 건설 완료`);
      } else {
        console.log("자원이 부족합니다.");
      }
    } else {
      console.log("이미 같은 이름의 방어 시설이 있습니다.");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">방어 시설 건설</Typography>
      <Stack spacing={2} mt={2}>
        {facilities.map((facility, index) => (
          <Card key={index} elevation={3}>
            <CardContent>
              <Typography variant="h6">{facility.name}</Typography>
              <Stack direction="row" spacing={1} mb={1}>
                <Chip label={`타입: ${facility.facilityType}`} color="primary" />
                <Chip label={`초기 방어력: ${facility.defenseValue.toFixed(2)}`} color="secondary" />
              </Stack>
              <Typography variant="body1">건설 비용:</Typography>
              <ul>
                {Object.entries(facility.upgradeCost).map(([resource, cost]) => (
                  <li key={resource}>{resource}: {cost}</li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleConstruct(facility)}
                disabled={!!appState.buildings.find((b) => b.name === facility.name)}
              >
                {appState.buildings.find((b) => b.name === facility.name)
                  ? "이미 건설됨"
                  : "건설"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default DefenseFacilityConstructor;
