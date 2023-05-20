import {SessionProvider} from 'next-auth/react';
import localFont from 'next/font/local';
import {Toaster} from 'sonner';

import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import '@/styles/globals.css';

import {theme} from '../utils/theme';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {ToggleProvider} from '@/context/ToggleContext';
import {SearchProvider} from '@/context/SearchContext';
import {CartProvider} from '@/context/CartContext';

const queryClient = new QueryClient();
const icons_font = localFont({src: '../font/SHOES_STORE.woff'});

export default function App({Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartProvider>
        <ToggleProvider>
          <SearchProvider>
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
                <Component {...pageProps} />
                <Toaster
                  richColors
                  expand={true}
                  position="top-center"
                  closeButton
                />
              </QueryClientProvider>
            </ThemeProvider>
          </SearchProvider>
        </ToggleProvider>
      </CartProvider>
    </SessionProvider>
  );
}
