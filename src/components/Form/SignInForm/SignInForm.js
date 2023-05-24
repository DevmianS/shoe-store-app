import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import React, {useEffect, useState} from 'react';

import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  checkErrorEmail,
  checkErrorPassword,
  executeError,
  executeSucces,
} from '@/utils/utils';

import {rwdValue} from '@/utils/theme';
import {cartInit, isBrowser, valuesSum, setStore} from '@/utils/cart';

import {useCart} from '@/context/CartContext';

import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';

const SignInForm = () => {
  const {setCartItems, setCartCount, cartItems} = useCart();

  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [rememberMe, setRememberMe] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const signInStyles = {
    wrapper: {
      width: '100%',
      maxWidth: '560px',
      textAlign: 'start',
      alignSelf: 'center',
      '& form': {
        width: '100%',
        paddingRight: isMobile ? 0 : rwdValue(60, 120),
      },
    },
    welcomeTitle: {marginBottom: rwdValue(5, 10)},
    welcomeText: {
      fontSize: rwdValue(12, 15),
      marginBottom: rwdValue(15, 50),
    },
    emailField: {marginBottom: '25px', marginTop: 0},
    passwordField: {marginBottom: '15px', marginTop: 0},
    rememberText: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: rwdValue(20, 50),
    },
    rememberCheckbox: {
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
    },
    signInBtn: {marginBottom: '16px'},
    signUpLinkWrapper: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      columnGap: '5px',
    },
    signUpText: {
      fontWeight: 500,
      fontSize: rwdValue(10, 15),
    },
    link: {
      fontWeight: 500,
      fontSize: rwdValue(10, 15),
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  };

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
        router.push('/');
        isBrowser && setStore('USER_EMAIL', email);
        setCartItems(() => cartInit());
        setCartCount(() => valuesSum(cartItems));
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
      <Box sx={signInStyles.wrapper}>
        <Typography component="h1" variant="h1" sx={signInStyles.welcomeTitle}>
          Welcome back
        </Typography>
        <Typography component="p" variant="body1" sx={signInStyles.welcomeText}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={signInStyles.emailField}
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
            sx={signInStyles.passwordField}
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
          <Box sx={signInStyles.rememberText}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
              label="Remember me"
              sx={signInStyles.rememberCheckbox}
            />
            <Link href="/forgot-password">
              <Typography sx={signInStyles.link}>Forgot password?</Typography>
            </Link>
          </Box>
          <Button
            size={isMobile ? 'small' : 'medium'}
            type="submit"
            sx={signInStyles.signInBtn}
          >
            Sign in
          </Button>
          <Box sx={signInStyles.signUpLinkWrapper}>
            <Typography component="span" sx={signInStyles.signUpText}>
              Don{`'`}t have an account?
            </Typography>
            <Link href="/sign-up">
              <Typography component="span" sx={signInStyles.link}>
                Sign up
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignInForm;
