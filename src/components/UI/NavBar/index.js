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

const NavBar = () => {
  const [expandedResponsive, setExpandedResponsive] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const ref = useRef(null);

  const handleFocusInputResponsive = () => {
    setExpanded(true);
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: {
            xs: expanded ? '200px' : '60px',
            md: expanded ? '420px' : '120px',
          },
          backgroundColor: '#fff',
          color: '#000',
          justifyContent: 'center',
          borderBottom: '1px solid #eaecf0',
          boxShadow: 'none',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <Toolbar
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
            direction="row"
            spacing={2}
            sx={{
              display: {
                xs: 'none',
                md: expanded ? 'none' : 'flex',
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
              onClick={() => setExpanded(true)}
              onBlur={() => setExpanded(false)}
              sx={{
                display: {
                  xs: expanded ? 'flex' : 'none',
                  md: 'flex',
                },
                transition: 'all 0.5s ease-in-out',
                marginRight: '15px',
                minWidth: expanded ? '95%' : '',
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
                sx={{display: expanded ? 'none' : ''}}
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
                    xs: expanded ? 'none' : 'flex',
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
                  display: expanded ? 'flex' : 'none',
                  marginInline: '30px',
                }}
                edge="start"
                color="inherit"
                aria-label="Close"
                onClick={() => setExpanded(false)}
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
                    xs: expanded ? 'none' : 'flex',
                    md: 'none',
                  },
                  marginInline: '30px',
                }}
                onClick={() => setExpandedResponsive(true)}
              >
                <i className={`icon-menu `}></i>
              </IconButton>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: expandedResponsive ? 'flex' : 'none',
          opacity: expandedResponsive ? '0.85' : '0',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#F3F3F3',
          transition: 'all 2s ease-in-out',
        }}
      ></Box>
      <Box
        sx={{
          transform: expandedResponsive ? '' : 'translateX(1000px)',
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
        }}
      >
        <Button
          color="inherit"
          onClick={() => setExpandedResponsive(false)}
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
