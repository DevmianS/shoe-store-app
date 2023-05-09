import React, {useState} from 'react';
import Image from 'next/image';

import {Box, Typography, styled, useMediaQuery, useTheme} from '@mui/material';

import {rwdValue} from '@/utils/theme';

import Button from '../Button';

export default function FileInput() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const handleFileInputChange = e => {
    const selectedFile = e.target.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      setImagePreview(e.target.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };
  const BoxFile = styled(Box)({
    flex: isTablet ? `0 0 calc(50% - 10px)` : `0 0 calc(50% - 26px)`,
    width: isTablet ? `calc(50% - 10px)` : `calc(50% - 26px)`,
    height: rwdValue(100, 380),
    minHeight: '100px',
    border: '1px dashed #5C5C5C',
    borderRadius: '8px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& input': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      cursor: 'pointer',
    },
    '& img': {
      outline: '2px solid #fff',
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    },
    '& button': {
      width: '40px',
      minWidth: isTablet ? '40px' : '60px',
      height: '40px',
      padding: 0,
      position: 'absolute',
      bottom: '10px',
      left: 'calc(50%-75px)',
      transform: `translateY(${isTablet ? 0 : -10}px)`,
      opacity: isTablet ? 1 : 0,
      transition: '0.5s',
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      '& i': {
        color: theme.palette.primary.main,
      },
      '& button': {
        transform: 'translateY(0)',
        opacity: 1,
        transition: '0.5s',
      },
    },
  });
  return (
    <BoxFile>
      {!imagePreview && (
        <>
          <Typography
            component="i"
            fontSize={rwdValue(30, 40)}
            mb="12px"
            className="icon-gallery"
            color="text.secondary"
          />
          <Typography
            component="p"
            variant="body5"
            fontSize={rwdValue(10, 15)}
            textAlign="center"
          >
            Drop your image here, or select click to browse
          </Typography>
        </>
      )}
      <input type="file" onChange={handleFileInputChange} />
      {imagePreview && (
        <>
          <Image src={imagePreview} alt="Preview" width={320} height={380} />
          <Button
            onClick={() => {
              setImagePreview(null);
              setFile(null);
            }}
          >
            <Typography className="icon-trash" fontSize={24} />
          </Button>
        </>
      )}
    </BoxFile>
  );
}
