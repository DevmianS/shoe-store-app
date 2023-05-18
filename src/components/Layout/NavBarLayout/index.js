import React, {memo} from 'react';
import NavBar from '@/components/UI/NavBar';
import {Box, styled} from '@mui/material';

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
const NavBarLayout = ({children}) => {
  return (
    <Wrapper key="wrap">
      <NavBar key="nav" />
      <Box component="main" key="main">
        {children}
      </Box>
    </Wrapper>
  );
};

export default memo(NavBarLayout);
