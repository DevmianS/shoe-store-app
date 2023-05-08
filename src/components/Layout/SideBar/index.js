import {Stack, Box} from '@mui/material';

export default function SideBar({children, areaName}) {
  return (
    <Box sx={{flex: '0 0 320px', display: {xs: 'none', md: 'flex'}}}>
      <Stack
        component="div"
        direction="column"
        aria-label={areaName}
        variant="permanent"
      >
        {children}
      </Stack>
    </Box>
  );
}
