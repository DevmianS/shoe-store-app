import Head from 'next/head';
import Link from 'next/link';
import {useState, useEffect} from 'react';

import {Typography, Box, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import {SkeletonProducts} from '@/utils/utils';

import {useCart} from '@/context/CartContext';
import useProducts from '@/hooks/useProducts';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import SideBar from '@/components/Layout/SideBar';

import Button from '@/components/UI/Button';
import CartProductItem from '@/components/UI/CartProductItem';
import Summary from '@/components/UI/Summary';

const Bag = () => {
  const {products, isLoading} = useProducts();
  const [items, setItems] = useState([]);
  const {cartItems} = useCart();

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
            <Summary items={items} cartItems={cartItems} />
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default Bag;
