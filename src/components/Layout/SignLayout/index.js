import React from 'react';
import Banner from '@/assets/product8.jpg';
import Head from 'next/head';
import Image from 'next/image';
import {Box, Icon} from '@mui/material';

const SignLayout = ({children, headTitle}) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Icon sx={{width: 32, position: 'absolute', top: 50, left: 40}}>
        <i className="icon-logo"></i>
      </Icon>
      <Box sx={{width: '100%', height: '100vh', display: 'flex'}}>
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
          {children}
        </Box>
        <Box sx={{width: '50%', height: '100%', display: 'flex'}}>
          <Image
            src={Banner}
            alt="banner"
            width={960}
            height={1080}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </Box>
      </Box>
    </>
  );
};

export default SignLayout;
