import Image from 'next/image';

import useOwnStyles from '@/utils/styles';

import {Box} from '@mui/material';

const Banner = ({children, src}) => {
  const {UI} = useOwnStyles();
  const {rootBanner: styles} = UI;
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
