import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ResearchList from "./ResearchList";
import OngoingResearch from "./OngoingResearch";
import NewResearchStarter from "./NewResearchStarter";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

function ResearchManager() {
  const { appState, updateResearches } = useContext(AppContext);
  const [selectedResearch, setSelectedResearch] = useState(null);

  const handleStartResearch = (research) => {
    const updatedResearches = appState.researches.map((r) => {
      if (r.name === research.name) {
        r.startResearch();
      }
      return r;
    });
    updateResearches(updatedResearches);
    setSelectedResearch(null);
  };

  const handleCancelResearch = (researchName) => {
    const updatedResearches = appState.researches.map((r) => {
      if (r.name === researchName && r.isStarted) {
        r.cancelResearch();
      }
      return r;
    });
    updateResearches(updatedResearches);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          연구 관리
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <ResearchList
                researches={appState.researches}
                onSelectResearch={setSelectedResearch}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <OngoingResearch
                researches={appState.researches}
                onCancelResearch={handleCancelResearch}
              />
            </Paper>

            <Box sx={{ mt: 3 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <NewResearchStarter
                  selectedResearch={selectedResearch}
                  onStartResearch={handleStartResearch}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ResearchManager;
