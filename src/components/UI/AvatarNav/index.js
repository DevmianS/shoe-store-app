import React, {useEffect, useState, memo} from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material';

import {AccountCircle, Brightness4, ExitToApp} from '@mui/icons-material';

import {useRouter} from 'next/router';
import {toast} from 'sonner';

const NavbarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [color, setColor] = useState('#0097A7');

  const [name, setName] = useState('');

  const router = useRouter();

  const handleClick = event => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    router.push('/profile');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully.');
    localStorage.removeItem('user');
    router.push('/sign-in');
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Handle dark mode toggle logic
  };

  const getRandomColor = () => {
    const colors = [
      '#D32F2F',
      '#1976D2',
      '#388E3C',
      '#7B1FA2',
      '#FFA000',
      '#E64A19',
      '#795548',
      '#0097A7',
      '#FBC02D',
      '#757575',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const initials = name.substring(0, 2).toUpperCase();

  useEffect(() => {
    setColor(getRandomColor());
    const nameLocalUser = localStorage.getItem('user');
    if (nameLocalUser) {
      setName(JSON.parse(nameLocalUser).userData.username);
    } else {
      setName('Valeri');
    }
  }, []);

  return (
    <>
      <Avatar
        sx={{
          cursor: 'pointer',
          border: '1px solid black',
          boxShadow: '0px 0px 7px black',
        }}
        style={{backgroundColor: color}}
        onClick={handleClick}
      >
        {initials}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClick}
        sx={{top: '10px'}}
      >
        <MenuItem>
          <ListItemIcon>
            <Brightness4 />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
          <Switch checked={isDarkMode} onChange={handleDarkModeToggle} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(NavbarMenu);
