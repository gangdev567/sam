// src/components/BattleSimulator.js
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";

const BattleSimulator = () => {
  const { appState } = useContext(AppContext);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [enemyUnits, setEnemyUnits] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSelectUnit = (unit) => {
    setSelectedUnits((prev) => [...prev, unit]);
  };

  const handleRemoveSelectedUnit = (unitIndex) => {
    setSelectedUnits((prev) => prev.filter((_, i) => i !== unitIndex));
  };

  const generateRandomEnemyUnits = () => {
    const randomUnits = [];
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      const randomUnitIndex = Math.floor(Math.random() * appState.units.length);
      randomUnits.push(appState.units[randomUnitIndex]);
    }
    setEnemyUnits(randomUnits);
  };

  const simulateBattle = () => {
    // 전투 시뮬레이션 로직 구현
    const playerTotalPower = selectedUnits.reduce(
      (sum, unit) => sum + unit.stats.attackPower,
      0
    );
    const enemyTotalPower = enemyUnits.reduce(
      (sum, unit) => sum + unit.stats.attackPower,
      0
    );

    let winner;
    if (playerTotalPower > enemyTotalPower) {
      winner = "플레이어";
    } else if (enemyTotalPower > playerTotalPower) {
      winner = "적군";
    } else {
      winner = "무승부";
    }

    setSimulationResult({
      playerUnits: selectedUnits,
      enemyUnits: enemyUnits,
      winner: winner,
      playerPower: playerTotalPower,
      enemyPower: enemyTotalPower,
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">전투 시뮬레이터</Typography>

        {/* 유닛 선택 */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">유닛 선택:</Typography>
          {appState.units.map((unit, index) => (
            <Button key={index} onClick={() => handleSelectUnit(unit)}>
              {unit.name}
            </Button>
          ))}
        </Box>

        {/* 선택된 유닛 표시 */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">선택된 유닛:</Typography>
          {selectedUnits.map((unit, index) => (
            <span key={index}>
              {unit.name}
              <Button onClick={() => handleRemoveSelectedUnit(index)}>
                제거
              </Button>
            </span>
          ))}
        </Box>

        {/* 적군 생성 */}
        <Box sx={{ marginBottom: 2 }}>
          <Button onClick={generateRandomEnemyUnits}>랜덤 적군 생성</Button>
        </Box>

        {/* 적군 정보 표시 */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">적군:</Typography>
          {enemyUnits.map((unit, index) => (
            <div key={index}>{unit.name}</div>
          ))}
        </Box>

        {/* 전투 시작 버튼 */}
        <Button
          onClick={simulateBattle}
          disabled={!selectedUnits.length || !enemyUnits.length}
        >
          전투 시작
        </Button>

        {/* 결과 표시 */}
        {simulationResult && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">결과:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>플레이어 유닛:</Typography>
                {simulationResult.playerUnits.map((unit, index) => (
                  <div key={index}>{unit.name}</div>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Typography>적군 유닛:</Typography>
                {simulationResult.enemyUnits.map((unit, index) => (
                  <div key={index}>{unit.name}</div>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography>최종 승리자: {simulationResult.winner}</Typography>
                <Typography>
                  플레이어 공격력: {simulationResult.playerPower}
                </Typography>
                <Typography>
                  적군 공격력: {simulationResult.enemyPower}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BattleSimulator;
