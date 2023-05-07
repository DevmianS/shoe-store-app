import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const AddProduct = () => {
  return (
    <>
      <Head>
        <title>Add new product</title>
      </Head>
      <NavBarLayout>
        <div>Add product</div>
      </NavBarLayout>
    </>
  );
};

export default AddProduct;
