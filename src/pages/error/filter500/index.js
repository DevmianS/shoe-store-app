import Image from 'next/image';
import {Box, Typography, styled} from '@mui/material';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import error500 from '@/assets/500.png';

const ErrorFilter500 = () => {
  const Row = styled(Box)({
    display: 'flex',
  });
  const Column = styled(Box)({
    position: 'relative',
    flex: '0 0 50%',
    minHeight: '100%',
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '70%',
      objectFit: 'contain',
      objectPosition: 'center',
    },
  });
  return (
    <NavBarLayout>
      <Row>
        <Column>
          <Typography component="h1" variant="h1" color="primary">
            500! Server error!
          </Typography>
          <Typography component="p" variant="body1">
            We're sorry, the page you're looking for can't be found. It's
            possible that the page has been removed, renamed, or is temporarily
            unavailable. Please check the URL and try again, or use the
            navigation menu to explore our site.
          </Typography>
        </Column>
        <Column>
          <Image src={error500}></Image>
        </Column>
      </Row>
    </NavBarLayout>
  );
};

export default ErrorFilter500;
