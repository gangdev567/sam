import { Card, CardContent, Grid, Typography } from "@mui/material";

const StatisticsPanel = ({ statistics }) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(statistics).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <Card>
            <CardContent>
              <Typography variant="h6">{key}</Typography>
              <Typography variant="body1">{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsPanel;
