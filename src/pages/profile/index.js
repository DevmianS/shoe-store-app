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
import useUser from '@/hooks/useUser';
import useProducts from '@/hooks/useProducts';

const Profile = ({userName}) => {
  const {name} = useUser();
  const {products} = useProducts();
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
                username={name}
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
              {products &&
                products.map(product => {
                  const {id, attributes} = product;
                  return (
                    <ProductCard
                      key={id}
                      title={attributes.name}
                      price={attributes.price}
                      imgPath={attributes.images.data}
                      category={attributes.categories.data}
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
