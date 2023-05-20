import {Box} from '@mui/material';
import {theme} from '@/utils/theme';

const spinnerStyles = {
  width: '40px',
  height: '40px',
  margin: '100px auto',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '100%',
  animation: 'sk-scaleout 0.3s infinite ease-in-out',
  WebkitAnimation: 'sk-scaleout 1s infinite ease-in-out',
};

const Spinner = () => {
  return <Box sx={spinnerStyles} />;
};

export default Spinner;
