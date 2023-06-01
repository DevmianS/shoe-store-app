import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import qs from 'qs';
import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {rwdValue, theme} from '@/utils/theme';
import {searchKeyInObject} from '@/utils/utils';

import {useFilter} from '@/context/FilterContext';
import {useToggle} from '@/context/ToggleContext';

import ProductCard from '@/components/UI/ProductCard';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import Filters from '@/components/UI/Filters';
import NoContent from '@/components/UI/NoContent';
import PaginationUI from '@/components/UI/PaginationUI';

const searchStyles = {
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: {xs: '25px 0', md: '0'},
  },
  content: {
    '& .MuiInputBase-root': {
      height: {md: '48px', xs: '33px'},
      fontSize: {md: '15px', xs: '10px'},
    },
    '& label': {
      fontSize: {md: '15px', xs: '12px'},
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
    '& span': {display: {xs: 'none', md: 'inline'}},
  },
  clear: {
    display: 'flex',
    alignItems: 'center',
    fontSize: rwdValue(15, 24),
    color: theme.palette.primary.main,
    marginRight: '5px',
  },
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: {md: '0 -24px', xs: '0 -8px'},
  },
};

const SearchResults = ({
  searchString,
  productsServer,
  total,
  filters,
  meta,
}) => {
  const router = useRouter();
  const {showFilter, filterToggle} = useToggle();
  const [maxPriceCalculated, setMaxPriceCalculated] = useState(null);
  const {setArrIdFilters} = useFilter();

  const pagination = meta?.pagination;
  const [page, setPage] = useState(pagination?.page || 1);

  useEffect(() => {
    setArrIdFilters(filters);
  }, []);

  useEffect(() => {
    let maxPrice = 0;
    productsServer &&
      productsServer.forEach(product => {
        if (parseFloat(product.attributes.price) > maxPrice) {
          maxPrice = parseFloat(product.attributes.price);
        }
      });
    setMaxPriceCalculated(maxPrice);
  }, [productsServer]);

  useEffect(() => {
    if (router.asPath.includes('pagination')) {
      const originalString = router.asPath;
      const newString = originalString.replace(
        /pagination\[page\]=\d+/g,
        'pagination[page]=' + page,
      );
      router.push(newString);
    } else if (page != 1) {
      router.push(router.asPath + '&pagination[page]=' + page);
    }
  }, [page]);

  const clearFilters = () => {
    router.push('/search?');
  };
  return (
    <>
      <Head>
        <title>Wellrun | Search</title>
      </Head>
      <NavBarLayout
        sidebarVisible
        isFilter={true}
        showFilter={showFilter}
        sidebarChildren={
          <Filters
            productsLength={productsServer && productsServer.length}
            filters={filters}
            total={total}
            maxPriceCalculated={maxPriceCalculated}
          />
        }
      >
        <Box sx={searchStyles.row}>
          <Box sx={searchStyles.content}>
            <Box sx={searchStyles.header}>
              <Typography variant="h1" component="h1">
                Search Results
                <Typography component="b">
                  {searchString ? searchString : ''}
                </Typography>
              </Typography>
              <Button sx={searchStyles.clear} onClick={clearFilters}>
                Clear
              </Button>

              <Button onClick={filterToggle}>
                <Box sx={searchStyles.filterText}>
                  <Typography variant="body1" component="p">
                    Filters
                    <span> {!showFilter ? 'Show ' : 'Hide '}</span>{' '}
                  </Typography>
                  <Typography
                    className="icon-filter"
                    component="i"
                  ></Typography>
                </Box>
              </Button>
            </Box>
            {total > 25 && (
              <PaginationUI
                pageCount={pagination?.pageCount}
                page={page}
                setPage={setPage}
                isLoading={false}
              />
            )}
            <Box sx={searchStyles.products}>
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
                  buttonText="Search"
                  buttonAction={() => router.push('/search')}
                />
              )}
            </Box>
            {total > 25 && (
              <PaginationUI
                pageCount={pagination?.pageCount}
                page={page}
                setPage={setPage}
                isLoading={false}
              />
            )}
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

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
  let meta = null;

  const brandApi =
    process.env.NEXT_PUBLIC_API_URL + '/brands?fields=name&populate=*';

  const categoriesApi =
    process.env.NEXT_PUBLIC_API_URL + '/categories?fields=name&populate=*';

  const genderApi =
    process.env.NEXT_PUBLIC_API_URL + '/genders?fields=name&populate=*';

  const sizeApi =
    process.env.NEXT_PUBLIC_API_URL + '/sizes?fields=value&populate=*';

  const colorApi =
    process.env.NEXT_PUBLIC_API_URL + '/colors?fields=name&populate=*';

  const qsObj = qs.parse(currentPath);

  const requestBrands = async () => {
    const {data: res} = await axios.get(brandApi);
    const brands = res.data.map(brand => {
      return {
        id: brand.id,
        name:
          brand.attributes.name +
          ' (' +
          brand?.attributes?.products?.data.filter(
            product => product.attributes.teamName == 'fb-team',
          ).length +
          ') ',
        needed: (searchKeyInObject(qsObj, 'brand') || []).includes(
          String(brand.id),
        ),
      };
    });
    newBrands = brands;
  };

  const requestColors = async () => {
    const {data: res} = await axios.get(colorApi);
    const colors = res.data.map(color => {
      return {
        id: color.id,
        name:
          color.attributes.name +
          ' (' +
          color.attributes?.products?.data.filter(
            product => product.attributes.teamName == 'fb-team',
          ).length +
          ') ',
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
        name:
          String(categorie.attributes.name) +
          ' (' +
          categorie.attributes?.products?.data.filter(
            product => product.attributes.teamName == 'fb-team',
          ).length +
          ') ',
        needed: (searchKeyInObject(qsObj, 'categories') || []).includes(
          String(categorie.id),
        ),
      };
    });
    newCategories = categories;
  };

  const requestGender = async () => {
    const {data: res} = await axios.get(genderApi);
    const genders = res.data.map(gender => {
      return {
        id: String(gender.id),
        name:
          String(gender.attributes.name) +
          ' (' +
          gender.attributes?.products?.data.filter(
            product => product.attributes.teamName == 'fb-team',
          ).length +
          ') ',
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
        value:
          String(size.attributes.value) +
          ' (' +
          size.attributes?.products?.data.filter(
            product => product.attributes.teamName == 'fb-team',
          ).length +
          ') ',
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
    currentPath = currentPath ? '&' + currentPath : '';

    let url = '/products?filters[teamName]=fb-team&populate=*' + currentPath;
    try {
      const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + url);
      newData = data?.data;
      total = data?.meta?.pagination?.total;
      meta = data?.meta;
    } catch (error) {
      console.error('the error is: ', error);
    }
  }

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
      meta: meta,
    },
  };
}
