import Head from 'next/head';

import {useEffect, useState} from 'react';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import Root from '@/components/UI/Root';
import Home from '@/components/Layout/Home';
import {useSession} from 'next-auth/react';

const Index = () => {
  const {data: session, status} = useSession();
  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Wellrun | Home</title>
      </Head>
      {session ? (
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
