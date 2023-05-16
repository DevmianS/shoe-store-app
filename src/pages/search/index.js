import Head from 'next/head';
import {
  Typography,
  styled,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import mockupProducts from '@/utils/data';

import ProductCard from '@/components/UI/ProductCard';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import Filters from '@/components/UI/Filters';

const SearchResults = () => {
  // STYLED COMPONENTS
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const Row = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: isMobile ? '25px 0' : '40px 0',
  });
  const Content = styled(Box)(() => ({
    '& .MuiInputBase-root': {
      height: isDesktop ? '48px' : '33px',
      fontSize: isDesktop ? '15px' : '10px',
    },
    '& label': {
      fontSize: isDesktop ? '15px' : '12px',
    },
    flex: '1 1 auto',
    padding: `0 ${rwdValue(20, 60)}`,
  }));

  return (
    <>
      <Head>
        <title>Wellrun | Search</title>
      </Head>
      <NavBarLayout>
        <Row>
          <SideBar areaName="search filters">
            <Filters />
          </SideBar>
          <Content>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: rwdValue(20, 40),
              }}
            >
              <Typography variant="h1" component="h1" sx={{flex: '1 1 auto'}}>
                Search Results
              </Typography>
              <Button>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: rwdValue(15, 24),
                      color: theme.palette.text.secondary,
                    }}
                    component="p"
                  >
                    {isMobile ? 'Filters' : 'Hide Filters'}
                  </Typography>{' '}
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: rwdValue(12, 24),
                    }}
                    className="icon-filter"
                    component="i"
                  ></Typography>
                </Box>
              </Button>
            </Box>
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
          </Content>
        </Row>
      </NavBarLayout>
    </>
  );
};

export default SearchResults;
