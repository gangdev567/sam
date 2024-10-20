import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));

function HeroList({ heroes, onSelect }) {
  const handleSelectHero = (hero) => {
    onSelect(hero);
  };

  return (
    <StyledDiv>
      <Typography variant="h6">영웅 목록</Typography>
      <List>
        {heroes.map((hero) => (
          <React.Fragment key={hero.name}>
            <ListItem button="true" onClick={() => handleSelectHero(hero)}>
              <ListItemAvatar>
                <Avatar alt={hero.name} src="/images/avatar/hero.png" />
              </ListItemAvatar>
              <ListItemText
                primary={hero.name}
                secondary={`등급: ${hero.grade}, 레벨: ${hero.level}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </StyledDiv>
  );
}

export default HeroList;
