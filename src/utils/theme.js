import {createTheme} from '@mui/material/styles';
import {Work_Sans} from 'next/font/google';

const work_sans = Work_Sans({
  weight: ['300', '400', '500'],
  style: ['normal'],
  subsets: ['latin'],
});
export const theme = createTheme({
  palette: {
    primary: {
      main: '#fe645e',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          height: 34,
          fontSize: 11.15,
          borderRadius: 5.58,
          textTransform: 'none',
        },
        sizeMedium: {
          height: 40,
          fontSize: 16,
          borderRadius: 8,
          textTransform: 'none',
        },
        sizeLarge: {
          height: 48,
          fontSize: 16,
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
  typography:{fontFamily:work_sans.style.fontFamily}
});
