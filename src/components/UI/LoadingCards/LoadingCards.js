import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {rwdValue} from '@/utils/theme';

const loadingCardStyles = {
  column: {
    flexBasis: {xs: '50%', md: '33.333%', lg: '25%'},
    padding: {xs: '0 8px', md: '0 15px', lg: '0 24px'},
    marginBottom: {xs: '8px', md: '15px', lg: '24px'},
    '&:first-of-type': {
      marginTop: rwdValue(20, 60),
    },
  },
  card: {
    position: 'relative',
    borderRadius: 0,
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: rwdValue(280, 480),
  },
  image: {
    position: 'relative',
    width: '100%',
    marginBottom: '12px',
    overflow: 'hidden',
    backgroundImage:
      'linear-gradient(to right, #d7d7d7 0%, #edeef1 10%, #d7d7d7 20%, #d7d7d7 100%)',
    backgroundSize: '200% 100%',
    animation: 'backgroundPosition 1s linear infinite',
    boxShadow: '0 2px 10px rgba(0,0,0, 0.2)',
    flex: '1 1 auto',
  },
  body: {position: 'relative'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: '5px',
  },
  title: {
    borderRadius: '50px',
    display: 'inline-block',
    marginBottom: '15px',
    height: '15px',
    width: '100%',
    boxShadow: '0 2px 10px rgba(0,0,0, 0.2)',
    backgroundImage:
      'linear-gradient(to right, #d7d7d7 0%, #edeef1 10%, #d7d7d7 20%, #d7d7d7 100%)',
    backgroundSize: '200% 100%',
    animation: 'backgroundPosition 1s linear infinite',
  },
};

function LoadingCard(isBag) {
  if (isBag) {
    loadingCardStyles.image = {
      ...loadingCardStyles.image,
      height: rwdValue(100, 220),
    };
    loadingCardStyles.card = {
      ...loadingCardStyles.card,
      height: rwdValue(150, 320),
    };
  }
  return (
    <Box sx={loadingCardStyles.column}>
      <Box sx={loadingCardStyles.card}>
        <Box sx={loadingCardStyles.image}></Box>
        <Box sx={loadingCardStyles.body}>
          <Stack sx={loadingCardStyles.header}>
            <Typography component="h3" sx={loadingCardStyles.title} />
          </Stack>
          <Stack sx={loadingCardStyles.header}>
            <Typography component="h3" sx={loadingCardStyles.title} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default () =>
  Array.from({length: 12}, (_, index) => <LoadingCard key={index} />);
