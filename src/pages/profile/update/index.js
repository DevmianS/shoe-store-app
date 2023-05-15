import Head from 'next/head';
import {useRouter} from 'next/router';
import useOwnStyles from '@/utils/styles';

import {Typography, Box, Stack, TextField} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import LinksList from '@/components/UI/LinksList';
import ListItem from '@/components/UI/ListItem';
import Button from '@/components/UI/Button';
import AvatarStatic from '@/components/UI/AvatarStatic';

const ProfileUpdate = () => {
  const {updateProfile: styles} = useOwnStyles();

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

  const formItems = [
    {placeholder: 'Jane', label: 'Name', type: 'text'},
    {placeholder: 'Meldrum', label: 'Surname', type: 'text'},
    {placeholder: 'Email', label: 'Email', type: 'example@mail.com'},
    {placeholder: '(949) 354-2574', label: 'Phone number', type: 'tel'},
  ];

  return (
    <>
      <Head>
        <title>Wellrun | Update Profile</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <SideBar areaName="update profile actions">
            <Stack sx={styles.sidebar}>
              <ListItem
                icon="chevron-left"
                name="Settings"
                onClick={() => console.log('SETTINGS')}
              ></ListItem>
            </Stack>
            <LinksList listItems={updateItemsList} />
          </SideBar>
          {/* Page content column */}
          <Box sx={styles.content}>
            <Typography variant="h1" component="h1" sx={styles.h1}>
              My Profile
            </Typography>
            <Stack sx={styles.avatarRow}>
              <AvatarStatic variant="large" sx={styles.avatar} />
              <Box>
                <Button size={styles.size} outlined sx={styles.btn}>
                  Change photo
                </Button>
                <Button size={styles.size}>Delete</Button>
              </Box>
            </Stack>
            <Typography variant="body5" component="p" sx={styles.description}>
              Welcome back! Please enter your details to log into your account.
            </Typography>
            <Box sx={styles.form}>
              {formItems.map(input => (
                <Box sx={styles.item} key={input.label}>
                  <TextField
                    fullWidth
                    size={styles.size}
                    placeholder={input.placeholder}
                    label={input.label}
                    type={input.type}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default ProfileUpdate;
