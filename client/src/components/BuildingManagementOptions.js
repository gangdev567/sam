import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";

const BuildingManagementOptions = ({ building, updateBuildingOptions }) => {
  const [autoManage, SetAutoManage] = useState(building.autoManage);
  const [autoUpgrade, setAutoUpgrade] = useState(building.autoUpgrade);
  const [resourcePriority, setResourcePriority] = useState(
    building.resourcePriority
  );

  const handleAutoManageChange = (event) => {
    SetAutoManage(event.target.checked);
    updateBuildingOptions({ ...building, autoManage: event.target.checked });
  };

  const handleAutoUpgradeChange = (event) => {
    setAutoUpgrade(event.target.checked);
    updateBuildingOptions({ ...building, autoUpgrade: event.target.checked });
  };

  const handleResourcePriorityChange = (event) => {
    setResourcePriority(event.target.value);
    updateBuildingOptions({
      ...building,
      resourcePriority: event.target.value,
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h6">건물 관리 옵션</Typography>
      <FormControlLabel
        control={
          <Switch checked={autoManage} onChange={handleAutoManageChange} />
        }
        label="자동 관리"
      />
      <FormControlLabel
        control={
          <Switch checked={autoUpgrade} onChange={handleAutoUpgradeChange} />
        }
        label="자동 업그레이드"
      />
      <FormControl fullWidth>
        <InputLabel id="resource-priority-label">자원 우선순위</InputLabel>
        <Select
          labelId="resource-priority-label"
          id="resource-priority-select"
          value={resourcePriority}
          label="자원 우선순위"
          onChange={handleResourcePriorityChange}
        >
          <MenuItem value="gold">골드</MenuItem>
          <MenuItem value="food">식량</MenuItem>
          <MenuItem value="mana">마나</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default BuildingManagementOptions;
