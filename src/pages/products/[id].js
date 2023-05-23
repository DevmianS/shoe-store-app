import axios from 'axios';
import {Box, useMediaQuery, useTheme} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import Head from 'next/head';
import {rwdValue} from '@/utils/theme';
import Spinner from '@/components/UI/Spinner';
import {useRouter} from 'next/router';
import Image from 'next/image';

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
      props: {error: error.message},
    };
  }
}

export default function ProductPage({product, error}) {
  const router = useRouter();
  if (typeof window !== 'undefined' && error) {
    router.push('/404');
    return;
  }

  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: rwdValue(0, 40),
      paddingBottom: rwdValue(0, 40),
    },
  };
  const item = product?.data?.attributes;
  const categories = item?.categories?.data;
  const brand = item.brand?.data?.attributes?.name;
  const images = item?.images?.data;
  const size = item?.size?.data?.attributes?.value;
  return (
    <>
      <Head>
        <title>Wellrun | {!product ? 'Loading...' : 'Product'}</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <SideBar />
          {!product && <Spinner />}
          {product && item && (
            <Box sx={{flex: '1 1 auto'}}>
              <h1>{item.name}</h1>
              <p>
                {item.description ||
                  'There is no description about this product yet'}
              </p>
              <h2>{brand}</h2>
              <h3>{item.price}$</h3>
              <ol style={{color: 'green'}}>
                {categories.map(c => (
                  <li key={c.attributes.name}>{c.attributes.name}</li>
                ))}
              </ol>
              <ol style={{display: 'flex'}}>
                {images &&
                  images.map(img => (
                    <li
                      key={img.attributes.hash}
                      style={{
                        width: '300px',
                        height: '300px',
                        position: 'relative',
                      }}
                    >
                      <Image
                        alt={img.attributes.hash}
                        style={{position: 'absolute', objectFit: 'contain'}}
                        src={img.attributes.url}
                        fill
                      />
                    </li>
                  ))}
              </ol>
              <h3>SIZE {size}</h3>
            </Box>
          )}
        </Box>
      </NavBarLayout>
    </>
  );
}
