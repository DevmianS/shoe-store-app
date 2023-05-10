import Head from 'next/head';

import {useEffect, useState} from 'react';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import Root from '@/components/UI/Root';
import Home from '@/components/Layout/Home';

const Index = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {isAuth ? (
        <NavBarLayout>
          <Home />
        </NavBarLayout>
      ) : (
        <Root />
      )}
    </>
  );
};

export default Index;
