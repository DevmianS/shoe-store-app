import {Stack, Box} from '@mui/material';
import useOwnStyles from '@/utils/styles';

export default function SideBar({children}) {
  const {sideBar: styles} = useOwnStyles();
  return (
    <Box sx={styles}>
      <Stack aria-label="user actions">{children}</Stack>
    </Box>
  );
}
