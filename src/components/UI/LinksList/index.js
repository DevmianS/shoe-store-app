import ListItem from '../ListItem';
import {List as MUIList} from '@mui/material';

export default function LinksList({listItems}) {
  return (
    <MUIList>
      {listItems.map(item => (
        <ListItem
          key={item.name}
          count={item.count || null}
          name={item.name}
          icon={item.icon}
          onClick={item.click}
        />
      ))}
    </MUIList>
  );
}
