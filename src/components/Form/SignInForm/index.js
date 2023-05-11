import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';

import {toast} from 'sonner';
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {logIn} from '@/utils/utils';
import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          maxWidth: '560px',
          textAlign: 'start',
          alignSelf: isMobile ? 'start' : 'center',
          paddingTop: isMobile ? '80px' : '0',
          '& form': {
            width: '100%',
            paddingRight: isMobile ? 0 : rwdValue(60, 120),
          },
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          textAlign="start"
          sx={{marginBottom: rwdValue(5, 10)}}
        >
          Welcome back
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            fontSize: rwdValue(12, 15),
            marginBottom: rwdValue(15, 50),
          }}
        >
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{marginBottom: '25px', marginTop: 0}}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            label="User"
            type="text"
            margin="normal"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Type your user name here"
            error={nameError}
            helperText={
              nameError &&
              "The user's name should be greater than 2, less than 10 characters and contain no spaces."
            }
            onFocus={() => setNameError(false)}
            onBlur={checkErrorName}
          />
          <TextField
            sx={{marginBottom: '15px', marginTop: 0}}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Type your password here"
            error={passwordError}
            helperText={
              passwordError &&
              'Password should contain at least 8 characters and no spaces.'
            }
            onFocus={() => setPasswordError(false)}
            onBlur={checkErrorPassword}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: rwdValue(20, 50),
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
              sx={{
                fontSize: rwdValue(10, 15),
                paddingLeft: '16px',
                '& .MuiCheckbox-root': {
                  width: '16px',
                  height: '16px',
                  padding: 0,
                  marginRight: '4px',
                },
                '& .MuiFormControlLabel-label': {
                  fontSize: rwdValue(10, 15),
                  fontWeight: 500,
                },
              }}
            />
            <Typography sx={{fontSize: rwdValue(10, 15)}}>
              <Link href="/forgot-password">Forgot password?</Link>
            </Typography>
          </Box>
          <Button
            size={isMobile ? 'small' : 'medium'}
            type="submit"
            sx={{marginBottom: '16px'}}
          >
            Sign in
          </Button>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              columnGap: '5px',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                fontSize: rwdValue(10, 15),
              }}
            >
              Don’t have an account?
            </Typography>
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                fontSize: rwdValue(10, 15),
              }}
            >
              <Link href="/sign-up">Sign up</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignInForm;
