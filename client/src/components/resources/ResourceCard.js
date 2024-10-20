import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import UpgradeModal from "./UpgradeModal";

function ResourceCard({ resource, onUpgrade }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpgradeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {resource.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">현재 양:</Typography>
            <Typography variant="body2">
              {resource.amount.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">생산 속도:</Typography>
            <Typography variant="body2">
              {resource.productionRate.toFixed(2)} / 초
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">최대 용량:</Typography>
            <Typography variant="body2">{resource.maxCapacity}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleUpgradeClick}>
              업그레이드
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <UpgradeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedResource={resource}
        onUpgrade={onUpgrade}
      />
    </Card>
  );
}

export default ResourceCard;
