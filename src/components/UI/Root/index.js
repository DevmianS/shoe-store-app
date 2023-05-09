import {Box, Typography} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../Button';

import RootForm from '@/components/Form/RootForm';

import SignLayout from '@/components/Layout/SignLayout';
import Image from 'next/image';
import RootMobile from '../RootMobile';

const Root = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          heigth: '100vh',
          display: {xs: 'none', md: 'flex'},
          overflow: 'hidden',
        }}
      >
        <SignLayout form={<RootForm />} src={`/product8.jpg`} />
      </Box>
      <RootMobile />
    </>
  );
};

export default Root;
