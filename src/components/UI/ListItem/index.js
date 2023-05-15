import {
  Typography,
  ListItem as MUItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export default function ListItem({name, icon, onClick}) {
  return (
    <MUItem disablePadding sx={{marginBottom: '8px'}}>
      <ListItemButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          paddingLeft: '40px',
        }}
        onClick={onClick}
      >
        <i
          className={`icon-${icon}`}
          style={{fontSize: 20, marginRight: 15}}
        ></i>
        <ListItemText>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              fontWeight: 500,
              color: '#000',
            }}
          >
            {name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </MUItem>
  );
}
