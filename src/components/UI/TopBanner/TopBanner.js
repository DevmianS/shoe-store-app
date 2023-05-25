import Box from '@mui/material/Box';

const topBannerStyles = {
  minHeight: {xs: '130px', md: '260px'},
  width: {xs: 'calc(100% + 20px)', md: '100%'},
  transform: {xs: `translateX(-10px)`, md: `translateX(0)`},
};

export default function TopBanner({imgPath}) {
  return (
    <Box
      sx={{
        ...topBannerStyles,
        background: `url(${imgPath}) center/cover no-repeat`,
      }}
    ></Box>
  );
}
