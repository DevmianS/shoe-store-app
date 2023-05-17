import React from 'react';
import Spinner from '../Spinner';
import {Box} from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F3F3F3',
        zIndex: '200',
        opacity: 0.8,
      }}
    >
      <Spinner />
    </Box>
  );
};

export default Loading;
