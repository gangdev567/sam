import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UpgradeModal({ open, onClose, selectedResource }) {
  const [upgrading, setUpgrading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleUpgrade = (type) => {
    setUpgrading(true);
    setTimeout(() => {
      selectedResource.upgrade(type);
      setUpgrading(false);
      onClose();
    }, 1000); // 시뮤레이션을 위해 1초 지연
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedResource.name} 업그레이드
        </Typography>
        <Grid container spacing={2} mt={2}>
          {selectedResource.upgrades.map((upgrade, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={upgrading}
                onClick={() => handleUpgrade(upgrade.type)}
              >
                {upgrade.type} 업그레이드 ({upgrade.multiplier.toFixed(2)}배)
              </Button>
            </Grid>
          ))}
        </Grid>
        {upgrading && <Typography>업그레이드 중...</Typography>}
      </Box>
    </Modal>
  );
}

export default UpgradeModal;
