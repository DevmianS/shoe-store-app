import {
  Box,
  FormControl,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Button from '@/components/UI/Button';
import {rwdValue} from '@/utils/theme';

import {useRouter} from 'next/router';
import Loading from '@/components/UI/Loading';
import {useState} from 'react';
import {
  checkErrorConfirm,
  checkErrorPassword,
  executeError,
  executeInfo,
  executeSucces,
  resetPassword,
} from '@/utils/utils';

const ResetPasswordForm = () => {
  const router = useRouter();
  const {code} = router.query;

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignIn = async () => {
    setLoading(true);
    console.log('Clicked reset');
    if (
      !checkErrorConfirm(password, confirmPassword, setConfirmPasswordError) &&
      !checkErrorPassword(password, setPasswordError) &&
      code
    ) {
      try {
        const {data, status} = await resetPassword(
          password,
          confirmPassword,
          code,
        );
        console.log('status: ', status);
        if (status == '200') {
          executeSucces('Password reset successfully.');
          executeInfo('Try to log in with your new password');
          router.push('/sign-in');
        } else {
          executeError('There was an error. Please try again.');
        }
      } catch (error) {
        console.log('my error: ', error);
        executeError(error);
      }
    } else {
      !code &&
        executeError(
          'You need a CODE. Go to /forgot-password and fill the form.',
        );
      checkErrorConfirm(password, confirmPassword, setConfirmPasswordError) &&
        executeError('Both password should be valid. Please write it again.');
    }
    setLoading(false);
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
          Reset password
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
          Please create new password here
        </Typography>
        <Box sx={{width: '100%'}}>
          <FormControl sx={{width: '100%'}}>
            <TextField
              size={isMobile ? 'small' : 'medium'}
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
              sx={{width: '100%', mb: '30px'}}
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
              <Link href="/sign-up">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordForm;
