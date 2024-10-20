import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

function NewResearchStarter({ onStartResearch }) {
  const { appState } = useContext(AppContext);
  const [selectedResearch, setSelectedResearch] = useState(null);

  const handleSelectResearch = (research) => {
    setSelectedResearch(research);
  };

  const handleStartResearch = () => {
    if (selectedResearch) {
      onStartResearch(selectedResearch);
      setSelectedResearch(null);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        새로운 연구 시작
      </Typography>
      <Grid container spacing={2}>
        {appState.researches
          .filter((research) => research.status === "available")
          .map((research) => (
            <Grid item key={research.name} xs={12} sm={6} md={4} lg={3}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
                  backgroundColor:
                    selectedResearch === research ? "#e0f2fe" : "inherit",
                }}
                onClick={() => handleSelectResearch(research)}
              >
                <CardContent>
                  <Typography variant="h6">{research.name}</Typography>
                  <Typography color="text.secondary">
                    분야: {research.category}
                  </Typography>
                  <Typography>비용: {research.cost}</Typography>
                  <Typography>기간: {research.duration} 초</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {selectedResearch && (
        <Box sx={{ mt: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">선택된 연구:</Typography>
              <Typography>이름: {selectedResearch.name}</Typography>
              <Typography>분야: {selectedResearch.category}</Typography>
              <Typography>비용: {selectedResearch.cost}</Typography>
              <Typography>기간: {selectedResearch.duration} 초</Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleStartResearch}
              >
                연구 시작
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default NewResearchStarter;
