import Link from 'next/link';
import {
  Box,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {useState} from 'react';

import Loading from '@/components/UI/Loading';

import Button from '@/components/UI/Button';

import {rwdValue} from '@/utils/theme';
import {
  checkErrorEmail,
  executeError,
  executeInfo,
  executeSucces,
  forgotPassword,
} from '@/utils/utils';

const ForgotPasswordForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    wrapper: {
      width: '100%',
      maxWidth: isMobile ? '100%' : '480px',
      padding: isMobile ? 0 : '20px',
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

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    console.log('Clicked');
    if (!checkErrorEmail(email, setEmailError)) {
      try {
        const {data, status} = await forgotPassword(email);

        if (status == '200') {
          executeSucces('Mail sent successfully.');
          executeInfo(
            'Check your email',
            'Click the link received in your email to reset your password',
          );
        } else {
          executeError('There was an error. Please try again.');
        }
      } catch (error) {
        console.log('my error: ', error);
        executeError(error);
      }
    } else {
      executeError('The email is wrong. Please write it again.');
    }
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <Box sx={styles.wrapper}>
        <Typography component="h1" variant="h1" sx={styles.forgotText}>
          Forgot password?
        </Typography>
        <Typography component="p" variant="body1" sx={styles.instructionsText}>
          Don{`'`}t worry, we{`'`}ll send you reset instructions.
        </Typography>

        <Box>
          <FormControl sx={styles.formControl}>
            <TextField
              sx={styles.emailField}
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
          <Box sx={styles.backToLogin}>
            <Typography component="span">Back to</Typography>
            <Typography component="span" sx={styles.loginLink}>
              <Link href="/sign-in">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
