import Link from 'next/link';
import {useState} from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import {rwdValue, theme} from '@/utils/theme';
import {
  checkErrorEmail,
  executeError,
  executeInfo,
  executeSucces,
  forgotPassword,
} from '@/utils/utils';

import Loading from '@/components/UI/Loading';
import Button from '@/components/UI/Button';

const forgotStyles = {
  wrapper: {
    width: '100%',
    maxWidth: {xs: '100%', md: '480px'},
    padding: {xs: 0, md: '20px'},
  },
  forgotText: {marginBottom: '10px'},
  instructionsText: {
    fontSize: rwdValue(10, 15),
    color: 'text.secondary',
    marginBottom: '5px',
  },
  formControl: {width: '100%'},
  emailField: {marginBottom: '25px', marginTop: '60px'},
  backToLogin: {
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
  loginLink: {
    fontWeight: 500,
    fontSize: rwdValue(10, 15),
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

const ForgotPasswordForm = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    if (!checkErrorEmail(email, setEmailError)) {
      try {
        const {status} = await forgotPassword(email);

        if (status == '200') {
          executeSucces('Mail sent successfully.');
          executeInfo(
            'Check your email',
            'Click the link received in your email to reset your password',
          );
        } else {
          executeError(
            'There was an error. Please try again later or talk to support.',
          );
        }
      } catch (error) {
        console.error('my error: ', error);
        executeError(error.message);
      }
    } else {
      executeError('The email is wrong. Please write it again.');
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Box sx={forgotStyles.wrapper}>
        <Typography component="h1" variant="h1" sx={forgotStyles.forgotText}>
          Forgot password?
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={forgotStyles.instructionsText}
        >
          Don{`'`}t worry, we{`'`}ll send you reset instructions.
        </Typography>

        <Box>
          <FormControl sx={forgotStyles.formControl}>
            <TextField
              sx={forgotStyles.emailField}
              fullWidth
              size={isMobile ? 'small' : 'medium'}
              label="Email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Type your email here"
              error={emailError}
              helperText={emailError && "The user's email should be valid."}
              onFocus={() => setEmailError(false)}
              onBlur={() => checkErrorEmail(email, setEmailError)}
            />

            <Button size={isMobile ? 'small' : 'medium'} onClick={handleSignIn}>
              Reset password
            </Button>
          </FormControl>
          <Box sx={forgotStyles.backToLogin}>
            <Typography component="span">Back to</Typography>
            <Link href="/sign-in">
              <Typography component="span" sx={forgotStyles.loginLink}>
                Log in
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
