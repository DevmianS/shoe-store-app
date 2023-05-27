import Head from 'next/head';
import {getServerSession} from 'next-auth/next';

import {Typography, Box, Stack} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import bannerImg from '@/assets/banner.jpg';
import TopBanner from '@/components/UI/TopBanner';

import useProducts from '@/hooks/useProducts';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import useUser from '@/hooks/useUser';

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

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getServerSession(context.req, context.res, authOptions),
//     },
//   };
// }
