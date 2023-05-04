import {AppBar, Button, IconButton, Stack, Toolbar} from '@mui/material';
import React from 'react';
import styles from './NavBar.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        height: '120px',
        justifyContent: 'center',
        borderBottom: '1px solid #EAECF0',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          sx={{marginX: '30px'}}
          edge="start"
          color="inherit"
          aria-label="logo"
        >
          <i className={`icon-logo ${styles.icon}`}></i>
        </IconButton>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" className={styles.button}>
            <Link href="home" className={styles.link}>
              Home
            </Link>
          </Button>
          <Button color="inherit" className={styles.button}>
            <Link href="home" className={styles.link}>
              For woman
            </Link>
          </Button>

          <Button color="inherit" className={styles.button}>
            <Link href="home" className={styles.link}>
              For men
            </Link>
          </Button>
          <Button color="inherit" className={styles.button}>
            <Link href="home" className={styles.link}>
              Accessories
            </Link>
          </Button>
          <Button color="inherit" className={styles.button}>
            <Link href="home" className={styles.link}>
              Sale
            </Link>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
