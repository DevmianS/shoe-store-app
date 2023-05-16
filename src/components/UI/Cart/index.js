import Link from 'next/link';

import useOwnStyles from '@/utils/styles';

import {Typography, Box} from '@mui/material';

export default function Cart({count}) {
  const {UI: styles} = useOwnStyles();
  return (
    <Link href="/bag">
      <Box
        sx={styles.cartNavIcon}
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
