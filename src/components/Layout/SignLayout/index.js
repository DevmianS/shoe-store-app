import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {Box, Icon} from '@mui/material';

import Banner from '@/components/UI/Banner';

const SignLayout = ({headTitle, carrusel, src, form}) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Icon sx={{width: 32, position: 'absolute', top: 50, left: 40}}>
        <i className="icon-logo"></i>
      </Icon>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            width: '50%',
            height: '100%',
          }}
        >
          {form}
        </Box>
        <Banner src={src}>{carrusel && carrusel}</Banner>
      </Box>
    </>
  );
};

export default SignLayout;
