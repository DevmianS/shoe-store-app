import {useRouter} from 'next/router';
import {forwardRef, useState} from 'react';

import {Box, InputBase, Typography, alpha, useTheme} from '@mui/material';

const Searchbar = forwardRef(({searchExpanded, setSearchExpanded}, ref) => {
  const [input, setInput] = useState('');
  const theme = useTheme();
  const router = useRouter();

  const styles = {
    wrap: {
      position: 'relative',
      border: '1px solid #494949',
      borderRadius: '42px',
      backgroundColor: alpha(
        (theme && theme.palette.common.white) || '#fff',
        0.15,
      ),
      '&:hover': {
        backgroundColor: alpha(
          (theme && theme.palette.common.white) || '#fff',
          0.25,
        ),
      },
      marginLeft: 0,
      minWidth: '20%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
      display: {
        xs: searchExpanded ? 'flex' : 'none',
        md: 'flex',
      },
      transition: 'all 0.7s ease-in-out',
      marginRight: '15px',
      minWidth: {
        xs: searchExpanded ? '90%' : '',
        md: searchExpanded ? '95%' : '0',
      },
    },
    icon: {
      padding: '0 10px',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      color: 'inherit',
      width: '100%',
      overflow: 'hidden',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      },
    },
  };

  const handleClickInput = e => {
    setSearchExpanded(true);
  };
  const handleBlurInput = e => {
    setSearchExpanded(false);
  };

  const handleChangeInput = e => {
    setInput(e.target.value);
  };
  const handleEnterSearch = e =>
    e.key === 'Enter' && router.push(`/search?${e.target.value}`);

  return (
    <Box
      onClick={handleClickInput}
      onBlur={handleBlurInput}
      onChange={handleChangeInput}
      onKeyDown={handleEnterSearch}
      sx={styles.wrap}
    >
      <Typography className="icon-search" sx={styles.icon} />
      <InputBase
        placeholder="Search…"
        inputProps={{'aria-label': 'search'}}
        ref={ref}
        sx={styles.input}
      />
    </Box>
  );
});

Searchbar.displayName = 'Search';

export default Searchbar;
