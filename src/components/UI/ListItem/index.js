import {
  Typography,
  ListItem as MUItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export default function ListItem({name, icon, onClick}) {
  const styles = {
    item: {marginBottom: '8px'},
    button: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 500,
      paddingLeft: '40px',
      '& i': {fontSize: '20px', marginRight: '15px'},
    },
    name: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      fontWeight: 500,
      color: '#000',
    },
  };
  return (
    <MUItem disablePadding sx={styles.item}>
      <ListItemButton sx={styles.button} onClick={onClick}>
        <Typography component="i" className={`icon-${icon}`} />
        <ListItemText sx={styles.name}>{name}</ListItemText>
      </ListItemButton>
    </MUItem>
  );
}
