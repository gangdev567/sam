import React, { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import DefenseFacilityUpgrader from "./DefenseFacilityUpgrader";

const DefenseFacilityDetail = ({ selectedFacility }) => {
  const { dispatchAppState } = useContext(AppContext);

  const handleRepair = () => {
    dispatchAppState({
      type: "REPAIR_DEFENSE_FACILITY",
      payload: selectedFacility.id,
    });
  };

  const handleUpgrade = () => {
    dispatchAppState({
      type: "UPGRADE_DEFENSE_FACILITY",
      payload: selectedFacility.id,
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {selectedFacility.name} 상세 정보
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Chip label={`레벨: ${selectedFacility.level}`} color="primary" />
            <Chip
              label={`방어력: ${selectedFacility.defenseValue}`}
              color="secondary"
            />
            {selectedFacility.isDamaged && (
              <Chip label="손상됨" color="error" />
            )}
          </Stack>

          <Typography variant="body1" gutterBottom>
            특수 능력:
            {selectedFacility.specialAbilities.map((ability, index) => (
              <span key={index}>
                {" "}
                {ability.type === "attackReduction"
                  ? "공격 감소"
                  : "방어력 증가"}{" "}
                ({Math.round(ability.multiplier * 100)}%)
              </span>
            ))}
          </Typography>

          <Typography variant="body1" gutterBottom>
            상태: {selectedFacility.isDamaged ? "손상됨" : "정상"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            수리 진행률: {selectedFacility.repairProgress}%
          </Typography>

          <Stack direction="row" spacing={2} mb={2}>
            <Button
              variant="outlined"
              color="success"
              onClick={handleRepair}
              disabled={!selectedFacility.isDamaged}
            >
              수리
            </Button>
            <DefenseFacilityUpgrader facility={selectedFacility} />
          </Stack>

          {/* 추가 정보나 다른 기능이 필요하다면 여기에 추가할 수 있습니다 */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DefenseFacilityDetail;
