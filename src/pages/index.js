import Head from 'next/head';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import Home from '@/components/Layout/Home';

const Index = () => {
  return (
    <>
      <Head>
        <title>Wellrun | Home</title>
      </Head>
      <NavBarLayout sidebarVisible>
        <Home />
      </NavBarLayout>
    </>
  );
};

export default Index;
