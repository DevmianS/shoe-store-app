import Image from 'next/image';

import {
  Card,
  Typography,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import {useCart} from '@/context/CartContext';
import QuantityButton from './QuantityButton/QuantityButton';

export default function CartProductItem({
  productId,
  title,
  price,
  category,
  quantity,
  image,
}) {
  const {removeOneProduct, addProduct, deleteProduct} = useCart();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const styles = {
    card: {
      position: 'relative',
      border: 0,
      boxShadow: 'none',
      borderRadius: 0,
      width: '100%',
      '& img': {
        width: rwdValue(100, 220),
        height: rwdValue(100, 220),
      },
      transition: 'transform 0.5s',
      '&:hover': !isDesktop
        ? {}
        : {
            transform: 'scale(1.01)',
            boxShadow: '0 0 3px 1px rgba(100,100,100,0.1)',
            cursor: 'pointer',
          },
    },
    content: {
      flexGrow: 1,
      paddingRight: '5px',
      paddingBottom: !isDesktop ? 0 : rwdValue(10, 25),
      paddingLeft: rwdValue(20, 50),
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    category: {
      color: theme.palette.text.secondary,
      marginBottom: '12px',
      fontSize: rwdValue(8, 20),
    },
    footer: {
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'row',
      alignItems: 'end',
      justifyContent: 'space-between',
    },
    delete: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: theme.palette.text.light,
      '& span': {
        fontSize: rwdValue(12, 24),
      },
      '& i': {
        fontSize: rwdValue(12, 24),
        color: 'inherit',
        marginRight: '3px',
      },
      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
    controls: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
      '& > button, & > span': {
        fontSize: rwdValue(18, 24),
        width: rwdValue(24, 32),
        height: rwdValue(24, 32),
        maxWidth: rwdValue(24, 32),
        minWidth: rwdValue(24, 23),
        textAlign: 'center',
      },
    },
  };

  return (
    <Card sx={styles.card}>
      <Stack direction="row">
        <Image
          width={600}
          height={600}
          alt={title}
          src={
            image ? image[0]?.attributes?.url : '/productImageComingSoon.png'
          }
        />
        <Stack sx={styles.content}>
          <Stack sx={styles.header}>
            <Typography variant="h3" component="h3">
              {title}
            </Typography>
            <Typography variant="h3" component="span">
              ${price}
            </Typography>
          </Stack>
          <Typography variant="body2" component="span" sx={styles.category}>
            {category}
          </Typography>
          <Stack sx={styles.footer}>
            <Box sx={styles.controls}>
              <QuantityButton
                onClick={() => removeOneProduct({productId, title})}
              >
                -
              </QuantityButton>
              <Typography component="span">{quantity}</Typography>
              <QuantityButton
                onClick={() => addProduct({productId, title}, true)}
              >
                +
              </QuantityButton>
              <Typography
                sx={{marginLeft: 1, display: {xs: 'none', sm: 'block'}}}
                component="span"
              >
                Quantity
              </Typography>
            </Box>
            <Box
              sx={styles.delete}
              onClick={() => deleteProduct({productId, title})}
            >
              <Typography component="i" className="icon-trash"></Typography>
              <Typography component="span" variant="body4">
                Delete
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
