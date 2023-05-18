import Link from 'next/link';

import useOwnStyles from '@/utils/styles';

import {Typography, Box, useMediaQuery} from '@mui/material';
import {theme} from '@/utils/theme';

export default function Cart({count}) {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const styles = {
    position: 'relative',
    display: 'inline-block',
    minWidth: !isDesktop ? '32px' : '40px',
    fontSize: '24px',
    transition: '.3s',
    color: theme.palette.text.secondary,
    '& p': {
      position: 'absolute',
      top: 8,
      left: !isDesktop ? 9 : 13,
      width: 14,
      textAlign: 'center',
      fontSize: 10,
      color: 'inherit',
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  };
  return (
    <Link href="/bag">
      <Box
        sx={styles}
        className={`icon-bag${count > 0 ? '-o' : ''}`}
        variant="button"
      >
        {count > 0 && (
          <Typography component="p">{count > 99 ? 99 : count}</Typography>
        )}
      </Box>
    </Link>
  );
}
