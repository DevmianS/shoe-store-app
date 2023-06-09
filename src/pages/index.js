import Head from 'next/head';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import {useState} from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import useProducts from '@/hooks/useProducts';
import useUser from '@/hooks/useUser';
import {rwdValue} from '@/utils/theme';

import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';

import NoContent from '@/components/UI/NoContent';
import PaginationUI from '@/components/UI/PaginationUI';
import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';
import ProductAction from '@/components/UI/ProductAction';
import LoadingCards from '@/components/UI/LoadingCards';

const productsStyles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    flex: '1 1 auto',
    padding: `0 ${rwdValue(10, 60)}`,
  },
  cardsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: {sm: '0 -8px', md: '0 -24px'},
  },
  title: {marginBottom: rwdValue(20, 35)},
};

const Products = () => {
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {status} = useUser();
  const {data, isLoading} = useProducts(page);
  const products = data?.data;
  const pagination = data?.meta?.pagination;

  return (
    <>
      <Head>
        <title>Wellrun | Products</title>
      </Head>
      <NavBarLayout sidebarVisible>
        <Box sx={productsStyles.row}>
          <Box sx={productsStyles.content}>
            <TopBanner imgPath={'/banner2.jpg'} />
            {status === 'authenticated' && <AvatarStaticLayout />}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                ...productsStyles.title,
                marginTop:
                  status !== 'authenticated'
                    ? rwdValue(20, 125)
                    : rwdValue(20, 30),
              }}
            >
              All products
            </Typography>
            <PaginationUI
              pageCount={pagination?.pageCount}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
            />
            <Box sx={productsStyles.cardsRow}>
              {isLoading ? (
                <LoadingCards />
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map(product => {
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
                <>
                  <NoContent buttonAction={() => setIsOpenModal(true)} />
                  <ProductAction
                    openState={isOpenModal}
                    setOpenState={setIsOpenModal}
                  />
                </>
              )}
            </Box>
            <PaginationUI
              pageCount={pagination?.pageCount}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default Products;
