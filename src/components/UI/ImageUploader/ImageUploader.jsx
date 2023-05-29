import Image from 'next/image';
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {rwdValue, theme} from '@/utils/theme';

const uploaderStyles = {
  label: {
    flexBasis: {
      xs: 'calc(50% - 10px)',
      md: 'calc(50% - 26px)',
      lg: '100%',
      xl: 'calc(50% - 26px)',
    },
    width: {xs: `calc(50% - 10px)`, md: `calc(50% - 26px)`},
    maxWidth: '330px',
    height: rwdValue(100, 380),
    minHeight: '100px',
    maxHeight: '380px',
    border: `1px dashed ${theme.palette.text.secondary}`,
    borderRadius: '8px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& img': {
      maxWidth: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    '& input': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      cursor: 'pointer',
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      cursor: 'pointer',
      '& i,& p': {
        color: theme.palette.primary.main,
        userSelect: 'none',
      },
    },
  },
  galleryIcon: {
    fontSize: rwdValue(30, 40),
    marginBottom: '12px',
    color: theme.palette.text.secondary,
  },
  preview: {
    flexBasis: {
      xs: 'calc(50% - 10px)',
      md: 'calc(50% - 26px)',
      lg: '100%',
      xl: 'calc(50% - 26px)',
    },
    width: {xs: `calc(50% - 10px)`, md: `calc(50% - 26px)`},
    maxWidth: '330px',
    height: rwdValue(100, 380),
    minHeight: '100px',
    maxHeight: '380px',
    border: `1px solit transparent,`,
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& img': {
      maxWidth: '100%',
      width: '100%',
      objectFit: 'cover',
      filter: {xs: 'brightness(0.7)', md: 'none'},
      transition: '0.3s',
    },
    '&:hover': {
      cursor: 'pointer',
      '& b': {
        opacity: 1,
      },
      '& img': {
        filter: 'brightness(0.5)',
      },
    },
  },
  delete: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: rwdValue(48, 80),
    height: rwdValue(48, 80),
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    opacity: {xs: 1, md: 0},
    fontSize: rwdValue(24, 32),
    transition: '0.3s',
  },
  text: {fontSize: rwdValue(10, 15), textAlign: 'center'},
};

function ImageUploader({images, setImages}) {
  const handleImageUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImages([
        ...images,
        {id: new Date(), image: reader.result, file: file},
      ]);
    };

    reader.readAsDataURL(file);

    event.target.value = '';
  };

  return (
    <>
      {images.map((image, index) => {
        return (
          <Box
            onClick={() =>
              setImages(prev => [...prev].filter(el => image.id !== el.id))
            }
            key={index}
            sx={uploaderStyles.preview}
          >
            <Image src={image.image} alt={`Preview ${index}`} fill />
            <Typography
              component="b"
              className="icon-trash"
              sx={uploaderStyles.delete}
            />
          </Box>
        );
      })}
      {images.length < 8 && (
        <Box component="label" htmlFor="upload" sx={uploaderStyles.label}>
          <Typography
            component="i"
            className="icon-gallery"
            sx={uploaderStyles.galleryIcon}
          />
          <Typography component="p" variant="body5" sx={uploaderStyles.text}>
            Drop your image here, or select click to browse
          </Typography>
          <input type="file" id="upload" onChange={handleImageUpload} />
        </Box>
      )}
    </>
  );
}

export default React.memo(ImageUploader);
