import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {deleteProduct} from '@/utils/utils';
import {useSession} from 'next-auth/react';

function OptionsMenu({productId}) {
  const {data} = useSession();
  const styles = {
    listBtn: {
      fontSize: '15px',
      fontWeight: '300',
    },
  };

  return (
    <Paper elevation={3} sx={{bgcolor: 'red'}}>
      <List
        component="nav"
        sx={{
          position: 'absolute',
          right: 10,
          top: 45,
          borderRadius: '8px',
          width: '40%',
          // height: '112px',
          // height: '100%',
          // bgcolor: 'red',
          // button: {
          //   opacity: 1,
          // },
          bgcolor: '#f9f9f9',
        }}
      >
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
    </Paper>
  );
}

export default OptionsMenu;
