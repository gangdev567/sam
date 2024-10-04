import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import BuildingPopup from "./BuildingPopup";

const BuildingCard = ({ building }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{building.name}</Typography>
        <Typography variant="body1">Level: {building.level}</Typography>
        <Button onCLick={handleOpenPopup}>상세 정보</Button>
      </CardContent>
      <BuildingPopup
        open={openPopup}
        onClose={handleClosePopup}
        building={building}
      />
    </Card>
  );
};

export default BuildingCard;
