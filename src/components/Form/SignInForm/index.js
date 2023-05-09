import React, {useEffect, useState} from 'react';
import Button from '@/components/UI/Button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import {Toaster, toast} from 'sonner';

import {useMutation, useQuery} from '@tanstack/react-query';

import {fetchUtil, registerNewUser, logIn} from '@/utils/utils';

import {useRouter} from 'next/router';

import Spinner from '@/components/UI/Spinner';

const SignInForm = () => {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckbox = event => {
    setRememberMe(event.target.checked);
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const {data, isLoading, isError, mutate} = useMutation({
    mutationKey: ['logIn'],
    mutationFn: user => logIn(user),
  });

  const handleSubmit = event => {
    console.log('handleSubmit');
    event.preventDefault();
    const user = {
      identifier: name,
      password: password,
    };
    mutate(user);
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/');
    }
  }, [data, router]);

  const executeError = message => {
    toast.error(message);
  };

  useEffect(() => {
    if (isError) {
      executeError(
        "The indentifier and password don't match. Please try again.",
      );
    }
  }, [isError]);

  return (
    <>
      <Toaster richColors expand={false} position="top-center" />
      {isLoading && (
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
      )}

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
          Welcome back
        </Typography>
        <Typography component="p" variant="body1" mb={3}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="medium"
            label="User"
            type="text"
            margin="normal"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Valerii"
          />
          <TextField
            fullWidth
            size="medium"
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="This_isPassword123"
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
          <Button size="medium" type="submit">
            Sign in
          </Button>
        </form>
        <Box
          sx={{
            textAlign: 'center',
            fontSize: 15,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="p" sx={{fontWeight: 500, textAlign: 'center'}}>
            Don’t have an account?
          </Typography>
          <Link
            href="/sign-up"
            underline="none"
            sx={{
              marginLeft: 1,
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;
