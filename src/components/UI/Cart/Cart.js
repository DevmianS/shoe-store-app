import Link from 'next/link';

import {styled} from '@mui/material';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {theme} from '@/utils/theme';

const HtmlTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

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
    <HtmlTooltip title="Go to the cart">
      <Link href="/bag">
        <Badge badgeContent={count} color="success" sx={cartStyles.badge}>
          <Box sx={cartStyles.icon} className="icon-bag" variant="button" />
        </Badge>
      </Link>
    </HtmlTooltip>
  );
}
