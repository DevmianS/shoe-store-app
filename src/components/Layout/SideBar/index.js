import {Stack, Box, List} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import {useRouter} from 'next/router';
import ListItem from '@/components/UI/ListItem';
import AvatarStaticLayout from '../AvatarStaticLayout';
import { signOut } from 'next-auth/react';

export default function SideBar({children}) {
  const router = useRouter();
  const {sideBar: styles} = useOwnStyles();

  const handleLogout = async () => {
      setLoading(true);
      await signOut({redirect: false});
      await router.prefetch('/sign-in');
      toast.success('Logged out successfully.');
      router.push('/sign-in');
      setLoading(false);
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
