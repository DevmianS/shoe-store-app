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

const SignUpForm = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckbox = event => {
    setRememberMe(event.target.checked);
  };

  const handleSignIn = () => {
    console.log('Clicked');
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '412px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      textAlign: 'start',
      padding: '20px',
    }}>
      <Typography component="h1" variant="h3">
        Create an account
      </Typography>
      <Typography
        component="p"
        variant="body1"
        mt={1.5}
        mb={3}
        sx={{fontSize: '15px', color: '#5C5C5C'}}
      >
        Create an account to get an easy access to your dream shopping
      </Typography>
      <Box sx={{width: "100%"}}>
        <FormControl sx={{width: '100%'}}>
          <TextField
            size="medium"
            label="Name"
            type="email"
            margin="normal"
            placeholder="Hayman Andrews"
            required
          />
          <TextField
            size="medium"
            label="Email"
            type="email"
            margin="normal"
            placeholder="example@mail.com"
            required
          />
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
          </Box>
          <Button size="medium" onClick={handleSignIn}>
            Sign up
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
          }}
        >
          <Typography component="p" sx={{fontWeight: 500}}>
            Already have an account?
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

export default SignUpForm;
