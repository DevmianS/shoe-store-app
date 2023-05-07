import {Box, styled} from '@mui/material';

const PageColumn = styled(Box)(({theme}) => ({
  flex: '0 0 100%',
  position: 'relative',
  minHeight: '100%',
  padding: '0 30px',
  marginBottom: '30px',
  '& img': {
    height: '100%',
    maxHeight: '60vh',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'top center',
  },
  [theme.breakpoints.up('md')]: {
    flex: '0 0 50%',
    '& img': {
      objectFit: 'contain',
    },
  },
}));
export default PageColumn;
