import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

function SpecialAbility({ ability }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledPaper>
        <Typography variant="h6">{ability.name}</Typography>
        <Icon>{ability.icon}</Icon>
        <Typography variant="body2">설명: {ability.description}</Typography>
        <StyledButton variant="contained" color="primary" onClick={handleOpen}>
          상세 정보
        </StyledButton>
      </StyledPaper>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="body1">{ability.detailedDescription}</Typography>
          <Typography variant="caption">
            사용 조건: {ability.usageCondition}
          </Typography>
          <Typography variant="caption">
            재사용 대기시간: {ability.cooldown} 초
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

function SpecialAbilities({ abilities }) {
  return (
    <div className="root">
      <Typography variant="h5">특수 능력</Typography>
      <Grid container spacing={2}>
        {abilities.map((ability) => (
          <SpecialAbility key={ability.name} ability={ability} />
        ))}
      </Grid>
    </div>
  );
}

export default SpecialAbilities;
