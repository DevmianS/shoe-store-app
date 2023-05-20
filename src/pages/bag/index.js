import Head from 'next/head';
import Link from 'next/link';
import {useState, useEffect} from 'react';

import {Typography, Box, Stack, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import {SkeletonProducts} from '@/utils/utils';

import {useCart} from '@/context/CartContext';
import useProducts from '@/hooks/useProducts';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import SideBar from '@/components/Layout/SideBar';

import Button from '@/components/UI/Button';
import CartProductItem from '@/components/UI/CartProductItem';

const Bag = () => {
  const {products, isLoading} = useProducts();
  const [items, setItems] = useState([]);
  const {cartItems} = useCart();
  const [cost, setCost] = useState({
    shipping: 0,
    subtotal: 0,
    total: 0,
    tax: 0,
  });

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
  }, [cartItems, items]);
  useEffect(() => {
    const keys = Object.keys(cartItems);

    if (products && products.length > 0) {
      setItems([
        ...products.filter(
          item =>
            keys.includes(item.attributes.name) &&
            cartItems[item.attributes.name] > 0,
        ),
      ]);
    }
  }, [cartItems, products]);

  const {removeProduct} = useCart();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    h2: {
      fontSize: rwdValue(18, 28),
      marginTop: rwdValue(45, 65),
      textAlign: 'center',
    },
    summaryTitle: {
      marginBottom: rwdValue(20, 55),
      paddingBottom: isTablet ? rwdValue(20, 40) : 0,
      borderBottom: isTablet ? '1px solid #EAECF0' : 'none',
    },
    btnBox: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        maxWidth: '250px',
        margin: `${rwdValue(25, 45)} 0`,
      },
    },
    wrapper: {
      marginTop: rwdValue(20, 80),
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '0 20px',
      maxWidth: '1570px',
      width: '100%',
      marginBottom: rwdValue(40, 80),
    },
    card: {
      borderBottom: '1px solid #EAECF0',
      paddingBottom: rwdValue(20, 60),
      marginBottom: rwdValue(20, 60),
      '&:first-of-type': {
        borderTop: isTablet ? '1px solid #EAECF0' : 'none',
        paddingTop: rwdValue(20, 60),
        marginTop: isTablet ? '20px' : 0,
      },
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    colBig: {flex: isTablet ? '0 0 100%' : '0 1 62%'},
    colSm: {flex: isTablet ? '0 0 100%' : '0 0 26%'},
    promo: {
      fontWeight: 400,
      marginBottom: rwdValue(20, 40),
      display: 'flex',
      alignItems: 'center',
      '& i': {fontSize: 20, marginLeft: '5px'},
    },
    summaryText: {fontSize: rwdValue(20, 30), fontWeight: 400},
    total: {
      display: 'flex',
      flexDirection: 'row',
      padding: '20px 0',
      marginBottom: rwdValue(30, 55),
      marginTop: rwdValue(30, 55),
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #EAECF0',
      borderBottom: '1px solid #EAECF0',
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
  };
  return (
    <>
      <Head>
        <title>Wellrun | Your Bag</title>
      </Head>

      <NavBarLayout>
        <Box sx={styles.wrapper}>
          <SideBar />
          <Box sx={styles.row}>
            <Box sx={styles.colBig}>
              <Typography variant="h1" component="h1">
                Cart
              </Typography>
              {isLoading
                ? SkeletonProducts()
                : items &&
                  items.length > 0 &&
                  items.map(product => {
                    const {attributes} = product;
                    const {categories, name, price, images} = attributes;
                    const cat1 = categories?.data[0]?.attributes?.name;
                    const cat2 = categories?.data[1]?.attributes?.name;
                    return (
                      <Box sx={styles.card} key={product.id}>
                        <CartProductItem
                          title={name}
                          category={cat1 + ' ' + cat2 ? cat2 : ''}
                          price={price}
                          image={images?.data}
                          quantity={cartItems[name]}
                          onDelete={() => removeProduct(name)}
                        />
                      </Box>
                    );
                  })}
              {(!items || items.length == 0) && (
                <>
                  <Typography component="h2" variant="h2" sx={styles.h2}>
                    {"You don't have any products yet"}
                  </Typography>
                  <Box sx={styles.btnBox}>
                    <Link href="/">
                      <Button size={isTablet ? 'small' : 'medium'}>
                        Go to shopping
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Box>
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
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={styles.summaryText}
                  >
                    Subtotal
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    sx={styles.summaryText}
                  >
                    ${cost.subtotal}
                  </Typography>
                </Stack>
                <Stack sx={styles.summaryItem}>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={styles.summaryText}
                  >
                    Shipping
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    sx={styles.summaryText}
                  >
                    ${cost.shipping}
                  </Typography>
                </Stack>
                <Stack sx={styles.summaryItem}>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={styles.summaryText}
                  >
                    Tax
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    sx={styles.summaryText}
                  >
                    ${cost.tax}
                  </Typography>
                </Stack>
                <Stack sx={styles.total}>
                  <Typography variant="h3" component="h3">
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
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default Bag;
