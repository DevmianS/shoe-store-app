import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Toolbar from '@mui/material/Toolbar';

import Banner from '@/components/UI/Banner';

const signStyles = {
  icon: {
    width: 32,
    position: 'absolute',
    display: {
      xs: 'none',
      md: 'flex',
    },
    top: 50,
    left: 40,
  },
  box: {
    minHeight: '59px',
    width: '100%',
    borderBottom: '1px solid #EAECF0',
    position: 'absolute',
    top: '0',
    display: {
      xs: 'flex',
      md: 'none',
    },
  },
  logo: {fontSize: '30px'},
  banner: {
    width: '100%',
    height: '100vh',
    display: 'flex',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    width: {xs: '100%', md: '50%'},
    height: '100%',
  },
};

const SignLayout = ({carousel, src, form}) => {
  return (
    <>
      <Icon sx={signStyles.icon}>
        <i className="icon-logo"></i>
      </Icon>
      <Box sx={signStyles.box}>
        <Toolbar sx={signStyles.logo}>
          <i className="icon-logo"></i>
        </Toolbar>
      </Box>
      <Box sx={signStyles.banner}>
        <Box sx={signStyles.form}>{form}</Box>
        <Banner src={src}>{carousel && carousel}</Banner>
      </Box>
    </>
  );
};

export default SignLayout;
