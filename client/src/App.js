// App.js
import React, { useContext, useEffect, useState } from "react";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import { ThemeProvider } from "@mui/styles";
import { Box } from "@mui/material";
import EstatePage from "./pages/estates/EstatePage";
import { AppContext, AppProvider } from "./context/AppContext";
import Header from "./components/Header";

function App() {
  const { appState } = useContext(AppContext);

  if (!appState || !appState.resources || appState.resources.length === 0) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Header resources={appState.resources} />
      <Router>
        <Box sx={{ padding: 2, borderBottom: 1 }}>
          <Link to="/" style={{ marginRight: 16 }}>
            영웅 관리
          </Link>
          <Link to="/estates">영지 관리</Link>
        </Box>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/estates" element={<EstatePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
