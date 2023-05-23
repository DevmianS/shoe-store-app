import {Box, useTheme} from '@mui/material';

const PageColumn = ({children, sx}) => {
  const theme = useTheme();
  const isDesktop = theme.breakpoints.up('md');

  const pageColStyles = {
    flex: `0 0 ${isDesktop ? '100%' : '50%'}`,
    position: 'relative',
    minHeight: '100%',
    padding: '0 30px',
    marginBottom: '30px',
    '& img': {
      height: '100%',
      maxHeight: '60vh',
      width: '100%',
      objectFit: isDesktop ? 'cover' : 'contain',
      objectPosition: 'top center',
    },
  };
  return <Box sx={{...pageColStyles, sx}}>{children}</Box>;
};
export default PageColumn;
