import {AppBar, Button, IconButton, Stack, Toolbar, Box} from '@mui/material';
import React, {useRef} from 'react';
import styles from './NavBar.module.css';
import Link from 'next/link';

import {createPortal} from 'react-dom';

import {useState} from 'react';
import {Typography, InputBase} from '@mui/material';

import {styled, alpha} from '@mui/material/styles';

import Cart from '../Cart/index.js';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  border: '1px solid #494949',
  borderRadius: '42px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  minWidth: '20%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  overflow: 'hidden',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    minWidth: '100%',
    width: '100%',
  },
}));

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const ref = useRef(null);

  const handleFocusInputResponsive = () => {
    setExpanded(true);
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  const [expandedResponsive, setExpandedResponsive] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        className={`${styles.nav} ${expanded ? styles.navExpanded : ''}`}
        sx={{
          height: {
            xs: expanded ? '200px' : '60px',
            md: expanded ? '420px' : '120px',
          },
        }}
      >
        <Toolbar
          className={styles.toolbar}
          sx={{
            padding: {
              xs: '0',
              md: '',
            },
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{
              opacity: {
                xs: expanded ? '0' : '1',
                md: '1',
              },
              marginInline: {
                xs: '0',
                md: '30px',
              },
            }}
          >
            <Link href="home" className={styles.link}>
              <i className={` icon-logo ${styles.icon}`}></i>
            </Link>
          </IconButton>
          <Stack
            direction="row"
            spacing={2}
            className={expanded && styles.displayNone}
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Button color="inherit" className={styles.button}>
              <Link href="home" className={styles.link}>
                Home
              </Link>
            </Button>
            <Button color="inherit" className={styles.button}>
              <Link href="search" className={styles.link}>
                For woman
              </Link>
            </Button>
            <Button color="inherit" className={styles.button}>
              <Link href="search" className={styles.link}>
                For men
              </Link>
            </Button>
            <Button color="inherit" className={styles.button}>
              <Link href="search" className={styles.link}>
                Accessories
              </Link>
            </Button>
            <Button color="inherit" className={styles.button}>
              <Link href="search" className={styles.link}>
                Sale
              </Link>
            </Button>
          </Stack>
          <div className={styles.searchContainer}>
            <Search
              onClick={() => setExpanded(true)}
              onBlur={() => setExpanded(false)}
              className={`${styles.search} ${
                expanded ? styles.searchExpanded : ''
              }`}
              sx={{
                display: {
                  xs: expanded ? 'flex' : 'none',
                  md: 'flex',
                },
              }}
            >
              <SearchIconWrapper>
                <i className="icon-search"></i>
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
                inputRef={ref}
              />
            </Search>

            <Stack direction="row" spacing={1}>
              <IconButton
                size="large"
                className={`${expanded ? styles.displayNone : ''}`}
                edge="start"
                color="inherit"
                aria-label="Bag"
              >
                <Cart count={5} />
                {/*   <Link href="bag" className={styles.link}>
                   <i className={`icon-bag `}></i> 
                </Link> */}
              </IconButton>
              <IconButton
                size="large"
                onClick={handleFocusInputResponsive}
                className={`${styles.iconContainer} ${
                  expanded ? styles.displayNone : ''
                }`}
                edge="start"
                color="inherit"
                aria-label="Search"
                sx={{
                  display: {
                    xs: 'flex',
                    md: 'none',
                  },
                }}
              >
                <i className={`icon-search `}></i>
              </IconButton>

              <IconButton
                size="large"
                className={`${styles.iconContainer} ${
                  expanded ? '' : styles.displayNone
                }`}
                edge="start"
                color="inherit"
                aria-label="Close"
                onClick={() => setExpanded(false)}
              >
                <i className={`icon-close `}></i>
              </IconButton>
              <IconButton
                size="large"
                className={`${styles.iconContainer} ${
                  expanded ? styles.displayNone : ''
                }`}
                edge="start"
                color="inherit"
                aria-label="Menu"
                sx={{
                  display: {
                    xs: 'flex',
                    md: 'none',
                  },
                }}
                onClick={() => setExpandedResponsive(true)}
              >
                <i className={`icon-menu `}></i>
              </IconButton>
            </Stack>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        className={styles.shadowScreen}
        sx={{
          display: expandedResponsive ? 'flex' : 'none',
          opacity: expandedResponsive ? '0.85' : '0',
        }}
      ></Box>
      <Box
        className={styles.navResponsive}
        sx={{transform: expandedResponsive ? '' : 'translateX(1000px)'}}
      >
        <Button
          color="inherit"
          className={styles.navResponsive__close}
          onClick={() => setExpandedResponsive(false)}
        >
          <i className={`icon-close ${styles.i}`}></i>
        </Button>
        <Stack
          direction="column"
          spacing={1}
          className={styles.navResponsiveLinks}
        >
          <Button color="inherit" className={styles.buttonResponsive}>
            <Link href="/home" className={styles.link}>
              <i className={`icon-chevron-left ${styles.i}`}></i>
              <p className={styles.p}>Home</p>
            </Link>
          </Button>
          <Button color="inherit" className={styles.buttonResponsive}>
            <Link href="search" className={styles.link}>
              <i className={`icon-bonus-account ${styles.i}`}></i>
              <p className={styles.p}>Products</p>
            </Link>
          </Button>
          <Button color="inherit" className={styles.buttonResponsive}>
            <Link href="bag" className={styles.link}>
              <i className={`icon-bag ${styles.i}`}></i>
              <p className={styles.p}>Bag</p>
            </Link>
          </Button>
          <Button color="inherit" className={styles.buttonResponsive}>
            <Link href="profile" className={styles.link}>
              <i className={`icon-profile ${styles.i}`}></i>
              <p className={styles.p}>My profile</p>
            </Link>
          </Button>
          <Button color="inherit" className={styles.buttonResponsive}>
            <Link href="" className={styles.link}>
              <i className={`icon-logout ${styles.i}`}></i>
              <p className={styles.p}>Log out</p>
            </Link>
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default NavBar;
