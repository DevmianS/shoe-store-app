import React, {memo} from 'react';
import NavBar from '@/components/UI/NavBar';
import {Box} from '@mui/material';

const navStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  '& main': {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      flex: '1 1 auto',
    },
  },
};

const NavBarLayout = ({children}) => {
  return (
    <Box sx={navStyles} key="wrap">
      <NavBar key="nav" />
      <Box component="main" key="main">
        {children}
      </Box>
    </Box>
  );
};

export default memo(NavBarLayout);
