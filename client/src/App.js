// App.js
import React from "react";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import { ThemeProvider } from "@mui/styles";
import { Box } from "@mui/material";
import EstatePage from "./pages/estates/EstatePage";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
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
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
