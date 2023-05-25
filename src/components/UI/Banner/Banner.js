import Image from 'next/image';
import Box from '@mui/material/Box';

const bannerStyles = {
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

const Banner = ({children, src}) => {
  return (
    <Box sx={bannerStyles.column}>
      <Image
        src={src}
        alt="banner"
        width={960}
        height={1080}
        style={bannerStyles.image}
      />
      <Box sx={bannerStyles.right}>
        <Box sx={bannerStyles.rightTop} />
        <Box sx={{...bannerStyles.rightBot, padding: '30px'}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Banner;
