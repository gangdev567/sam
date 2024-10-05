import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import HeroList from "./components/HeroList";
import HeroDetail from "./components/HeroDetail";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

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
          </Routes>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
