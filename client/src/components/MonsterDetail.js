// components/MonsterDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Paper,
  styled,
  Grid,
  CardMedia,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "40px",
  margin: "20px auto",
  maxWidth: "800px",
  backgroundColor: "#1A1D23",
  color: "#FFFFFF",
}));

const MonsterDetail = () => {
  const { monsterId } = useParams();
  const { currentPlayer } = useAuth();
  const [monster, setMonster] = useState(null);

  React.useEffect(() => {
    const fetchMonster = async () => {
      try {
        const response = await fetch(`/api/monsters/${monsterId}`);
        if (!response.ok) throw new Error("Failed to fetch monster");
        const data = await response.json();
        setMonster(data);
      } catch (error) {
        console.error("Error fetching monster:", error);
      }
    };

    if (currentPlayer) fetchMonster();
  }, [currentPlayer, monsterId]);

  if (!monster) return null;

  return (
    <StyledPaper elevation={12}>
      <Typography variant="h4" align="center" gutterBottom>
        {monster.name}
      </Typography>

      {/* 몬스터 이미지 */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: "50%", maxHeight: "400px", objectFit: "contain" }}
          image={`/images/monsters/${monster.image}`}
          alt={monster.name}
        />
      </Box>

      {/* 기본 정보 테이블 */}
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Typography variant="h6">기본 정보</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>레벨</TableCell>
            <TableCell>{monster.level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HP</TableCell>
            <TableCell>{monster.hp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>공격력</TableCell>
            <TableCell>{monster.attack}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>방어력</TableCell>
            <TableCell>{monster.defense}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>종류</TableCell>
            <TableCell>{monster.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>드랍 아이템</TableCell>
            <TableCell>{monster.dropItem || "없음"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>드랍 확률</TableCell>
            <TableCell>{(monster.dropRate * 100).toFixed(2)}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* 스킬 정보 */}
      <Typography variant="h6" gutterBottom>
        스킬 정보
      </Typography>
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>스킬 이름</TableCell>
            <TableCell>설명</TableCell>
            <TableCell>쿨타임</TableCell>
            <TableCell>필요 레벨</TableCell>
            <TableCell>데미지</TableCell>
            <TableCell>마나 소모</TableCell>
            <TableCell>스킬 범위</TableCell>
            <TableCell>영향 범위</TableCell>
            <TableCell>패시브</TableCell>
            <TableCell>얼티밋</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monster.skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.description}</TableCell>
              <TableCell>{skill.cooldown}초</TableCell>
              <TableCell>{skill.requiredLevel}</TableCell>
              <TableCell>{skill.damage}</TableCell>
              <TableCell>{skill.manaCost}</TableCell>
              <TableCell>{skill.skillRange}</TableCell>
              <TableCell>{skill.areaOfEffect}</TableCell>
              <TableCell>{skill.isPassive ? "예" : "아니오"}</TableCell>
              <TableCell>{skill.isUltimate ? "예" : "아니오"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 약점 정보 */}
      <Typography variant="h6" gutterBottom>
        약점 정보
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>속성</TableCell>
            <TableCell>설명</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monster.weaknesses.map((weakness) => (
            <TableRow key={weakness.id}>
              <TableCell>{weakness.element}</TableCell>
              <TableCell>{weakness.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default MonsterDetail;
