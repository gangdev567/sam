import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, checkLoginStatus, isLoggedIn } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = async (userData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      setMessage(result.message);
      if (result.success) {
        login(userData);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("회원가입에 실패했습니다.");
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      
      if (response.ok) { // status가 200-299 사이일 때
        login(userData);
        setMessage("로그인 성공");
      } else {
        setMessage(result.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("로그인에 실패했습니다.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">회원가입</Typography>
          <RegisterForm onRegister={handleRegister} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">로그인</Typography>
          <LoginForm onLogin={handleLogin} />
        </Grid>
      </Grid>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default AuthPage;
