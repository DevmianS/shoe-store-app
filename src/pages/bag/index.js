import {
  Container,
  Grid,
  Typography,
  Box,
  styled,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Button from '@/components/UI/Button';
import CartProductItem from '@/components/UI/CartProductItem';

import product1 from '@/assets/product1.jpg';
import product2 from '@/assets/product2.jpg';
import product3 from '@/assets/product3.jpg';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import Head from 'next/head';
import {rwdValue} from '@/utils/theme';

/* import {useSelector, useDispatch} from 'react-redux';
import {addProduct, deleteProduct} from '../../features/bagSlice';
 */
const Bag = () => {
  // Test code
  /*  const bag = useSelector(state => state.bag);
  const dispatch = useDispatch();

  const handleAddproduct = product => {
    dispatch(addProduct(product));
  };
  const handleDeleteproduct = id => {
    dispatch(addProduct(id));
  };

  const testBag = {id: 1, name: 'Jordan 1', price: 99.9};

  useEffect(() => {
    handleAddproduct(testBag);
  }, []); */

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const saveClickHandler = () => {
    console.log('SAVED');
  };
  const deleteClickHandler = () => {
    console.log('DELETED');
  };
  const CardWrapper = styled(Box)({
    borderBottom: '1px solid #EAECF0',
    paddingBottom: rwdValue(20, 60),
    marginBottom: rwdValue(20, 60),
    '&:first-of-type': {
      borderTop: '1px solid #EAECF0',
      paddingTop: rwdValue(20, 60),
    },
  });
  const products = [
    {
      title: 'Nike Air Max 270',
      price: '160',
      category: "Women's Shoes",
      inStock: true,
      size: [36, 37, 38, 39],
      color: ['white', 'red', 'blue'],
      quantity: 3,
      image: product1,
      onSave: saveClickHandler,
      onDelete: deleteClickHandler,
    },
    {
      title: 'Nike Air Max 90',
      price: '140',
      category: "Men's Shoes",
      inStock: true,
      size: [36, 37, 38, 39],
      color: ['white', 'red', 'blue'],
      quantity: 3,
      image: product2,
      onSave: saveClickHandler,
      onDelete: deleteClickHandler,
    },
    {
      title: "Nike Air Force 1 '07 SE",
      price: '110',
      category: "Women's Shoes",
      inStock: true,
      size: [36, 37, 38, 39],
      color: ['white', 'red', 'blue'],
      quantity: 3,
      image: product3,
      onSave: saveClickHandler,
      onDelete: deleteClickHandler,
    },
  ];

  return (
    <>
      <Head>
        <title>Your bag</title>
      </Head>
      <NavBarLayout>
        <Container maxWidth="xl" sx={{marginTop: rwdValue(20, 60)}}>
          <Grid container justifyContent={'space-between'}>
            <Grid item xl={8} xs={12}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  marginBottom: rwdValue(12, 24),
                }}
              >
                Cart
              </Typography>
              {products.map(product => {
                return (
                  <CardWrapper
                    key={product.title + product.price + product.inStock}
                  >
                    <CartProductItem {...product} />
                  </CardWrapper>
                );
              })}
            </Grid>
            <Grid item xl={3} xs={12} mb={'30px'}>
              <Typography
                variant="h1"
                component="h2"
                sx={{
                  marginBottom: rwdValue(20, 40),
                  paddingBottom: isTablet ? rwdValue(20, 40) : 0,
                  borderBottom: isTablet ? '1px solid #EAECF0' : 'none',
                }}
              >
                Summary
              </Typography>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  component="p"
                  mb={4}
                  display={'flex'}
                  alignItems={'center'}
                >
                  Do you have a promocode?
                  <Typography
                    className="icon-chevron-down"
                    component="i"
                    fontSize={20}
                    ml={'5px'}
                  />
                </Typography>
                <Stack
                  direction="row"
                  mb={3}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    fontWeight={400}
                    fontSize={rwdValue(20, 30)}
                  >
                    Subtotal
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    fontWeight={400}
                    fontSize={rwdValue(20, 30)}
                  >
                    $410
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  mb={3}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    fontWeight={400}
                    fontSize={rwdValue(20, 30)}
                  >
                    Shipping
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    fontWeight={400}
                    fontSize={rwdValue(20, 30)}
                  >
                    $20
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    fontWeight={400}
                    fontSize={rwdValue(20, 30)}
                  >
                    Tax
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    fontWeight={400}
                    fontSize={rwdValue(20, 30)}
                  >
                    $0
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    padding: '20px 0',
                    marginBottom: rwdValue(30, 55),
                    marginTop: rwdValue(30, 55),
                  }}
                  borderTop={'1px solid #EAECF0'}
                  borderBottom={'1px solid #EAECF0'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    fontWeight={600}
                    fontSize={rwdValue(20, 30)}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    fontWeight={600}
                    fontSize={rwdValue(20, 30)}
                  >
                    $430
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Button outlined>PayPal</Button>

                  <Button>Checkout</Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </NavBarLayout>
    </>
  );
};

export default Bag;
