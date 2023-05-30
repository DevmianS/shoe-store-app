import Head from 'next/head';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {rwdValue, theme} from '@/utils/theme';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import Button from '@/components/UI/Button/';

const checkoutStyles = {
  wrapper: {
    marginTop: rwdValue(20, 80),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0 20px',
    maxWidth: '1240px',
    width: '100%',
    marginBottom: rwdValue(40, 80),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    '& h1': {
      animation:
        'errorPageDrop cubic-bezier(0.39, 0.58, 0.57, 1) 1.5s 0.4s 1 both',
      color: theme.palette.text.primary,
    },
    '& h2': {
      marginBlock: rwdValue(25, 50),
      fontSize: rwdValue(22, 26),
      animation:
        'errorPageDrop cubic-bezier(0.39, 0.58, 0.57, 1) 1.5s 1.3s 1 both',
    },
  },
  btn: {
    maxWidth: '270px',
    width: 'auto',
    padding: '0 15px',
    animation: 'errorPageDrop cubic-bezier(0.39, 0.58, 0.57, 1) 1.5s 2s 1 both',
  },
};

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Wellrun | Thank you for buying from us!</title>
      </Head>

      <NavBarLayout>
        <Box sx={checkoutStyles.wrapper}>
          <Typography variant="h1" component="h1">
            Thank you for choosing our store!
          </Typography>
          <Box sx={checkoutStyles.content}>
            <Typography variant="h2" component="h2">
              {`Your support means the world to us. We're here to provide you with
              exceptional products and services. If you need assistance, please
              reach out to our dedicated team. We appreciate your trust and look
              forward to serving you again.`}
            </Typography>
            <Link href="/">
              <Button sx={checkoutStyles.btn}>Go to the products</Button>
            </Link>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default Checkout;
