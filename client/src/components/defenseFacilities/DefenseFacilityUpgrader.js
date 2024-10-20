import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";

function DefenseFacilityUpgrader({ facility }) {
  const { appState, setAppState } = useContext(AppContext);
  const [upgradeProgress, setUpgradeProgress] = useState(0);

  const handleUpgrade = () => {
    if (
      !facility.isUpgrading &&
      facility.upgradeCost <= appState.resources.gold.amount
    ) {
      // 자원 사용
      appState.resources.gold.use(facility.upgradeCost);

      // 업그레이드 시작
      facility.upgrade();

      // 프로그레스 바 업데이트
      const intervalId = setInterval(() => {
        setUpgradeProgress((prev) => Math.min(prev + 1, 100));
        if (upgradeProgress === 100) {
          clearInterval(intervalId);
        }
      }, facility.level * 300); // 30초당 1레벨, 100ms마다 1%

      // 앱 상태 업데이트
      setAppState((prevState) => ({
        ...prevState,
        resources: { ...prevState.resources },
        defenseFacilities: prevState.defenseFacilities.map((f) =>
          f.id === facility.id ? facility : f
        ),
      }));

      console.log(`${facility.name} 업그레이드 시작`);
    } else {
      console.log("업그레이드 불가능");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6">{facility.name} 업그레이드</Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={`현재 레벨: ${String(facility.level)}`}
              color="primary"
            />
            <Chip
              label={`방어력: ${String(facility.defenseValue.toFixed(2))}`}
              color="secondary"
            />
          </Stack>
          <Typography variant="body1">업그레이드 정보:</Typography>
          <ul>
            <ListItem>
              <ListItemText
                primary={`업그레이드 비용: ${String(
                  facility.upgradeCost
                )} 골드`}
              />
            </ListItem>
          </ul>
          <Button
            variant="contained"
            color="warning"
            onClick={handleUpgrade}
            disabled={Boolean(facility.isUpgrading)}
          >
            {Boolean(facility.isUpgrading) ? (
              <Stack direction="row" alignItems="center">
                <CircularProgress size={20} thickness={5} /> 업그레이드 중...
              </Stack>
            ) : (
              "업그레이드"
            )}
          </Button>
          {Boolean(facility.isUpgrading) && (
            <LinearProgress
              variant="determinate"
              value={upgradeProgress}
              sx={{ mt: 2 }}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default DefenseFacilityUpgrader;
