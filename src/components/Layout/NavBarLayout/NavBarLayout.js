import {memo} from 'react';
import {Box} from '@mui/material';
import NavBar from '@/components/UI/NavBar';
import SideBar from '@/components/Layout/SideBar';
import {rwdValue} from '@/utils/theme';

const navStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  '& main': {
    padding: `${rwdValue(0, 40)} 0`,
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
      width: '100%',
    },
  },
};

const NavBarLayout = ({
  children,
  sidebarChildren,
  showFilter,
  sidebarVisible,
}) => {
  const isSidebarStyles = {marginLeft: {xs: 0, md: '340px'}};
  return (
    <Box sx={navStyles} key="wrap">
      <NavBar key="nav" />
      <Box
        component="main"
        key="main"
        sx={{...(sidebarVisible && isSidebarStyles)}}
      >
        {sidebarVisible && (
          <SideBar showFilter={showFilter}>{sidebarChildren}</SideBar>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default memo(NavBarLayout);
