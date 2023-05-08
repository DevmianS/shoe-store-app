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
    <Box>
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
      <Typography
        component="p"
        variant="body2"
        sx={{textAlign: 'center'}}
        mt={2}
      >
        Don´t have an account?{' '}
        <Link href="/sign-up" underline="none">
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default SignInForm;
