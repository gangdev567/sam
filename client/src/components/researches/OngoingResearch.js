import React, { useContext } from "react";
import { AppContext } from '../../context/AppContext';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function OngoingResearch({ onCancelResearch }) {
  const { appState } = useContext(AppContext);

  const ongoingResearches = appState.researches.filter(
    (research) => research.isStarted && !research.isCompleted
  );

  const handleCancelResearch = (researchName) => {
    const updatedResearches = appState.researches.map((research) => {
      if (research.name === researchName && research.isStarted) {
        research.cancelResearch();
      }
      return research;
    });
    onCancelResearch(updatedResearches);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        진행 중인 연구
      </Typography>
      {ongoingResearches.length > 0 ? (
        <List>
          {ongoingResearches.map((research) => (
            <ListItem key={research.name}>
              <ListItemText
                primary={research.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      분야: {research.category}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      진행률: {research.progress}%
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      남은 시간:{" "}
                      {Math.floor(
                        ((100 - research.progress) * research.duration) / 100
                      )}{" "}
                      초
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="cancel"
                  onClick={() => handleCancelResearch(research.name)}
                >
                  <CancelIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>현재 진행 중인 연구가 없습니다.</Typography>
      )}
    </Box>
  );
}

export default OngoingResearch;
