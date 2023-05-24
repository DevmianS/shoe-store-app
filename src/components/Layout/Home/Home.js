import {
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';

import Link from 'next/link';

import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

import SideBar from '@/components/Layout/SideBar';

import ProductCard from '@/components/UI/ProductCard';

import bannerImg from '@/assets/banner2.jpg';
import TopBanner from '@/components/UI/TopBanner';
import useProducts from '@/hooks/useProducts';
import AvatarStaticLayout from '../AvatarStaticLayout';
import {SkeletonProducts} from '@/utils/utils';
import NoContent from '@/components/UI/NoContent';
import {useState} from 'react';
import PaginationUI from '@/components/UI/PaginationUI';

const Home = () => {
  const [page, setPage] = useState(1);

  const {data, isLoading} = useProducts(page);
  const products = data?.data;
  const pagination = data?.meta?.pagination;

  console.log('products', products);

  return (
    <Box
      justifyContent={'space-between'}
      display="flex"
      sx={{
        padding: `${rwdValue(0, 40)} 0`,
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
        <AvatarStaticLayout />
        <Typography
          variant="h1"
          component="h1"
          sx={{marginBottom: rwdValue(20, 35)}}
        >
          All products
        </Typography>
        <PaginationUI
          pageCount={pagination?.pageCount}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
        />
        <Box
          display="flex"
          flexWrap="wrap"
          margin={{sm: '0 -8px', md: '0 -24px'}}
        >
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
            <NoContent />
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