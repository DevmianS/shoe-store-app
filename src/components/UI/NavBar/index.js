import Link from 'next/link';
import {memo, useRef} from 'react';


import {AppBar, Button, IconButton, Stack, Toolbar, Box} from '@mui/material';

import Cart from '@/components/UI/Cart';
import Searchbar from '@/components/UI/Searchbar';

import {useSearch} from '@/context/SearchContext';
import {useToggle} from '@/context/ToggleContext';

// TEMP
import NestedList from './allPages';
import useOwnStyles from '@/utils/styles';


const NavBar = () => {
  const {isToggled, toggle} = useToggle();
  const {searchExpanded, setSearchExpanded} = useSearch();
  const searchInputRef = useRef();

  const {navBar: styles} = useOwnStyles();

  const handleFocusInputResponsive = () => {
    setTimeout(() => {
      ref.current && ref.current.focus();
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
              ref={ref}
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
