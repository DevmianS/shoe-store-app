import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {deleteProduct} from '@/utils/utils';
import {useSession} from 'next-auth/react';

const styles = {
  optionsMenu: {
    position: 'absolute',
    right: 15,
    top: 40,
    borderRadius: '8px',
    width: '40%',
    bgcolor: '#f9f9f9',
    span: {
      fontWeight: '300',
      fontSize: '15px',
      height: '20px',
      color: '#000000',
    },
    '& > div': {
      height: '30px',
    },
  },
};

function OptionsMenu({productId}) {
  const {data} = useSession();

  return (
    <List elevation={3} component="nav" sx={styles.optionsMenu}>
      <ListItemButton>
        <ListItemText primary="View" />
      </ListItemButton>
      <Divider variant="middle" />
      <ListItemButton>
        <ListItemText primary="Edit" />
      </ListItemButton>
      <Divider variant="middle" />
      <ListItemButton
        onClick={() => {
          deleteProduct({id: productId, jwt: data.user.jwt});
        }}
      >
        <ListItemText primary="Delete" />
      </ListItemButton>
    </List>
  );
}

export default OptionsMenu;
