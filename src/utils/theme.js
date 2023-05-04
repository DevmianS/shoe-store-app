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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: 8,
            borderColor: '#494949',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderRadius: 8,
            borderColor: 'black',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#494949',
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
            color: '#494949',
            position: 'relative',
            fontSize: 15,
            fontWeight: 500,
            transform: 'none',
            paddingBottom: 8,
            lineHeight: '17px',
          },
          '& label.Mui-focused': {
            color: '#494949',
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
