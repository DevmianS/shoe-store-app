import '@/styles/globals.css';
import localFont from 'next/font/local';
import {ThemeProvider} from '@mui/material';
import {theme} from '../utils/theme';
import CssBaseline from '@mui/material/CssBaseline';


const icons_font = localFont({src: '../font/SHOES_STORE.woff'});
export default function App({Component, pageProps}) {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        [class^='icon-'],
        [class*=' icon-'] {
          font-family: ${icons_font.style.fontFamily} !important;
          speak: never;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
