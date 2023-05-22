import Image from 'next/image';
import Link from 'next/link';

import {Typography, Box, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

export default function ErrorLayout({image, title, text}) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {};
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isTablet ? 'column-reverse' : 'row',
        justifyContent: isTablet ? 'flex-end' : 'flex-start',
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          flex: isTablet ? '0 0 100%' : '0 0 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{padding: '30px', maxWidth: '480px'}}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              marginBottom: rwdValue(10, 20),
              textAlign: isTablet ? 'center' : 'start',
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{
              marginBottom: rwdValue(30, 40),
              fontSize: rwdValue(15, 20),
            }}
          >
            {text}
          </Typography>
          <Link
            href="/"
            style={{
              display: 'flex',
              justifyContent: isTablet ? 'center' : 'start',
            }}
          >
            <Button
              sx={{maxWidth: isTablet ? '180px' : '280px'}}
              size={isTablet ? 'small' : 'medium'}
            >
              Back home
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          flex: isTablet ? '0 0 100%' : '0 0 50%',
          display: 'flex',
          alignItems: 'start',
          padding: '0 30px',
          '& img': {margin: '0 auto', maxWidth: '100%', height: 'auto'},
        }}
      >
        <Image
          src={image}
          width={isTablet ? 500 : 700}
          height={isTablet ? 500 : 700}
        ></Image>
      </Box>
    </Box>
  );
}
