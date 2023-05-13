import Image from 'next/image';
import Card from '@mui/material/Card';
import {Typography, Stack, Box, useMediaQuery} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';

export default function ProductCard({title, price, category, imgPath}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const basis = isMobile ? '50%' : isTablet ? '33.333%' : '25%';
  const cardMb = isMobile ? '16px' : isTablet ? '15px' : '24px';
  const cardP = isMobile ? '8px' : isTablet ? '15px' : '24px';

  const styles = {
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
  };

  return (
    <Box
      sx={{flex: `0 0 ${basis}`, padding: `0 ${cardP}`, marginBottom: cardMb}}
    >
      <Box sx={styles}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingBottom: '120%',
            marginBottom: '12px',
            overflow: 'hidden',
            background: 'lightgrey',
          }}
        >
          <Image src={imgPath} alt={`${title} ${category}`} />
        </Box>
        <Box sx={{position: 'relative'}}>
          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              component="h3"
              fontSize="calc(10px + 12 * ((100vw - 360px) / (1920 - 360)))"
              fontWeight={500}
            >
              {title || 'Product title'}
            </Typography>
            <Typography
              component="span"
              fontSize="calc(10px + 12 * ((100vw - 360px) / (1920 - 360)))"
              fontWeight={500}
            >
              ${price || '100'}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 'calc(8px + 10 * ((100vw - 360px) / (1920 - 360)))',
              color: '#5C5C5C',
            }}
            component="h4"
          >
            {category || 'category'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
