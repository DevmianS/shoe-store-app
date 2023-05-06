import {Stack, Grid} from '@mui/material';

export default function SideBar({children, areaName}) {
  return (
    <Grid item xl={2}>
      <Stack
        component="sidebar"
        direction="column"
        aria-label={areaName}
        variant="permanent"
        sx={{
          display: {sm: 'none', md: 'flex'},
        }}
      >
        {children}
      </Stack>
    </Grid>
  );
}
