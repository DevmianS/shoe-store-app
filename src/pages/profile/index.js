import Head from 'next/head';

import {Typography, styled, Box, Stack} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import mockupProducts from '@/utils/data';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import ProductCard from '@/components/UI/ProductCard';
import LinksList from '@/components/UI/LinksList';

import bannerImg from '@/assets/banner.jpg';
import TopBanner from '@/components/UI/TopBanner';

const Profile = ({userName}) => {
  // we can recieve COUNT properties from REDUX
  const profileItemsList = [
    {name: 'My orders', icon: 'bag', click: null},
    {name: 'Wish list', icon: 'plus-element', click: null, count: 2},
    {name: 'Newsletters', icon: 'newsletters', click: null},
    {name: 'My wallet', icon: 'wallet', click: null},
    {name: 'My bonus account', icon: 'bonus-account', click: null},
    {name: 'Premium subscription', icon: 'medal-star', click: null},
    {name: 'My feedback', icon: 'star', click: null},
    {name: 'Settings', icon: 'setting', click: null, count: 1},
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
    maxWidth: '120px',
    height: '120px',
    flex: '0 0 120px',
    background: '#e2e2e2',
    borderRadius: '50%',
    marginRight: '26px',
    border: '4px solid white',
    position: 'relative',
    zIndex: 2,
  });
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
          <SideBar areaName="user profile actions">
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
            <LinksList listItems={profileItemsList} />
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
                ml: {xl: '70px', md: '50px', sm: '30px', xs: '30px'},
                mb: '50px',
                mt: '-30px',
              }}
            >
              <TempAvatarLg />
              <Box>
                <Typography variant="body2" component="h3">
                  {userName || 'Jane Meldrum'}
                </Typography>
                <Typography color="text.tetriary" fontSize={15} mb="12px">
                  1 374 bonus points
                </Typography>
              </Box>
            </Stack>
            <Typography variant="h1" component="h1" mb="40px">
              Last viewed products
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              margin={{sm: '0 -8px', md: '0 -24px'}}
            >
              {mockupProducts.map(product => {
                return (
                  <Column key={product.id}>
                    <ProductCard
                      title={product.attributes.name}
                      category={product.attributes.category}
                      price={product.attributes.price}
                      imgPath={product.attributes.image}
                    />
                  </Column>
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
