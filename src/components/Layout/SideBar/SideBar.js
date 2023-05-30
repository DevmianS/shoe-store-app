import {useRouter} from 'next/router';
import {signOut} from 'next-auth/react';
import useUser from '@/hooks/useUser';

import {toast} from 'sonner';
import {Stack, Box, List, useMediaQuery, useTheme} from '@mui/material';

import AvatarStaticLayout from '../AvatarStaticLayout';

import {useToggle} from '@/context/ToggleContext';
import {memo, useState} from 'react';

import ListItem from '@/components/UI/ListItem';
import Loading from '@/components/UI/Loading';

function SideBar({children, showFilter, isFilter, sidebarVisible = true}) {
  const router = useRouter();
  const {status} = useUser();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const {isToggled, setIsToggled} = useToggle();

  const styles = {
    position: !isDesktop ? 'fixed' : 'static',
    maxWidth: !isDesktop ? '340px' : '320px',
    paddingTop: !isDesktop ? '32px' : 0,
    display: router.asPath.includes('/bag') && isDesktop ? 'none' : 'block',
    right: 0,
    overflowY: 'auto',
    top: isTablet ? '64px' : '60px',
    flex: `0 0 ${!isDesktop ? '270px' : '320px'}`,
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: {xs: 61, md: 10},
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
    await router.prefetch('/');
    toast.success('Logged out successfully.');
    router.push('/');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('USER_EMAIL');
    }
    setLoading(false);
    setIsToggled(false);
  };

  return (
    <>
      {loading && <Loading />}
      {sidebarVisible && (
        <Box sx={styles}>
          {!isFilter &&
            !showFilter &&
            (status === 'authenticated' ? (
              <Stack aria-label="user actions">
                <AvatarStaticLayout variant="card" />
                <List>
                  <ListItem
                    name="My products"
                    icon="orders"
                    onClick={() => {
                      router.push('/my-products');
                      setIsToggled(false);
                    }}
                  />
                  <ListItem
                    name="Settings"
                    icon="setting"
                    onClick={() => {
                      router.push('/profile/update');
                      setIsToggled(false);
                    }}
                  />
                  <ListItem
                    name="Log-out"
                    icon="logout"
                    onClick={handleLogout}
                  />
                </List>
              </Stack>
            ) : (
              <Stack aria-label="user actions">
                <AvatarStaticLayout variant="card" />
                <List>
                  <ListItem
                    name="Log-in"
                    icon="logout"
                    onClick={() => {
                      router.push('/sign-in');
                      setIsToggled(false);
                    }}
                  />
                </List>
              </Stack>
            ))}
          {showFilter && children}
        </Box>
      )}
    </>
  );
}

export default memo(SideBar);
