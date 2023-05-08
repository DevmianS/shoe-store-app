import React, {useState} from 'react';
import Button from '@/components/UI/Button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

const SignInForm = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckbox = event => {
    setRememberMe(event.target.checked);
  };

  const handleSignIn = () => {
    console.log('Clicked');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '412px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        textAlign: 'start',
        padding: '20px',
      }}
    >
      <Typography component="h1" variant="h3">
        Welcome back
      </Typography>
      <Typography component="p" variant="body1" mb={3}>
        Welcome back! Please enter your details to log into your account.
      </Typography>
      <form>
        <TextField
          fullWidth
          size="medium"
          label="Email"
          type="email"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          size="medium"
          label="Password"
          type="password"
          margin="normal"
          required
        />
        <Box
          mb={6}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormControlLabel
            control={<Checkbox onChange={handleCheckbox} />}
            label="Remember me"
          />
          <Link href="/reset-password" underline="none">
            Forgot password?
          </Link>
        </Box>
        <Button size="medium" onClick={handleSignIn}>
          Sign in
        </Button>
      </form>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: 15,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography component="p" sx={{fontWeight: 500, textAlign: 'center'}}>
          Don’t have an account?
        </Typography>
        <Link
          href="/sign-up"
          underline="none"
          sx={{
            marginLeft: 1,
          }}
        >
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default SignInForm;
