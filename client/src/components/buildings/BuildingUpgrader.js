import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react"

const BuildingUpgrader = ({building}) => {
  const [open, setOpen] = useState(false);
  const [upgradeProgress, setUpgradeProgress ] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    if(!isUpgrading) return;

    const intervalId = setInterval(() => {
      setUpgradeProgress(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isUpgrading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const startUpgrade = async () => {
    setIsUpgrading(true);
    await building.upgrade();
    setIsUpgrading(false);
    setUpgradeProgress(0);
    handleClose();
  };

  return (
    <>
    <Button variant="contained" onClick={handleOpen}>
      Upgrade
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upgrade {building.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Current Level: {building.level}
        </Typography>
        <Typography variant="body1">
          Upgrade Cost: {building.upgradeCost}
        </Typography>
        <CircularProgress variant="determinate" value={upgradeProgress} />
      </DialogContent>
      <DialogActions>
        <Button onCLick={handleClose}>Cancel</Button>
        <Button onClick={startUpgrade} disabled={isUpgrading || upgradeProgress !== 0}>
          {isUpgrading ? 'Upgrading...' : 'Start Upgrade'}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default BuildingUpgrader;