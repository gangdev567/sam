// src/components/MilitaryManager.js
import React, { useContext } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import UnitRecruiter from "./UnitRecruiter";
import UnitTrainer from "./UnitTrainer";
import BattleSimulator from "./BattleSimulator";

const MilitaryManager = () => {
  const { appState } = useContext(AppContext);
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        군사 유닛 관리
      </Typography>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="유닛 모집" />
        <Tab label="유닛 훈련" />
        <Tab label="전투 시뮬레이션" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tabValue === 0 && <UnitRecruiter />}
        {tabValue === 1 && <UnitTrainer />}
        {tabValue === 2 && <BattleSimulator />}
      </Box>
    </Box>
  );
};

export default MilitaryManager;
