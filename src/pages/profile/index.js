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
  h1: {
    color: theme.palette.text.primary,
    marginBottom: rwdValue(12, 50),
  },
  description: {
    color: theme.palette.text.secondary,
  },
  data: {maxWidth: {xs: '100%', sm: '500px', lg: '600px'}},
  btn: {marginTop: '35px'},
};

const itemStyles = {
  wrap: {
    marginBottom: {xs: '5px', md: '10px'},
    paddingBottom: {xs: '5px', md: '10px'},
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    userSelect: 'none',
    borderBottom: '1px dotted #d6d6d6',
  },
  title: {
    flex: `0 0 ${rwdValue(110, 150)}`,
    color: theme.palette.text.secondary,
    fontSize: rwdValue(15, 24),
  },
  text: {
    fontSize: rwdValue(15, 24),
    color: '#707070',
  },
};
const UserDataItem = ({textLabel, textProp}) => (
  <Box sx={itemStyles.wrap}>
    {' '}
    <Typography component="p" variant="body2" sx={itemStyles.title}>
      {textLabel}:
    </Typography>
    <Typography component="span" variant="body1" sx={itemStyles.text}>
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
                  <Button sx={profileStyles.btn}>Update info</Button>
                </Link>
              </Box>
            </Stack>

            <Stack sx={profileStyles.data}>
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
