import Image from 'next/image';
import {useState} from 'react';

import {Box, Typography} from '@mui/material';

import useOwnStyles from '@/utils/styles';

import Button from '@/components/UI/Button';

export default function FileInput() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {UI} = useOwnStyles();
  const {fileInput: styles} = UI;

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
