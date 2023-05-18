import {Box} from '@mui/material';

import RootForm from '@/components/Form/RootForm';
import SignLayout from '@/components/Layout/SignLayout';

import RootMobile from '../RootMobile';

const Root = () => {
  const styles = {
    width: '100%',
    heigth: '100vh',
    display: {xs: 'none', md: 'flex'},
    overflow: 'hidden',
  };
  return (
    <>
      <Box sx={styles}>
        <SignLayout form={<RootForm />} src={`/product8.jpg`} />
      </Box>
      <RootMobile />
    </>
  );
};

export default Root;
