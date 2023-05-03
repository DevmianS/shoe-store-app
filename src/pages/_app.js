import '@/styles/globals.css'
import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'

const work_sans = Work_Sans({
  weight: ['300','400','500'],
  style: ['normal'],
  subsets: ['latin'],
});
const icons_font = localFont({ src: '../font/SHOES_STORE.woff' })
export default function App({ Component, pageProps }) {
  return <>
  <style jsx global>{`
        html {
          font-family: ${work_sans.style.fontFamily};
        }
        [class^="icon-"], [class*=" icon-"] {
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
  <Component {...pageProps} />
  </>
  
}
