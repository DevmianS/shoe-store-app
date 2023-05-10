import {styled, alpha} from '@mui/material/styles';
import {Typography, InputBase} from '@mui/material';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  border: '1px solid #494949',
  borderRadius: '42px',
  backgroundColor: alpha((theme && theme.palette.common.white) || '#fff', 0.15),
  '&:hover': {
    backgroundColor: alpha(
      (theme && theme.palette.common.white) || '#fff',
      0.25,
    ),
  },
  marginLeft: 0,
  minWidth: '20%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  overflow: 'hidden',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const buttonsArray = [
  {link: '', text: 'Home'},
  {link: 'search', text: 'For woman'},
  {link: 'search', text: 'For men'},
  {link: 'search', text: 'Accessories'},
  {link: 'search', text: 'Sale'},
];

const buttonsArrayResponsive = [
  {link: 'home', text: 'Home', icon: 'chevron-left'},
  {link: 'search', text: 'Products', icon: 'bonus-account'},
  {link: 'bag', text: 'Bag', icon: 'bag'},
  {link: 'profile', text: 'My profile', icon: 'profile'},
  {link: '', text: 'Log out', icon: 'logout'},
];

const LinkStyles = {
  textDecoration: 'none',
  color: '#000',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

module.exports = {
  buttonsArrayResponsive,
  buttonsArray,
  StyledInputBase,
  Search,
  SearchIconWrapper,
  LinkStyles,
};
