import Head from 'next/head';
import {Grid, Typography, styled, Box} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import LinksList from '@/components/UI/LinksList';

const Profile = () => {
  // we can recieve COUNT properties from REDUX
  const profileItemsList = [
    {name: 'My orders', icon: 'bag', click: null},
    {name: 'Wish list', icon: 'plus-element', click: null, count: 2},
    {name: 'Newsletters', icon: 'newsletters', click: null},
    {name: 'My wallet', icon: 'wallet', click: null},
    {name: 'My bonus account', icon: 'bonus-account', click: null},
    {name: 'Premium subscription', icon: 'medal-star', click: null},
    {name: 'My feedback', icon: 'star', click: null},
    {name: 'Settings', icon: 'setting', click: null, count: 1},
    {name: 'Log out', icon: 'logout', click: null},
  ];
  const TempAvatar = styled(Box)({
    width: '64px',
    height: '64px',
    background: '#e2e2e2',
    borderRadius: '50%',
  });
  return (
    <>
      <Head>
        <title>My profile</title>
      </Head>
      <NavBarLayout>
        <Grid
          container
          justifyContent={'space-between'}
          sx={{padding: '40px 0'}}
        >
          <SideBar areaName="user profile actions">
            <Box>
              <TempAvatar />
            </Box>
            <LinksList listItems={profileItemsList} />
          </SideBar>
          <Grid item xs={10} sx={{padding: '0 60px'}}>
            <Typography variant="h1" component="h1">
              My profile
            </Typography>
          </Grid>
        </Grid>
      </NavBarLayout>
    </>
  );
};

export default Profile;
