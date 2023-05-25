import Box from '@mui/material/Box';

const PageColumn = ({children, sx}) => {
  const pageColStyles = {
    flexShring: 0,
    flexGrow: 0,
    flexBasis: {
      xs: '50%',
      md: '100%',
    },
    position: 'relative',
    minHeight: '100%',
    padding: '0 30px',
    marginBottom: '30px',
    '& img': {
      height: '100%',
      maxHeight: '60vh',
      width: '100%',
      objectFit: {
        xs: 'contain',
        md: 'cover',
      },
      objectPosition: 'top center',
    },
  };
  return <Box sx={{...pageColStyles, sx}}>{children}</Box>;
};
export default PageColumn;
