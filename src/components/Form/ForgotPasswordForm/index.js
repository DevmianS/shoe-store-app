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
      <Box
        sx={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '480px',
          padding: isMobile ? 0 : '20px',
        }}
      >
        <Typography component="h1" variant="h1" sx={{marginBottom: '10px'}}>
          Forgot password?
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            fontSize: rwdValue(10, 15),
            color: 'text.secondary',
            marginBottom: '5px',
          }}
        >
          Don’t worry, we’ll send you reset instructions.
        </Typography>

        <Box sx={{width: '100%'}}>
          <FormControl sx={{width: '100%'}}>
            <TextField
              sx={{marginBottom: '25px', marginTop: '60px'}}
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

            <Button size={isMobile ? 'small' : 'medium'} onClick={handleSignIn}>
              Reset password
            </Button>
          </FormControl>
          <Box
            sx={{
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
            }}
          >
            <Typography component="span">Back to</Typography>
            <Typography component="span">
              <Link href="/sign-in">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
