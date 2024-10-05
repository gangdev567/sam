import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const StyledCardMedia = styled(CardContent)(({ theme }) => ({
  backgroundColor: "#1A1D23",
  border: "2px solid #555",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  color: "#FFFFFF",
  transition: "transform 0.3s ease-in-out",
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

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: "#1A1D23",
  border: "2px solid #555",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  color: "#FFFFFF",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#FFFFFF", // 셀 내부의 텍스트 색상을 흰색으로 변경
}));

const HeroDetail = () => {
  const [hero, setHero] = useState(null);
  const params = useParams();
  const { currentPlayer, updatePlayerData } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (currentPlayer && currentPlayer.heroes) {
      const selectedHero = currentPlayer.heroes.find(
        (hero) => hero.id === parseInt(params.heroId)
      );
      setHero(selectedHero);
    }
  }, [currentPlayer, params.heroId]);

  if (!hero) {
    return <div>영웅 데이터를 로딩 중입니다...</div>;
  }

  const handleLevelUp = () => {
    if (hero.experience >= hero.nextLevelExperience) {
      const newHero = { ...hero };
      newHero.level += 1;
      newHero.experience -= hero.nextLevelExperience;
      newHero.attackPower *= 1.05;
      newHero.defense *= 1.05;
      newHero.health *= 1.05;
      newHero.mana *= 1.05;
      setHero(newHero);
      updatePlayerData({
        heroes: currentPlayer.heroes.map((h) =>
          h.id === hero.id ? newHero : h
        ),
      });
    }
  };

  const handleStatUpgrade = () => {
    const newHero = { ...hero };
    newHero.attackPower += 10;
    newHero.defense += 5;
    newHero.health += 50;
    newHero.mana += 20;
    setHero(newHero);
    updatePlayerData({
      heroes: currentPlayer.heroes.map((h) => (h.id === hero.id ? newHero : h)),
    });
  };

  const handleSkillUpgrade = () => {
    const newHero = { ...hero };
    newHero.skills.forEach((skill) => {
      skill.level += 1;
      skill.damage *= 1.1;
    });
    setHero(newHero);
    updatePlayerData({
      heroes: currentPlayer.heroes.map((h) => (h.id === hero.id ? newHero : h)),
    });
  };

  const handleEvolution = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmEvolution = () => {
    // 진화 로직 구현 (예시)
    const newHero = { ...hero };
    newHero.name += " (진화)";
    newHero.attackPower *= 1.5;
    newHero.defense *= 1.5;
    newHero.health *= 1.5;
    newHero.mana *= 1.5;
    setHero(newHero);
    updatePlayerData({
      heroes: currentPlayer.heroes.map((h) => (h.id === hero.id ? newHero : h)),
    });
    setOpenModal(false);
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", bgcolor: "#0F1319" }}>
      <StyledPaper>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ p: 2 }}
          fontWeight="bold"
          color="#FFD700"
        >
          ⚔️ {hero.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledCardMedia>
              <img
                src={`/images/heroes/${hero.image}`}
                alt={hero.name}
                style={{
                  width: "100%",
                  height: "600px",
                  objectFit: "contain",
                  borderRadius: "15px 15px 0 0",
                }}
              />
            </StyledCardMedia>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledCardContent>
              <Typography variant="h5" align="center">
                기본 정보
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell align="right">{hero.name}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>레벨</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.level}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>직업</StyledTableCell>
                    <StyledTableCell align="right">{hero.job}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>경험치</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.experience} / {hero.nextLevelExperience}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                강화 옵션
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color={
                      hero.experience >= hero.nextLevelExperience
                        ? "primary"
                        : "secondary"
                    }
                    fullWidth
                    onClick={handleLevelUp}
                    disabled={hero.experience < hero.nextLevelExperience}
                    sx={{
                      backgroundColor: (theme) =>
                        hero.experience >= hero.nextLevelExperience
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      color: (theme) =>
                        hero.experience >= hero.nextLevelExperience
                          ? theme.palette.common.white
                          : theme.palette.text.primary,
                      "&:disabled": {
                        opacity: 0.7,
                        backgroundColor: (theme) => theme.palette.grey[700],
                        color: (theme) => theme.palette.common.white,
                      },
                    }}
                  >
                    레벨업 ({hero.experience}/{hero.nextLevelExperience})
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleStatUpgrade}
                  >
                    능력치 강화
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={handleSkillUpgrade}
                  >
                    스킬 업그레이드
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleEvolution}
                  >
                    진화
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                능력치
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <StyledTableCell>공격력</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.attackPower}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>방어력</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.defense}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>체력</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.health} / {hero.maxHealth}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>마나</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.mana} / {hero.maxMana}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>속도</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.speed.toFixed(2)}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>크리티컬 확률</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.criticalChance.toFixed(2)}%
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>크리티컬 데미지</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.criticalDamage.toFixed(2)}%
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>회피 확률</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.dodgeChance.toFixed(2)}%
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>블록 확률</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.blockChance.toFixed(2)}%
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>블록량</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.blockAmount.toFixed(2)}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                스킬 정보
              </Typography>
              <Table size="small">
                <TableBody>
                  {hero.skills.map((skill, index) => (
                    <TableRow key={index}>
                      <StyledTableCell>{skill.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {skill.description}
                        <br />
                        쿨타임: {skill.cooldown} 초
                        <br />
                        레벨: {skill.level}
                        <br />
                        데미지: {skill.damage}
                        <br />
                        마나 소모: {skill.manaCost}
                        <br />
                        범위: {skill.skillRange}
                        <br />
                        AoE: {skill.areaOfEffect ? "예" : "아니오"}
                        <br />
                        패시브 스킬: {skill.isPassive ? "예" : "아니오"}
                        <br />
                        얼티메이트 스킬: {skill.isUltimate ? "예" : "아니오"}
                        <br />
                        필요 레벨: {skill.requiredLevel}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                전투 상태
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <StyledTableCell>전투 중</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.isInBattle ? "예" : "아니오"}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                진화 정보
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <StyledTableCell>진화 가능 여부</StyledTableCell>
                    <StyledTableCell align="right">
                      {hero.canEvolve ? "예" : "아니오"}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>필요한 자원</StyledTableCell>
                    <StyledTableCell align="right">
                      골드: {hero.evolutionCost} 개
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                장비 슬롯
              </Typography>
              <Table size="small">
                <TableBody>
                  {hero.equipmentSlots.map((slot, index) => (
                    <TableRow key={index}>
                      <StyledTableCell>{slot.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {slot.item ? (
                          <>
                            {slot.item.name}
                            <br />
                            공격력 보너스: {slot.item.attackBonus}
                            <br />
                            방어력 보너스: {slot.item.defenseBonus}
                            <br />
                            체력 보너스: {slot.item.hpBonus}
                            <br />
                            마나 보너스: {slot.item.manaBonus}
                            <br />
                            속도 보너스: {slot.item.speedBonus.toFixed(2)}
                            <br />
                            크리티컬 확률 보너스:{" "}
                            {slot.item.criticalChanceBonus.toFixed(2)}%
                            <br />
                            크리티컬 데미지 보너스:{" "}
                            {slot.item.criticalDamageBonus.toFixed(2)}%
                            <br />
                            가격: {slot.item.price} 골드
                            <br />
                            필요 레벨: {slot.item.levelRequirement}
                            <br />
                            레어도: {slot.item.rarity}
                            <br />
                            슬롯: {slot.item.slot}
                            <br />
                            설명: {slot.item.description}
                          </>
                        ) : (
                          "비어있음"
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledCardContent>
          </Grid>
        </Grid>
      </StyledPaper>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>영웅 진화 확인</DialogTitle>
        <DialogContent>
          <p>정말로 영웅을 진화시키겠습니까?</p>
          <p>진화 후에는 되돌릴 수 없습니다.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>취소</Button>
          <Button onClick={handleConfirmEvolution}>확인</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HeroDetail;
