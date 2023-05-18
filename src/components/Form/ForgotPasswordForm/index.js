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

const ForgotPasswordForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignIn = () => {
    console.log('Clicked');
  };

  const [loading, setLoading] = useState(false);

  const checkErrorEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError(false);
      return false;
    } else {
      setEmailError(true);
      return true;
    }
  };

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
              size={isMobile ? 'small' : 'medium'}
              label="Email"
              type="email"
              margin="normal"
              placeholder="Enter your email"
              sx={{marginBottom: '20px'}}
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
