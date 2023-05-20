import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

import styles from '@/styles/link.module.css';

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

import {
  checkErrorEmail,
  checkErrorPassword,
  executeError,
  executeSucces,
  logIn,
} from '@/utils/utils';
import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';
import {signIn, useSession} from 'next-auth/react';

const SignInForm = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [rememberMe, setRememberMe] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    await router.prefetch('/');
    console.log('handleSubmit');
    if (
      !checkErrorEmail(email, setEmailError) &&
      !checkErrorPassword(password, setPasswordError)
    ) {
      const user = {
        identifier: email,
        password: password,
      };
      const {ok, error} = await signIn('credentials', {
        ...user,
        redirect: false,
      });
      if (ok) {
        executeSucces('Successfully logged in.');
        router.push(router.query.callbackUrl || '/');
      } else {
        executeError(error);
      }
    } else {
      emailError && executeError('The email is wrong. Please write it again.');
      passwordError &&
        executeError('The password is wrong. Please write it again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rememberMe && email && password) {
      localStorage.setItem(
        'logInInfo',
        JSON.stringify({user: email, password: password}),
      );
    }
    if (!rememberMe) {
      localStorage.removeItem('logInInfo');
    }
  }, [rememberMe, email, password]);

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('logInInfo'))?.user || '');
    setPassword(JSON.parse(localStorage.getItem('logInInfo'))?.password || '');
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Box
        sx={{
          width: '100%',
          maxWidth: '560px',
          textAlign: 'start',
          alignSelf: 'center',
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
            label="Email"
            type="text"
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Type your email here"
            error={emailError}
            helperText={emailError && "The user's email should be valid."}
            onFocus={() => setEmailError(false)}
            onBlur={() => checkErrorEmail(email, setEmailError)}
          />
          <TextField
            sx={{marginBottom: '15px', marginTop: 0}}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Type your password here"
            error={passwordError}
            helperText={
              passwordError &&
              'Password should contain at least 8 characters and no spaces.'
            }
            onFocus={() => setPasswordError(false)}
            onBlur={() => checkErrorPassword(password, setPasswordError)}
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
              <Link href="/forgot-password" className={styles.link}>
                Forgot password?
              </Link>
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
              <Link href="/sign-up" className={styles.link}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignInForm;
