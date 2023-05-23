import Image from 'next/image';
import Link from 'next/link';

import {Typography, Box, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

export default function ErrorLayout({image, title, text}) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    row: {
      display: 'flex',
      flexDirection: isTablet ? 'column-reverse' : 'row',
      justifyContent: isTablet ? 'flex-end' : 'flex-start',
      minHeight: '100%',
    },
    textCol: {
      flex: isTablet ? '0 0 100%' : '0 0 50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContent: {
      padding: '30px',
      maxWidth: isTablet ? '500px' : '70%',
      animation: 'errorPageFadeUp 1s 0.4s 1 both',
    },
    title: {
      marginBottom: rwdValue(10, 20),
      textAlign: isTablet ? 'center' : 'start',
    },
    text: {
      marginBottom: rwdValue(30, 40),
      fontSize: rwdValue(15, 20),
    },
    link: {
      display: 'flex',
      justifyContent: isTablet ? 'center' : 'start',
    },
    btn: {maxWidth: isTablet ? '180px' : '280px'},
    btnSize: isTablet ? 'small' : 'medium',
    imageCol: {
      flex: isTablet ? '0 0 100%' : '0 0 50%',
      display: 'flex',
      alignItems: 'start',
      padding: '0 30px',
      '& img': {
        margin: '0 auto',
        maxWidth: '100%',
        height: 'auto',
        animation:
          'errorPageDrop cubic-bezier(0.39, 0.58, 0.57, 1) 1.5s 0.4s 1 both',
      },
    },
    imgSize: isTablet ? 500 : 700,
  };
  return (
    <Box sx={styles.row}>
      <Box sx={styles.textCol}>
        <Box sx={styles.textContent}>
          <Typography component="h1" variant="h1" sx={styles.title}>
            {title}
          </Typography>
          <Typography component="p" variant="body1" sx={styles.text}>
            {text}
          </Typography>
          <Link href="/" style={styles.link}>
            <Button sx={styles.btn} size={styles.btnSize}>
              Back home
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={styles.imageCol}>
        <Image
          src={image}
          width={styles.imgSize}
          height={styles.imgSize}
        ></Image>
      </Box>
    </Box>
  );
}
