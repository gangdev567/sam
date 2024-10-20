import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import ScienceIcon from '@mui/icons-material/Science';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';

const EstateMenu = ({ open, onClose }) => {
  const menuItems = [
    { icon: <HomeIcon />, text: '홈', path: '/home' },
    { icon: <BuildIcon />, text: '건물 관리', path: '/buildings' },
    { icon: <PeopleIcon />, text: '인구 관리', path: '/population' },
    { icon: <ScienceIcon />, text: '연구 센터', path: '/research' },
    { icon: <MilitaryTechIcon />, text: '군사 유닛', path: '/military' },
    { icon: <MapIcon />, text: '지도 보기', path: '/map' },
    { icon: <SettingsIcon />, text: '설정', path: '/settings' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="persistent"
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component="a" href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default EstateMenu;
