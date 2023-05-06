import React from 'react';

import {Box} from '@mui/material';

import Image from 'next/image';

const Banner = ({children}) => {
  return (
    <Box
      sx={{
        width: '50%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image
        src="/product8.jpg"
        alt="banner"
        width={960}
        height={1080}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          zIndex: '-1',
        }}
      />
      <Box
        sx={{
          zIndex: '100',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
        <h1>Helloasd+`pkas</h1>
      </Box>
    </Box>
  );
};

export default Banner;
