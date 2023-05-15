import {Stack, Box, List} from '@mui/material';
import useOwnStyles from '@/utils/styles';
import {useRouter} from 'next/router';
import ListItem from '@/components/UI/ListItem';
import AvatarStaticLayout from '../AvatarStaticLayout';

export default function SideBar({children}) {
  const router = useRouter();
  const {sideBar: styles} = useOwnStyles();

  return (
    <Box sx={styles}>
      <Stack aria-label="user actions">
        <AvatarStaticLayout />
        <List>
          <ListItem
            name="My products"
            icon="bag-o"
            onClick={() => router.push('/my-products')}
          />
          <ListItem
            name="Settings"
            icon="setting"
            onClick={() => router.push('/profile/update')}
          />
          <ListItem
            name="Log-out"
            icon="logout"
            onClick={() => router.push('/profile/update')}
          />
        </List>
      </Stack>
    </Box>
  );
}
