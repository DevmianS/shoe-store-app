import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {useRouter} from 'next/router';
import {Paper} from '@mui/material';
import {rwdValue} from '@/utils/theme';

const styles = {
  optionsMenu: {
    position: 'absolute',
    right: 15,
    top: rwdValue(30, 40),
    borderRadius: '8px',
    width: '40%',
    minWidth: '60px',
    bgcolor: '#f9f9f9',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    span: {
      fontWeight: '300',
      fontSize: rwdValue(10, 15),
      color: '#000000',
    },
    '& > div': {
      height: rwdValue(20, 35),
    },
  },
};

function OptionsMenu({productId, confirmationHandler}) {
  const router = useRouter();

  return (
    <Paper elevation={3} className="three-dots-menu">
      <List elevation={3} component="nav" sx={styles.optionsMenu}>
        <ListItemButton>
          <ListItemText
            primary="View"
            onClick={() => router.push(`/products/${productId}`)}
          />
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton>
          <ListItemText
            primary="Edit"
            onClick={() => {
              console.log('TODO: Edit');
            }}
          />
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton
          onClick={() => {
            console.log('confirm deletion');
            confirmationHandler(true);
          }}
        >
          <ListItemText primary="Delete" />
        </ListItemButton>
      </List>
    </Paper>
  );
}

export default OptionsMenu;
