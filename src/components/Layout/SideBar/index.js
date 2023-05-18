import {Stack, Box, List} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import {useRouter} from 'next/router';
import ListItem from '@/components/UI/ListItem';
import {toast} from 'sonner';
import AvatarStaticLayout from '../AvatarStaticLayout';
import {toast} from 'sonner';
import {signOut} from 'next-auth/react';

export default function SideBar({children}) {
  const router = useRouter();

  const {sideBar: styles} = useOwnStyles();

  const handleLogout = () => {
    signOut();
    toast.success('Logged out successfully.');
  };
  return (
    <Box sx={styles}>
      <Stack aria-label="user actions">
        <AvatarStaticLayout variant="card" />
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
