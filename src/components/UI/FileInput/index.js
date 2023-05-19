import Image from 'next/image';
import {useState} from 'react';

import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';

import Button from '@/components/UI/Button';
import {rwdValue} from '@/utils/theme';

export default function FileInput() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const styles = {
    wrap: {
      flex: !isDesktop ? `0 0 calc(50% - 10px)` : `0 0 calc(50% - 26px)`,
      width: !isDesktop ? `calc(50% - 10px)` : `calc(50% - 26px)`,
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
        minWidth: !isDesktop ? '40px' : '60px',
        height: '40px',
        padding: 0,
        position: 'absolute',
        bottom: '10px',
        left: 'calc(50%-75px)',
        transform: `translateY(${!isDesktop ? 0 : -10}px)`,
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
    },
    icon: {
      fontSize: rwdValue(30, 40),
      marginBottom: '12px',
      color: theme.palette.text.secondary,
    },
    text: {
      fontSize: rwdValue(10, 15),
      textAlign: 'center',
    },
    clear: {
      fontSize: 24,
      color: 'white',
    },
  };

  const fileInputChangeHandler = e => {
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
  const clearClickHandler = () => {
    setImagePreview(null);
    setFile(null);
  };
  return (
    <Box sx={styles.wrap}>
      <input type="file" onChange={fileInputChangeHandler} />
      {imagePreview ? (
        <>
          <Image src={imagePreview} alt="Preview" width={320} height={380} />
          <Button onClick={clearClickHandler}>
            <Typography className="icon-trash" sx={styles.clear} />
          </Button>
        </>
      ) : (
        <>
          <Typography component="i" className="icon-gallery" sx={styles.icon} />
          <Typography component="p" variant="body5" sx={styles.text}>
            Drop your image here, or select click to browse
          </Typography>
        </>
      )}
    </Box>
  );
}
