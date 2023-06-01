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
import {FilterProvider} from '@/context/FilterContext';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: 1000 * 60 * 5}},
});
const icons_font = localFont({src: '../font/SHOES_STORE.woff'});

export default function App({Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartProvider>
        <ToggleProvider>
          <SearchProvider>
            <FilterProvider>
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
            </FilterProvider>
          </SearchProvider>
        </ToggleProvider>
      </CartProvider>
    </SessionProvider>
  );
}
