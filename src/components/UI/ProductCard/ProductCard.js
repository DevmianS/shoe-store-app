import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {
  Typography,
  Stack,
  Box,
  useMediaQuery,
  IconButton,
  Button as MUIButton,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import {rwdValue} from '@/utils/theme';
import {useCart} from '@/context/CartContext';

import Button from '@/components/UI/Button';
import {useRouter} from 'next/router';
import OptionsMenu from './OptionsMenu';

export default function ProductCard({
  productId,
  title,
  price,
  category,
  imgPath,
  showOptions,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {addProduct} = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    console.log('prev', currentImageIndex);
    if (currentImageIndex > 0) {
      console.log('true');
      setCurrentImageIndex(prevState => prevState - 1);
    }
  };

  const goToNextImage = () => {
    console.log(
      'next',
      currentImageIndex,
      currentImageIndex < imgPath.length - 1,
      currentImageIndex,
      imgPath.length - 1,
    );
    if (currentImageIndex < imgPath.length - 1) {
      console.log('true');
      setCurrentImageIndex(prevState => prevState + 1);
    }
  };
  const styles = {
    column: isMobile
      ? {
          flex: '0 0 50%',
          padding: '0 8px',
          marginBottom: '16px',
        }
      : isTablet
      ? {
          flex: '0 0 33.333%',
          padding: '0 15px',
          marginBottom: '15px',
        }
      : {
          flex: '0 0 25%',
          padding: '0 24px',
          marginBottom: '24px',
        },
    card: {
      position: 'relative',
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
      '& img': {
        position: 'absolute',
        background: 'primary',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: '1s',
      },
    },
    threeDots: {
      position: 'absolute',
      right: 10,
      top: 0,
      opacity: 1,
      minWidth: '16px',
      height: '32px',
      '&.MuiButtonBase-root:hover': {
        bgcolor: 'transparent',
      },
      span: {
        fontWeight: 700,
        fontSize: rwdValue(14, 32),
      },
    },
    image: {
      position: 'relative',
      width: '100%',
      paddingBottom: '120%',
      marginBottom: '12px',
      overflow: 'hidden',
      background: 'lightgrey',
      '&:hover': isDesktop
        ? {
            cursor: 'pointer',
            '& img': {
              transition: '1s',
              transform: 'scale(1.25)',
            },
            '& button': {
              opacity: 1,
            },
            '& .actions': {
              transform: 'translate(-50%,0)',
              transition: '0.5s',
            },
          }
        : {},
      '& button': {
        opacity: {xs: 1, md: 0},
      },
    },

    body: {position: 'relative'},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'start',
      gap: '5px',
    },
    title: {
      fontSize: rwdValue(10, 22),
      fontWeight: 500,
      marginBottom: '5px',
    },
    categoryRow: {
      color: theme.palette.text.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      flexDirection: 'row',
      flexWrap: 'wrap',

      '& h4': {
        fontSize: rwdValue(7, 16),
        background: '#B9B8B4',
        padding: '3px 12px',
        borderRadius: '10px',
        margin: '3px',
        color: '#fff',
        '&.Running': {background: '#E16200'},
        '&.Athletic': {background: '#D18D47'},
        '&.Tennis': {background: '#31C1B0'},
        '&.Casual': {background: '#92BB41'},
        '&.Tracking': {background: '#19976A'},
      },
    },
    iconBtn: {
      width: 28,
      height: 28,
      border: '1px solid #fff',
      borderRadius: 32,
      backgroundColor: '#fff',
      m: 1,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 3,
      opacity: 0,
      transition: '0.3s all',
      '&:disabled': {backgroundColor: 'lightgrey', borderColor: 'lightgrey'},
      '&:hover': isDesktop
        ? {
            backgroundColor: '#fe645e',
            borderColor: '#fe645e',
            color: '#fff',
          }
        : {},
    },
    actions: {
      display: 'flex',
      gap: '10px',
      position: 'absolute',
      bottom: rwdValue(10, 20),
      left: '50%',
      transform: {xs: 'translate(-50%,0)', md: 'translate(-50%,20px)'},
      zIndex: 3,
      transition: '0.5s',
      '& span': {
        fontSize: rwdValue(18, 24),
        lineHeight: rwdValue(32, 40),
        color: '#fff',
      },
      '& button': {
        width: rwdValue(32, 40),
        minWidth: rwdValue(32, 40),
        height: rwdValue(32, 40),
      },
    },
  };

  const handleOutsideClick = useCallback(({target}) => {
    const openedMenu = document.getElementsByClassName('three-dots-menu')[0];
    if (!openedMenu.contains(target)) setIsMenuVisible(false);
  }, []);

  useEffect(() => {
    if (isMenuVisible)
      window.addEventListener('click', handleOutsideClick, true);
    else window.removeEventListener('click', handleOutsideClick, true);
  }, [isMenuVisible, handleOutsideClick]);

  return (
    <Box sx={styles.column}>
      <Box sx={styles.card}>
        <Box sx={styles.image}>
          <Box sx={styles.actions} className="actions">
            <Button
              size={isDesktop ? 'medium' : 'small'}
              onClick={() => addProduct({productId, title})}
            >
              <Typography
                component="span"
                className="icon-add-to-cart"
                title={`Add ${title} to the cart`}
              />
            </Button>
            <Button
              size={isDesktop ? 'medium' : 'small'}
              onClick={() => router.push(`/products/${productId}`)}
            >
              <Typography
                component="span"
                className="icon-search"
                title={`Open ${title} page`}
              />
            </Button>
          </Box>
          <Image
            src={
              imgPath
                ? imgPath[currentImageIndex]?.attributes?.url
                : '/productImageComingSoon.png'
            }
            alt={`Shoes name: ${title} ${
              imgPath && imgPath[currentImageIndex]?.attributes?.alternativeText
            }`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 15vw, 20vw"
          />
          {imgPath && (
            <>
              <IconButton
                sx={styles.iconBtn}
                onClick={goToPreviousImage}
                disabled={currentImageIndex === 0}
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                sx={{...styles.iconBtn, right: 0}}
                onClick={goToNextImage}
                disabled={currentImageIndex === imgPath?.length - 1}
              >
                <KeyboardArrowRight />
              </IconButton>
            </>
          )}
        </Box>
        <Box sx={styles.body}>
          <Stack sx={styles.header}>
            <Typography component="h3" sx={styles.title}>
              {title || 'Product title'}
            </Typography>
            <Typography component="span" sx={styles.title}>
              ${price || '100'}
            </Typography>
          </Stack>
          <Stack sx={styles.categoryRow}>
            {typeof imgPath?.src === 'string'
              ? category
              : category.map(cat => {
                  return (
                    <Typography
                      sx={styles.category}
                      component="h4"
                      key={cat.id}
                      className={cat.attributes.name}
                    >
                      {cat.attributes.name}
                    </Typography>
                  );
                })}
          </Stack>
        </Box>
        {showOptions && (
          <>
            <MUIButton
              variant="text"
              disableRipple
              size={isDesktop ? 'medium' : 'small'}
              sx={styles.threeDots}
              onClick={() => {
                setIsMenuVisible(prev => !prev);
              }}
            >
              <Typography component="span" className="three-dots">
                ...
              </Typography>
            </MUIButton>
            {isMenuVisible && <OptionsMenu productId={productId} />}
          </>
        )}
      </Box>
    </Box>
  );
}
