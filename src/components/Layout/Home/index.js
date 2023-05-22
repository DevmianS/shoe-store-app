import {
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';

import Link from 'next/link';

import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

import SideBar from '@/components/Layout/SideBar';

import ProductCard from '@/components/UI/ProductCard';

import bannerImg from '@/assets/banner2.jpg';
import TopBanner from '@/components/UI/TopBanner';
import useProducts from '@/hooks/useProducts';
import AvatarStaticLayout from '../AvatarStaticLayout';
import {SkeletonProducts} from '@/utils/utils';

const Home = () => {
  const {products, isLoading} = useProducts();

  console.log('products', products);

  const styles = {
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
    <Box
      justifyContent={'space-between'}
      display="flex"
      sx={{
        padding: `${rwdValue(0, 40)} 0`,
      }}
    >
      <SideBar />
      <Box
        sx={{
          flex: '1 1 auto',
          padding: {lg: '0 60px', md: '0 40px', sm: '0 30px', xs: '0 10px'},
        }}
      >
        <TopBanner imgPath={bannerImg.src} />
        <AvatarStaticLayout />
        <Typography
          variant="h1"
          component="h1"
          sx={{marginBottom: rwdValue(20, 35)}}
        >
          All products
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          margin={{sm: '0 -8px', md: '0 -24px'}}
        >
          {isLoading && SkeletonProducts()}
          {Array.isArray(products) && products.length > 0 ? (
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
            })
          ) : (
            <Box sx={styles.msgBody}>
              <Typography
                className="icon-bag-o"
                sx={styles.msgIcon}
              ></Typography>
              <Typography component="h2" variant="body2" sx={styles.msgTitle}>
                There are no products yet
              </Typography>
              <Typography component="p" variant="body1" sx={styles.msgText}>
                Product can contain images, text, brands, etc...
              </Typography>
              <Link href="/add-product">
                <Button size={'medium'} sx={styles.msgBtn}>
                  Add product
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
