import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '../../UI/ListItem';
import {Typography, Toolbar, Stack} from '@mui/material';

export default function SideBar({listItems, children}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Stack
        direction="column"
        aria-label="user profile actions"
        variant="permanent"
        sx={{
          position: 'relative',
          width: '412px',
          height: '100%',
          display: {sm: 'none', md: 'flex'},
        }}
      >
        <Typography>AVATAR</Typography>

        <Divider />
        <Toolbar>
          <List
            sx={{
              width: '100%',
            }}
          >
            {listItems.map(item => (
              <ListItem
                key={item.name}
                count={item.count || null}
                name={item.name}
                icon={item.icon}
                onClick={item.click}
              />
            ))}
          </List>
        </Toolbar>
      </Stack>
      <Box component="main" sx={{overflowY: 'scroll', width: '100%'}}>
        {children}
      </Box>
    </Box>
  );
}
