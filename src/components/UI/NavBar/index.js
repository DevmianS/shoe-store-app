import React, {useRef} from 'react';

import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Box,
  Link,
  Typography,
} from '@mui/material';

import Cart from '../Cart';

import {useState} from 'react';

import {
  buttonsArray,
  buttonsArrayResponsive,
  Search,
  StyledInputBase,
  SearchIconWrapper,
  LinkStyles,
} from './utils';
import NestedList from './allPages';

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const ref = useRef(null);

  const handleFocusInputResponsive = () => {
    setSearchExpanded(true);
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: {
            xs: '60px',
            md: '120px',
          },
          width: '100%',
        }}
      ></Box>

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
          }}
        >
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
            <Link
              href="home"
              sx={{
                ...LinkStyles,
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
            </Link>
          </IconButton>
          <Stack
            component="nav"
            direction="row"
            spacing={2}
            sx={{
              display: {
                xs: 'none',
                md: searchExpanded ? 'none' : 'flex',
              },
            }}
          >
            {buttonsArray.map(button => (
              <Button key={button.text} color="inherit">
                <Link
                  href={button.link}
                  sx={{
                    ...LinkStyles,
                  }}
                >
                  {button.text}
                </Link>
              </Button>
            ))}
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
            <Search
              onClick={() => setSearchExpanded(true)}
              onBlur={() => setSearchExpanded(false)}
              sx={{
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
                onClick={() => setMobileMenu(true)}
              >
                <i className={`icon-menu `}></i>
              </IconButton>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: searchExpanded || mobileMenu ? 'flex' : 'none',
          opacity: searchExpanded || mobileMenu ? '0.85' : '0',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#F3F3F3',
        }}
      ></Box>

      <Box
        sx={{
          transform: mobileMenu ? '' : 'translateX(1000px)',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '270px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderLeft: '1px solid #eaecf0',
          transition: 'all 0.5s ease-in-out',
          zIndex: '300',
        }}
      >
        <Button
          color="inherit"
          onClick={() => setMobileMenu(false)}
          sx={{
            width: '100%',
            height: '60px',
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            color: '#000',
          }}
        >
          <Box className="icon-close" sx={{fontSize: '25px'}}></Box>
        </Button>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: '100%',
            height: '100%',
            textAlign: 'start',
            padding: '30px',
          }}
        >
          {buttonsArrayResponsive.map(button => (
            <Button
              color="inherit"
              key={button.text}
              sx={{
                width: '150px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignCtems: 'center',
                color: '#000',
              }}
            >
              <Link
                color="inherit"
                href={button.link}
                sx={{
                  ...LinkStyles,
                }}
              >
                <Box
                  className={`icon-${button.icon}`}
                  sx={{fontSize: '25px'}}
                ></Box>

                <Typography color="inherit" sx={{marginLeft: ' 20px'}}>
                  {button.text}
                </Typography>
              </Link>
            </Button>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default NavBar;
