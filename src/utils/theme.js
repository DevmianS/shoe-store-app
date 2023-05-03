import {createTheme} from '@mui/material/styles';

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
});
