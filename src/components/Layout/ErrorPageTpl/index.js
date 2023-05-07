import Image from 'next/image';
import {Box, Typography, styled, Stack} from '@mui/material';

import Col from '@/components/UI/PageColumn';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import Button from '@/components/UI/Button';
import Link from 'next/link';

const ErrorPageTpl = ({text, title, img}) => {
  const Row = styled(Box)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
      '& div:first-child': {
        order: 0,
      },
      '& div:last-child': {
        order: 1,
      },
    },
    display: 'flex',
    flexWrap: 'wrap',
    '& div:first-child': {
      order: 1,
    },
  }));
  const Content = styled(Box)(({theme}) => ({
    '& a': {
      maxWidth: '280px',
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
      textAlign: 'center',
      '& a': {
        margin: '0 auto',
        maxWidth: '180px',
      },
    },

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  }));

  return (
    <NavBarLayout>
      <Row>
        <Col>
          <Content>
            <Stack maxWidth="400px">
              <Typography component="h1" variant="h1" color="primary" mb="20px">
                {title}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                mb={{md: '40px', xs: '30px'}}
              >
                {text}
              </Typography>
              <Link href="/">
                <Button>Back home</Button>
              </Link>
            </Stack>
          </Content>
        </Col>
        <Col>
          <Image src={img} alt="Server Error 500" />
        </Col>
      </Row>
    </NavBarLayout>
  );
};

export default ErrorPageTpl;
