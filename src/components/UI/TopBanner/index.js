import {Box, useMediaQuery, useTheme} from '@mui/material';

export default function TopBanner({imgPath}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        background: `url(${imgPath}) center/cover no-repeat`,
        minHeight: isMobile ? '130px' : '260px',
        width: isMobile ? 'calc(100% + 20px)' : '100%',
        transform: `translateX(${isMobile ? '-10px' : '0px'})`,
      }}
    ></Box>
  );
}
