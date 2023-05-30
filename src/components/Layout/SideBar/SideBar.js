import {useRouter} from 'next/router';
import {signOut} from 'next-auth/react';
import {memo, useState} from 'react';

import {toast} from 'sonner';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

import {useToggle} from '@/context/ToggleContext';
import useUser from '@/hooks/useUser';

import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import ListItem from '@/components/UI/ListItem';
import Loading from '@/components/UI/Loading';

function SideBar({children, showFilter, isFilter, sidebarVisible = true}) {
  const router = useRouter();
  const {status} = useUser();
  const [loading, setLoading] = useState();
  const {isToggled, setIsToggled} = useToggle();

  const styles = {
    position: 'fixed',
    maxWidth: {xs: '270px', md: '340px'},
    paddingTop: {xs: '80px', md: '150px'},
    left: {xs: 'auto', md: 0},
    right: {xs: isToggled ? 0 : '-340px', md: 'auto'},
    overflowY: 'auto',
    top: 0,
    flexBasis: {xs: '270px', md: '340px'},
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: {xs: 61, md: 10},
    transition: {xs: '0.5s', md: 0},
  };

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
