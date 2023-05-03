import '@/styles/globals.css';
import {ThemeProvider} from '@mui/material';
import {theme} from '../utils/theme';
import CssBaseline from '@mui/material/CssBaseline';

export default function App({Component, pageProps}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
