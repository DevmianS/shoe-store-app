import React, {useState} from 'react';
import Button from '@/components/UI/Button';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

const ResetPasswordForm = () => {
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
        Reset password
      </Typography>
      <Typography
        component="p"
        variant="body1"
        mt={1.5}
        mb={3}
        sx={{fontSize: '15px', color: '#5C5C5C'}}
      >
        Please create new password here
      </Typography>
      <Box sx={{width: 412}}>
        <FormControl sx={{width: '100%'}}>
          <TextField
            size="medium"
            label="Password"
            type="password"
            margin="normal"
            required
            placeholder="at least 8 characters"
          />
          <TextField
            size="medium"
            label="Confirm password"
            type="password"
            margin="normal"
            required
            placeholder="at least 8 characters"
          />

          <Button size="medium" onClick={handleSignIn}>
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
