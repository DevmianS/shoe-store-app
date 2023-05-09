import React, {useState} from 'react';
import Button from '@/components/UI/Button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';

import Link from 'next/link';

const RootForm = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '412px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        textAlign: 'start',
        padding: '20px',
      }}
    >
      <Typography component="h1" variant="h3">
        Welcome to Wellrun
      </Typography>
      <Typography component="p" variant="body1" mb={3}>
        The biggest shoes business in the whole world.
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: '100px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Button size="medium" outlined={true}>
          <Link
            href="/sign-in"
            style={{
              width: '100%',
              height: '100%',
              textDecoration: 'none',
              color: '#FE645E',
            }}
          >
            Sign in
          </Link>
        </Button>

        <Button size="medium">
          <Link
            href="/sign-up"
            style={{
              width: '100%',
              height: '100%',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Sign up
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default RootForm;
