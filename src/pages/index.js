import Head from 'next/head';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import Root from '@/components/UI/Root';
import Home from '@/components/Layout/Home';
import {useSession, getSession} from 'next-auth/react';

import Loading from '@/components/UI/Loading';

const Index = () => {
  const {status} = useSession();

  const render = () => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'authenticated':
        return (
          <NavBarLayout>
            <Home />
          </NavBarLayout>
        );
      default:
        return <Root />;
    }
  };

  return (
    <>
      <Head>
        <title>Wellrun | Home</title>
      </Head>
      {/* {render()} */}
      <NavBarLayout>
        <Home />
      </NavBarLayout>
    </>
  );
};

export default Index;
