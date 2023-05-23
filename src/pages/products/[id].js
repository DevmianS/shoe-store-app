import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import axios from 'axios';

import {Box, Typography, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import Loading from '@/components/UI/Loading';
import Gallery from '@/components/UI/Gallery/';
import Button from '@/components/UI/Button/Button';
import {useCart} from '@/context/CartContext';

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
  const {addProduct} = useCart();
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
    const {status} = error;
    if (!product) {
      router.push(status === 404 ? '/404' : '/500');
    }
  }

  const styles = {
    row: {
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
    },
    column: {flex: '0 0 calc(50% - 50px)'},
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    props: {
      border: '1px solid #494949',
      color: '#494949',
      fontSize: '15px',
      width: '85px',
      height: '55px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '35px',
      borderRadius: '8px',
    },
    price: {fontSize: '22px', fontWeight: 500, color: '#000'},
    gender: {color: theme.palette.text.secondary, marginBottom: '35px'},
    label: {color: theme.palette.text.secondary, marginBottom: '20px'},
    btn: {marginBottom: '65px'},
  };

  useEffect(() => {
    setImages({array: [...product?.data?.attributes?.images?.data], active: 0});
    setData({
      name: product?.data?.attributes?.name,
      price: product?.data?.attributes?.price,
      categories: [...product?.data?.attributes?.categories?.data],
      gender: product?.data?.attributes?.gender?.data?.attributes?.name,
      size: product?.data?.attributes?.size?.data?.attributes?.value,
      description:
        product?.data?.attributes?.description ||
        'There is no description about this product yet',
      color: product?.data?.attributes?.color?.data?.attributes?.value,
      brand: product?.data?.attributes?.brand?.data?.attributes?.name,
    });
  }, [product]);

  return (
    <>
      <Head>
        <title>
          Wellrun | {!product ? <Loading /> : data.name && data.name}
        </title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <Gallery images={images} setImages={setImages} />
          <Box sx={styles.column}>
            <Box sx={styles.header}>
              <Typography component="h1" variant="h1">
                {data.name}
              </Typography>
              <Typography component="span" sx={styles.price}>
                ${data.price}
              </Typography>
            </Box>
            <Typography
              component="p"
              variant="body2"
              sx={styles.gender}
            >{`${data.gender}'s Shoes`}</Typography>

            <Typography component="p" variant="body2" sx={styles.label}>
              Available sizes
            </Typography>
            <Box sx={styles.props}>EU-{data.size}</Box>
            {data.color && (
              <>
                <Typography component="p" variant="body2" sx={styles.label}>
                  Available colors
                </Typography>
                <Box sx={styles.props}>{data.color}</Box>
              </>
            )}
            <Button
              onClick={() => {
                const title = data.name;
                const id = product?.id;
                addProduct({id, title});
              }}
              sx={styles.btn}
            >
              Add to Bag
            </Button>
            <Typography component="p" variant="body2" sx={styles.label}>
              Description
            </Typography>
            <Typography component="p" variant="body1">
              {data.description}
            </Typography>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
}
