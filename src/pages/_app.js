import {SessionProvider} from 'next-auth/react';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import {ThemeProvider} from '@mui/material';
import {theme} from '../utils/theme';
import CssBaseline from '@mui/material/CssBaseline';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

import {Toaster} from 'sonner';

import {Provider} from 'react-redux';
import {store} from '../reduxStore/store';

import {ToggleProvider} from '@/context/ToggleContext';

const icons_font = localFont({src: '../font/SHOES_STORE.woff'});
export default function App({Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
     <ToggleProvider> 
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
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
          <Toaster richColors expand={true} position="top-center" closeButton />
        </QueryClientProvider>
      </ThemeProvider>
    </ToggleProvider>
    </SessionProvider>
  );
}
