import Link from 'next/link';
import {useRouter} from 'next/router';
import {memo, useRef, useEffect, useCallback} from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {useSearch} from '@/context/SearchContext';
import {useToggle} from '@/context/ToggleContext';
import {useCart} from '@/context/CartContext';

import Cart from '@/components/UI/Cart';
import Searchbar from '@/components/UI/Searchbar';

const NavBar = () => {
  const {isToggled, toggle, setIsToggled} = useToggle();
  const {searchExpanded, setSearchExpanded} = useSearch();
  const {cartCount} = useCart();

  const searchInputRef = useRef();
  const router = useRouter();

  const navStyles = {
    box: {
      width: '100%',
      minHeight: {
        xs: '60px',
        md: '120px',
      },
    },
    appBar: {
      minHeight: {
        xs: searchExpanded ? '200px' : '60px',
        md: searchExpanded ? '420px' : '120px',
      },
      backgroundColor: '#fff',
      color: '#000',
      justifyContent: 'flex-start',
      borderBottom: '1px solid #eaecf0',
      boxShadow: 'none',
      transition: 'all 0.5s ease-in-out',
      position: 'fixed',
      top: '0',
      zIndex: '100',
    },
    toolBar: {
      padding: {
        xs: '0',
        md: '',
      },
      height: {
        xs: '60px',
        md: '120px',
      },
      '& a': {color: '#000'},
    },
    logo: {
      color: 'inherit',
      opacity: {
        xs: searchExpanded ? '0' : '1',
        md: '1',
      },
      marginInline: {
        xs: '0',
        md: '30px',
      },
      '& i': {
        color: 'inherit',
        width: '60px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    nav: {
      flexDirection: 'row',
      gap: '10px',
      display: searchExpanded ? 'none' : 'flex',
      '& button': {color: '#000'},
    },
    search: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: '1',
      justifyContent: 'flex-end',
      marginRight: '12px',
    },
    bagIcon: {display: searchExpanded ? 'none' : ''},
    searchIcon: {
      color: 'inherit',
      display: {
        xs: searchExpanded ? 'none' : 'flex',
        md: 'none',
      },
      flex: '0 0 56px',
    },
    closeIcon: {
      color: 'inherit',
      display: searchExpanded ? 'flex' : 'none',
      flex: '0 0 56px',
    },
    menuIcon: {
      color: 'inherit',
      display: {
        xs: 'flex',
        md: 'none',
      },
      flex: '0 0 56px',
    },
    icons: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& i': {fontSize: '24px'},
      '& > *': {
        margin: 0,
      },
    },
    overlay: {
      display: searchExpanded || isToggled ? 'flex' : 'none',
      opacity: searchExpanded || isToggled ? '0.85' : '0',
      position: 'fixed',
      top: '0',
      right: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#F3F3F3',
      zIndex: 60,
    },
  };

  const handleMenuCLick = () => {
    toggle();
    searchExpanded && setSearchExpanded(false);
  };

  const handleClose = () => {
    setSearchExpanded(false);
  };

  const handleFocusInputResponsive = useCallback(
    ({isToggled, setIsToggled, setSearchExpanded, searchInputRef}) => {
      setTimeout(() => {
        searchInputRef.current && searchInputRef.current.focus();
      }, 1000);
      setSearchExpanded(true);
      isToggled && setIsToggled(false);
    },
    [],
  );

  useEffect(() => {
    if (
      !router.asPath.includes('search?') &&
      router.asPath.includes('search')
    ) {
      handleFocusInputResponsive({
        isToggled,
        setIsToggled,
        setSearchExpanded,
        searchInputRef,
      });
    }
  }, [
    router.asPath,
    handleFocusInputResponsive,
    isToggled,
    setIsToggled,
    setSearchExpanded,
  ]);

  return (
    <>
      <Box sx={navStyles.box} />
      <AppBar sx={navStyles.appBar}>
        <Toolbar sx={navStyles.toolBar}>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="logo"
              sx={navStyles.logo}
            >
              <Typography component="i" className="icon-logo"></Typography>
            </IconButton>
          </Link>
          <Stack component="nav" sx={navStyles.nav}>
            <Link href="/">
              <Button>Products</Button>
            </Link>
          </Stack>
          <Box sx={navStyles.search}>
            <Searchbar
              searchExpanded={searchExpanded}
              setSearchExpanded={setSearchExpanded}
              ref={searchInputRef}
            />
            <Box sx={navStyles.icons}>
              <IconButton size="large" aria-label="Bag" sx={navStyles.bagIcon}>
                <Cart count={cartCount} />
              </IconButton>
              <IconButton
                size="large"
                onClick={handleFocusInputResponsive}
                aria-label="Search"
                sx={navStyles.searchIcon}
              >
                <i className="icon-search"></i>
              </IconButton>
              <IconButton
                size="large"
                aria-label="Menu"
                onClick={handleClose}
                sx={navStyles.closeIcon}
              >
                <Typography component="i" className={'icon-close'}></Typography>
              </IconButton>

              <IconButton
                size="large"
                aria-label="Menu"
                onClick={handleMenuCLick}
                sx={navStyles.menuIcon}
              >
                <Typography component="i" className={'icon-menu'}></Typography>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={navStyles.overlay}
        onClick={() => setSearchExpanded(false)}
      ></Box>
    </>
  );
};

export default memo(NavBar);
