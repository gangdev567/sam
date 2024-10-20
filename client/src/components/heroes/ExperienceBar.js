import { Box, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
}));

function ExperienceBar({ currentExperience, maxExperience }) {
  const progress = Math.min((currentExperience / maxExperience) * 100, 100);

  return (
    <StyledBox>
      <Typography variant="body2" gutterBottom>
        경험치: {currentExperience}/{maxExperience}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="caption">{Math.round(progress)}%</Typography>
    </StyledBox>
  );
}

export default ExperienceBar;
