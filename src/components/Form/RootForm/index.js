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

const RootForm = () => {
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
        Welcome to Wellrun
      </Typography>
      <Typography component="p" variant="body1" mb={3}>
        The biggest shoes business in the whole world.
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: '100px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Button size="medium" onClick={handleSignIn} outlined={true}>
          Sign in
        </Button>

        <Button size="medium" onClick={handleSignIn}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default RootForm;
