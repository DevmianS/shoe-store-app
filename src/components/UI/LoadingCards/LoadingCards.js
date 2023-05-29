import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {rwdValue} from '@/utils/theme';

const LoadingCardsStyles = {
  column: {
    flexBasis: {sm: '50%', md: '33.333%', lg: '25%'},
    padding: {sm: '0 8px', md: '0 15px', lg: '0 24px'},
    marginBottom: {sm: '8px', md: '15px', lg: '24px'},
  },
  card: {
    position: 'relative',
    borderRadius: 0,
    border: 'none',
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
  const bagStyles = {
    paddingBottom: isBag ? '0' : '120%',
    height: isBag ? rwdValue(100, 220) : 'auto',
  };
  return (
    <Box sx={LoadingCardsStyles.column}>
      <Box sx={LoadingCardsStyles.card}>
        <Box sx={{...LoadingCardsStyles.image, ...bagStyles}}></Box>
        <Box sx={LoadingCardsStyles.body}>
          <Stack sx={LoadingCardsStyles.header}>
            <Typography component="h3" sx={LoadingCardsStyles.title} />
          </Stack>
          <Stack sx={LoadingCardsStyles.header}>
            <Typography component="h3" sx={LoadingCardsStyles.title} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default () =>
  Array.from({length: 12}, (_, index) => <LoadingCard key={index} />);
