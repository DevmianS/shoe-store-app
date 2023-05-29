import Head from 'next/head';

import {useSession} from 'next-auth/react';
import {useEffect, useRef, useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

import {toast} from 'sonner';
import {rwdValue, theme} from '@/utils/theme';
import {changeUserAvatar, uploadAvatar} from '@/utils/utils';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading/Loading';
import Modal from '@/components/UI/Modal/Modal';

import useUser from '@/hooks/useUser';

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
    color: theme.palette.text.primary,
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
  const {jwt, id: userId} = useUser();
  
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
      if (session?.user) {
        setUserData(session.user.user);
      }
      console.log(session);
    }, [session]);
    
    const queryClient = useQueryClient();
    
    const changePhotoMutation = useMutation({
      mutationFn: async imageFile => {
        try {
          const uploadedAvatar = await uploadAvatar(jwt, imageFile);
          const imageId = uploadedAvatar[0]?.id;
          
          return await changeUserAvatar(jwt, imageId, userId);
        } catch (error) {
          console.error(error);
        }
      },
      onSuccess: data => {
        queryClient.setQueryData(['user', data.id], data);
        queryClient.invalidateQueries(['user']);
      },
    });
    
    const [openModal, setOpenModal] = useState(false);
    const input = useRef();
    const handleChangeAvatar = event => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      
      if (file) {
        fileReader.readAsDataURL(file);
      }
      
      fileReader.onload = () => {
        const image = new Image();
        image.src = fileReader.result;
        
        image.onload = () => {
          changePhotoMutation.mutate(file);
        };
        
        image.onerror = () => {
          toast.error('The file is invalid. Please, choose a valid image file.');
          event.target.value = null;
        };
      };
      
    };
    
    
    const deletePhotoMutation = useMutation({
      mutationFn: async () => {
        try {
          const {status} = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          {avatar: null},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        if (status === 200) {
          return toast.success('Your photo has been successfully deleted');
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: data => {
      queryClient.setQueryData(['user', data.id], data);
      queryClient.invalidateQueries(['user']);
    },
  });

  const handleDeleteAvaar = () => {
    deletePhotoMutation.mutate();
    setOpenModal(false);
  };
  const onChangeInputHandler = propname => e => {
    setNewUserData(data => ({
      ...data,
      [propname]: e.target.value,
    }));
  };

  useEffect(() => {
    session?.user && setUserData(session.user.user);
  }, [session]);

  return (
    <>
      <Head>
        <title>Wellrun | Update Profile</title>
      </Head>
      {changePhotoMutation.isLoading && <Loading />}
      <NavBarLayout>
        <Box sx={updateProfileStyles.row}>
          <SideBar />
          {/* Page content column */}
          <Box sx={updateProfileStyles.content}>
            <Typography variant="h1" component="h1" sx={updateProfileStyles.h1}>
              Update Profile
            </Typography>
            <Stack sx={updateProfileStyles.avatarRow}>
              <AvatarStaticLayout variant="avatar" />
              <Box>
                <input
                  type="file"
                  ref={input}
                  onChange={event => handleChangeAvatar(event)}
                  hidden
                  accept="image/*"
                />
                <Button
                  size={mobileSize}
                  outlined
                  sx={updateProfileStyles.btn}
                  onClick={() => input.current.click()}
                >
                  Change photo
                </Button>
                <Button size={mobileSize} onClick={() => setOpenModal(true)}>
                  Delete
                </Button>
                <Modal
                  state={openModal}
                  setState={setOpenModal}
                  title={'Are you sure you want to delete your photo?'}
                  text={
                    'Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur. '
                  }
                  submitAction={handleDeleteAvaar}
                />
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
                    label="First name"
                    type="text"
                    size={mobileSize}
                    onChange={onChangeInputHandler('firstName')}
                  />
                </Box>
                <Box sx={updateProfileStyles.item}>
                  <TextField
                    fullWidth
                    placeholder={userData.lastName}
                    label="Last name"
                    type="text"
                    size={mobileSize}
                    onChange={onChangeInputHandler('lastName')}
                  />
                </Box>
                <Box sx={updateProfileStyles.item}>
                  <TextField
                    fullWidth
                    placeholder={userData?.email}
                    label="Email"
                    type="email"
                    size={mobileSize}
                    disabled
                    onChange={onChangeInputHandler('email')}
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
                    onChange={onChangeInputHandler('phoneNumber')}
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
