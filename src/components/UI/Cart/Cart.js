import Link from 'next/link';

import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import {theme} from '@/utils/theme';

const cartStyles = {
  icon: {
    position: 'relative',
    display: 'inline-block',
    minWidth: {xs: '32px', md: '40px'},
    fontSize: '24px',
    transition: '.3s',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  badge: {
    '& .MuiBadge-badge': {
      background: theme.palette.primary.main,
    },
  },
};
export default function Cart({count}) {
  return (
    <Link href="/bag">
      <Badge badgeContent={count} color="success" sx={cartStyles.badge}>
        <Box sx={cartStyles.icon} className="icon-bag" variant="button" />
      </Badge>
    </Link>
  );
}
