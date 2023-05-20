import {Stack, Box, List, useMediaQuery, useTheme} from '@mui/material';
import {useRouter} from 'next/router';
import ListItem from '@/components/UI/ListItem';
import {toast} from 'sonner';
import AvatarStaticLayout from '../AvatarStaticLayout';
import {signOut} from 'next-auth/react';

import Loading from '@/components/UI/Loading';
import {useToggle} from '@/context/ToggleContext';
import {memo, useState} from 'react';

function SideBar({children, isFilter}) {
  const router = useRouter();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const {isToggled, toggle} = useToggle();

  const styles = {
    position: !isDesktop ? 'fixed' : 'static',
    maxWidth: !isDesktop ? '270px' : '320px',
    paddingTop: !isDesktop ? '32px' : 0,
    display: router.asPath.includes('/bag') && isDesktop ? 'none' : 'block',
    right: 0,
    overflowY: 'auto',
    top: isTablet ? '64px' : '60px',
    flex: `0 0 ${!isDesktop ? '270px' : '320px'}`,
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: 5,
    transition: '0.5s',
    transform: !isDesktop
      ? isToggled
        ? 'translateX(0)'
        : 'translateX(100%)'
      : 'none',
  };

  const [loading, setLoading] = useState();

  const handleLogout = async () => {
    setLoading(true);
    await signOut({redirect: false});
    await router.prefetch('/sign-in');
    toast.success('Logged out successfully.');
    router.push('/sign-in');
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Box sx={styles}>
        {!isFilter && (
          <Stack aria-label="user actions">
            <AvatarStaticLayout variant="card" />
            <List>
              <ListItem
                name="My products"
                icon="orders"
                onClick={() => router.push('/my-products')}
              />
              <ListItem
                name="Settings"
                icon="setting"
                onClick={() => router.push('/profile/update')}
              />
              <ListItem name="Log-out" icon="logout" onClick={handleLogout} />
            </List>
          </Stack>
        )}
        {children}
      </Box>
    </>
  );
}

export default memo(SideBar);
