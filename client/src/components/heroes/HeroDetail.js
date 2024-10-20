import { Avatar, Button, Chip, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import HeroStats from "./HeroStats.js";
import EquipmentSlots from "./EquipmentSlots";
import SkillTree from "./SkillTree";
import ExperienceBar from "./ExperienceBar";
import StatusIndicator from "./StatusIndicator";
import SpecialAbilities from "./SpecialAbility";
import { styled } from "@mui/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  height: "100%",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(2),
  width: 60,
  height: 60,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function HeroDetail({ hero }) {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={4} item={true.toString()}>
        <StyledPaper>
          <StyledAvatar src="/images/avatar/hero.png" />
          <Typography variant="h5">{hero.name}</Typography>
          <StyledChip label={`등급: ${hero.grade}`} color="primary" />
          <StyledChip label={`레벨: ${hero.level}`} color="secondary" />
          <div style={{ marginBottom: "16px" }}>
            <Typography variant="h6">경험치</Typography>
            <ExperienceBar
              currentExperience={hero.experience}
              maxExperience={hero.maxExperience}
            />
          </div>
          <StyledButton variant="contained" color="primary">
            레벨업
          </StyledButton>
          <Typography variant="h6">현재 상태</Typography>
          <StatusIndicator status={hero.status} />
        </StyledPaper>
      </Grid>
      <Grid xs={12} md={8} item={true.toString()}>
        <StyledPaper>
          <Typography variant="h6">능력치</Typography>
          <HeroStats stats={hero.stats} />
          <Typography variant="h6">장비 슬롯</Typography>
          <EquipmentSlots equipmentSlots={hero.equipmentSlots} />
          <Typography variant="h6">스킬 트리</Typography>
          <SkillTree skills={hero.skills} />
          <Typography variant="h6">특수 능력</Typography>
          <SpecialAbilities abilities={hero.specialAbilities} />
          <Typography variant="h6">배경 스토리</Typography>
          <p>{hero.backgroundStory}</p>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}

export default HeroDetail;
