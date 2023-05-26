import Head from 'next/head';
import ProductAction from '@/components/UI/ProductAction/ProductAction';
import {Box} from '@mui/material';

const AddProductModal = () => {
  return (
    <>
      <Head>
        <title>Wellrun | Add Product Modal</title>
      </Head>
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProductAction />
      </Box>
    </>
  );
};

export default AddProductModal;
