import {rwdValue} from '@/utils/theme';
import {
  Card,
  Typography,
  Stack,
  styled,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import Image from 'next/image';

export default function CartProductItem({
  title,
  price,
  category,
  inStock,
  size,
  color,
  quantity,
  onDelete,
  onSave,
  image,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const Product = styled(Card)({
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
    '&:hover': isTablet
      ? {}
      : {
          transform: 'scale(1.01)',
          outline: '1px solid lightgrey',
          cursor: 'pointer',
        },
  });
  const CardSelect = styled(FormControl)({
    minWidth: '70px',
    marginRight: isTablet ? 0 : rwdValue(0, 45),
    marginBottom: isTablet ? '8px' : 0,
    '& .MuiSelect-select': {
      fontSize: rwdValue(12, 24),
      lineHeight: 1,
      maxWidth: isTablet ? '90px' : 'auto',
      paddingLeft: 0,
      paddingRight: isTablet ? '12px' : '24px',
    },
    '& .MuiSelect-icon': {
      position: 'static',
      transform: isTablet ? 'translateX(-24px)' : 'translateX(-12px)',
      width: isTablet ? '8px' : '1rem',
      height: isTablet ? '8px' : '1rem',
    },
    '&:last-of-type': {marginBottom: 0},
    '& .MuiInputBase-input': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  });
  const CardControl = styled(Stack)({
    flexDirection: 'row',
    alignItems: 'center',
    '&:first-of-type': {marginBottom: isTablet ? '8px' : 0},
    '&:hover': {color: theme.palette.primary.main, cursor: 'pointer'},
  });
  const DeleteContent = (
    <>
      <Typography
        component="i"
        fontSize={rwdValue(12, 24)}
        marginRight={'8px'}
        className="icon-trash"
      ></Typography>
      <Typography variant="body4" fontSize={rwdValue(12, 24)}>
        Delete
      </Typography>
    </>
  );
  const SaveContent = (
    <>
      <Typography
        component="i"
        fontSize={rwdValue(12, 24)}
        marginRight={'8px'}
        className="icon-heart"
      ></Typography>
      <Typography
        variant="body4"
        fontSize={rwdValue(12, 24)}
        sx={
          isTablet
            ? {}
            : {
                marginRight: '16px',
                paddingRight: '16px',
                borderRight: '1px solid #8B8E93',
              }
        }
      >
        Save
      </Typography>
    </>
  );
  return (
    <Product>
      <Stack direction="row">
        <Image width={220} height={220} alt={title} src={image} />
        <Stack
          flex={1}
          sx={{
            paddingRight: '5px',
            paddingBottom: isTablet ? 0 : rwdValue(10, 25),
            paddingLeft: rwdValue(20, 50),
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" component="h3" fontSize={rwdValue(12, 30)}>
              {title}
            </Typography>
            <Typography
              variant="h3"
              component="span"
              fontSize={rwdValue(12, 30)}
            >
              ${price}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            mb="12px"
            fontSize={rwdValue(8, 20)}
          >
            {category}
          </Typography>
          <Typography
            variant="body4"
            color="primary"
            fontWeight={600}
            fontSize={rwdValue(8, 20)}
            display={isTablet ? 'none' : 'block'}
          >
            {inStock ? 'In Stock' : 'Not available'}
          </Typography>
          <Stack flex="1" direction="row" alignItems="end">
            <Stack
              direction={isTablet ? 'column' : 'row'}
              flex="1"
              color="text.secondary"
            >
              <CardSelect>
                <Select labelId="size" variant="standard" defaultValue={'size'}>
                  <MenuItem value="size" disabled>
                    Size
                  </MenuItem>
                  <MenuItem value={36}>36</MenuItem>
                  <MenuItem value={37}>37</MenuItem>
                  <MenuItem value={38}>38</MenuItem>
                  <MenuItem value={39}>39</MenuItem>
                </Select>
              </CardSelect>
              <CardSelect>
                <Select
                  labelId="color"
                  variant="standard"
                  defaultValue={'color'}
                >
                  <MenuItem value="color" disabled>
                    Color
                  </MenuItem>
                  <MenuItem value={'black'}>Black</MenuItem>
                  <MenuItem value={'white'}>White</MenuItem>
                  <MenuItem value={'red'}>Red</MenuItem>
                  <MenuItem value={'green'}>Green</MenuItem>
                </Select>
              </CardSelect>
              <CardSelect>
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
              </CardSelect>
            </Stack>
            <Stack direction={isTablet ? 'column' : 'row'} color="#8B8E93">
              <CardControl onClick={onSave}>{SaveContent}</CardControl>
              <CardControl onClick={onDelete}>{DeleteContent}</CardControl>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Product>
  );
}
