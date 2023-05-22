import axios from 'axios';
import {Box, useMediaQuery, useTheme} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';
import Head from 'next/head';
import {rwdValue} from '@/utils/theme';
import Spinner from '@/components/UI/Spinner';
import {useRouter} from 'next/router';

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
  if (typeof window !== 'undefined') {
    if (error) {
      router.push('/404');
      return;
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
  const item = product?.data?.attributes;
  const categories = item?.categories?.data;
  console.log(categories);
  console.log(item);
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
              <p>{item.description}</p>
              <h2>{item.brand?.data?.attributes?.name}</h2>
              <h3>{item.price}$</h3>
              <ol style={{color: 'green'}}>
                {categories.map(c => (
                  <li key={c.attributes.name}>{c.attributes.name}</li>
                ))}
              </ol>
            </Box>
          )}
        </Box>
      </NavBarLayout>
    </>
  );
}
