import Image from 'next/image';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MUIButton from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {rwdValue, theme} from '@/utils/theme';
import {deleteProduct} from '@/utils/utils';
import useUser from '@/hooks/useUser';
import {useCart} from '@/context/CartContext';

import OptionsMenu from './OptionsMenu';
import Modal from '@/components/UI/Modal';
import Loading from '@/components/UI/Loading';
import Button from '@/components/UI/Button';

const productCardStyles = {
  column: {
    flexBasis: {xs: '50%', md: '33.333%', lg: '25%'},
    padding: {xs: '0 8px', md: '0 15px', lg: '0 24px'},
    marginBottom: {xs: '8px', md: '15px', lg: '24px'},
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
  addProduct: {
    position: 'absolute',
    zIndex: 5,
    bottom: rwdValue(20, 50),
    left: '50%',
    transform: 'translateX(-50%)',
    '& button': {
      opacity: {xs: 1, md: 0},
      width: rwdValue(32, 64),
      height: rwdValue(32, 64),
      minHeight: rwdValue(32, 64),
      minWidth: rwdValue(32, 64),
      borderRadius: '50%',
      transition: '0.5s',
      '&:active': {
        transform: 'scale(0.9)',
      },
    },
    '& i': {
      fontSize: rwdValue(20, 28),
      color: '#fff',
    },
  },
};

export default function ProductCard({
  productId,
  title,
  price,
  category,
  imgPath,
  showOptions,
  onEdit,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteConfVisible, setDeleteConfVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {jwt, status} = useUser();
  const {addProduct} = useCart();

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({queryKey: ['products']});
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
    const handleOutsideClickWrapper = event => {
      handleOutsideClick(event);
    };

    if (isMenuVisible) {
      window.addEventListener('click', handleOutsideClickWrapper, true);
    } else {
      window.removeEventListener('click', handleOutsideClickWrapper, true);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClickWrapper, true);
    };
  }, [isMenuVisible, handleOutsideClick]);

  return (
    <Box sx={productCardStyles.column}>
      <Box sx={productCardStyles.card}>
        <Box
          sx={productCardStyles.image}
          onClick={e => {
            e.stopPropagation();
            router.push(`/products/${productId}`);
          }}
        >
          {status === 'authenticated' && (
            <Box sx={productCardStyles.addProduct}>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  addProduct({productId, title});
                }}
              >
                <Typography
                  className="icon-add-to-cart"
                  component="i"
                ></Typography>
              </Button>
            </Box>
          )}
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
          />
          {imgPath && (
            <>
              <IconButton
                sx={{
                  ...productCardStyles.iconBtn,
                  ...(currentImageIndex === 0
                    ? productCardStyles.disabled
                    : ''),
                }}
                onClick={goToPreviousImage}
              >
                <Typography component="i" className="icon-chevron-left" />
              </IconButton>
              <IconButton
                sx={{
                  ...productCardStyles.iconBtn,
                  ...(currentImageIndex === imgPath?.length - 1
                    ? productCardStyles.disabled
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
        <Box sx={productCardStyles.body}>
          <Stack sx={productCardStyles.header}>
            <Typography component="h3" sx={productCardStyles.title}>
              {title || 'Product title'}
            </Typography>
            <Typography
              component="span"
              sx={{
                ...productCardStyles.title,
                ...productCardStyles.price,
              }}
            >
              ${price || '100'}
            </Typography>
          </Stack>
          <Stack sx={productCardStyles.categoryRow}>
            {typeof imgPath?.src === 'string'
              ? category
              : category.map(cat => {
                  return (
                    <Typography
                      sx={productCardStyles.category}
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
              sx={productCardStyles.threeDots}
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
