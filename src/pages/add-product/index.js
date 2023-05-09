import Head from 'next/head';
import {rwdValue} from '@/utils/theme';

import {
  Typography,
  styled,
  Box,
  Stack,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  useTheme,
  useMediaQuery,
  Checkbox,
  FormGroup,
} from '@mui/material';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import LinksList from '@/components/UI/LinksList';
import {useState} from 'react';
import FileInput from '@/components/UI/FileInput';

const AddProduct = ({userName}) => {
  const [select, setSelect] = useState({gender: 'male', brand: 'nike'});
  const [size, setSize] = useState({
    36: false,
    37: false,
    38: false,
    39: false,
    40: false,
  });
  // EVENTS
  const genderChangeHandler = e => {
    setSelect({...select, gender: e.target.value});
  };
  const brandChangeHandler = e => {
    setSelect({...select, brand: e.target.value});
  };
  const checkBoxChangeHandler = e => {
    if (e.target.checked) {
      setSize(prev => ({...prev, [e.target.name]: true}));
    } else {
      setSize(prev => ({...prev, [e.target.name]: false}));
    }
  };

  const user = userName || 'Jane Meldrum';
  const profileItemsList = [
    {name: 'My orders', icon: 'bag', click: null},
    {name: 'Wish list', icon: 'plus-element', click: null, count: 2},
    {name: 'Newsletters', icon: 'newsletters', click: null},
    {name: 'My wallet', icon: 'wallet', click: null},
    {name: 'My bonus account', icon: 'bonus-account', click: null},
    {name: 'Premium subscription', icon: 'medal-star', click: null},
    {name: 'My feedback', icon: 'star', click: null},
    {name: 'Log out', icon: 'logout', click: null},
  ];

  // STYLED COMPONENTS
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const AvatarWrapper = styled(Stack)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '40px',
    alignItems: 'center',
    marginBottom: '7px',
    paddingBottom: '32px',
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  }));
  const TempAvatar = styled(Box)({
    maxWidth: '64px',
    height: '64px',
    flex: '0 0 64px',
    background: '#e2e2e2',
    borderRadius: '50%',
    marginRight: '16px',
  });
  const HeaderRow = styled(Stack)(({theme}) => ({
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    display: 'flex',
    flexDirection: 'row',
    rowGap: '10px',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: rwdValue(20, 35),
    flexDirection: 'column',
  }));
  const ButtonsWrap = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: rwdValue(10, 20),
  });
  const HeaderBtn = styled(Button)({
    height: rwdValue(30, 40),
    maxWidth: rwdValue(120, 150),
    fontSize: rwdValue(12, 16),
    width: '100%',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  });
  const Row = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: isTablet ? '25px 0' : '40px 0',
  });
  const Content = styled(Box)(({theme}) => ({
    '& .MuiInputBase-root': {
      height: isDesktop ? '48px' : '33px',
      fontSize: isDesktop ? '15px' : '10px',
    },
    '& label': {
      fontSize: isDesktop ? '15px' : '12px',
    },
    flex: '1 1 auto',
    padding: `0 ${rwdValue(20, 60)}`,
  }));
  const FormItem = styled(Box)({
    marginBottom: '25px',
  });
  const CheckBoxWrap = styled(FormGroup)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: isDesktop ? 'space-between' : 'start',
    gap: '10px',
    marginBottom: '20px',
    '& .MuiFormLabel-root': {
      cursor: 'pointer',
      border: `1px solid #C4C4C4`,
      borderRadius: '5.58px',
      width: isDesktop ? '75px' : '52px',
      height: isDesktop ? '48px' : '34px',
      fontSize: isDesktop ? '15px' : '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    },
    '& .MuiCheckbox-root': {
      display: 'none',
    },
  });
  const BoxFile = styled(Box)({
    flex: isTablet ? `0 0 calc(50% - 10px)` : `0 0 calc(50% - 26px)`,
    maxWidth: isTablet ? `calc(50% - 10px)` : `calc(50% - 26px)`,
    width: '100%',
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
      position: 'absolute',
      bottom: '10px',
      left: 'calc(50%-75px)',
      transform: `translateY(${isTablet ? 0 : -10}px)`,
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
  });
  return (
    <>
      <Head>
        <title>Add Product</title>
      </Head>
      <NavBarLayout>
        <Row>
          <SideBar areaName="addd product actions">
            <AvatarWrapper>
              <TempAvatar />
              <Box>
                <Typography color="text.tetriary" fontSize={12}>
                  Welcome
                </Typography>
                <Typography fontWeight={500}>{user}</Typography>
              </Box>
            </AvatarWrapper>
            <LinksList listItems={profileItemsList} />
          </SideBar>
          <Content>
            <HeaderRow>
              <Typography variant="h1" component="h1">
                Add product
              </Typography>
              <ButtonsWrap>
                <HeaderBtn variant="outlined">Schedule</HeaderBtn>
                <HeaderBtn variant="contained">Save</HeaderBtn>
              </ButtonsWrap>
            </HeaderRow>
            <Typography
              variant="body5"
              component="p"
              color="text.secondary"
              mb={rwdValue(25, 40)}
              fontSize={rwdValue(12, 15)}
              maxWidth="900px"
            >
              The account page allows you to manage your products easily. You
              can add new products to your inventory, update existing ones, and
              keep track of all your product listings in one convenient
              location. With simple and intuitive tools, you can quickly create
              new product pages, upload images, add descriptions, and set
              prices. Stay organized and streamline your product management with
              the account page.
            </Typography>
            <Stack direction={isTablet ? 'column' : 'row'}>
              <Box
                maxWidth={isTablet ? '100%' : '450px'}
                flex={isTablet ? '1 1 auto' : '0 0 450px'}
                mr={isTablet ? 0 : rwdValue(30, 120)}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: isDesktop ? '15px' : '10px',
                  },
                }}
              >
                <FormItem>
                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="Nike Air Max 90"
                    label="Product name"
                    type="text"
                    sx={{
                      '& .MuiInputBase-fullWidth': {
                        height: isDesktop ? '48px' : '33px',
                        fontSize: isDesktop ? '15px' : '10px',
                      },
                      '& .MuiInputLabel-formControl': {
                        fontSize: isDesktop ? '15px' : '12px',
                      },
                    }}
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="Sport"
                    label="Category"
                    type="text"
                    sx={{
                      '& .MuiInputBase-fullWidth': {
                        height: isDesktop ? '48px' : '33px',
                        fontSize: isDesktop ? '15px' : '10px',
                      },
                      '& .MuiInputLabel-formControl': {
                        fontSize: isDesktop ? '15px' : '12px',
                      },
                    }}
                  />
                </FormItem>
                <FormItem>
                  <Box
                    sx={{display: 'flex', gap: '20px', flexDirection: 'row'}}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        sx={{
                          height: '48px',
                          '& .MuiInputBase-input': {
                            fontSize: isDesktop ? '15px' : '10px',
                          },
                        }}
                        labelId="gender"
                        variant="outlined"
                        value={select.gender}
                        onChange={genderChangeHandler}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="indeterminate">Indeterminate</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="brand">Brand</InputLabel>
                      <Select
                        sx={{
                          height: '48px',
                          '& .MuiInputBase-input': {
                            fontSize: isDesktop ? '15px' : '10px',
                          },
                        }}
                        labelId="brand"
                        variant="outlined"
                        value={select.brand}
                        onChange={brandChangeHandler}
                      >
                        <MenuItem value="adidas">Adidas</MenuItem>
                        <MenuItem value="asics">Asics</MenuItem>
                        <MenuItem value="newBalance">New Balance</MenuItem>
                        <MenuItem value="nike">Nike</MenuItem>
                        <MenuItem value="puma">Puma</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </FormItem>
                <FormItem>
                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="Do not exceed 300 characters."
                    label="Description"
                    type="text"
                    multiline
                    rows={isDesktop ? 11 : 1}
                    sx={{
                      '& .MuiInputBase-root': {
                        minHeight: isDesktop ? '270px' : 0,
                        height: {xs: '34px'},
                      },
                      '& .MuiInputBase-input': {
                        fontSize: isDesktop ? '15px' : '10px',
                      },
                      '& label': {
                        fontSize: isDesktop ? '15px' : '12px',
                      },
                    }}
                  />
                </FormItem>
                <CheckBoxWrap>
                  {[...Object.keys(size)].map(n => {
                    return (
                      <Box key={n}>
                        <Checkbox
                          name={n}
                          checked={size[n]}
                          onChange={checkBoxChangeHandler}
                          id={'size' + n}
                        />
                        <InputLabel
                          sx={{
                            background: size[n]
                              ? theme.palette.primary.main
                              : 'white',
                            color: size[n]
                              ? 'white'
                              : theme.palette.text.secondary,
                            '&:hover': {
                              borderColor: 'black',
                              color: 'black',
                            },
                          }}
                          htmlFor={'size' + n}
                        >
                          EU-{n}
                        </InputLabel>
                      </Box>
                    );
                  })}
                </CheckBoxWrap>
              </Box>
              <Box
                sx={{
                  flex: '1 1 auto',
                  width: '100%',
                }}
              >
                <InputLabel>Product images</InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    gap: isTablet ? '20px' : '52px',
                    flexWrap: 'wrap',
                  }}
                >
                  <FileInput />
                  <FileInput />
                  <FileInput />
                  <FileInput />
                </Box>
              </Box>
            </Stack>
          </Content>
        </Row>
      </NavBarLayout>
    </>
  );
};

export default AddProduct;
