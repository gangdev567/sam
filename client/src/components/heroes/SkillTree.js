import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/styles";

const StyledDiv = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

function SkillTree({ skills }) {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSkill(null);
  };

  const handleLearnSkill = () => {
    // 스킬 학습 로직 구현
    console.log(`스킬 ${selectedSkill.name}을(를) 배웠습니다.`);
    handleClose();
  };

  return (
    <StyledDiv>
      <Typography variant="h5">스킬 트리</Typography>
      <Grid container spacing={2}>
        {Object.entries(skills).map(([skillName, skillData]) => (
          <Grid item xs={12} sm={6} md={4} key={skillName}>
            <StyledPaper>
              <Typography variant="h6">{skillData.name}</Typography>
              <Typography variant="body2">
                설명: {skillData.description}
              </Typography>
              <Typography variant="body2">레벨: {skillData.level}</Typography>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedSkill(skillData);
                  handleOpen();
                }}
              >
                학습
              </StyledButton>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
      <StyledFab
        color="secondary"
        aria-label="add"
        onClick={() => console.log("새로운 스킬 추가")}
      >
        <AddIcon />
      </StyledFab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>스킬 학습 확인</DialogTitle>
        <DialogContent>
          {selectedSkill && (
            <>
              <Typography>스킬 이름: {selectedSkill.name}</Typography>
              <Typography>설명: {selectedSkill.description}</Typography>
              <Typography>현재 레벨: {selectedSkill.level}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleLearnSkill}>학습</Button>
        </DialogActions>
      </Dialog>
    </StyledDiv>
  );
}

export default SkillTree;
