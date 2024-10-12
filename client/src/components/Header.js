// components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, currentPlayer } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1A1D23",
        color: "#FFFFFF",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span style={{ color: "#FFD700" }}>⚔️</span>{" "}
          {currentPlayer?.name || "Idle Game"}
        </Typography>
        {isLoggedIn ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/heroes")}
              sx={{ mr: 2 }}
            >
              영웅 목록
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/recruit-hero")}
              sx={{ mr: 2 }}
            >
              영웅 모집
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/hunt-monsters")}
              sx={{ mr: 2 }}
            >
              몬스터 사냥
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
