import React, {useState} from 'react';
import Button from '@/components/UI/Button/Button';
import Banner from '@/assets/product8.jpg';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const theme = {
  spacing: 1,
};

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckbox = event => {
    setRememberMe(event.target.checked);
  };

  const handleSignIn = () => {
    console.log('Clicked');
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Box sx={{width: 40}}>
        <i className="icon-logo"></i>
      </Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 500,
            }}
          >
            <Typography component="h1" variant="h3">
              Welcome back
            </Typography>
            <Typography component="p" variant="body1" mb={3}>
              Welcome back! Please enter your details to log into your account.
            </Typography>
            <form>
              <TextField
                fullWidth
                size="medium"
                label="Email"
                type="email"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                size="medium"
                label="Password"
                type="password"
                margin="normal"
                required
              />
              <Box
                mb={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckbox} />}
                  label="Remember me"
                />
                <Link href="/reset-password">Forgot password?</Link>
              </Box>
              <Button
                size="medium"
                children={'Sign in'}
                onClick={handleSignIn}
              />
            </form>
            <Typography component="p" variant="body2">
              Don't have an account? <Link href="/sign-up">Sign up</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Image src={Banner} alt="banner" width="960" height="1080" />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
