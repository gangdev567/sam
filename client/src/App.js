// App.js
import React from "react";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import { ThemeProvider } from "@mui/styles";
import ResourcePage from "./pages/ResourcePage";
import { Box } from "@mui/material";
import EstatePage from "./pages/estates/EstatePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ padding: 2, borderBottom: 1 }}>
          <Link to="/" style={{ marginRight: 16 }}>
            영웅 관리
          </Link>
          <Link to="/resources">리소스 관리</Link>
          <Link to="/estates">영지 관리</Link>
        </Box>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/estates" element={<EstatePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
