import {rwdValue} from '@/utils/theme';
import {
  Card,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  Box,
} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import Image from 'next/image';

export default function CartProductItem({
  title,
  price,
  category,
  inStock,
  quantity,
  onDelete,
  image,
}) {
  const {UI} = useOwnStyles();
  const {productCard: styles} = UI;

  return (
    <Card sx={styles.card}>
      <Stack direction="row">
        <Image width={220} height={220} alt={title} src={image} />
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
          <Typography variant="body4" sx={styles.stock}>
            {inStock ? 'In Stock' : 'Not available'}
          </Typography>
          <Stack sx={styles.footer}>
            <FormControl sx={styles.select}>
              <Select
                labelId="quantity"
                variant="standard"
                defaultValue={'quantity'}
              >
                <MenuItem value="quantity" disabled>
                  Quantity
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
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
