import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {toast} from 'sonner';

import {Typography, Box, Stack, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import {useCart} from '@/context/CartContext';
import Button from '@/components/UI/Button';

const initSummary = {
  shipping: 0,
  subtotal: 0,
  total: 0,
  tax: 0,
};

export default function Summary({items, cartItems}) {
  const [cost, setCost] = useState(initSummary);
  const [payment, setPayment] = useState(true);

  const {setCartItems, setCartCount} = useCart();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // mockup checkout
  const checkoutPromise = () =>
    new Promise((resolve, reject) => {
      setPayment(true);
      setTimeout(() => {
        resolve(
          'Payment was successful! Wait for your order to be delivered. Thank you!',
        );
        setPayment(false);
        setCost(initSummary);
        setCartItems({});
        setCartCount(0);
        router.push('/');
      }, 3000);
    });

  const checkoutHandler = data => {
    toast.promise(checkoutPromise, {
      loading: 'Payment verification...',
      success: response => {
        return response;
      },
      error: errorMessage => {
        return errorMessage;
      },
    });
  };

  const styles = {
    colSm: {flex: isTablet ? '0 0 100%' : '0 0 26%', position: 'relative'},
    summary: {
      position: isTablet ? 'static' : 'fixed',
      width: isTablet ? '100%' : '22%',
    },
    promo: {
      fontWeight: 400,
      marginBottom: rwdValue(20, 40),
      display: 'flex',
      alignItems: 'center',
      '& i': {fontSize: 20, marginLeft: '5px'},
    },
    summaryTitle: {
      marginBottom: rwdValue(20, 55),
      paddingBottom: isTablet ? rwdValue(20, 40) : 0,
      borderBottom: isTablet ? '1px solid #EAECF0' : 'none',
    },
    summaryText: {fontSize: rwdValue(20, 30), fontWeight: 400},
    summaryTotal: {
      fontSize: rwdValue(20, 30),
      fontWeight: 500,
    },
    summaryItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: rwdValue(20, 40),
    },
    summaryItemTotal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: rwdValue(30, 55),
      marginTop: rwdValue(30, 55),
      borderTop: '1px solid #EAECF0',
      borderBottom: '1px solid #EAECF0',
      padding: '20px 0',
    },
  };

  // calculate
  useEffect(() => {
    const subtotal = Number(
      items.reduce(
        (acc, prod) =>
          prod.attributes.price * cartItems[prod.attributes.name] + acc,
        0,
      ),
    ).toFixed(2);
    const shipping = Number(subtotal / 10).toFixed(2);
    const tax = Number((subtotal / 100) * 19).toFixed(2);
    const total = Number(+shipping + +tax + +subtotal).toFixed(2);
    setCost({
      shipping,
      tax,
      total,
      subtotal,
    });
  }, [items]);
  // Checkout `disabled` state
  useEffect(() => {
    if (cost.total > 0) {
      setPayment(false);
    } else {
      setPayment(true);
    }
  }, [cost.total]);

  return (
    <Box sx={styles.colSm}>
      <Box sx={styles.summary}>
        <Typography variant="h1" component="h2" sx={styles.summaryTitle}>
          Summary
        </Typography>
        <Box>
          <Typography variant="body2" component="p" sx={styles.promo}>
            Do you have a promocode?
            <Typography className="icon-chevron-down" component="i" />
          </Typography>
          <Stack sx={styles.summaryItem}>
            <Typography variant="h3" component="h3" sx={styles.summaryText}>
              Subtotal
            </Typography>
            <Typography variant="h3" component="span" sx={styles.summaryText}>
              ${cost.subtotal}
            </Typography>
          </Stack>
          <Stack sx={styles.summaryItem}>
            <Typography variant="h3" component="h3" sx={styles.summaryText}>
              Shipping
            </Typography>
            <Typography variant="h3" component="span" sx={styles.summaryText}>
              ${cost.shipping}
            </Typography>
          </Stack>
          <Stack sx={styles.summaryItem}>
            <Typography variant="h3" component="h3" sx={styles.summaryText}>
              Tax
            </Typography>
            <Typography variant="h3" component="span" sx={styles.summaryText}>
              ${cost.tax}
            </Typography>
          </Stack>
          <Stack sx={styles.summaryItemTotal}>
            <Typography variant="h3" component="h3" sx={styles.summaryTotal}>
              Total
            </Typography>
            <Typography
              variant="h3"
              component="span"
              sx={{...styles.summaryText, fontWeight: 500}}
            >
              ${cost.total}
            </Typography>
          </Stack>
          <Button
            size={isTablet ? 'small' : 'medium'}
            onClick={checkoutHandler}
            disabled={payment}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
