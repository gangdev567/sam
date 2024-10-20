import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  margin: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function EquipmentSlot({ slot }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(slot.item || null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEquip = (newItem) => {
    setItem(newItem);
    handleClose();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard>
        <CardContent>
          <StyledTypography gutterBottom>{slot.name}</StyledTypography>
          <Typography variant="h5" component="h2">
            {item ? item.name : "비어있음"}
          </Typography>
          <Button size="small" onClick={handleOpen}>
            변경
          </Button>
        </CardContent>
      </StyledCard>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>장비 선택</DialogTitle>
        <DialogContent>
          <Typography variant="body2">선택 가능한 아이템:</Typography>
          <ul>
            {slot.availableItems.map((itemOption) => (
              <li key={itemOption.id}>{itemOption.name}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={() => handleEquip(slot.availableItems)}>장착</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

function EquipmentSlots({ equipmentSlots }) {
  return (
    <Grid container spacing={2}>
      {equipmentSlots.map((slot) => (
        <EquipmentSlot key={slot.name} slot={slot} />
      ))}
    </Grid>
  );
}

export default EquipmentSlots;
