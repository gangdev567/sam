import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import HeroList from "./components/HeroList";
import HeroDetail from "./components/HeroDetail";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import MonsterHunt from "./components/MonsterList";
import MonsterDetail from "./components/MonsterDetail";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<HeroList />} />
            <Route path="/heroes/:heroId" element={<HeroDetail />} />
            <Route path="/hunt-monsters" element={<MonsterHunt />} />{" "}
            <Route path="/monsters/:monsterId" element={<MonsterDetail />} />
          </Routes>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
