import React from "react";
import { Box } from "@mui/material";

const EstateMap = () => {
  const mapData = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 2, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];
  const cellSize = 50; // 각 셀의 크기 (픽셀)

  return (
    <Box
      sx={{
        width: `${mapData[0].length * cellSize}px`,
        height: `${mapData.length * cellSize}px`,
      }}
    >
      <svg width="100%" height="100%">
        {mapData.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <rect
              key={`${rowIndex}-${cellIndex}`}
              x={cellIndex * cellSize}
              y={rowIndex * cellSize}
              width={cellSize}
              height={cellSize}
              fill={getCellColor(cell)}
              stroke="#ccc"
              strokeWidth="1"
              rx="2"
              onClick={(e) => handleCellClick(e, rowIndex, cellIndex)}
            />
          ))
        )}
      </svg>
    </Box>
  );
};

function getCellColor(cellValue) {
  switch (cellValue) {
    case 0:
      return "#f0f0f0"; // 빈 공간
    case 1:
      return "#c6e2b5"; // 건물
    case 2:
      return "#d9edf7"; // 특별한 건물
    default:
      return "#ffffff";
  }
}

function handleCellClick(event, row, col) {
  event.preventDefault();
  console.log(`Clicked on cell at (${row}, ${col})`);
  // 여기에 실제 동작을 구현합니다
}

export default EstateMap;
