import Button from '@/components/UI/Button';
import {rwdValue} from '@/utils/theme';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';

import Link from 'next/link';

const RootForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '480px',
      }}
    >
      <Typography component="h1" variant="h1" sx={{marginBottom: '10px'}}>
        Welcome to Wellrun
      </Typography>
      <Typography
        component="p"
        variant="body1"
        sx={{
          fontSize: rwdValue(10, 15),
          color: 'text.secondary',
          marginBottom: isMobile ? '15px' : '25px',
        }}
      >
        The biggest shoes business in the whole world.
      </Typography>

      <Box>
        <Button
          sx={{
            marginBottom: isMobile ? '15px' : '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          outlined={true}
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button>
          <Link
            href="/sign-up"
            style={{
              color: 'white',
            }}
          >
            Sign up
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default RootForm;
