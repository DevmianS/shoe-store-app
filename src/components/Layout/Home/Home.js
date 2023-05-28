import {useState} from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import useProducts from '@/hooks/useProducts';
import {SkeletonProducts} from '@/utils/utils';
import {rwdValue} from '@/utils/theme';

import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';
import SideBar from '@/components/Layout/SideBar';

import NoContent from '@/components/UI/NoContent';
import PaginationUI from '@/components/UI/PaginationUI';
import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';
import ProductAction from '@/components/UI/ProductAction/ProductAction';

import bannerImg from '@/assets/banner2.jpg';
import useUser from '@/hooks/useUser';

const productsStyles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${rwdValue(0, 40)} 0`,
  },
  content: {
    flex: '1 1 auto',
    padding: {lg: '0 60px', md: '0 40px', sm: '0 30px', xs: '0 10px'},
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: {sm: '0 -8px', md: '0 -24px'},
  },
  title: {marginBottom: rwdValue(20, 35)},
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {status} = useUser();

  const {data, isLoading} = useProducts(page);
  const products = data?.data;
  const pagination = data?.meta?.pagination;

  console.log('products', products);

  return (
    <Box sx={productsStyles.row}>
      {status === 'authenticated' && <SideBar />}
      <Box sx={productsStyles.content}>
        <TopBanner imgPath={bannerImg.src} />
        <AvatarStaticLayout />
        <Typography variant="h1" component="h1" sx={productsStyles.title}>
          All products
        </Typography>
        <PaginationUI
          pageCount={pagination?.pageCount}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
        />
        <Box sx={productsStyles.card}>
          {isLoading && SkeletonProducts()}
          {Array.isArray(products) && products.length > 0 ? (
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
  );
};

export default Home;
