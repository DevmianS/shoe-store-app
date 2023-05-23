import Head from 'next/head';
import Link from 'next/link';

import {Typography, Box, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import bannerImg from '@/assets/banner.jpg';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';

import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';
import Button from '@/components/UI/Button';
import useMyProducts from '@/hooks/useMyProducts';

import {SkeletonProducts} from '@/utils/utils';
import NoContent from '@/components/UI/NoContent';

const MyProducts = ({productsList}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {products, isLoading} = useMyProducts();

  console.log('products MYPRODUCTS: ', products, isLoading);

  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: rwdValue(0, 40),
      paddingBottom: rwdValue(0, 40),
    },
    header: {
      flex: '1 1 auto',
      paddingLeft: rwdValue(10, 60),
      paddingRight: rwdValue(10, 60),
    },
    avatarWrapper: {
      marginLeft: rwdValue(20, 50),
      marginBottom: rwdValue(20, 30),
      flexDirection: 'row',
      alignItems: 'end',
      marginTop: isMobile || isTablet ? '-15px' : '-30px',
    },
    avatar: {
      marginRight: rwdValue(5, 15),
      border: '4px solid white',
      zIndex: 2,
    },
    name: {fontSize: rwdValue(14, 20)},
    points: {
      fontSize: rwdValue(12, 15),
      color: theme.palette.text.tetriary,
      marginBottom: isMobile ? 0 : rwdValue(0, 12),
    },
    h1: {marginBottom: rwdValue(20, 35)},
    productsRow: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: isMobile ? '0 -8px' : '0 -24px',
    },
    msgBody: {maxWidth: '320px', textAlign: 'center', margin: '0 auto'},
    msgIcon: {
      fontSize: 20,
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '50px auto 10px',
    },
    msgTitle: {fontSize: rwdValue(16, 20), marginBottom: '10px'},
    msgText: {
      fontSize: rwdValue(12, 15),
      marginBottom: rwdValue(32, 40),
    },
    msgBtn: {maxWidth: '152px'},
  };

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
            <AvatarStaticLayout />
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant="h1" component="h1" mb="40px">
                My products
              </Typography>
              {Array.isArray(products) && products.length > 0 && (
                <Link href="/add-product">
                  <Button
                    size={isMobile || isTablet ? 'small' : 'medium'}
                    sx={styles.msgBtn}
                  >
                    Add product
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={styles.productsRow}>
              {isLoading ? (
                SkeletonProducts()
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map(product => {
                  const {id, attributes} = product;
                  return (
                    <ProductCard
                      productId={id}
                      key={id}
                      title={attributes.name}
                      price={attributes.price}
                      imgPath={attributes.images.data}
                      category={attributes.categories.data}
                    />
                  );
                })
              ) : (
                <NoContent />
              )}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default MyProducts;
