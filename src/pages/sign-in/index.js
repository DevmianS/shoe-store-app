import React, {useState} from 'react';
import Button from '@/components/UI/Button';
import Banner from '@/assets/product8.jpg';
import Head from 'next/head';
import Image from 'next/image';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Link,
  TextField,
  Typography,
} from '@mui/material';

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
      <Icon sx={{width: 32, position: 'absolute', top: 50, left: 40}}>
        <i className="icon-logo"></i>
      </Icon>
      <Box container sx={{width: '100%', height: '100vh', display: 'flex'}}>
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
          <Box>
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
                <Link href="/reset-password" underline="none">
                  Forgot password?
                </Link>
              </Box>
              <Button
                size="medium"
                children={'Sign in'}
                onClick={handleSignIn}
              />
            </form>
            <Typography
              component="p"
              variant="body2"
              sx={{textAlign: 'center'}}
              mt={2}
            >
              Don't have an account?{' '}
              <Link href="/sign-up" underline="none">
                Sign up
              </Link>
            </Typography>
          </Box>
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

export default SignIn;
