import React from 'react';
import {Typography, Box} from '@mui/material';

import Link from 'next/link';
import {rwdValue} from '@/utils/theme';

import Button from '@/components/UI/Button';

const NoContent = ({
  title = 'There are no products yet',
  description = 'Product can contain images, text, brands, etc...',
  href = '/add-product',
  buttonText = 'Add product',
}) => {
  const styles = {
    msgBody: {maxWidth: '320px', textAlign: 'center', margin: '0 auto'},
    msgIcon: {
      fontSize: 20,
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '50px auto 10px',
    },
    msgTitle: {fontSize: rwdValue(16, 20), marginBottom: '10px'},
    msgText: {
      fontSize: rwdValue(12, 15),
      marginBottom: rwdValue(32, 40),
    },
    msgBtn: {maxWidth: '152px'},
  };

  return (
    <Box sx={styles.msgBody}>
      <Typography className="icon-bag-o" sx={styles.msgIcon}></Typography>
      <Typography component="h2" variant="body2" sx={styles.msgTitle}>
        {title}
      </Typography>
      <Typography component="p" variant="body1" sx={styles.msgText}>
        {description}
      </Typography>
      <Link href={href}>
        <Button size={'medium'} sx={styles.msgBtn}>
          {buttonText}
        </Button>
      </Link>
    </Box>
  );
};

export default NoContent;
