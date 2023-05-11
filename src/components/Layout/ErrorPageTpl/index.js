import {useRouter} from 'next/router';
import Image from 'next/image';

import {Box, Typography, styled, Stack} from '@mui/material';

import NavBarLayout from '@/components/Layout/NavBarLayout';

import Col from '@/components/UI/PageColumn';
import Button from '@/components/UI/Button';

const ErrorPageTpl = ({text, title, img, boxImg, mobileWhite}) => {
  const router = useRouter();
  const Row = styled(Box)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
      background: `none`,
      '& > div:first-of-type': {
        order: 0,
      },
      '& > div:last-of-type': {
        order: 1,
      },
    },
    background: boxImg ? `url(${boxImg.src}) center/cover no-repeat` : 'none',
    display: 'flex',
    flexWrap: 'wrap',
    '& > div:first-of-type': {
      order: 1,
    },
  }));
  const Content = styled(Box)(({theme}) => ({
    '& a': {
      maxWidth: '280px',
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: boxImg ? 'end' : 'start',
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

  const bgStyles = {
    padding: '0',
    margin: '0',
  };

  return (
    <NavBarLayout>
      <Row>
        <Col>
          <Content>
            <Stack maxWidth="460px">
              <Typography
                component="h1"
                variant="h1"
                color={boxImg ? 'black' : 'primary'}
                flex={boxImg ? '1 1 auto' : '0'}
                mb="20px"
                sx={
                  boxImg && {
                    display: {
                      md: `block`,
                      xs: `none`,
                    },
                  }
                }
              >
                {title}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color={
                  mobileWhite && {
                    md: 'black',
                    xs: boxImg ? 'white' : 'black',
                  }
                }
                mb={{md: '40px', xs: '30px'}}
              >
                {text}
              </Typography>
              <Button onClick={() => router.push('/')}>Back home</Button>
            </Stack>
          </Content>
        </Col>
        <Col sx={boxImg && bgStyles}>
          {img && <Image src={img} alt="Server Error 500" />}
          {boxImg && (
            <Typography
              component="h1"
              variant="h1"
              sx={{
                textAlign: 'center',
                mt: '60px',
                display: {
                  md: `none`,
                  xs: `block`,
                },
              }}
            >
              {title}
            </Typography>
          )}
          {boxImg && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: {
                  md: `url(${boxImg.src}) center/cover no-repeat`,
                },
              }}
            ></Box>
          )}
        </Col>
      </Row>
    </NavBarLayout>
  );
};

export default ErrorPageTpl;
