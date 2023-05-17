import {Stack, Box, List} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import {useRouter} from 'next/router';
import ListItem from '@/components/UI/ListItem';
import AvatarStaticLayout from '../AvatarStaticLayout';
import {toast} from 'sonner';

export default function SideBar({children}) {
  const router = useRouter();

  const {sideBar: styles} = useOwnStyles();

  const handleLogout = () => {
    toast.success('Logged out successfully.');
    localStorage.removeItem('user');
    router.push('/');
  };
  return (
    <Box sx={styles}>
      <Stack aria-label="user actions">
        <AvatarStaticLayout />
        <List>
          <ListItem
            name="My products"
            icon="orders"
            onClick={() => router.push('/my-products')}
          />
          <ListItem
            name="Settings"
            icon="setting"
            onClick={() => router.push('/profile/update')}
          />
          <ListItem name="Log-out" icon="logout" onClick={handleLogout} />
        </List>
      </Stack>
      {children}
    </Box>
  );
}
