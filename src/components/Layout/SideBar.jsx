import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '../UI/ListItem/ListItem';


export default function SideBar({listItems}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 320 }}>
      <div>AVATAR</div>
      <Divider />
      <nav aria-label="user profile actions">
        <List>
          {listItems.map(item =>(
          <ListItem key={item.name} count={item.count || null} name={item.name} icon={item.icon} onClick={item.click}/>))}
        </List>
      </nav>
    </Box>
  );
}