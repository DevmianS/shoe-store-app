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

const ResetPasswordForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignIn = () => {
    console.log('Clicked');
  };

  return (
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
            required
            placeholder="at least 8 characters"
            sx={{marginBottom: '25px'}}
          />
          <TextField
            size={isMobile ? 'small' : 'medium'}
            label="Confirm password"
            type="password"
            required
            placeholder="at least 8 characters"
            sx={{marginBottom: '35px'}}
          />

          <Button size={isMobile ? 'small' : 'medium'} onClick={handleSignIn}>
            Reset password
          </Button>
        </FormControl>
        <Box
          sx={{
            textAlign: 'center',
            fontSize: 15,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <Typography component="p" sx={{fontWeight: 500}}>
            Back to
          </Typography>
          <Link
            href="/sign-up"
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
  );
};

export default ResetPasswordForm;
