import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const BuildingPopup = ({ open, onClose, building }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{building.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">설명: {building.description}</Typography>
        <Typography variant="body1">
          현재 생산량: {building.currentProduction} {building.productionUnit}
        </Typography>
        <Typography variant="body1">
          다음 레벨 요구사항: {building.nextLevelRequirement}
        </Typography>
        <Typography variant="body1">
          업그레이드 비용: {building.upgradeCost} 골드
        </Typography>
        <Typography variant="body1">
          업그레이드 시간: {building.upgradeTime} 분
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        <Button color="primary">업그레이드</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuildingPopup;
