import {useState, useEffect} from 'react';

import {Typography, Box, Stack, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

export default function Summary({items, cartItems}) {
  const [cost, setCost] = useState({
    shipping: 0,
    subtotal: 0,
    total: 0,
    tax: 0,
  });
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    colSm: {flex: isTablet ? '0 0 100%' : '0 0 26%'},
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

  return (
    <Box sx={styles.colSm}>
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
        <Button size={isTablet ? 'small' : 'medium'}>Checkout</Button>
      </Box>
    </Box>
  );
}
