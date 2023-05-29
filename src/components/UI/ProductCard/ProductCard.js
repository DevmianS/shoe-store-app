import Image from 'next/image';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import {Button as MUIButton} from '@mui/material/Button';

import {rwdValue, theme} from '@/utils/theme';
import useUser from '@/hooks/useUser';
import {deleteProduct} from '@/utils/utils';

import OptionsMenu from './OptionsMenu';
import Modal from '@/components/UI/Modal';
import Loading from '@/components/UI/Modal';

export default function ProductCard({
  productId,
  title,
  price,
  category,
  imgPath,
  showOptions,
  onEdit,
}) {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
      '&:hover': {
        cursor: 'pointer',
        '& img': {
          transition: '1s',
          transform: 'scale(1.25)',
        },
        '& button': {
          opacity: 1,
        },
      },
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
      wordBreak: 'break-all',
    },
    price: {
      textAlign: 'right',
      maxWidth: rwdValue(40, 85),
      paddingLeft: '3px',
      wordBreak: 'keep-all',
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
        '&.Volleyball': {background: '#B34EE9'},
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

      '&:hover': {
        backgroundColor: '#fe645e',
        borderColor: '#fe645e',
        color: '#fff',
      },
    },
    disabled: {
      backgroundColor: 'lightgrey',
      borderColor: 'lightgrey',
    },
  };

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteConfVisible, setDeleteConfVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {jwt} = useUser();

  const goToPreviousImage = e => {
    e.stopPropagation();
    console.log('prev', currentImageIndex);
    if (currentImageIndex > 0) {
      console.log('true');
      setCurrentImageIndex(prevState => prevState - 1);
    }
  };

  const goToNextImage = e => {
    e.stopPropagation();
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

  const handleOutsideClick = useCallback(({target}) => {
    const openedMenu = document.getElementsByClassName('three-dots-menu')[0];
    if (!openedMenu.contains(target)) setIsMenuVisible(false);
  }, []);

  const deleteProductHandler = async () => {
    try {
      setLoading(true);
      await deleteProduct({id: productId, jwt});
      router.reload();
    } catch {
      setLoading(false);
      setDeleteConfVisible(false);
      error => {
        throw new Error(error);
      };
    }
    setDeleteConfVisible(false);
    setLoading(false);
  };

  useEffect(() => {
    if (isMenuVisible)
      window.addEventListener('click', handleOutsideClick, true);
    else window.removeEventListener('click', handleOutsideClick, true);
  }, [isMenuVisible, handleOutsideClick]);

  return (
    <Box sx={styles.column}>
      <Box sx={styles.card}>
        <Box
          sx={styles.image}
          onClick={e => {
            e.stopPropagation();
            router.push(`/products/${productId}`);
          }}
        >
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
                sx={{
                  ...styles.iconBtn,
                  ...(currentImageIndex === 0 ? styles.disabled : ''),
                }}
                onClick={goToPreviousImage}
              >
                <Typography component="i" className="icon-chevron-left" />
              </IconButton>
              <IconButton
                sx={{
                  ...styles.iconBtn,
                  ...(currentImageIndex === imgPath?.length - 1
                    ? styles.disabled
                    : ''),
                  right: 0,
                }}
                onClick={goToNextImage}
              >
                <Typography component="i" className="icon-chevron-right" />
              </IconButton>
            </>
          )}
        </Box>
        <Box sx={styles.body}>
          <Stack sx={styles.header}>
            <Typography component="h3" sx={styles.title}>
              {title || 'Product title'}
            </Typography>
            <Typography
              component="span"
              sx={{
                ...styles.title,
                ...styles.price,
              }}
            >
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
            {isMenuVisible && (
              <OptionsMenu
                confirmationHandler={setDeleteConfVisible}
                productId={productId}
                onEdit={onEdit}
              />
            )}
          </>
        )}

        {deleteConfVisible && (
          <Modal
            state={true}
            setState={setDeleteConfVisible}
            title={'Are you sure to delete selected item?'}
            text={
              'Deleting this product is irreversible. Are you absolutely certain you want to proceed with the deletion? Once deleted, all associated data will be permanently lost.'
            }
            submitAction={deleteProductHandler}
          >
            {loading && <Loading />}
          </Modal>
        )}
      </Box>
    </Box>
  );
}
