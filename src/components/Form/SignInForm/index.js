import React, {useCallback, useEffect, useState} from 'react';
import Button from '@/components/UI/Button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import {toast} from 'sonner';

import {useMutation} from '@tanstack/react-query';

import {logIn} from '@/utils/utils';

import {useRouter} from 'next/router';

import Spinner from '@/components/UI/Spinner';

/* import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '@/features/userSlice';
 */
const SignInForm = () => {
  // Redux test
  /*  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleAddUserTest = user => {
    dispatch(setUser(user));
  }; */

  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(true);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const checkErrorName = () => {
    const usernameRegex = /^[a-zA-Z0-9_-]{2,10}$/;
    if (usernameRegex.test(name) && !/\s/.test(name)) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const checkErrorPassword = () => {
    const emailRegex = /^\S{8,}$/;
    if (emailRegex.test(password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const {data, isLoading, isError, isSuccess, mutate, error} = useMutation({
    mutationKey: ['logIn'],
    mutationFn: async user => logIn(user),
  });

  const handleSubmit = async event => {
    console.log('handleSubmit');
    event.preventDefault();
    if (!nameError && !passwordError) {
      const user = {
        identifier: name,
        password: password,
      };
      mutate(user);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/');
    }
  }, [data?.user?.id, router]);

  const executeError = message => {
    toast.error(message);
  };

  const executeSucces = message => {
    toast.success(message);
  };

  const navigateRouter = useCallback(
    route => {
      router.push(route);
    },
    [router],
  );

  useEffect(() => {
    if (isSuccess) {
      executeSucces('Logged in successfully.');
      navigateRouter('/');
    }
  }, [isSuccess, navigateRouter]);

  useEffect(() => {
    if (isError) {
      executeError(error.response.data.error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    const localMem = JSON.parse(localStorage.getItem('logInInfo'));
    setName(localMem?.user || '');
    setPassword(localMem?.password || '');
    setRememberMe(localMem ? true : false);
  }, []);

  useEffect(() => {
    if (rememberMe && name && password) {
      localStorage.setItem(
        'logInInfo',
        JSON.stringify({user: name, password: password}),
      );
      console.log('as2d');
    }
    if (!rememberMe) {
      console.log('asd');
      localStorage.removeItem('logInInfo');
    }
  }, [rememberMe, name, password]);

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem('logInInfo'))?.user || '');
    setPassword(JSON.parse(localStorage.getItem('logInInfo'))?.password || '');
  }, []);

  return (
    <>
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
            error={nameError}
            helperText={
              nameError &&
              "The user's name should be greater than 2, less than 10 characters and contain no spaces."
            }
            onBlur={checkErrorName}
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
            error={passwordError}
            helperText={
              passwordError &&
              'Password should contain at least 8 characters and no spaces.'
            }
            onBlur={checkErrorPassword}
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
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
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
