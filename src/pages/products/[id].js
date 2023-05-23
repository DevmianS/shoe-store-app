import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import axios from 'axios';

import {Box, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import Loading from '@/components/UI/Loading';

import Gallery from '@/components/UI/Gallery/';

export async function getServerSideProps(context) {
  const {id} = context.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=*`,
    );
    const product = response.data;

    return {
      props: {product},
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {error: {message: error.message, status: error.response?.status}},
    };
  }
}

export default function ProductPage({product, error}) {
  const router = useRouter();
  const theme = useTheme();

  const [images, setImages] = useState({array: [], active: 0});
  const [data, setData] = useState({
    name: '',
    categories: [],
    gender: '',
    size: '',
    description: '',
    color: '',
    brand: '',
  });

  if (typeof window !== 'undefined' && error) {
    const {message, status} = error;
    if (!product) {
      router.push(status === 404 ? '/404' : '/500');
    }
  }

  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: rwdValue(0, 40),
      paddingBottom: rwdValue(0, 40),
    },
  };

  useEffect(() => {
    setImages({array: [...product?.data?.attributes?.images?.data], active: 0});
    setData({
      name: product?.data?.attributes?.name,
      categories: [...product?.data?.attributes?.categories?.data],
      gender: product?.data?.attributes?.gender?.data?.attributes?.name,
      size: product?.data?.attributes?.size?.data?.attributes?.value,
      description:
        product?.data?.attributes?.description ||
        'There is no description about this product yet',
      color: product?.data?.attributes?.color?.data?.attributes?.value,
      brand: product?.data?.attributes?.brand?.data?.attributes?.name,
    });
    console.log(images, data);
    console.log(product);
  }, [product]);

  return (
    <>
      <Head>
        <title>
          Wellrun | {!product ? <Loading /> : data.name && data.name}
        </title>
      </Head>
      <NavBarLayout>
        <Box
          sx={{
            display: 'flex',
            gap: '100px',
            width: '100%',
            flex: '1 1 auto',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: rwdValue(0, 100),
            paddingBottom: rwdValue(0, 100),
            maxWidth: '1320px',
            margin: '0 auto',
          }}
        >
          {/* ROW*/}
          <Gallery images={images} setImages={setImages} />
          <Box sx={{flex: '0 0 calc(50% - 50px)'}}></Box>
        </Box>
      </NavBarLayout>
    </>
  );
}
