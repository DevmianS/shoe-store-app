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
import LinksList from '@/components/UI/LinksList';

import bannerImg from '@/assets/banner2.jpg';
import TopBanner from '@/components/UI/TopBanner';
import AvatarStaticLayout from '../AvatarStaticLayout';
import AvatarStatic from '@/components/UI/AvatarStatic';

const Home = ({userName}) => {
  const router = useRouter();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const homeItemsList = [
    {name: 'My profile', icon: 'profile', click: () => router.push('/profile')},
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

  return (
    <Box
      justifyContent={'space-between'}
      display="flex"
      sx={{
        padding: `${rwdValue(0, 40)} 0`,
      }}
    >
      <SideBar areaName="home page actions">
        <AvatarStaticLayout />
        <LinksList listItems={homeItemsList} />
      </SideBar>
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
          />
          <Box>
            <Typography
              variant="body2"
              component="h3"
              fontSize={rwdValue(14, 20)}
            >
              {userName || 'Jane Meldrum'}
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
