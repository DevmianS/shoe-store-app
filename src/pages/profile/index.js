/*
const Profile = () => {
  const user = useUser();
  console.log(user);
  return (
    <>
      <Head>
        <title>Wellrun | My Profile</title>
      </Head>
      <NavBarLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: rwdValue(0, 40),
            paddingBottom: rwdValue(0, 40),
          }}
        >
          <SideBar />
          <Box
            sx={{
              flex: '1 1 auto',
              padding: {
                lg: '0 60px',
                md: '0 40px',
                sm: '0 30px',
                xs: '0 10px',
              },
            }}
          >
            <TopBanner imgPath={bannerImg.src} />
            <AvatarStaticLayout />
            <Typography variant="h1" component="h1" mb="40px">
              User information
            </Typography>
            <Stack>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  Personal id:{' '}
                </Typography>
                {user.id}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  User name:{' '}
                </Typography>
                {user?.data?.user?.user?.username}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  First name:{' '}
                </Typography>
                {user?.data?.user?.user?.firstName}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  Last name:{' '}
                </Typography>
                {user?.data?.user?.user?.lastName}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  Email:{' '}
                </Typography>
                {user?.data?.user?.user?.email}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  Phone:{' '}
                </Typography>
                {user?.data?.user?.user?.phoneNumber}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  Account created:{' '}
                </Typography>
                {new Date(user?.data?.user?.user?.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="h3" component="p">
                <Typography component="b" variant="h3" fontWeight={700}>
                  Confirmed:{' '}
                </Typography>
                {user?.data?.user?.user?.confirmed ? 'yes' : 'no'}
              </Typography>
            </Stack>
            <Box
              display="flex"
              flexWrap="wrap"
              margin={{sm: '0 -8px', md: '0 -24px'}}
            ></Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default Profile;

*/
import Head from 'next/head';
import Link from 'next/link';

import {rwdValue, theme} from '@/utils/theme';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import useUser from '@/hooks/useUser';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import Button from '@/components/UI/Button';

const profileStyles = {
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
    color: theme.palette.text.primary,
    marginBottom: rwdValue(12, 50),
  },
  btn: {
    marginBottom: rwdValue(16, 25),
  },
  description: {
    color: theme.palette.text.secondary,
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

const UserDataItem = ({textLabel, textProp}) => (
  <Box
    sx={{
      marginBottom: {xs: '5px', md: '10px'},
      paddingBottom: {xs: '5px', md: '10px'},
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      userSelect: 'none',
      borderBottom: '1px dotted #d6d6d6',
    }}
  >
    {' '}
    <Typography
      component="p"
      variant="body2"
      sx={{
        flex: `0 0 ${rwdValue(110, 150)}`,
        color: theme.palette.text.secondary,
        fontSize: rwdValue(15, 24),
      }}
    >
      {textLabel}:
    </Typography>
    <Typography
      component="span"
      variant="body1"
      sx={{
        fontSize: rwdValue(15, 24),
        color: '#707070',
      }}
    >
      {textProp}
    </Typography>
  </Box>
);

const Profile = () => {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Wellrun | Profile</title>
      </Head>
      <NavBarLayout>
        <Box sx={profileStyles.row}>
          <SideBar />
          {/* Page content column */}
          <Box sx={profileStyles.content}>
            <Typography variant="h1" component="h1" sx={profileStyles.h1}>
              My Profile
            </Typography>
            <Stack sx={profileStyles.avatarRow}>
              <AvatarStaticLayout variant="avatar" />
              <Box>
                <Typography
                  component="h2"
                  variant="h3"
                  sx={profileStyles.description}
                >
                  Welcome back! {user?.data?.user?.user?.firstName}
                </Typography>
                <Link href={'/profile/update'}>
                  <Button sx={{marginTop: '35px'}}>Update info</Button>
                </Link>
              </Box>
            </Stack>

            <Stack sx={{maxWidth: {xs: '100%', sm: '500px', lg: '600px'}}}>
              <UserDataItem textLabel="Personal id" textProp={user.id} />
              <UserDataItem
                textLabel="User name"
                textProp={user?.data?.user?.user?.username}
              />
              <UserDataItem
                textLabel="First name"
                textProp={user?.data?.user?.user?.firstName}
              />
              <UserDataItem
                textLabel="Last name"
                textProp={user?.data?.user?.user?.lastName}
              />
              <UserDataItem
                textLabel="Email"
                textProp={user?.data?.user?.user?.email}
              />
              <UserDataItem
                textLabel="Phone"
                textProp={user?.data?.user?.user?.phoneNumber}
              />
              <UserDataItem
                textLabel="Created date"
                textProp={new Date(
                  user?.data?.user?.user?.createdAt,
                ).toLocaleString()}
              />
              <UserDataItem
                textLabel="Confirmed"
                textProp={user?.data?.user?.user?.confirmed ? 'yes' : 'no'}
              />
            </Stack>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default Profile;
