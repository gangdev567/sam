import { Grid, Paper } from "@mui/material";
import { useRef } from "react";

const BuildingGrid = ({ buildings, moveBuilding }) => {
  const gridRef = useRef(null);

  const handleDragStart = (event, buildingId) => {
    event.dataTransfer.setData("buildingId", buildingId);
  };

  const handleDrop = (event) => {
    const buildingId = event.dataTransfer.getData("buildingId");
    const targetCell = event.target.closest(".grid-cell");
    if (targetCell) {
      const x = parseInt(targetCell.dataset.x);
      const y = parseInt(targetCell.dataset.y);
      moveBuilding(buildingId, x, y);
    }
  };

  return (
    <div
      ref={gridRef}
      style={{
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        overflow: "auto",
      }}
    >
      <Grid container spacing={1}>
        {[...Array(20)].map((_, yIndex) => (
          <Grid item xs={12} key={`row-${yIndex}`}>
            {[...Array(20)].map((_, xIndex) => (
              <Grid
                item
                xs={1}
                key={`cell-${xIndex}-${yIndex}`}
                className="grid-cell"
                data-x={xIndex}
                data-y={yIndex}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {buildings.find((b) => b.x === xIndex && b.y === yIndex) && (
                  <Paper
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(
                        e,
                        buildings.find((b) => b.x === xIndex && b.y === yIndex)
                          .id
                      )
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {
                      buildings.find((b) => b.x === xIndex && b.y === yIndex)
                        .name
                    }
                  </Paper>
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BuildingGrid;
