import { useState } from "react";
import Building from "../../models/Building";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const buildingTypes = ["residential", "resource_production", "military"];
const buildingNames = {
  residential: "House",
  resource_production: "Mine",
  military: "Barrack",
};

const BuildingConstructor = ({ onAddBuilding }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("residential");
  const [level, setLevel] = useState(1);
  const [capacity, setCapacity] = useState("");
  const [productionRate, setProductionRate] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setType("residential");
    setLevel(1);
    setCapacity("");
    setProductionRate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBuilding = new Building(
      name,
      type,
      level,
      capacity,
      productionRate
    );
    onAddBuilding(newBuilding);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Construct New Building
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Construct New Building</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="building-type-label">Type</InputLabel>
              <Select
                labelId="building-type-label"
                id="building-type-select"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
              >
                {buildingTypes.map((t) => (
                  <MenuItem key={t} value={t}>
                    {buildingNames[t]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Level"
              type="number"
              fullWidth
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              required
            />
            <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required
            />
            <TextField
            margin="dense"
            label="Production Rate"
            type="number"
            fullWidth
            value={productionRate}
            onChange={(e) => setProductionRate(Number(e.target.value))}
            required
            />
          </form>
        </DialogContent>
      </Dialog>
      <DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="new-building-form" disabled={!name || !capacity || !productionRate}>
            Construct
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default BuildingConstructor;