import {
  Typography,
  ListItem as MUItem,
  ListItemButton,
  ListItemText,
  Badge,
} from '@mui/material';

export default function ListItem({name, icon, onClick, count}) {
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
          style={{color: '#6E7378', fontSize: 20, marginRight: 15}}
        ></i>
        <ListItemText>
          <Typography
            fontWeight={500}
            sx={{display: 'flex', alignItems: 'center', width: '100%'}}
          >
            {name}
            {count && (
              <Badge
                invisible={count == 0}
                badgeContent={count}
                color="primary"
                sx={{marginLeft: '20px'}}
              ></Badge>
            )}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </MUItem>
  );
}
