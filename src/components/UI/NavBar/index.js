import Link from 'next/link';
import {useRouter} from 'next/router';
import {memo, useRef, useEffect} from 'react';

import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Cart from '@/components/UI/Cart';
import Searchbar from '@/components/UI/Searchbar';

import {useSearch} from '@/context/SearchContext';
import {useToggle} from '@/context/ToggleContext';

// TEMP
import NestedList from './allPages';

const NavBar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const {isToggled, toggle} = useToggle();
  const {searchExpanded, setSearchExpanded} = useSearch();

  const searchInputRef = useRef();
  const router = useRouter();

  const styles = {
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
      display: isDesktop ? 'none' : searchExpanded ? 'none' : 'flex',
      flex: '0 0 56px',
    },
    menuIcon: {
      color: 'inherit',
      display: isDesktop ? 'none' : 'flex',
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
      zIndex: 5,
    },
  };

  const handleFocusInputResponsive = () => {
    setTimeout(() => {
      searchInputRef.current && searchInputRef.current.focus();
    }, 100);
    setSearchExpanded(true);
  };

  useEffect(() => {
    if (router.asPath.includes('search')) {
      handleFocusInputResponsive();
    }
  }, [router]);

  return (
    <>
      <Box sx={styles.box} />
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.toolBar}>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="logo"
              sx={styles.logo}
            >
              <Typography component="i" className="icon-logo"></Typography>
            </IconButton>
          </Link>
          <Stack component="nav" sx={styles.nav}>
            <Link href="/">
              <Button>Products</Button>
            </Link>
            <NestedList />
          </Stack>
          <Box sx={styles.search}>
            <Searchbar
              searchExpanded={searchExpanded}
              setSearchExpanded={setSearchExpanded}
              ref={searchInputRef}
            />
            <Box sx={styles.icons}>
              <IconButton size="large" aria-label="Bag" sx={styles.bagIcon}>
                <Cart count={5} />
              </IconButton>
              <IconButton
                size="large"
                onClick={handleFocusInputResponsive}
                aria-label="Search"
                sx={styles.searchIcon}
              >
                <i className="icon-search"></i>
              </IconButton>
              <IconButton
                size="large"
                aria-label="Menu"
                onClick={toggle}
                sx={styles.menuIcon}
              >
                <Typography
                  component="i"
                  className={isToggled ? 'icon-close' : 'icon-menu'}
                ></Typography>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={styles.overlay} onClick={() => setSearchExpanded(false)}></Box>
    </>
  );
};

export default memo(NavBar);
