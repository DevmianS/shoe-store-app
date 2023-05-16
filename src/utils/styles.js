import {rwdValue} from '@/utils/theme';
import {useTheme, useMediaQuery} from '@mui/material';

const useOwnStyles = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // ====PAGES====
  // /profile/update
  const updateProfile = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: rwdValue(20, 40),
      paddingBottom: rwdValue(20, 40),
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '7px',
      borderBottom: '1px solid',
      borderColor: 'divider',
    },
    content: {
      flex: '1 1 auto',
      paddingLeft: rwdValue(10, 60),
      paddingRight: rwdValue(10, 60),
    },
    avatarRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: rwdValue(25, 50),
    },
    avatar: {
      marginRight: rwdValue(28, 75),
      border: '4px solid white',
      flex: `0 0 ${rwdValue(100, 150)}`,
    },
    h1: {
      marginBottom: rwdValue(12, 50),
    },
    btn: {
      marginBottom: rwdValue(16, 25),
    },
    description: {
      color: theme.palette.text.secondary,
      marginBottom: rwdValue(25, 50),
      fontSize: rwdValue(12, 15),
    },
    form: {maxWidth: '450px'},
    item: {marginBottom: rwdValue(25, 50)},
    size: isMobile ? 'small' : 'medium',
  };
  // /my-products
  const myProducts = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: rwdValue(0, 40),
      paddingBottom: rwdValue(0, 40),
    },
    header: {
      flex: '1 1 auto',
      paddingLeft: rwdValue(10, 60),
      paddingRight: rwdValue(10, 60),
    },
    avatarWrapper: {
      marginLeft: rwdValue(20, 50),
      marginBottom: rwdValue(20, 30),
      flexDirection: 'row',
      alignItems: 'end',
      marginTop: isMobile || isTablet ? '-15px' : '-30px',
    },
    avatar: {
      marginRight: rwdValue(5, 15),
      border: '4px solid white',
      zIndex: 2,
    },
    name: {fontSize: rwdValue(14, 20)},
    points: {
      fontSize: rwdValue(12, 15),
      color: theme.palette.text.tetriary,
      marginBottom: isMobile ? 0 : rwdValue(0, 12),
    },
    h1: {marginBottom: rwdValue(20, 35)},
    productsRow: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: isMobile ? '0 -8px' : '0 -24px',
    },
    msgBody: {maxWidth: '320px', textAlign: 'center', margin: '0 auto'},
    msgIcon: {
      fontSize: 20,
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 10px',
    },
    msgTitle: {fontSize: rwdValue(16, 20), marginBottom: '10px'},
    msgText: {
      fontSize: rwdValue(12, 15),
      marginBottom: rwdValue(32, 40),
    },
    msgBtn: {maxWidth: '152px'},
  };

  const sideBar = {
    position: isTablet || isMobile ? 'fixed' : 'static',
    maxWidth: isTablet || isMobile ? '270px' : '320px',
    paddingTop: isTablet || isMobile ? '32px' : 0,
    right: 0,
    top: isTablet ? '64px' : '60px',
    flex: '0 0 320px',
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: 5,
    transform: isTablet || isMobile ? 'translateX(100%)' : 'none',
  };

  return {updateProfile, sideBar, myProducts};
};
export default useOwnStyles;
