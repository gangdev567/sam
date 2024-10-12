// components/MonsterHunt.jsx
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
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const MonsterList = () => {
  const [monsters, setMonsters] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedMonster, setSelectedMonster] = useState(null);
  const navigate = useNavigate();
  const { currentPlayer } = useAuth();
  const [levelMin, setLevelMin] = useState("");
  const [levelMax, setLevelMax] = useState("");
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const params = new URLSearchParams();
        if (levelMin) params.append("levelMin", levelMin);
        if (levelMax) params.append("levelMax", levelMax);
        if (type) params.append("type", type);
        if (sortBy) params.append("sortBy", sortBy);

        const response = await fetch(`/api/monsters?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch monsters");
        const data = await response.json();
        setMonsters(data);
      } catch (error) {
        console.error("Error fetching monsters:", error);
      }
    };

    if (currentPlayer) fetchMonsters();
  }, [currentPlayer, levelMin, levelMax, type, sortBy]);

  const handleViewMonster = (monsterId) => navigate(`/monsters/${monsterId}`);

  const handleSelectHero = (heroId) => {
    setSelectedHeroes((prev) =>
      prev.includes(heroId)
        ? prev.filter((id) => id !== heroId)
        : [...prev, heroId]
    );
  };

  const handleSelectItem = (itemId, checked) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  // 몬스터 선택 함수 추가
  const selectMonster = (monster) => {
    setSelectedMonster(monster);
  };

  const startBattle = async () => {
    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId: currentPlayer.id,
          monsterId: selectedMonster.id,
          heroIds: selectedHeroes,
          items: Object.keys(selectedItems).filter(
            (itemId) => selectedItems[itemId]
          ),
        }),
      });

      if (!response.ok) throw new Error("Failed to start battle");

      const result = await response.json();
      console.log("Battle result:", result);
      // 여기에서 결과를 처리하거나 다른 페이지로 이동할 수 있습니다.
    } catch (error) {
      console.error("Error starting battle:", error);
    }
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", bgcolor: "#0F1319" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">몬스터 사냥</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{ ml: 2 }}
          >
            뒤로 가기
          </Button>
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
          >
            🐲 몬스터 목록
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="최소 레벨"
              type="number"
              value={levelMin}
              onChange={(e) => setLevelMin(e.target.value)}
              sx={{ mr: 2 }}
            />
            <TextField
              label="최대 레벨"
              type="number"
              value={levelMax}
              onChange={(e) => setLevelMax(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Select
              label="종류"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ mr: 2 }}
            >
              <MenuItem value="">모든 종류</MenuItem>
              <MenuItem value="드래곤">드래곤</MenuItem>
              <MenuItem value="언데드">언데드</MenuItem>
              <MenuItem value="인간형">인간형</MenuItem>
            </Select>
            <Select
              label="정렬 기준"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">기본 순서</MenuItem>
              <MenuItem value="level">레벨 순</MenuItem>
              <MenuItem value="hp">HP 순</MenuItem>
            </Select>
          </Box>

          <Grid container spacing={3}>
            {monsters.map((monster) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={monster.id}>
                <StyledCard onClick={() => handleViewMonster(monster.id)}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: "300px",
                      objectFit: "contain",
                      borderRadius: "15px 15px 0 0",
                    }}
                    image={`/images/monsters/${monster.image}`}
                    alt={monster.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      fontWeight="bold"
                      color="#FFA07A"
                    >
                      🔪 {monster.name}
                    </Typography>
                    <Typography variant="body1" align="center" color="#C0C0C0">
                      레벨: {monster.level} | HP: {monster.hp}
                    </Typography>
                    <Typography variant="body2" align="center" color="#00FFFF">
                      공격력: {monster.attack} | 방어력: {monster.defense}
                    </Typography>
                    <Typography variant="body2" align="center" color="#FFFF00">
                      드랍 아이템: {monster.dropItem || "없음"}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            fontWeight="bold"
            color="#FFD700"
            sx={{ mt: 4 }}
          >
            전투 준비
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedHeroes.length > 0}
                  onChange={(e) => handleSelectHero(currentPlayer.heroes[0].id)}
                  name="select-heroes"
                />
              }
              label="영웅 선택"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedItems["potion"]}
                  onChange={(e) => handleSelectItem("potion", e.target.checked)}
                  name="use-potion"
                />
              }
              label="회복 포션 사용"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedItems["elixir"]}
                  onChange={(e) => handleSelectItem("elixir", e.target.checked)}
                  name="use-elixir"
                />
              }
              label="강화 물약 사용"
            />

            {selectedMonster && (
              <Typography variant="body1" color="#C0C0C0" sx={{ mb: 2 }}>
                선택된 몬스터: {selectedMonster.name}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={startBattle}
              disabled={!selectedHeroes.length || !selectedMonster}
              sx={{ mt: 2 }}
            >
              전투 시작
            </Button>
          </Box>
        </StyledPaper>
      </Container>

      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Typography variant="body2" color="#C0C0C0">
          ⓒ 2023 Monster Hunt. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MonsterList;
