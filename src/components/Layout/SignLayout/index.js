import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {Box, Icon, Toolbar} from '@mui/material';

import Banner from '@/components/UI/Banner';

const SignLayout = ({headTitle, carrusel, src, form}) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Icon
        sx={{
          width: 32,
          position: 'absolute',
          display: {
            xs: 'none',
            md: 'flex',
          },
          top: 50,
          left: 40,
        }}
      >
        <i className="icon-logo"></i>
      </Icon>
      <Box
        sx={{
          minHeight: '59px',
          width: '100%',
          borderBottom: '1px solid #EAECF0',
          position: 'absolute',
          top: '0',
          display: {
            xs: 'flex',
            md: 'none',
          },
        }}
      >
        <Toolbar sx={{fontSize: '30px'}}>
          <i className="icon-logo"></i>
        </Toolbar>
      </Box>
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
            width: {xs: '100%', md: '50%'},
            height: '100%',
          }}
        >
          {form}
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            height: '100%',
          }}
        >
        </Box> */}
        <Banner src={src}>{carrusel && carrusel}</Banner>
      </Box>
    </>
  );
};

export default SignLayout;
