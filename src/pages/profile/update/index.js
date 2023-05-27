import Head from 'next/head';

import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';

import axios from 'axios';
import {toast} from 'sonner';
import {rwdValue, theme} from '@/utils/theme';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import Button from '@/components/UI/Button';

const updateProfileStyles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: rwdValue(20, 40),
    paddingBottom: rwdValue(20, 40),
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '7px',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  content: {
    flex: '1 1 auto',
    paddingLeft: rwdValue(10, 60),
    paddingRight: rwdValue(10, 60),
  },
  avatarRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: rwdValue(25, 50),
  },
  avatar: {
    marginRight: rwdValue(28, 75),
    border: '4px solid white',
    flex: `0 0 ${rwdValue(100, 150)}`,
  },
  h1: {
    marginBottom: rwdValue(12, 50),
  },
  btn: {
    marginBottom: rwdValue(16, 25),
  },
  description: {
    color: theme.palette.text.secondary,
    marginBottom: rwdValue(25, 50),
    fontSize: rwdValue(12, 15),
  },
  form: {maxWidth: '450px'},
  item: {marginBottom: rwdValue(25, 50)},
  disabled: {
    '& fieldset': {
      background: 'rgba(100,100,100,0.1)',
    },
    '& .Mui-disabled input::placeholder': {
      opacity: 1,
      WebkitTextFillColor: 'rgba(100,100,100,0.6)!important',
    },
  },
  saveChangesBox: {display: 'flex', justifyContent: 'flex-end'},
  saveChangesBtn: {width: 'fit-content'},
};

const ProfileUpdate = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const mobileSize = isMobile ? 'small' : 'medium';

  const [userData, setUserData] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const {data: session, update: updateSession} = useSession();

  const udpateUserMutation = useMutation({
    mutationFn: () => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.user.id}`,
        newUserData,
        {
          headers: {Authorization: `Bearer ${session.user.jwt}`},
        },
      );
    },
    onSuccess: async () => {
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          user: {...session.user.user, ...newUserData},
          jwt: session.user.jwt,
        },
      }).then(() => {
        toast.success('Data changed successfully!');
      });
    },
  });

  const updateUserDataHandler = () => {
    udpateUserMutation.mutate();
  };

  useEffect(() => {
    session?.user && setUserData(session.user.user);
  }, [session]);
  return (
    <>
      <Head>
        <title>Wellrun | Update Profile</title>
      </Head>
      <NavBarLayout>
        <Box sx={updateProfileStyles.row}>
          <SideBar />
          {/* Page content column */}
          <Box sx={updateProfileStyles.content}>
            <Typography variant="h1" component="h1" sx={updateProfileStyles.h1}>
              My Profile
            </Typography>
            <Stack sx={updateProfileStyles.avatarRow}>
              <AvatarStaticLayout variant="avatar" />
              <Box>
                <Button size={mobileSize} outlined sx={updateProfileStyles.btn}>
                  Change photo
                </Button>
                <Button size={mobileSize}>Delete</Button>
              </Box>
            </Stack>
            <Typography
              variant="body5"
              component="p"
              sx={updateProfileStyles.description}
            >
              Welcome back! Please enter your details to log into your account.
            </Typography>
            <Box sx={updateProfileStyles.form}>
              <Box component="form" autoComplete="off">
                <Box sx={updateProfileStyles.item}>
                  <TextField
                    fullWidth
                    placeholder={userData.firstName}
                    label="Name"
                    type="text"
                    size={mobileSize}
                    onChange={e => {
                      setNewUserData(data => ({
                        ...data,
                        firstName: e.target.value,
                      }));
                    }}
                  />
                </Box>
                <Box sx={updateProfileStyles.item}>
                  <TextField
                    fullWidth
                    placeholder={userData.lastName}
                    label="Surname"
                    type="text"
                    size={mobileSize}
                    onChange={e => {
                      setNewUserData(data => ({
                        ...data,
                        lastName: e.target.value,
                      }));
                    }}
                  />
                </Box>
                <Box sx={updateProfileStyles.item}>
                  <TextField
                    fullWidth
                    placeholder={userData?.email}
                    defaultValue={userData?.email}
                    label="Email"
                    type="email"
                    size={mobileSize}
                    disabled
                    sx={updateProfileStyles.disabled}
                  />
                </Box>
                <Box sx={updateProfileStyles.item}>
                  <TextField
                    fullWidth
                    placeholder={userData.phoneNumber}
                    label="Phone number"
                    type="tel"
                    size={mobileSize}
                    onChange={e => {
                      setNewUserData(data => ({
                        ...data,
                        phoneNumber: e.target.value,
                      }));
                    }}
                  />
                </Box>
                <Box sx={updateProfileStyles.saveChangesBox}>
                  <Button
                    disabled={
                      //TODO add validation logic
                      udpateUserMutation.isLoading ||
                      (!newUserData?.firstName?.trim() &&
                        !newUserData?.lastName?.trim() &&
                        !newUserData?.phoneNumber?.trim())
                    }
                    type="button"
                    onClick={updateUserDataHandler}
                    size={mobileSize}
                    sx={updateProfileStyles.saveChangesBtn}
                  >
                    Save changes
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default ProfileUpdate;
