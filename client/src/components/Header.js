import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header({ resources }) {
  if (!resources || resources.length === 0) {
    return null; // resources가 없거나 비어있으면 아무것도 렌더링하지 않음
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">자원 상태</Typography>
        <div style={{ marginLeft: "auto", marginRight: 16 }}>
          {resources.map((resource) => (
            <Typography key={resource.name} variant="body1">
              {`${resource.name}: ${resource.amount.toFixed(2)} / ${
                resource.maxCapacity
              }`}
            </Typography>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
