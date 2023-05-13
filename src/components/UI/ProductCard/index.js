import Image from 'next/image';
import {Typography, Stack, Box, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {rwdValue} from '@/utils/theme';

export default function ProductCard({title, price, category, imgPath}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const styles = {
    column: isMobile
      ? {
          flex: '0 0 50%',
          padding: '0 8px',
          marginBottom: '16px',
        }
      : isTablet
      ? {
          flex: '0 0 33.333%',
          padding: '0 15px',
          marginBottom: '15px',
        }
      : {
          flex: '0 0 25%',
          padding: '0 24px',
          marginBottom: '24px',
        },
    card: {
      position: 'relative',
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      '& img': {
        position: 'absolute',
        background: 'primary',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: '1s',
      },
      '&:hover': isDesktop
        ? {
            cursor: 'pointer',
            '& img': {
              transition: '1s',
              transform: 'scale(1.25)',
            },
          }
        : {},
    },
    image: {
      position: 'relative',
      width: '100%',
      paddingBottom: '120%',
      marginBottom: '12px',
      overflow: 'hidden',
      background: 'lightgrey',
    },
    body: {position: 'relative'},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: rwdValue(10, 22),
      fontWeight: 500,
    },
    category: {
      fontSize: rwdValue(8, 18),
      color: theme.palette.text.secondary,
    },
  };

  return (
    <Box sx={styles.column}>
      <Box sx={styles.card}>
        <Box sx={styles.image}>
          <Image src={imgPath} alt={`${title} ${category}`} />
        </Box>
        <Box sx={styles.body}>
          <Stack sx={styles.header}>
            <Typography component="h3" sx={styles.title}>
              {title || 'Product title'}
            </Typography>
            <Typography component="span" sx={styles.title}>
              ${price || '100'}
            </Typography>
          </Stack>
          <Typography sx={styles.category} component="h4">
            {category || 'category'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
