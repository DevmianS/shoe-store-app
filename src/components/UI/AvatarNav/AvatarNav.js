import React, {useState, memo} from 'react';
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
import {signOut, useSession} from 'next-auth/react';

import Loading from '../Loading';
import useUser from '@/hooks/useUser';

const NavbarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  const handleLogout = async () => {
    setLoading(true);
    await signOut({redirect: false});
    await router.prefetch('/sign-in');
    toast.success('Logged out successfully.');
    router.push('/sign-in');
    setLoading(false);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const {initials} = useUser();

  return (
    <>
      {loading && <Loading />}
      <Avatar
        sx={{
          cursor: 'pointer',
          border: '1px solid black',
          boxShadow: '0px 0px 7px black',
        }}
        style={{backgroundColor: '#FE645E'}}
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
