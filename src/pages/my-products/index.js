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

const MyProducts = ({productsList}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      margin: '0 auto 10px',
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
            <Typography variant="h1" component="h1" mb="40px">
              My products
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
                    You don{`'`}t have any products yet
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
