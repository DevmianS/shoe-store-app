import Head from 'next/head';
import {Typography, Box, Button, useTheme, useMediaQuery} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import ProductCard from '@/components/UI/ProductCard';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import Filters from '@/components/UI/Filters';
import {SkeletonProducts} from '@/utils/utils';
import {useRouter} from 'next/router';

import useSearchFilter from '@/hooks/useSearch';

import NoContent from '@/components/UI/NoContent';

const SearchResults = ({searchString}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const router = useRouter();
  console.log('router', router.asPath);

  const {products, isLoading} = useSearchFilter({urlNavigator: router.asPath});

  console.log('products: ', products);

  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: isMobile ? '25px 0' : '40px 0',
    },
    content: {
      '& .MuiInputBase-root': {
        height: isDesktop ? '48px' : '33px',
        fontSize: isDesktop ? '15px' : '10px',
      },
      '& label': {
        fontSize: isDesktop ? '15px' : '12px',
      },
      flex: '1 1 auto',
      padding: `0 ${rwdValue(20, 60)}`,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rwdValue(20, 40),
      '& h1': {flex: '1 1 auto'},
    },
    filterText: {
      display: 'flex',
      alignItems: 'center',
      '& p': {
        fontSize: rwdValue(15, 24),
        color: theme.palette.text.secondary,
      },
      '& i': {
        color: theme.palette.text.secondary,
        fontSize: rwdValue(12, 24),
      },
    },
    products: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: isDesktop ? '0 -24px' : '0 -8px',
    },
  };

  return (
    <>
      <Head>
        <title>Wellrun | Search</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <SideBar areaName="search filters" isFilter>
            <Filters />
          </SideBar>
          <Box sx={styles.content}>
            <Box sx={styles.header}>
              <Typography variant="h1" component="h1">
                Search Results
                <Typography component="b">
                  {searchString ? searchString : ''}
                </Typography>
              </Typography>
              <Button onClick={() => console.log('CLEAR FILTERS')}>
                <Box sx={styles.filterText}>
                  <Typography variant="body1" component="p">
                    {isMobile ? 'Filters' : 'Hide Filters'}
                  </Typography>{' '}
                  <Typography
                    className="icon-filter"
                    component="i"
                  ></Typography>
                </Box>
              </Button>
            </Box>
            <Box sx={styles.products}>
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
                <NoContent
                  title="We don't have that product :/"
                  description="Maybe you write it wrong, Try it again!"
                  href="/search"
                  buttonText='Search'
                />
              )}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default SearchResults;
