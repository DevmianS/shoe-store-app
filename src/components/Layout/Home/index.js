import {useRouter} from 'next/router';

import {
  Typography,
  styled,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import mockupProducts from '@/utils/data';

import SideBar from '@/components/Layout/SideBar';

import ProductCard from '@/components/UI/ProductCard';

import bannerImg from '@/assets/banner2.jpg';
import TopBanner from '@/components/UI/TopBanner';
import AvatarStaticLayout from '../AvatarStaticLayout';

const Home = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));


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
  );
};

export default Home;
