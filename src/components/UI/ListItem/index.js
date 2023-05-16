import useOwnStyles from '@/utils/styles';
import {
  Typography,
  ListItem as MUItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export default function ListItem({name, icon, onClick}) {
  const {UI} = useOwnStyles();
  const {listItem: styles} = UI;

  return (
    <MUItem disablePadding sx={styles.item}>
      <ListItemButton sx={styles.button} onClick={onClick}>
        <Typography component="i" className={`icon-${icon}`} />
        <ListItemText sx={styles.name}>{name}</ListItemText>
      </ListItemButton>
    </MUItem>
  );
}
