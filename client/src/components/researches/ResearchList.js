import React from "react";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function ResearchList({ onSelectResearch }) {
  const { appState } = useContext(AppContext);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        연구 목록
      </Typography>
      <Grid container spacing={2}>
        {appState.researches.map((research) => (
          <Grid item key={research.name} xs={12} sm={6} md={4} lg={3}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
              }}
              onClick={() => onSelectResearch(research)}
            >
              <CardContent>
                <Typography variant="h6">{research.name}</Typography>
                <Typography color="text.secondary">
                  분야: {research.category}
                </Typography>
                <Typography>비용: {research.cost}</Typography>
                <Typography>기간: {research.duration} 초</Typography>
                <Typography>상태: {research.status}</Typography>
                {research.isCompleted && (
                  <Typography color="success.main">완료됨</Typography>
                )}
                {!research.isCompleted && research.isStarted && (
                  <Typography color="warning.main">진행 중...</Typography>
                )}
                {!research.isCompleted && !research.isStarted && (
                  <Typography color="primary.main">시작 가능</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ResearchList;
