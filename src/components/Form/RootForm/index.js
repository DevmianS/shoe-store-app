import Button from '@/components/UI/Button';
import {rwdValue} from '@/utils/theme';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';

import {useRouter} from 'next/router';

const RootForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    wrapper: {
      width: '100%',
      maxWidth: isMobile ? '100%' : '480px',
    },
    welcome: {marginBottom: '10px'},
    welcomeText: {
      fontSize: rwdValue(10, 15),
      color: theme.palette.text.secondary,
      marginBottom: isMobile ? '15px' : '25px',
    },
    signInBtn: {
      marginBottom: isMobile ? '15px' : '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpBtn: {
      color: 'white',
    },
  };

  const router = useRouter();
  return (
    <Box sx={styles.wrapper}>
      <Typography component="h1" variant="h1" sx={styles.welcome}>
        Welcome to Wellrun
      </Typography>
      <Typography component="p" variant="body1" sx={styles.welcomeText}>
        The biggest shoes business in the whole world.
      </Typography>

      <Box>
        <Button
          onClick={() => router.push('/sign-in')}
          sx={styles.signInBtn}
          outlined={true}
        >
          Sign in
        </Button>
        <Button onClick={() => router.push('/sign-up')}>Sign up</Button>
      </Box>
    </Box>
  );
};

export default RootForm;
