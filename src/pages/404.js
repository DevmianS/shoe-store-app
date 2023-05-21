import Head from 'next/head';
import Link from 'next/link';
import {useState, useEffect} from 'react';

import {Typography, Box, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';
import {SkeletonProducts} from '@/utils/utils';

import {useCart} from '@/context/CartContext';
import useProducts from '@/hooks/useProducts';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import SideBar from '@/components/Layout/SideBar';

import Button from '@/components/UI/Button';
import CartProductItem from '@/components/UI/CartProductItem';
import Summary from '@/components/UI/Summary';

const pageTitle = 'Error 404!';
const msgText =
  "We're sorry, but the page you requested cannot be found. It may have been removed, had its name changed, or is temporarily unavailable. Please check the URL for proper spelling and capitalization, or try searching for the page using our site search feature. If you continue to experience problems, please contact our support team for assistance.";

function ErrorPage404() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {};

  return (
    <>
      <Head>
        <title>Wellrun | 404</title>
      </Head>

      <NavBarLayout></NavBarLayout>
    </>
  );
}

export default ErrorPage404;
