import Image from 'next/image';
import {Box, Stack, IconButton} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';
import React, {useState} from 'react';

export default function Gallery({images, setImages}) {
  const galleryClickHandler = index => {
    setImages(prev => ({...prev, active: index}));
  };
  const galleryControlsHandler = action => {
    if (action === 'next') {
      setImages(prev => ({
        ...prev,
        active:
          prev.active === images.array.length - 1
            ? prev.active
            : prev.active + 1,
      }));
    }
    if (action === 'prev') {
      setImages(prev => ({
        ...prev,
        active: prev.active === 0 ? 0 : prev.active - 1,
      }));
    }
  };

  const styles = {
    column: {
      flex: '0 0 calc(50% - 50px)',
      display: 'flex',
      maxHeight: '500px',
      overflow: 'auto',
      userSelect: 'none',
    },
    iconBtn: {
      width: '24px',
      height: '24px',
      border: '1px solid #fff',
      backgroundColor: '#fff',
      transition: '0.3s all',
      '&:disabled': {backgroundColor: 'lightgrey', borderColor: 'lightgrey'},
      '&:hover': {
        backgroundColor: '#fe645e',
        borderColor: '#fe645e',
        color: '#fff',
      },
    },
    thumbnail: {
      width: '74px',
      height: '74px',
      padding: '1px',
      border: `1px solid rgba(100,100,100,0.2)`,
      position: 'relative',
      marginBottom: '16px',
      cursor: 'pointer',
      '&:hover': {opacity: 0.75},
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    image: {
      width: '500px',
      height: '500px',
      padding: '1px',
      border: `1px solid rgba(100,100,100,0.2)`,
      position: 'relative',
      marginLeft: '16px',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    controls: {
      position: 'absolute',
      bottom: '32px',
      right: '32px',
      display: 'flex',
      gap: '16px',
    },
  };
  return (
    <Box sx={styles.column}>
      <Stack>
        {images.array.map((img, i) => {
          const {attributes} = img;
          const {formats} = attributes;
          const {thumbnail} = formats;
          return (
            <Box
              key={img?.id}
              onClick={() => galleryClickHandler(i)}
              sx={{...styles.thumbnail, opacity: i === images.active ? 1 : 0.3}}
            >
              <Image
                fill
                id={img?.id}
                alt={thumbnail?.hash}
                src={thumbnail?.url}
              />
            </Box>
          );
        })}
      </Stack>
      <Box sx={styles.image}>
        <Image
          src={images.array[images.active]?.attributes.url}
          fill
          alt={images.array[images.active]?.attributes.hash}
        />
        <Box sx={styles.controls}>
          <IconButton
            sx={styles.iconBtn}
            onClick={() => {
              galleryControlsHandler('prev');
            }}
            disabled={images.active === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            sx={styles.iconBtn}
            onClick={() => {
              galleryControlsHandler('next');
            }}
            disabled={images.active === images.array.length - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
