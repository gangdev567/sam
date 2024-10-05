import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  styled,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Tabs,
  Tab,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#1A1D23",
  border: "2px solid #555",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  color: "#FFFFFF",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/background.jpg)",
  backgroundSize: "cover",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  border: "none",
  borderRadius: "20px",
  padding: "40px",
  marginBottom: "40px",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.common.white,
  "&.Mui-selected": {
    color: "#FFD700",
  },
}));

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const navigate = useNavigate();
  const { currentPlayer } = useAuth();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch(`/api/players/${currentPlayer.id}/heroes`);
        if (!response.ok) throw new Error("Failed to fetch heroes");
        const data = await response.json();
        setHeroes(data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };

    if (currentPlayer) fetchHeroes();
  }, [currentPlayer]);

  const handleViewHero = (heroId) => navigate(`/heroes/${heroId}`);

  const getFilteredHeroes = () => {
    switch (value) {
      case 0:
        return heroes;
      case 1:
        return heroes.filter((hero) => hero.isInBattle);
      case 2:
        return heroes.filter((hero) => !hero.isInBattle);
      default:
        return [];
    }
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", bgcolor: "#0F1319" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">영웅들의 대성당</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <StyledPaper elevation={12} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
            color="#FFD700"
            fontFamily="DOSSaemmul"
          >
            🏰 영웅 목록
          </Typography>

          <Tabs value={value} onChange={handleChange} centered>
            <StyledTab label="모든 영웅" />
            <StyledTab label="전투 중인 영웅" />
            <StyledTab label="휴식 중인 영웅" />
          </Tabs>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/recruit-hero")}
            fullWidth
            sx={{ mb: 3, fontSize: "18px" }}
          >
            새로운 영웅 모집하기
          </Button>

          <Grid container spacing={3}>
            {getFilteredHeroes().map((hero) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={hero.id}>
                <StyledCard onClick={() => handleViewHero(hero.id)}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: "300px",
                      objectFit: "contain",
                      borderRadius: "15px 15px 0 0",
                    }}
                    image={`/images/heroes/${hero.image}`}
                    alt={hero.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      fontWeight="bold"
                      color="#FFA07A"
                    >
                      ⚔️ {hero.name}
                    </Typography>
                    <Typography variant="body1" align="center" color="#C0C0C0">
                      레벨: {hero.level} | 경험치: {hero.experience}/
                      {hero.nextLevelExperience}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      color={hero.isInBattle ? "#FF0000" : "#00FF00"}
                    >
                      상태: {hero.isInBattle ? "전투 중 🔥" : "휴식 중 😴"}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Container>

      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Typography variant="body2" color="#C0C0C0">
          ⓒ 2023 Hero's Sanctuary. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroList;
