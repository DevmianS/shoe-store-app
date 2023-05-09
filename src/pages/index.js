import React, {useEffect} from 'react';
import Button from '@/components/UI/Button';
import {TextField} from '@mui/material';

import Root from '@/components/UI/Root';

import {useState} from 'react';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import Head from 'next/head';

const Index = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setAuth(
        <NavBarLayout>
          <div>Home</div>
        </NavBarLayout>,
      );
    } else {
      setAuth(<Root />);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {auth}
    </>
  );
};

export default Index;
