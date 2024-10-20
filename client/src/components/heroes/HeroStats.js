import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  margin: theme.spacing(2),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

function HeroStats({ stats }) {
  const statComponents = Object.entries(stats).map(
    ([statName, statValue], index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <StyledCard>
          <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {statName.toUpperCase()}
            </Typography>
            <Box position="relative" display="inline-flex">
              <StyledCircularProgress
                variant="determinate"
                value={statValue}
                size={80}
                thickness={6}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h6" component="div" color="textPrimary">
                  {statValue}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    )
  );

  return (
    <Grid container spacing={2}>
      {statComponents}
    </Grid>
  );
}

export default HeroStats;
