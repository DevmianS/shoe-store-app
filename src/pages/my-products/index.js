import Head from 'next/head';
import Link from 'next/link';

import {Typography, Box, Stack} from '@mui/material';

import useOwnStyles from '@/utils/styles';
import bannerImg from '@/assets/banner.jpg';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';
import Button from '@/components/UI/Button';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import AvatarStatic from '@/components/UI/AvatarStatic';
import {rwdValue} from '@/utils/theme';
import useUser from '@/hooks/useUser';

const MyProducts = ({productsList}) => {
  const {myProducts: styles} = useOwnStyles();
  const {name} = useUser();
  return (
    <>
      <Head>
        <title>Wellrun | My Products</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <SideBar />
          <Box sx={styles.header}>
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
            <Box sx={styles.productsRow}>
              {productsList &&
                productsList.length > 0 &&
                productsList.map(product => {
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
              {!productsList && (
                <Box sx={styles.msgBody}>
                  <Typography
                    className="icon-bag-o"
                    sx={styles.msgIcon}
                  ></Typography>
                  <Typography
                    component="h2"
                    variant="body2"
                    sx={styles.msgTitle}
                  >
                    You don’t have any products yet
                  </Typography>
                  <Typography component="p" variant="body1" sx={styles.msgText}>
                    Post can contain video, images and text.
                  </Typography>
                  <Link href="/add-product">
                    <Button sx={styles.msgBtn}>Add product</Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default MyProducts;
