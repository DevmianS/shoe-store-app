import Head from 'next/head';
import {getServerSession} from 'next-auth/next';

import {Typography, Box, Stack} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import ProductCard from '@/components/UI/ProductCard';

import bannerImg from '@/assets/banner.jpg';
import TopBanner from '@/components/UI/TopBanner';

import useProducts from '@/hooks/useProducts';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';

const Profile = () => {
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
            <AvatarStaticLayout />
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
