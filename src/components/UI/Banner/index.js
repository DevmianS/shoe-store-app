import Image from 'next/image';
import {Box} from '@mui/material';

const Banner = ({children, src}) => {
  const styles = {
    column: {
      width: '50%',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      display: {
        xs: 'none',
        md: 'flex',
      },
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      zIndex: '-1',
    },
    right: {
      zIndex: '100',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    rightTop: {
      width: '100%',
      height: '50%',
    },
    rightBot: {
      width: '100%',
      height: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'flex-start',
      padding: 1,
    },
  };
  return (
    <Box sx={styles.column}>
      <Image
        src={src}
        alt="banner"
        width={960}
        height={1080}
        style={styles.image}
      />
      <Box sx={styles.right}>
        <Box sx={styles.rightTop} />
        <Box sx={{...styles.rightBot, padding: '30px'}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Banner;
