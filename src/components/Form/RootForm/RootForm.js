import {useRouter} from 'next/router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {rwdValue} from '@/utils/theme';
import {theme} from '@/utils/theme';

import Button from '@/components/UI/Button';

const rootFormStyles = {
  wrapper: {
    width: '100%',
    maxWidth: '480px',
  },
  welcomeTitle: {marginBottom: '10px'},
  welcomeText: {
    fontSize: rwdValue(10, 15),
    color: theme.palette.text.secondary,
    marginBottom: rwdValue(15, 25),
  },
  signInBtn: {
    marginBottom: rwdValue(15, 25),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpBtn: {
    color: 'white',
  },
};

const RootForm = () => {
  const router = useRouter();
  return (
    <Box sx={rootFormStyles.wrapper}>
      <Typography component="h1" variant="h1" sx={rootFormStyles.welcomeTitle}>
        Welcome to Wellrun
      </Typography>
      <Typography component="p" variant="body1" sx={rootFormStyles.welcomeText}>
        The biggest shoes business in the whole world.
      </Typography>

      <Box>
        <Button
          onClick={() => router.push('/sign-in')}
          sx={rootFormStyles.signInBtn}
          outlined={true}
        >
          Sign in
        </Button>
        <Button
          onClick={() => router.push('/sign-up')}
          sx={rootFormStyles.signUpBtn}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default RootForm;
