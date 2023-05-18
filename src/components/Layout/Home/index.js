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
import AvatarStatic from '@/components/UI/AvatarStatic';
import useProducts from '@/hooks/useProducts';
import useUser from '@/hooks/useUser';

const Home = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const {products} = useProducts();
  const {name} = useUser();

  console.log('products', products);

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
        <Stack
          direction="row"
          alignItems="end"
          sx={{
            marginLeft: rwdValue(20, 50),
            marginBottom: rwdValue(20, 30),
            marginTop: isTablet ? '-15px' : '-30px',
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
            <Typography
              variant="body2"
              component="h3"
              fontSize={rwdValue(14, 20)}
            >
              {name}
            </Typography>
            <Typography
              color="text.tetriary"
              fontSize={rwdValue(12, 15)}
              mb={isTablet ? 0 : '12px'}
            >
              1 374 bonus points
            </Typography>
          </Box>
        </Stack>
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
  );
};

export default Home;
