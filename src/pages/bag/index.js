import {Container, Grid, Typography, Box, styled, Stack} from '@mui/material';

import Button from '@/components/UI/Button';
import CartProductItem from '@/components/UI/CartProductItem';

import product1 from '@/assets/product1.jpg';
import product2 from '@/assets/product2.jpg';
import product3 from '@/assets/product3.jpg';

import NavBarLayout from '@/components/Layout/NavBarLayout';

const Bag = () => {
  const saveClickHandler = () => {
    console.log('SAVED');
  };
  const deleteClickHandler = () => {
    console.log('DELETED');
  };
  const CardWrapper = styled(Box)({
    borderBottom: '1px solid #EAECF0',
    paddingBottom: 60,
    marginBottom: 60,
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
    <NavBarLayout>
      <Container maxWidth="xl" sx={{pt: '80px'}}>
        <Grid container justifyContent={'space-between'}>
          <Grid item xl={8}>
            <Typography variant="h1" component="h1" mb={7}>
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
          <Grid item xl={3}>
            <Typography variant="h1" component="h2" mb={7}>
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
                <Typography variant="h3" component="h3" fontWeight={400}>
                  Subtotal
                </Typography>
                <Typography variant="h3" component="span" fontWeight={400}>
                  $410
                </Typography>
              </Stack>
              <Stack
                direction="row"
                mb={3}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography variant="h3" component="h3" fontWeight={400}>
                  Shipping
                </Typography>
                <Typography variant="h3" component="span" fontWeight={400}>
                  $20
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography variant="h3" component="h3" fontWeight={400}>
                  Tax
                </Typography>
                <Typography variant="h3" component="span" fontWeight={400}>
                  $0
                </Typography>
              </Stack>
              <Stack
                direction="row"
                mt={7}
                pb={2}
                pt={2}
                mb={7}
                borderTop={'1px solid #EAECF0'}
                borderBottom={'1px solid #EAECF0'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography variant="h3" component="h3" fontWeight={600}>
                  Total
                </Typography>
                <Typography variant="h3" component="span" fontWeight={600}>
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
  );
};

export default Bag;
