import React from 'react';

import {Box} from '@mui/material';

import Image from 'next/image';

const Banner = ({children, src}) => {
  return (
    <Box
      sx={{
        width: '50%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
    >
      <Image
        src={src}
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
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '50%',
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'flex-start',
            padding: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
