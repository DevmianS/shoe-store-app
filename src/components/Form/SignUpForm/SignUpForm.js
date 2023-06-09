import {useRouter} from 'next/router';
import Link from 'next/link';

import {useEffect, useState} from 'react';

import {useMutation} from '@tanstack/react-query';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  checkErrorConfirm,
  checkErrorEmail,
  checkErrorName,
  checkErrorPassword,
  executeError,
  executeInfo,
  executeSucces,
  registerNewUser,
} from '@/utils/utils';
import {rwdValue, theme} from '@/utils/theme';

import Button from '@/components/UI/Button';
import Spinner from '@/components/UI/Spinner';

const signUpStyles = {
  spinnerWrapper: {
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
  },
  wrapper: {
    width: '100%',
    maxWidth: {xs: '100%', md: '480px'},
    padding: {xs: 0, md: '20px'},
  },
  welcomeText: {fontSize: '15px', color: '#5C5C5C', mt: 1.5, mb: 3},
  nameField: {width: '100%'},
  emailField: {width: '100%'},
  passwordField: {width: '100%'},
  confirmPasswordField: {width: '100%'},
  signUpBtn: {mt: '80px'},
  signInLinkWrapper: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    columnGap: '5px',
    '& .MuiTypography-root': {
      fontSize: rwdValue(10, 15),
      fontWeight: 500,
    },
  },
  signInLink: {
    fontWeight: 500,
    fontSize: rwdValue(10, 15),
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

const SignUpForm = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {isLoading, isError, isSuccess, error, mutate} = useMutation({
    mutationKey: ['registerNewUser'],
    mutationFn: async user => registerNewUser(user),
  });

  const handleSubmit = async event => {
    event.preventDefault();
    if (
      !checkErrorConfirm(password, confirmPassword, setConfirmPasswordError) &&
      !checkErrorPassword(password, setPasswordError) &&
      !checkErrorEmail(email, setEmailError) &&
      !checkErrorName(name, setNameError)
    ) {
      const user = {
        username: name,
        email: email,
        password: password,
      };
      mutate(user);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      executeSucces('New user created successfully. ');
      executeInfo(
        'Verify you account',
        'Click the link received in your email to verify your user',
      );
      router.push('/sign-in');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError) {
      executeError(error.response.data.error.message);
    }
  }, [isError, error]);

  return (
    <>
      {isLoading && (
        <Box sx={signUpStyles.spinnerWrapper}>
          <Spinner />
        </Box>
      )}
      <Box sx={signUpStyles.wrapper}>
        <Typography component="h1" variant="h3">
          Create an account
        </Typography>
        <Typography component="p" variant="body1" sx={signUpStyles.welcomeText}>
          Create an account to get an easy access to your dream shopping
        </Typography>
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField
              size={isMobile ? 'small' : 'medium'}
              label="Name"
              type="text"
              margin="normal"
              placeholder="YourName"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              sx={signUpStyles.nameField}
              error={nameError}
              helperText={
                nameError &&
                "The user's name should be greater than 2, less than 10 characters and contain no spaces."
              }
              onBlur={() => checkErrorName(name, setNameError)}
            />
            <TextField
              size={isMobile ? 'small' : 'medium'}
              label="Email"
              type="email"
              margin="normal"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={signUpStyles.emailField}
              error={emailError}
              helperText={emailError && 'Email should be valid.'}
              onBlur={() => checkErrorEmail(email, setEmailError)}
            />
            <TextField
              size={isMobile ? 'small' : 'medium'}
              label="Password"
              type="password"
              margin="normal"
              required
              placeholder="at least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={signUpStyles.passwordField}
              error={passwordError}
              helperText={
                passwordError &&
                'Password should contain at least 8 characters and no spaces.'
              }
              onBlur={() => checkErrorPassword(password, setPasswordError)}
            />
            <TextField
              size={isMobile ? 'small' : 'medium'}
              label="Confirm password"
              type="password"
              margin="normal"
              required
              placeholder="at least 8 characters"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              sx={signUpStyles.confirmPasswordField}
              error={confirmPasswordError}
              helperText={
                confirmPasswordError && 'Both passwords should be equal.'
              }
              onBlur={() =>
                checkErrorConfirm(
                  password,
                  confirmPassword,
                  setConfirmPasswordError,
                )
              }
            />

            <Button
              size={isMobile ? 'small' : 'medium'}
              sx={signUpStyles.signUpBtn}
              type={'submit'}
            >
              Sign up
            </Button>
          </form>
          <Box sx={signUpStyles.signInLinkWrapper}>
            <Typography component="span">Already have an account?</Typography>
            <Link href="/sign-in">
              <Typography component="span" sx={signUpStyles.signInLink}>
                Log in
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;
