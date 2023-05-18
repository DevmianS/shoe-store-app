import Head from 'next/head';
import {useRouter} from 'next/router';
import useOwnStyles from '@/utils/styles';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';

import {Typography, Box, Stack, TextField} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';

import Button from '@/components/UI/Button';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const {updateProfile: styles} = useOwnStyles();
  const {data: session, update: updateSession} = useSession();

  const udpateUserMutation = useMutation({
    mutationFn: () => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}users/${session.user.user.id}`,
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

  const router = useRouter();

  const formItems = [
    {placeholder: 'Jane', label: 'Name', type: 'text'},
    {placeholder: 'Meldrum', label: 'Surname', type: 'text'},
    {placeholder: 'Email', label: 'Email', type: 'example@mail.com'},
    {placeholder: '(949) 354-2574', label: 'Phone number', type: 'tel'},
  ];
  useEffect(() => {
    if (session?.user) {
      setUserData(session.user.user);
    }
    console.log(session);
  }, [session]);
  return (
    <>
      <Head>
        <title>Wellrun | Update Profile</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <SideBar />
          {/* Page content column */}
          <Box sx={styles.content}>
            <Typography variant="h1" component="h1" sx={styles.h1}>
              My Profile
            </Typography>
            <Stack sx={styles.avatarRow}>
              <AvatarStaticLayout variant="avatar" />
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
              <Box component="form" autoComplete="off">
                <Box sx={styles.item}>
                  <TextField
                    fullWidth
                    size={styles.size}
                    placeholder={userData.firstName}
                    label="Name"
                    type="text"
                    onChange={e => {
                      setNewUserData(data => ({
                        ...data,
                        firstName: e.target.value,
                      }));
                    }}
                  />
                </Box>
                <Box sx={styles.item}>
                  <TextField
                    fullWidth
                    size={styles.size}
                    placeholder={userData.lastName}
                    label="Surname"
                    type="text"
                    onChange={e => {
                      setNewUserData(data => ({
                        ...data,
                        lastName: e.target.value,
                      }));
                    }}
                  />
                </Box>
                <Box sx={styles.item}>
                  <TextField
                    fullWidth
                    size={styles.size}
                    placeholder={userData.email}
                    label="Email"
                    type="email"
                    disabled
                  />
                </Box>
                <Box sx={styles.item}>
                  <TextField
                    fullWidth
                    size={styles.size}
                    placeholder={userData.phoneNumber}
                    label="Phone number"
                    type="text"
                    onChange={e => {
                      setNewUserData(data => ({
                        ...data,
                        phoneNumber: e.target.value,
                      }));
                    }}
                  />
                </Box>
                <Box sx={styles.saveChangesBox}>
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
                    size={styles.size}
                    sx={styles.saveChangesBtn}
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
