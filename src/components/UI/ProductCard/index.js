import Image from 'next/image';
import Card from '@mui/material/Card';
import {Grid, Typography, Stack, Box} from '@mui/material';
import {styled} from '@mui/material/styles';

export default function ProductCard({title, price, category, imgPath}) {
  const StyledCard = styled(Card)(({theme}) => ({
    position: 'relative',
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none',
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        cursor: 'pointer',
        '& img': {
          transition: '1s',
          transform: 'scale(1.25)',
        },
      },
    },

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
  }));
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard>
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
      </StyledCard>
    </Grid>
  );
}
