import React, {useEffect, useState, useCallback} from 'react';
import Button from '@/components/UI/Button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';

import {toast} from 'sonner';

import {useMutation} from '@tanstack/react-query';

import {registerNewUser} from '@/utils/utils';

import {useRouter} from 'next/router';

import Spinner from '@/components/UI/Spinner';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const checkErrorName = () => {
    const usernameRegex = /^[a-zA-Z0-9_-]{2,10}$/;
    if (usernameRegex.test(name) && !/\s/.test(name)) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const checkErrorEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
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

  const checkErrorConfirm = () => {
    password === confirmPassword
      ? setConfirmPasswordError(false)
      : setConfirmPasswordError(true);
  };

  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(true);

  const {data, isLoading, isError, isSuccess, error, mutate} = useMutation({
    mutationKey: ['registerNewUser'],
    mutationFn: async user => registerNewUser(user),
  });

  const handleSubmit = async event => {
    event.preventDefault();
    checkErrorConfirm();
    checkErrorPassword();
    checkErrorEmail();
    checkErrorName();
    if (!nameError && !passwordError && !emailError && !confirmPasswordError) {
      console.log('handleSubmit pass');
      const user = {
        username: name,
        email: email,
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

  const executeError = message => {
    toast.error(message);
  };

  const executeSucces = message => {
    toast.success(message);
  };

  const executeInfo = (message, description) => {
    toast.message(message, {
      description: description,
      action: {
        label: 'Go',
        onClick: () => window.open('https://mail.google.com/mail/u/0/#inbox'),
      },
    });
  };

  const navigateRouter = useCallback(
    route => {
      router.push(route);
    },
    [router],
  );

  useEffect(() => {
    if (isSuccess) {
      executeSucces('New user created successfully. ');
      executeInfo(
        'Verify you account',
        'Click the link received in your email to verify your user',
      );
      navigateRouter('/sign-in');
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

  console.log('rememberMe', rememberMe);

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
          Create an account
        </Typography>
        <Typography
          component="p"
          variant="body1"
          mt={1.5}
          mb={3}
          sx={{fontSize: '15px', color: '#5C5C5C'}}
        >
          Create an account to get an easy access to your dream shopping
        </Typography>
        <Box sx={{width: '100%'}}>
          <form style={{width: '100%'}} onSubmit={handleSubmit}>
            <TextField
              size="medium"
              label="Name"
              type="text"
              margin="normal"
              placeholder="Hayman Andrews"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              sx={{width: '100%'}}
              error={nameError}
              helperText={
                nameError &&
                "The user's name should be greater than 2, less than 10 characters and contain no spaces."
              }
              onBlur={checkErrorName}
            />
            <TextField
              size="medium"
              label="Email"
              type="email"
              margin="normal"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{width: '100%'}}
              error={emailError}
              helperText={emailError && 'Email should be valid.'}
              onBlur={checkErrorEmail}
            />
            <TextField
              size="medium"
              label="Password"
              type="password"
              margin="normal"
              required
              placeholder="at least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{width: '100%'}}
              error={passwordError}
              helperText={
                passwordError &&
                'Password should contain at least 8 characters and no spaces.'
              }
              onBlur={checkErrorPassword}
            />
            <TextField
              size="medium"
              label="Confirm password"
              type="password"
              margin="normal"
              required
              placeholder="at least 8 characters"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              sx={{width: '100%'}}
              error={confirmPasswordError}
              helperText={
                confirmPasswordError && 'Both passwords should be equal.'
              }
              onBlur={checkErrorConfirm}
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
            </Box>
            <Button size="medium">Sign up</Button>
          </form>
          <Box
            sx={{
              textAlign: 'center',
              fontSize: 15,
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography component="p" sx={{fontWeight: 500}}>
              Already have an account?
            </Typography>
            <Link
              href="/sign-in"
              underline="none"
              sx={{
                marginLeft: 1,
              }}
            >
              Log in
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;
