// src/components/UnitRecruiter.js
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import MilitaryUnit from "../../models/MilitaryUnit";

const UnitRecruiter = () => {
  const { appState, updateUnits } = useContext(AppContext);
  const [unitType, setUnitType] = useState("");
  const [recruitCount, setRecruitCount] = useState("");

  const handleRecruitUnits = () => {
    if (!unitType || recruitCount <= 0) return;

    const newUnits = Array(parseInt(recruitCount))
      .fill()
      .map(() => {
        const unit = new MilitaryUnit(unitType, `${unitType} ${Date.now()}`, 1);
        unit.stats = {
          attackPower: 10,
          defense: 5,
          speed: 50,
          health: 100,
        };
        return unit;
      });

    const updatedUnits = [...appState.units, ...newUnits];
    updateUnits(updatedUnits);

    setUnitType("");
    setRecruitCount("");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">유닛 모집</Typography>

        {/* 유닛 타입 선택 */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">유닛 타입:</Typography>
          <select
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="infantry">보병</option>
            <option value="archer">궁수</option>
            <option value="cavalry">기병</option>
          </select>
        </Box>

        {/* 모집 인원 수 입력 */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="모집 인원 수"
            value={recruitCount}
            onChange={(e) => setRecruitCount(e.target.value)}
            type="number"
            inputProps={{ min: 1 }}
          />
        </Box>

        {/* 모집 시작 버튼 */}
        <Button
          onClick={handleRecruitUnits}
          disabled={!unitType || recruitCount <= 0}
        >
          모집 시작
        </Button>

        {/* 최근 모집 결과 */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1">최근 모집 결과:</Typography>
          {appState.units.slice(-parseInt(recruitCount)).map((unit, index) => (
            <div key={index}>
              {unit.name} (공격력: {unit.stats.attackPower}, 방어력:{" "}
              {unit.stats.defense})
            </div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UnitRecruiter;
