import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Link from 'next/link';

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        All pages
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link href="/">
          <MenuItem>Home</MenuItem>
        </Link>
        <Link href="/add-product">
          <MenuItem>Add product</MenuItem>
        </Link>
        <Link href="/bag">
          <MenuItem>Bag</MenuItem>
        </Link>
        <Link href="/404">
          <MenuItem>404</MenuItem>
        </Link>
        <Link href="/500">
          <MenuItem>500</MenuItem>
        </Link>
        <Link href="/error/404filter">
          <MenuItem>404 filter</MenuItem>
        </Link>
        <Link href="/error/500filter">
          <MenuItem>500 filter</MenuItem>
        </Link>
        <Link href="/forgot-password">
          <MenuItem>Forgot password</MenuItem>
        </Link>
        <Link href="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href="/profile/update">
          <MenuItem>Update profile</MenuItem>
        </Link>
        <Link href="/reset-password">
          <MenuItem>Reset password</MenuItem>
        </Link>
        <Link href="/search">
          <MenuItem>Search</MenuItem>
        </Link>
        <Link href="/search/result">
          <MenuItem>Search result</MenuItem>
        </Link>
        <Link href="/sign-in">
          <MenuItem>Sign-in</MenuItem>
        </Link>
        <Link href="/sign-up">
          <MenuItem>Sign-up</MenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
