import Head from 'next/head';
import {useSession} from 'next-auth/react';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]';

import {Typography, styled, Box, Stack} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import mockupProducts from '@/utils/data';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import ProductCard from '@/components/UI/ProductCard';

import bannerImg from '@/assets/banner.jpg';
import TopBanner from '@/components/UI/TopBanner';

import AvatarStatic from '@/components/UI/AvatarStatic';

const Profile = ({userName}) => {
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
  const Column = styled(Box)(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
      flex: '0 0 33%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      flex: '0 0 50%',
      padding: '0 15px',
      marginBottom: '15px',
    },
    [theme.breakpoints.down('md')]: {
      flex: '0 0 50%',
      padding: '0 8px',
      marginBottom: '16px',
    },
    [theme.breakpoints.up('xl')]: {
      flex: '0 0 25%',
    },
    padding: '0 24px',
    marginBottom: '24px',
  }));

  const {data, status} = useSession();
  let name = data?.user?.user?.username;
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
            <Stack
              direction="row"
              alignItems="end"
              sx={{
                ml: {xl: '70px', md: '50px', sm: '30px', xs: '30px'},
                mb: '50px',
                mt: '-30px',
              }}
            >
              <AvatarStatic
                variant="medium"
                sx={{
                  marginRight: rwdValue(5, 15),
                  border: '4px solid white',
                  zIndex: 2,
                }}
                username={name && name}
              />
              <Box>
                <Typography variant="body2" component="h3">
                  {name}
                </Typography>
                <Typography color="text.tetriary" fontSize={15} mb="12px">
                  1 374 bonus points
                </Typography>
              </Box>
            </Stack>
            <Typography variant="h1" component="h1" mb="40px">
              Last viewed products
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              margin={{sm: '0 -8px', md: '0 -24px'}}
            >
              {mockupProducts.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    title={product.attributes.name}
                    category={product.attributes.category}
                    price={product.attributes.price}
                    imgPath={product.attributes.image}
                  />
                );
              })}
            </Box>
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
