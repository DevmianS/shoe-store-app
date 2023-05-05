import {createTheme} from '@mui/material/styles';
import {Work_Sans} from 'next/font/google';

const work_sans = Work_Sans({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
});

export let theme = createTheme({
  palette: {
    primary: {
      main: '#fe645e',
      contrastText: '#fff',
    },
    text: {
      primary: '#000000',
      secondary: '#5C5C5C',
      tetriary: '#494949',
    },
    divider: '#EAECF0',
    common: '#494949',
    border: '#000000',
  },
});

theme = createTheme(theme, {
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 45,
          fontWeight: 500,
        },
        h2: {fontSize: 38, fontWeight: 500},
        h3: {fontSize: 30, fontWeight: 500},
        h4: {fontSize: 30, fontWeight: 600},
        h5: {fontSize: 10, fontWeight: 500},
        body1: {
          fontSize: 16,
          fontWeight: 400,
          color: theme.palette.text.secondary,
        },
        body2: {fontSize: 20, fontWeight: 500},
        body3: {fontSize: 12, fontWeight: 500},
        body4: {fontSize: 25, fontWeight: 400},
        body5: {
          fontSize: 15,
          fontWeight: 300,
          color: theme.palette.text.secondary,
        },
      },
    },

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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: 8,
            borderColor: theme.palette.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderRadius: 8,
            borderColor: theme.palette.border,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          position: 'relative',
          legend: {
            span: {
              display: 'none',
            },
          },
          '& label': {
            color: theme.palette.text.tetriary,
            position: 'relative',
            fontSize: 15,
            fontWeight: 500,
            transform: 'none',
            paddingBottom: 8,
            lineHeight: '17px',
            pointerEvents: 'auto',
          },
          '& label.Mui-focused': {
            color: theme.palette.text.tetriary,
          },
          '.MuiInputBase-root': {
            height: 48,
            fontWeight: 300,
            fontSize: 15,
          },
          '.MuiInputBase-sizeSmall': {
            height: 34,
            fontSize: 12,
          },
          '& label.MuiInputLabel-sizeSmall': {
            paddingBottom: 5,
            lineHeight: '14px',
            fontSize: 12,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: 'red',
        },
      },
    },
  },
  typography: {fontFamily: work_sans.style.fontFamily},
});
