import {Stack, Box, useTheme, useMediaQuery, styled} from '@mui/material';

export default function SideBar({children, areaName}) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const StyledBox = styled(Box)({
    flex: '0 0 320px',
    display: isTablet ? 'none' : 'block',
    width: '100%',
    maxWidth: '320px',
  });
  return (
    <StyledBox>
      <Stack
        component="div"
        direction="column"
        aria-label={areaName}
        variant="permanent"
      >
        {children}
      </Stack>
    </StyledBox>
  );
}
