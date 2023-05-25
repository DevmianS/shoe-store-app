import {useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {deleteProduct} from '@/utils/utils';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {Paper} from '@mui/material';
import {rwdValue} from '@/utils/theme';
import Modal from '../../Modal/Modal';
import Loading from '../../Loading/Loading';

const styles = {
  optionsMenu: {
    position: 'absolute',
    right: 15,
    top: rwdValue(30, 40),
    borderRadius: '8px',
    width: '40%',
    minWidth: '60px',
    bgcolor: '#f9f9f9',
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

function OptionsMenu({productId}) {
  const {data} = useSession();
  const [deleteConfVisible, setDeleteConfVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteProductHandler = async () => {
    try {
      setLoading(true);
      await deleteProduct({id: productId, jwt: data.user.jwt});
      router.reload();
    } catch {
      setLoading(false);
      setDeleteConfVisible(false);
      error => {
        throw new Error(error);
      };
    }
    setDeleteConfVisible(false);
    setLoading(false);
  };

  const router = useRouter();

  return (
    <Paper elevation={3}>
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
            setDeleteConfVisible(true);
          }}
        >
          <ListItemText primary="Delete" />
        </ListItemButton>
      </List>
      {loading && <Loading />}
      {deleteConfVisible && (
        <Modal
          state={true}
          setState={setDeleteConfVisible}
          title={'Are you sure to delete selected item '}
          text={
            'Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur. '
          }
          submitAction={deleteProductHandler}
        />
      )}
    </Paper>
  );
}

export default OptionsMenu;
