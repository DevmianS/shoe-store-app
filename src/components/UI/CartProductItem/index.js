import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
  return (
    <Card
      sx={{
        m: '20px',
        position: 'relative',
        border: 0,
        boxShadow: 'none',
        borderRadius: 0,
        maxWidth: 960,
        transition: 'transform 0.5s',
        '&:hover': {
          transform: 'scale(1.01)',
          outline: '1px solid lightgrey',
          cursor: 'pointer',
        },
      }}
    >
      <Stack direction="row">
        <Image width={220} height={220} alt={title} src={image} />
        <Stack flex={1} p="0 5px 25px 50px">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" component="h3">
              {title}
            </Typography>
            <Typography variant="h3" component="span">
              ${price}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb="12px">
            {category}
          </Typography>
          <Typography variant="body4" color="primary" fontWeight={600}>
            {inStock ? 'In Stock' : 'Not available'}
          </Typography>
          <Stack flex="1" direction="row" alignItems="end">
            <Stack direction="row" flex="1" color="text.secondary">
              <Stack mr="44px" direction="row" alignItems="center">
                <Typography variant="body4" fontSize={24}>
                  Size
                </Typography>
                <Typography
                  className="icon-chevron-down"
                  component="i"
                  fontSize={24}
                ></Typography>
              </Stack>
              <Stack mr="44px" direction="row" alignItems="center">
                <Typography
                  variant="body4"
                  fontSize={24}
                  color="text.secondary"
                >
                  Color
                </Typography>
                <Typography
                  className="icon-chevron-down"
                  component="i"
                  fontSize={24}
                ></Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body4"
                  fontSize={24}
                  color="text.secondary"
                >
                  Quantity
                </Typography>
                <Typography
                  className="icon-chevron-down"
                  component="i"
                  fontSize={24}
                ></Typography>
              </Stack>
            </Stack>
            <Stack direction="row" color="#8B8E93">
              <Stack
                direction="row"
                alignItems="center"
                sx={{'&:hover': {color: 'primary.main', cursor: 'pointer'}}}
                onClick={onSave}
              >
                <Typography
                  component="i"
                  fontSize={24}
                  marginRight={'8px'}
                  className="icon-heart"
                ></Typography>
                <Typography
                  variant="body4"
                  fontSize={24}
                  mr="16px"
                  pr="16px"
                  borderRight="1px solid #8B8E93"
                >
                  Save
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{'&:hover': {color: 'primary.main', cursor: 'pointer'}}}
                onClick={onDelete}
              >
                <Typography
                  component="i"
                  fontSize={24}
                  marginRight={'8px'}
                  className="icon-trash"
                ></Typography>
                <Typography variant="body4" fontSize={24}>
                  Delete
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
