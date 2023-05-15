import Head from 'next/head';

import {Typography, Box, Stack} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import mockupProducts from '@/utils/data';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import ProductCard from '@/components/UI/ProductCard';
import bannerImg from '@/assets/banner.jpg';
import TopBanner from '@/components/UI/TopBanner';

import AvatarStatic from '@/components/UI/AvatarStatic';
import Button from '@/components/UI/Button';
import Link from 'next/link';

const MyProducts = ({userName, items}) => {
  return (
    <>
      <Head>
        <title>Wellrun | My Products</title>
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
              />
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
              My products
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              margin={{sm: '0 -8px', md: '0 -24px'}}
            >
              {items &&
                items.length > 0 &&
                items.map(product => {
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
              {!items && (
                <Box
                  sx={{maxWidth: 320, textAlign: 'center', margin: '0 auto'}}
                >
                  <Typography
                    className="icon-bag-o"
                    sx={{
                      fontSize: 20,
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: '#F9FAFB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px',
                    }}
                  ></Typography>
                  <Typography
                    component="h2"
                    variant="body2"
                    sx={{fontSize: rwdValue(16, 20), marginBottom: '10px'}}
                  >
                    You don’t have any products yet
                  </Typography>
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{
                      fontSize: rwdValue(12, 15),
                      marginBottom: rwdValue(32, 40),
                    }}
                  >
                    Post can contain video, images and text.
                  </Typography>
                  <Link href="/add-product">
                    <Button sx={{maxWidth: '152px'}}>Add product</Button>
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
