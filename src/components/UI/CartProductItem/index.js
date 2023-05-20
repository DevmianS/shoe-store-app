import Image from 'next/image';

import {
  Card,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {rwdValue} from '@/utils/theme';

export default function CartProductItem({
  title,
  price,
  category,
  quantity,
  onDelete,
  image,
}) {
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
    select: {
      minWidth: '70px',
      '& .MuiSelect-select': {
        lineHeight: 1,
        maxWidth: !isDesktop ? '90px' : 'auto',
        width: !isDesktop ? 'auto' : '100%',
        paddingLeft: 0,
        paddingRight: !isDesktop ? '0' : '24px',
      },
      '& .MuiSelect-icon': {
        position: 'static',
        transform: !isDesktop ? 'translateX(-20px)' : 'translateX(-12px)',
        width: !isDesktop ? '8px' : '1rem',
        height: !isDesktop ? '8px' : '1rem',
      },
      '& .MuiInputBase-input': {
        paddingTop: 0,
        paddingBottom: 0,
      },
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
  };

  return (
    <Card sx={styles.card}>
      <Stack direction="row">
        <Image
          width={600}
          height={600}
          alt={title}
          src={`https://shoes-shop-strapi.herokuapp.com${image[0]?.attributes?.url}`}
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
            <FormControl sx={styles.select}>
              <Select
                labelId="quantity"
                variant="standard"
                defaultValue={quantity}
                value={quantity}
                disableUnderline
                disabled
              >
                <MenuItem value="quantity" disabled>
                  Quantity
                </MenuItem>
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={styles.delete} onClick={onDelete}>
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
