// src/components/UnitTrainer.js
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

const UnitTrainer = () => {
  const { appState, updateUnits } = useContext(AppContext);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [trainingTime, setTrainingTime] = useState("");
  const [trainingProgress, setTrainingProgress] = useState(0);

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setTrainingProgress(0);
  };

  const handleStartTraining = () => {
    if (!selectedUnit || trainingTime === "") return;

    const intervalId = setInterval(() => {
      setTrainingProgress((prev) => Math.min(prev + 1, parseInt(trainingTime)));

      if (trainingProgress === parseInt(trainingTime)) {
        clearInterval(intervalId);
        trainUnit(selectedUnit, parseInt(trainingTime));
      }
    }, 1000); // 1초마다 진행 상황 업데이트
  };

  const trainUnit = (unit, time) => {
    const updatedUnits = appState.units.map((u) =>
      u.id === unit.id
        ? {
            ...u,
            experience: Math.min(u.experience + time * 10, u.maxExperience),
            stats: {
              attackPower: u.stats.attackPower + time * 0.1,
              defense: u.stats.defense + time * 0.05,
              health: u.stats.health + time * 1,
              speed: u.stats.speed + time * 0.1,
            },
          }
        : u
    );

    updateUnits(updatedUnits);
    setSelectedUnit(null);
    setTrainingTime("");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">유닛 훈련</Typography>

        {/* 유닛 선택 */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">유닛 선택:</Typography>
          {appState.units.map((unit, index) => (
            <Button key={index} onClick={() => handleSelectUnit(unit)}>
              {unit.name}
            </Button>
          ))}
        </Box>

        {/* 훈련 시간 입력 */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="훈련 시간(초)"
            value={trainingTime}
            onChange={(e) => setTrainingTime(e.target.value)}
            type="number"
            inputProps={{ min: 1, max: 3600 }} // 최대 1시간
          />
        </Box>

        {/* 훈련 시작 버튼 */}
        <Button
          onClick={handleStartTraining}
          disabled={!selectedUnit || trainingTime === ""}
        >
          훈련 시작
        </Button>

        {/* 훈련 진행 상황 */}
        {selectedUnit && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">
              {selectedUnit.name} 훈련 진행 상황:
            </Typography>
            <progress
              value={trainingProgress}
              max={parseInt(trainingTime || 0)}
            />
            <Typography>{`${trainingProgress}/${trainingTime}`}</Typography>
          </Box>
        )}

        {/* 훈련 결과 */}
        {!selectedUnit && trainingProgress > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">최근 훈련 결과:</Typography>
            <ul>
              <li>경험치: +{trainingProgress * 10}</li>
              <li>공격력: +{trainingProgress * 0.1}</li>
              <li>방어력: +{trainingProgress * 0.05}</li>
              <li>체력: +{trainingProgress * 1}</li>
              <li>속도: +{trainingProgress * 0.1}</li>
            </ul>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UnitTrainer;
