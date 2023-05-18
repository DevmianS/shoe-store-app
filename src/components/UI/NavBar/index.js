import Link from 'next/link';
import {memo, useRef, useState, useEffect} from 'react';

import {AppBar, Button, IconButton, Stack, Toolbar, Box} from '@mui/material';

import {useToggle} from '@/context/ToggleContext';

import Cart from '@/components/UI/Cart';
import Searchbar from '@/components/UI/Searchbar';

// TEMP
import NestedList from './allPages';
import {useRouter} from 'next/router';

const NavBar = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const {isToggled, toggle} = useToggle();
  const router = useRouter();

  const ref = useRef(null);

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
      <style jsx global>{`
        body {
          overflow: ${isToggled ? 'hidden' : 'visible'};
        }
      `}</style>
      <Box
        sx={{
          width: '100%',
          minHeight: {
            xs: '60px',
            md: '120px',
          },
        }}
      />
      <AppBar
        position="static"
        sx={{
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
        }}
      >
        <Toolbar
          sx={{
            padding: {
              xs: '0',
              md: '',
            },
            height: {
              xs: '60px',
              md: '120px',
            },
            '& a': {color: '#000'},
          }}
        >
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{
                opacity: {
                  xs: searchExpanded ? '0' : '1',
                  md: '1',
                },
                marginInline: {
                  xs: '0',
                  md: '30px',
                },
              }}
            >
              <i
                color="inherit"
                sx={{
                  width: '60px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="icon-logo"
              ></i>
            </IconButton>
          </Link>
          <Stack
            component="nav"
            direction="row"
            spacing={2}
            sx={{
              display: searchExpanded ? 'none' : 'flex',
            }}
          >
            <Link href="/">
              <Button sx={{color: '#000'}}>Products</Button>
            </Link>
            <NestedList />
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '12px',
              flexGrow: '1',
              justifyContent: 'flex-end',
            }}
          >
            <Searchbar
              searchExpanded={searchExpanded}
              setSearchExpanded={setSearchExpanded}
              ref={ref}
            />
            <Stack direction="row" spacing={1}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Bag"
                sx={{display: searchExpanded ? 'none' : ''}}
              >
                <Cart count={5} />
              </IconButton>

              <IconButton
                size="large"
                onClick={handleFocusInputResponsive}
                edge="start"
                color="inherit"
                aria-label="Search"
                sx={{
                  display: {
                    xs: searchExpanded ? 'none' : 'flex',
                    md: 'none',
                  },
                  marginInline: '30px',
                }}
              >
                <i className={`icon-search `}></i>
              </IconButton>

              <IconButton
                size="large"
                sx={{
                  display: searchExpanded ? 'flex' : 'none',
                  marginInline: '30px',
                }}
                edge="start"
                color="inherit"
                aria-label="Close"
                onClick={() => setSearchExpanded(false)}
              >
                <i className={`icon-close `}></i>
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Menu"
                sx={{
                  display: {
                    xs: searchExpanded ? 'none' : 'flex',
                    md: 'none',
                  },
                  marginInline: '30px',
                }}
                onClick={toggle}
              >
                <i className={`icon-menu `}></i>
              </IconButton>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: searchExpanded || isToggled ? 'flex' : 'none',
          opacity: searchExpanded || isToggled ? '0.85' : '0',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#F3F3F3',
          zIndex: 10,
        }}
      ></Box>
    </>
  );
};

export default memo(NavBar);
