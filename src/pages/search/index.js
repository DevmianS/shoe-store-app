import Head from 'next/head';
import {Typography, Box, Button, useTheme, useMediaQuery} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import ProductCard from '@/components/UI/ProductCard';

import qs from 'qs';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import Filters from '@/components/UI/Filters';
import {searchKeyInObject} from '@/utils/utils';

import NoContent from '@/components/UI/NoContent';

const SearchResults = ({searchString, productsServer, total, filters}) => {
  const [hideFilter, setHideFilter] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [maxPriceCalculated, setMaxPriceCalculated] = useState(null);

  const {setArrIdFilters} = useFilter();

  useEffect(() => {
    console.log('filters back: ', filters);
    setArrIdFilters(filters);
  }, []);

  useEffect(() => {
    let maxPrice = 0;
    productsServer &&
      productsServer.forEach(product => {
        console.log('product: ', product);
        if (parseFloat(product.attributes.price) > maxPrice) {
          maxPrice = parseFloat(product.attributes.price);
        }
      });
    setMaxPriceCalculated(maxPrice);
    console.log('Max price is: ', maxPrice);
  }, [productsServer]);

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
          {!hideFilter && (
            <SideBar areaName="search filters" isFilter>
              <Filters
                productsLength={productsServer && productsServer.length}
                filters={filters}
                total={total}
                maxPriceCalculated={maxPriceCalculated}
              />
            </SideBar>
          )}
          <Box sx={styles.content}>
            <Box sx={styles.header}>
              <Typography variant="h1" component="h1">
                Search Results
                <Typography component="b">
                  {searchString ? searchString : ''}
                </Typography>
              </Typography>
              <Button onClick={() => console.log('CLEAR FILTERS')}>
                <Box
                  sx={styles.filterText}
                  onClick={() => setHideFilter(!hideFilter)}
                >
                  <Typography variant="body1" component="p">
                    {isMobile
                      ? 'Filters'
                      : hideFilter
                      ? 'Show Filters'
                      : 'Hide Filters'}
                  </Typography>{' '}
                  <Typography
                    className="icon-filter"
                    component="i"
                  ></Typography>
                </Box>
              </Button>
            </Box>
            <Box sx={styles.products}>
              {productsServer.length > 0 ? (
                productsServer.map(product => {
                  const {id, attributes} = product;
                  return (
                    <ProductCard
                      productId={id}
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
                  buttonText="Search"
                />
              )}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};
import axios from 'axios';
import {useFilter} from '@/context/FilterContext';
import {useEffect, useState} from 'react';

export default SearchResults;

export async function getServerSideProps(context) {
  // Realiza cualquier lógica necesaria para obtener los datos del servidor
  let currentPath = String(decodeURIComponent(context.req.url)).split('?')[1];

  let newBrands = null;
  let newColors = null;
  let newCategories = null;
  let newGenders = null;
  let newSizes = null;
  let newData = [];
  let total = null;

  const brandApi = process.env.NEXT_PUBLIC_API_URL + '/brands?fields=name';

  const categoriesApi =
    process.env.NEXT_PUBLIC_API_URL + '/categories?fields=name';

  const genderApi = process.env.NEXT_PUBLIC_API_URL + '/genders?fields=name';

  const sizeApi = process.env.NEXT_PUBLIC_API_URL + '/sizes?fields=value';

  const colorApi = process.env.NEXT_PUBLIC_API_URL + '/colors?fields=name';

  const qsObj = qs.parse(currentPath);

  console.log('qsObj: ', qsObj);

  const requestBrands = async () => {
    const {data: res} = await axios.get(brandApi);
    const brands = res.data.map(brand => {
      return {
        id: brand.id,
        name: brand.attributes.name,
        needed: (searchKeyInObject(qsObj, 'brand') || []).includes(
          String(brand.id),
        ),
      };
    });
    console.log('brands is : ', brands);
    newBrands = brands;
  };

  const requestColors = async () => {
    const {data: res} = await axios.get(colorApi);
    const colors = res.data.map(color => {
      return {
        id: color.id,
        name: color.attributes.name,
        needed: (searchKeyInObject(qsObj, 'color') || []).includes(
          String(color.id),
        ),
      };
    });
    newColors = colors;
  };

  const requestCategories = async () => {
    const {data: res} = await axios.get(categoriesApi);
    const categories = res.data.map(categorie => {
      return {
        id: String(categorie.id),
        name: String(categorie.attributes.name),
        needed: (searchKeyInObject(qsObj, 'categorie') || []).includes(
          String(categorie.id),
        ),
      };
    });
    console.log('categories is: ', categories);
    newCategories = categories;
  };

  const requestGender = async () => {
    const {data: res} = await axios.get(genderApi);
    const genders = res.data.map(gender => {
      return {
        id: String(gender.id),
        name: String(gender.attributes.name),
        needed: (searchKeyInObject(qsObj, 'gender') || []).includes(
          String(gender.id),
        ),
      };
    });
    newGenders = genders;
  };

  const requestSizes = async () => {
    const {data: res} = await axios.get(sizeApi);
    const sizes = res.data.map(size => {
      return {
        id: String(size.id),
        value: String(size.attributes.value),
        needed: (searchKeyInObject(qsObj, 'size') || []).includes(
          String(size.id),
        ),
      };
    });

    newSizes = sizes;
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        requestBrands(),
        requestCategories(),
        requestGender(),
        requestSizes(),
        requestColors(),
        getProducts(),
      ]);
    } catch (error) {
      // Manejar errores en caso de que alguna de las solicitudes falle
      console.error('Hubo un error en el PROMISE ALL: ', error);
    }
  };

  await fetchData();

  async function getProducts() {
    console.log('url: 3', context.req.url, currentPath);
    // Devuelve los datos obtenidos como props

    currentPath = currentPath ? '&' + currentPath : '';

    let url = '/products?filters[teamName]=fb-team&populate=*' + currentPath;
    console.log('prefinalURL: ', url);
    try {
      const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + url);
      newData = data?.data;
      console.log('Data is: ', data);
      total = data?.meta?.pagination?.total;
    } catch (error) {
      console.log('the error is: ', error);
    }
  }

  console.log(
    'Filters datA: ',
    newBrands,
    newCategories,
    newColors,
    newGenders,
    newSizes,
    'min',
    searchKeyInObject(qsObj, '$gte'),
    'max',
    searchKeyInObject(qsObj, '$lte'),
  );

  return {
    props: {
      productsServer: newData || [],
      filters: {
        brands: newBrands,
        categories: newCategories,
        colors: newColors,
        genders: newGenders,
        sizes: newSizes,
        name: searchKeyInObject(qsObj, '$containsi') || [],
        minPrice: searchKeyInObject(qsObj, '$gte') || [],
        maxPrice: searchKeyInObject(qsObj, '$lte') || [],
      },
      total: total,
    },
  };
}
