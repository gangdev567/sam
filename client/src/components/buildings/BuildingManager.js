import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import BuildingList from './BuildingList';
import BuildingDetail from './BuildingDetail';
import BuildingConstructor from './BuildingConstructor';

const BuildingManager = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleAddBuilding = (newBuilding) => {
    setBuildings([...buildings, newBuilding]);
  };

  const handleDeleteBuilding = (id) => {
    setBuildings(buildings.filter(b => b.id !== id));
  };

  const handleEditBuilding = (building) => {
    console.log('Editing building:', building);
  };

  const handleSelectBuilding = (building) => {
    setSelectedBuilding(building);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Building Manager</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <BuildingConstructor onAddBuilding={handleAddBuilding} />
        <BuildingList 
          buildings={buildings} 
          onDeleteBuilding={handleDeleteBuilding} 
          onEditBuilding={handleEditBuilding}
          onSelectBuilding={handleSelectBuilding}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        {selectedBuilding && <BuildingDetail building={selectedBuilding} />}
      </Grid>
    </Grid>
  );
};

export default BuildingManager;
