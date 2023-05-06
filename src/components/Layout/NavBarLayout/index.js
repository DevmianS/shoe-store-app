import React from 'react';
import NavBar from '@/components/UI/NavBar';
import {Box} from '@mui/material';

const NavBarLayout = ({children}) => {
  return (
    <Box
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
      }}
    >
      <NavBar />
      {children}
    </Box>
  );
  git;
};

export default NavBarLayout;
