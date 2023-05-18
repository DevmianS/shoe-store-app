import Image from 'next/image';
import {useState} from 'react';
import {Typography, Stack, Box, useMediaQuery, IconButton} from '@mui/material';
import {useTheme} from '@mui/material/styles';

import {rwdValue} from '@/utils/theme';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function ProductCard({title, price, category, imgPath}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            '& > button': {
              opacity: 1,
            },
          }
        : {},
      '& > button': {
        opacity: isDesktop ? 0 : 1,
      },
    },

    body: {position: 'relative'},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'start',
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
        fontSize: rwdValue(8, 18),
        background: '#B9B8B4',
        padding: '0 5px',
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
  };
  if (!imgPath) {
    return;
  }
  return (
    <Box sx={styles.column}>
      <Box sx={styles.card}>
        <Box
          sx={{
            ...styles.image,
          }}
        >
          <Image
            layout="fill"
            src={`https://shoes-shop-strapi.herokuapp.com${imgPath[currentImageIndex]?.attributes?.url}`}
            alt={`Shoes name: ${title} ${imgPath[currentImageIndex]?.attributes?.alternativeText}`}
          />
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
            disabled={currentImageIndex === imgPath.length - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
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
      </Box>
    </Box>
  );
}
