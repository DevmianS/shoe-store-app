import Image from 'next/image';
import Link from 'next/link';

import React, {useEffect, useRef, useState} from 'react';

import {Box, Typography} from '@mui/material';

import Button from '@/components/UI/Button';

const stylesRootMobile = {
  box: {
    width: '100%',
    heigth: '100vh',
    display: {xs: 'flex', md: 'none'},
    overflow: 'hidden',
    flexDirection: 'column',
  },
  top: {
    width: '100%',
    height: '80vh',
    display: 'flex',
  },
  bot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: '30px',
  },
  title: {
    fontWeight: '600',
    fontSize: '30px',
    width: '160px',
    textShadow: '0px 0px 3px #FFFFFF',
  },
  bullets: {
    width: '120px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bullet: {width: '24px', height: '1px', backgroundColor: '#FE645E'},
  imageWrap: {
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
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  btn: {width: '100%'},
  link: {width: '47%'},
};

const RootMobile = () => {
  const [animationCount, setAnimationCount] = useState(1);

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimationCount(prevState => {
        if (prevState === 4) {
          return 1;
        }
        return prevState + 1;
      });
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box sx={stylesRootMobile.box}>
      <Box sx={stylesRootMobile.top}>
        <Box sx={stylesRootMobile.bot}>
          <Typography sx={stylesRootMobile.title}>
            Welcome to Wellrun
          </Typography>
          <Box sx={stylesRootMobile.bullets}>
            {[1, 2, 3, 4].map(count => {
              return (
                <Box
                  key={count}
                  sx={{
                    ...stylesRootMobile.bullet,
                    opacity: animationCount == count ? '1' : '0.5',
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={stylesRootMobile.imageWrap}>
        <Image
          src={`/product${5 + animationCount}.jpg`}
          alt="banner"
          width={960}
          height={1080}
          style={stylesRootMobile.image}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '20vh',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '20px 10px',
        }}
      >
        <Link href="/sign-in" style={stylesRootMobile.link}>
          <Button outlined={true} sx={stylesRootMobile.btn} size="small">
            Sign in
          </Button>
        </Link>
        <Link href="/sign-up" style={{...stylesRootMobile.link, color: '#fff'}}>
          <Button sx={stylesRootMobile.btn} size="small">
            Sign up
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RootMobile;
