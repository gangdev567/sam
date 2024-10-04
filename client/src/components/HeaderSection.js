import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const HeaderSection = ({ playerInfo }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Territory
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">레벨: {playerInfo.level}</Typography>
          <Box sx={{ width: '200px', height: '10px', backgroundColor: '#ccc', margin: '0 10px' }}>
            <Box sx={{ width: `${playerInfo.expPercentage}%`, height: '100%', backgroundColor: '#888' }} />
          </Box>
          <Typography variant="body1">{playerInfo.expPercentage}%</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderSection;