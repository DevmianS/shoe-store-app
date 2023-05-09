import {Box, Typography} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../Button';

import RootForm from '@/components/Form/RootForm';

import SignLayout from '@/components/Layout/SignLayout';
import Image from 'next/image';

const RootMobile = () => {
  const [animationCount, setAnimationCount] = useState(1);

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimationCount(prevState => prevState + 1);
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (animationCount >= 5) {
      setAnimationCount(1);
    }
  }, [animationCount]);
  return (
    <Box
      sx={{
        width: '100%',
        heigth: '100vh',
        display: {xs: 'flex', md: 'none'},
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: '30px',
          }}
        >
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '30px',
              width: '160px',
              textShadow: '0px 0px 3px #FFFFFF',
            }}
          >
            Welcome to Wellrun
          </Typography>
          <Box
            sx={{
              width: '120px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box
              sx={{
                width: '24px',
                height: '1px',
                opacity: animationCount == 1 ? '1' : '0.5',
                backgroundColor: '#FE645E',
              }}
            ></Box>
            <Box
              sx={{
                width: '24px',
                height: '1px',
                opacity: animationCount == 2 ? '1' : '0.5',
                backgroundColor: '#FE645E',
              }}
            ></Box>
            <Box
              sx={{
                width: '24px',
                height: '1px',
                opacity: animationCount == 3 ? '1' : '0.5',
                backgroundColor: '#FE645E',
              }}
            ></Box>
            <Box
              sx={{
                width: '24px',
                height: '1px',
                opacity: animationCount == 4 ? '1' : '0.5',
                backgroundColor: '#FE645E',
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          zIndex: '-1',
          borderRadius: '30px',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          position: 'absolute',
          top: '0',
          overflow: 'hidden',
          boxShadow: '0px 0px 14px black',
        }}
      >
        <Image
          src={`/product${5 + animationCount}.jpg`}
          alt="banner"
          width={960}
          height={1080}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '20vh',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Button outlined={true} sx={{width: '47%'}}>
          Sign in
        </Button>
        <Button sx={{width: '47%'}}>Sign Up</Button>
      </Box>
    </Box>
  );
};

export default RootMobile;
