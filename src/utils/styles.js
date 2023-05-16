import {rwdValue} from '@/utils/theme';
import {useTheme, useMediaQuery} from '@mui/material';

const useOwnStyles = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  const sideBar = {
    flex: '0 0 320px',
    display: isTablet ? 'none' : 'block',
    width: '100%',
    maxWidth: '320px',
  };

  const UI = {
    avatar: {
      width: '100%',
      height: '100%',
      transition: '.3s',
      '&:hover': {
        boxShadow: `0 0 3px 1px grey`,
        transform: 'scale(1.03)',
        filter: 'brightness(1.1)',
      },
    },
    rootBanner: {
      column: {
        width: '50%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: {
          xs: 'none',
          md: 'flex',
        },
      },
      image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        zIndex: '-1',
      },
      right: {
        zIndex: '100',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      rightTop: {
        width: '100%',
        height: '50%',
      },
      rightBot: {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-start',
        padding: 1,
      },
    },
    cartNavIcon: {
      position: 'relative',
      display: 'inline-block',
      minWidth: !isDesktop ? '32px' : '40px',
      fontSize: '24px',
      transition: '.3s',
      color: theme.palette.text.secondary,
      '& p': {
        position: 'absolute',
        top: 8,
        left: !isDesktop ? 9 : 13,
        width: 14,
        textAlign: 'center',
        fontSize: 10,
        color: 'inherit',
      },
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    productCard: {
      card: {
        position: 'relative',
        border: 0,
        boxShadow: 'none',
        borderRadius: 0,
        width: '100%',
        '& img': {
          width: rwdValue(100, 220),
          height: rwdValue(100, 220),
        },
        transition: 'transform 0.5s',
        '&:hover': !isDesktop
          ? {}
          : {
              transform: 'scale(1.01)',
              boxShadow: '0 0 3px 1px rgba(100,100,100,0.1)',
              cursor: 'pointer',
            },
      },
      content: {
        flexGrow: 1,
        paddingRight: '5px',
        paddingBottom: !isDesktop ? 0 : rwdValue(10, 25),
        paddingLeft: rwdValue(20, 50),
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      category: {
        color: theme.palette.text.secondary,
        marginBottom: '12px',
        fontSize: rwdValue(8, 20),
      },
      stock: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: rwdValue(8, 25),
        display: !isDesktop ? 'none' : 'block',
      },
      footer: {
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'row',
        alignItems: 'end',
        justifyContent: 'space-between',
      },
      select: {
        minWidth: '70px',
        '& .MuiSelect-select': {
          fontSize: rwdValue(12, 24),
          lineHeight: 1,
          maxWidth: !isDesktop ? '90px' : 'auto',
          width: !isDesktop ? 'auto' : '100%',
          paddingLeft: 0,
          paddingRight: !isDesktop ? '0' : '24px',
        },
        '& .MuiSelect-icon': {
          position: 'static',
          transform: !isDesktop ? 'translateX(-20px)' : 'translateX(-12px)',
          width: !isDesktop ? '8px' : '1rem',
          height: !isDesktop ? '8px' : '1rem',
        },
        '& .MuiInputBase-input': {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
      delete: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.text.light,
        '& span': {
          fontSize: rwdValue(12, 24),
        },
        '& i': {
          fontSize: rwdValue(12, 24),
          color: 'inherit',
          marginRight: '3px',
        },
        '&:hover': {
          color: theme.palette.primary.main,
          cursor: 'pointer',
        },
      },
    },
    fileInput: {
      wrap: {
        flex: !isDesktop ? `0 0 calc(50% - 10px)` : `0 0 calc(50% - 26px)`,
        width: !isDesktop ? `calc(50% - 10px)` : `calc(50% - 26px)`,
        height: rwdValue(100, 380),
        minHeight: '100px',
        border: '1px dashed #5C5C5C',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& input': {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          cursor: 'pointer',
        },
        '& img': {
          outline: '2px solid #fff',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        },
        '& button': {
          width: '40px',
          minWidth: !isDesktop ? '40px' : '60px',
          height: '40px',
          padding: 0,
          position: 'absolute',
          bottom: '10px',
          left: 'calc(50%-75px)',
          transform: `translateY(${!isDesktop ? 0 : -10}px)`,
          opacity: isTablet ? 1 : 0,
          transition: '0.5s',
        },
        '&:hover': {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          '& i': {
            color: theme.palette.primary.main,
          },
          '& button': {
            transform: 'translateY(0)',
            opacity: 1,
            transition: '0.5s',
          },
        },
      },
      icon: {
        fontSize: rwdValue(30, 40),
        marginBottom: '12px',
        color: theme.palette.text.secondary,
      },
      text: {
        fontSize: rwdValue(10, 15),
        textAlign: 'center',
      },
      clear: {
        fontSize: 24,
        color: 'white',
      },
    },
  };
  return {updateProfile, sideBar, UI};
};
export default useOwnStyles;
