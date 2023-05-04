import {Typography, Box} from '@mui/material';
import Link from 'next/link';
export default function Cart({count}) {
  return (
    <Link href="bag" style={{textDecoration: 'none'}}>
      <Box
        href="bag"
        sx={{
          position: 'relative',
          display: 'inline-block',
          transition: '.3s',
          '&:hover': {color: '#FE645E'},
        }}
        color="#292D32"
        fontSize={24}
        className={`icon-bag${count > 0 ? '-o' : ''}`}
        variant="button"
      >
        {count > 0 && (
          <Typography
            fontSize={10}
            textAlign={'center'}
            sx={{position: 'absolute', top: 8, left: 5, width: 14}}
          >
            {count > 99 ? 99 : count}
          </Typography>
        )}
      </Box>
    </Link>
  );
}
