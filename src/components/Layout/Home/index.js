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

import SideBar from '@/components/Layout/SideBar';

import ProductCard from '@/components/UI/ProductCard';
import LinksList from '@/components/UI/LinksList';

import bannerImg from '@/assets/banner2.jpg';
import product1 from '@/assets/product1.jpg';
import product2 from '@/assets/product2.jpg';
import product3 from '@/assets/product3.jpg';
import product4 from '@/assets/product4.jpg';
import product5 from '@/assets/product5.jpg';
import product6 from '@/assets/product6.jpg';
import TopBanner from '@/components/UI/TopBanner';

const Home = ({userName}) => {
  const router = useRouter();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const homeItemsList = [
    {name: 'My profile', icon: 'profile', click: () => router.push('/profile')},
    {name: 'Log out', icon: 'logout', click: null},
  ];
  const TempAvatar = styled(Box)({
    maxWidth: '64px',
    height: '64px',
    flex: '0 0 64px',
    background: '#e2e2e2',
    borderRadius: '50%',
    marginRight: '16px',
  });
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

  const TempAvatarLg = styled(Box)({
    maxWidth: rwdValue(60, 120),
    height: rwdValue(60, 120),
    flexBasis: rwdValue(60, 120),
    flexShrink: 0,
    flexGrow: 0,
    background: '#e2e2e2',
    borderRadius: '50%',
    marginRight: rwdValue(13, 26),
    border: '4px solid white',
    position: 'relative',
    zIndex: '2',
  });
  return (
    <Box
      justifyContent={'space-between'}
      display="flex"
      sx={{
        padding: `${rwdValue(0, 40)} 0`,
      }}
    >
      <SideBar areaName="home page actions">
        <Stack
          direction="row"
          pl="40px"
          alignItems="center"
          mb="7px"
          pb="32px"
          borderBottom="1px solid"
          borderColor="divider"
        >
          <TempAvatar />
          <Box>
            <Typography color="text.tetriary" fontSize={12}>
              Welcome
            </Typography>
            <Typography fontWeight={500}>
              {userName || 'Jane Meldrum'}
            </Typography>
          </Box>
        </Stack>
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
          <TempAvatarLg />
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
          <Column>
            <ProductCard
              title="Nike Air Max 270"
              category="Women's Shoes"
              price={160}
              imgPath={product1}
            />
          </Column>
          <Column>
            <ProductCard
              title="Nike Air Max 90"
              category="Men's Shoes"
              price={140}
              imgPath={product2}
            />
          </Column>
          <Column>
            <ProductCard
              title="Nike Air Force 1 '07 SE"
              category="Women's Shoes"
              price={110}
              imgPath={product3}
            />
          </Column>
          <Column>
            <ProductCard
              title="Nike Air Max 210"
              category="Men's Shoes"
              price={180}
              imgPath={product4}
            />
          </Column>
          <Column>
            <ProductCard
              title="Nike Air Force 1 '07 SE"
              category="Women's Shoes"
              price={110}
              imgPath={product5}
            />
          </Column>
          <Column>
            <ProductCard
              title="Nike Air Force 2"
              category="Women's Shoes"
              price={180}
              imgPath={product6}
            />
          </Column>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
