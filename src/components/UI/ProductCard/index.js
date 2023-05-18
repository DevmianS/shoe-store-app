import Image from 'next/image';
import {Typography, Stack, Box, useMediaQuery, IconButton} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {rwdValue} from '@/utils/theme';
import {useState} from 'react';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const testArr = [
  {
    id: 1,
    attributes: {
      alternativeText: 'alternativeText1',
      url: 'https://nikearprod.vtexassets.com/arquivos/ids/452149-800-800?v=638149279495400000&width=800&height=800&aspect=true',
    },
  },
  {
    id: 2,
    attributes: {
      alternativeText: 'alternativeText2',
      url: 'https://nikearprod.vtexassets.com/arquivos/ids/439639-800-800?v=638145705671000000&width=800&height=800&aspect=true',
    },
  },
];

export default function ProductCard({title, price, category, imgPath}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    console.log('prev', currentImageIndex, testArr);
    if (currentImageIndex > 0) {
      console.log('true');
      setCurrentImageIndex(prevState => prevState - 1);
    }
  };


  const goToNextImage = () => {
    console.log(
      'next',
      currentImageIndex,
      testArr,
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
          }
        : {},
    },
    body: {position: 'relative'},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: rwdValue(10, 22),
      fontWeight: 500,
    },
    category: {
      fontSize: rwdValue(8, 18),
      color: theme.palette.text.secondary,
    },
  };

  return (
    <Box sx={styles.column}>
      <Box sx={styles.card}>
        <Box
          sx={{
            ...styles.image,
            position: 'relative',
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
          }}
        >
          <Image
            layout="fill"
            src={`https://shoes-shop-strapi.herokuapp.com${imgPath[currentImageIndex]?.attributes?.url}`}
            alt={`Shoes name: ${title} ${imgPath[currentImageIndex]?.attributes?.alternativeText}`}
          />
          <IconButton
            sx={{
              width: 28,
              height: 28,
              border: '1px solid #000',
              borderRadius: 32,
              m: 1,
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 300,
              opacity: 0,
              transition: '0.3s all',
            }}
            onClick={goToPreviousImage}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            sx={{
              width: 28,
              height: 28,
              border: '1px solid #000',
              borderRadius: 32,
              m: 1,
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 300,
              opacity: 0,
              transition: '0.3s all',
            }}
            onClick={goToNextImage}
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
          <Typography sx={styles.category} component="h4">
            {typeof imgPath?.src === 'string'
              ? category
              : category.map(cat => {
                  return <p key={cat.id}>{cat.attributes.name}</p>;
                })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
