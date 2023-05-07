import Head from 'next/head';
import {useRouter} from 'next/router';

import {Typography, styled, Box, Stack} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import LinksList from '@/components/UI/LinksList';
import ListItem from '@/components/UI/ListItem';

const ProfileUpdate = () => {
  const router = useRouter();
  const updateItemsList = [
    {
      name: 'My profile',
      icon: 'profile',
      click: () => router.push('/profile'),
    },
    {
      name: 'Preferences',
      icon: 'plus-element',
      click: () => console.log('Preferences'),
    },
    {name: 'Security', icon: 'security', click: () => console.log('Security')},
    {name: 'My wallet', icon: 'wallet', click: () => console.log('Wallet')},
  ];

  const TempAvatar = styled(Box)({
    maxWidth: '150px',
    height: '150px',
    flex: '0 0 150px',
    background: '#e2e2e2',
    borderRadius: '50%',
    marginRight: '26px',
    border: '4px solid white',
  });
  return (
    <>
      <Head>
        <title>Update profile</title>
      </Head>
      <NavBarLayout>
        <Box justifyContent={'space-between'} padding="40px 0" display="flex">
          <SideBar areaName="update profile actions">
            <Stack
              direction="row"
              alignItems="center"
              mb="7px"
              borderBottom="1px solid"
              borderColor="divider"
            >
              <ListItem
                icon="chevron-left"
                name="Settings"
                onClick={() => console.log('SETTINGS')}
              ></ListItem>
            </Stack>
            <LinksList listItems={updateItemsList} />
          </SideBar>
          <Box
            sx={{
              flex: '1 1 auto',
              padding: {lg: '0 60px', md: '0 40px', sm: '0 30px', xs: '0 10px'},
            }}
          >
            <Typography variant="h1" component="h1" mb="40px">
              My Profile
            </Typography>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default ProfileUpdate;
