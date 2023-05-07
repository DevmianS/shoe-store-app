import Head from 'next/head';
import {useRouter} from 'next/router';

import {Typography, styled, Box, Stack, TextField} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import LinksList from '@/components/UI/LinksList';
import ListItem from '@/components/UI/ListItem';
import Button from '@/components/UI/Button';

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

  const TempAvatar = styled(Box)(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
      marginRight: '75px',
    },
    maxWidth: '150px',
    height: '150px',
    flex: '0 0 150px',
    background: '#e2e2e2',
    borderRadius: '50%',
    marginRight: '35px',
    border: '4px solid white',
  }));
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
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              mb={{lg: '50px', xs: '25px'}}
            >
              <TempAvatar />
              <Box>
                <Box mb="24px">
                  <Button outlined>Change photo</Button>
                </Box>
                <Button>Delete</Button>
              </Box>
            </Stack>
            <Typography
              variant="body5"
              component="p"
              color="text.secondary"
              mb="50px"
            >
              Welcome back! Please enter your details to log into your account.
            </Typography>
            <Box maxWidth={450}>
              <Box mb="25px">
                <TextField
                  fullWidth
                  size="medium"
                  placeholder="Jane"
                  label="Name"
                  type="text"
                />
              </Box>{' '}
              <Box mb="25px">
                <TextField
                  fullWidth
                  size="medium"
                  placeholder="Meldrum"
                  label="Surname"
                  type="text"
                />
              </Box>
              <Box mb="25px">
                <TextField
                  fullWidth
                  size="medium"
                  label="Email"
                  type="email"
                  placeholder="example@mail.com"
                />
              </Box>
              <Box mb="25px">
                <TextField
                  fullWidth
                  size="medium"
                  label="Phone number"
                  type="tel"
                  placeholder="(949) 354-2574"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default ProfileUpdate;
