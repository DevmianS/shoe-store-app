import React from 'react';
import NavBar from '@/components/UI/NavBar';
import {Box, styled} from '@mui/material';

const NavBarLayout = ({children}) => {
  const Wrapper = styled(Box)({
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
  });
  return (
    <Wrapper>
      <NavBar key="nav" />
      <Box component="main">{children}</Box>
    </Wrapper>
  );
  git;
};

export default NavBarLayout;
