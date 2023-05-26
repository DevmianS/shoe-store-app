import Image from 'next/image';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import {rwdValue} from '@/utils/theme';

const galleryStyles = {
  column: {
    flex: {xs: '0 0 100%', md: `0 0 calc(50% - ${rwdValue(0, 100)})`},
    display: 'flex',
    flexDirection: {xs: 'column', md: 'row'},
    maxHeight: '500px',
    userSelect: 'none',
    overflow: 'hidden',
  },
  elems: {
    display: {xs: 'flex', md: 'block'},
    maxHeight: {xs: '90px', md: '500px'},
    maxWidth: {xs: '100%', md: '85px'},
    flex: {xs: '0 0 100%', md: '0 0 85px'},
    flexDirection: {xs: 'row', md: 'column'},
    overflowX: 'auto',
    direction: {xs: 'ltr', md: 'rtl'},
    order: {xs: 2, md: 1},
    gap: '8px',
  },
  thumbnail: {
    width: '74px',
    height: '74px',
    flex: '0 0 74px',
    padding: '1px',
    border: `1px solid rgba(100,100,100,0.2)`,
    position: 'relative',
    marginBottom: {xs: '0', md: '8px'},
    cursor: 'pointer',
    '&:hover': {opacity: 0.75},
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  image: {
    maxWidth: {xs: '100%', md: '500px'},
    width: '100%',
    flex: '1 1 auto',
    height: '500px',
    padding: '1px',
    border: `1px solid rgba(100,100,100,0.2)`,
    position: 'relative',
    marginLeft: {xs: '0', md: '16px'},
    marginBottom: {xs: '8px', md: '0'},
    order: {xs: 1, md: 2},
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: {xs: 'contain', sm: 'cover', md: 'cover'},
    },
  },
  iconBtn: {
    width: '24px',
    height: '24px',
    border: '1px solid',
    borderColor: {xs: '#dbdbdb', md: '#fff'},
    backgroundColor: {xs: '#dbdbdb', md: '#fff'},
    transition: '0.3s all',
    '&:disabled': {backgroundColor: 'lightgrey', borderColor: 'lightgrey'},
    '&:hover': {
      backgroundColor: '#fe645e',
      borderColor: '#fe645e',
      color: '#fff',
    },
  },
  controls: {
    position: 'absolute',
    bottom: {xs: '16px', md: '32px'},
    right: {xs: '16px', md: '32px'},
    display: 'flex',
    gap: '16px',
  },
};

export default function Gallery({images, setImages}) {
  const galleryClickHandler = index => {
    setImages(prev => ({...prev, active: index}));
  };
  const galleryControlsHandler = action => {
    if (action === 'next') {
      setImages(prev => ({
        ...prev,
        active: prev.active === images.array.length - 1 ? 0 : prev.active + 1,
      }));
    }
    if (action === 'prev') {
      setImages(prev => ({
        ...prev,
        active: prev.active === 0 ? images.array.length - 1 : prev.active - 1,
      }));
    }
  };

  return (
    <Box sx={galleryStyles.column}>
      <Stack sx={galleryStyles.elems}>
        {images.array.map((img, i) => {
          const thumbnailStyles = {
            ...galleryStyles.thumbnail,
            opacity: i === images.active ? 1 : 0.3,
          };
          return (
            <Box
              key={img?.id}
              onClick={() => galleryClickHandler(i)}
              sx={thumbnailStyles}
            >
              <Image
                fill
                id={img?.id}
                alt={
                  img?.attributes?.formats?.thumbnail?.hash ||
                  images?.array[i]?.attributes?.hash
                }
                src={
                  img?.attributes?.formats?.thumbnail?.url ||
                  images?.array[i]?.attributes?.url
                }
              />
            </Box>
          );
        })}
      </Stack>
      <Box sx={galleryStyles.image}>
        {images.array.length > 0 && (
          <Image
            src={images?.array[images?.active]?.attributes.url}
            fill
            alt={images?.array[images?.active]?.attributes.hash}
          />
        )}
        <Box sx={galleryStyles.controls}>
          <IconButton
            sx={galleryStyles.iconBtn}
            onClick={() => {
              galleryControlsHandler('prev');
            }}
          >
            <Typography component="i" className="icon-chevron-left" />
          </IconButton>
          <IconButton
            sx={galleryStyles.iconBtn}
            onClick={() => {
              galleryControlsHandler('next');
            }}
          >
            <Typography component="i" className="icon-chevron-right" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
