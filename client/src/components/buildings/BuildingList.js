import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BuildingList = ({ buildings, onDeleteBuilding, onEditBuilding }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Capacity</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildings.map((building) => (
            <TableRow
              key={building.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {building.name}
              </TableCell>
              <TableCell align="right">{building.buildingType}</TableCell>
              <TableCell align="right">{building.level}</TableCell>
              <TableCell align="right">
                {building.capacity.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit Building">
                  <IconButton onClick={() => onEditBuilding(building)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Building">
                  <IconButton onClick={() => onDeleteBuilding(building.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BuildingList;
