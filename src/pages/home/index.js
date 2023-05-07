import Head from 'next/head';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <NavBarLayout>
        <div>Home</div>
      </NavBarLayout>
    </>
  );
};

export default Home;
