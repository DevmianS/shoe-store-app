import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {useCart} from '@/context/CartContext';
import {rwdValue, theme} from '@/utils/theme';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import Loading from '@/components/UI/Loading';
import Gallery from '@/components/UI/Gallery/';
import Button from '@/components/UI/Button/Button';
import useUser from '@/hooks/useUser';

const singleStyles = {
  title: {
    marginTop: {xs: '15px', md: 0},
  },
  row: {
    display: 'flex',
    flexDirection: {xs: 'column', lg: 'row'},
    gap: {xs: 0, md: rwdValue(0, 100)},
    width: {xs: '100%', sm: '90%', md: '100%'},
    flex: '1 1 auto',
    paddingRight: {xs: '15px', md: '10px'},
    paddingLeft: {xs: '15px', md: '10px'},
    maxWidth: '1320px',
    margin: '0 auto',
  },
  column: {flex: {xs: '1 1 auto', lg: `0 0 calc(50% - ${rwdValue(0, 100)})`}},
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
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rwdValue(15, 35),
    borderRadius: '8px',
  },
  price: {fontSize: '22px', fontWeight: 500, color: '#000'},
  gender: {
    color: theme.palette.text.secondary,
    marginBottom: rwdValue(15, 35),
    '& b': {color: theme.palette.primary.main},
  },

  label: {
    color: theme.palette.text.secondary,
    marginBottom: rwdValue(10, 20),
  },
  btn: {marginBottom: rwdValue(30, 65), marginTop: rwdValue(30, 65)},
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginBottom: rwdValue(15, 35),
    '& > *': {
      color: '#fff',
      fontSize: '15px',
      width: '85px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      background: '#B9B8B4',
    },
    '& .Running': {background: '#E16200'},
    '& .Athletic': {background: '#D18D47'},
    '& .Tennis': {background: '#31C1B0'},
    '& .Casual': {background: '#92BB41'},
    '& .Tracking': {background: '#19976A'},
    '& .Volleyball': {background: '#B34EE9'},
  },
};

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
  const {status} = useUser();
  const {addProduct} = useCart();
  const [images, setImages] = useState({array: [], active: 0});
  const [hostName, setHostName] = useState('');
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

  useEffect(() => {
    if (typeof window !== 'undefined' && hostName === '') {
      const host = window.location.host;
      const baseUrl = `https://${host}`;
      setHostName(baseUrl);
    }
  }, [hostName, router.pathname]);

  useEffect(() => {
    if (!product) {
      return;
    }
    setImages({
      array: [...product?.data?.attributes?.images?.data],
      active: 0,
    });
    setData({
      name: product?.data?.attributes?.name,
      price: product?.data?.attributes?.price,
      categories: [...product?.data?.attributes?.categories?.data],
      gender: product?.data?.attributes?.gender?.data?.attributes?.name,
      size: product?.data?.attributes?.size?.data?.attributes?.value,
      description:
        product?.data?.attributes?.description ||
        'There is no description about this product yet',
      color: product?.data?.attributes?.color?.data?.attributes?.name,
      brand: product?.data?.attributes?.brand?.data?.attributes?.name,
    });
  }, [product]);
  return (
    <>
      <Head>
        <title>Wellrun | {data?.name ? data?.name : 'Loading...'}</title>
      </Head>
      <NavBarLayout sidebarVisible>
        {product ? (
          <Box sx={singleStyles.row}>
            <Gallery images={images} setImages={setImages} />
            <Box sx={singleStyles.column}>
              <Box sx={singleStyles.header}>
                <Typography component="h1" variant="h1" sx={singleStyles.title}>
                  {data.name}
                </Typography>
                <Typography component="span" sx={singleStyles.price}>
                  ${data.price}
                </Typography>
              </Box>
              <Typography
                component="p"
                variant="body2"
                sx={singleStyles.gender}
              >
                <b>{data.brand} </b> {`${data.gender}'s Shoes`}
              </Typography>
              <Typography component="p" variant="body2" sx={singleStyles.label}>
                Size
              </Typography>
              <Box sx={singleStyles.props}>EU-{data.size}</Box>
              {data?.color && (
                <>
                  <Typography
                    component="p"
                    variant="body2"
                    sx={singleStyles.label}
                  >
                    Color
                  </Typography>
                  <Box
                    sx={{
                      ...singleStyles.props,
                      background: data?.color.toLowerCase(),
                      borderColor: data?.color.toLowerCase(),
                      color: data?.color.toLowerCase(),
                    }}
                  >
                    {data?.color}
                  </Box>
                </>
              )}
              <Typography component="p" variant="body2" sx={singleStyles.label}>
                Categories
              </Typography>
              <Box sx={singleStyles.categories}>
                {data?.categories.length > 0 &&
                  data?.categories.map(cat => (
                    <Box key={cat.id} className={cat.attributes.name}>
                      {cat.attributes.name}
                    </Box>
                  ))}
              </Box>
              {status === 'authenticated' ? (
                <Button
                  onClick={() => {
                    const title = data.name;
                    const productId = product?.data?.id;
                    addProduct({productId, title});
                  }}
                  sx={singleStyles.btn}
                >
                  Add to Bag
                </Button>
              ) : (
                <Button
                  onClick={() => router.push(`/sign-in`)}
                  sx={singleStyles.btn}
                >
                  Sign In to Add to Bag
                </Button>
              )}
              <Typography component="p" variant="body2" sx={singleStyles.label}>
                Description
              </Typography>
              <Typography component="p" variant="body1">
                {data.description}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Loading />
        )}
      </NavBarLayout>
    </>
  );
}
