import Head from 'next/head';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {rwdValue} from '@/utils/theme';
import {SkeletonProducts} from '@/utils/utils';
import useProducts from '@/hooks/useProducts';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';

import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';

import bannerImg from '@/assets/banner.jpg';

const profileStyles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: rwdValue(0, 40),
    paddingBottom: rwdValue(0, 40),
  },
  col: {
    flex: '1 1 auto',
    padding: {
      lg: '0 60px',
      md: '0 40px',
      sm: '0 30px',
      xs: '0 10px',
    },
  },
  prod: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: {sm: '0 -8px', md: '0 -24px'},
  },
};

const Profile = () => {
  const {data, isLoading} = useProducts();
  const products = data?.data;

  return (
    <>
      <Head>
        <title>Wellrun | My Profile</title>
      </Head>
      <NavBarLayout>
        <Box sx={profileStyles.row}>
          <SideBar />
          <Box sx={profileStyles.col}>
            <TopBanner imgPath={bannerImg.src} />
            <AvatarStaticLayout />
            <Typography variant="h1" component="h1" mb="40px">
              Last viewed products
            </Typography>
            <Box sx={profileStyles.prod}>
              {isLoading && SkeletonProducts()}

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
