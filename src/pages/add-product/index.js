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

import {v4} from 'uuid';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import {useEffect, useState} from 'react';
import FileInput from '@/components/UI/FileInput';
import useProductData from '@/hooks/useProductData';
import useUser from '@/hooks/useUser';

import axios from 'axios';
import {createProduct, uploadImages} from '@/utils/utils';

const AddProduct = () => {
  const {
    brands,
    categories,
    genders,
    sizes,
    isLoading,
    setSizes,
    setCategories,
  } = useProductData() || {};

  console.log('genders ', genders);

  const [select, setSelect] = useState({gender: 'Men', brand: 'Nike'});

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [arrImages, setArrImages] = useState([
    {id: 1, file: null, image: null},
    {id: 2, file: null, image: null},
    {id: 3, file: null, image: null},
    {id: 4, file: null, image: null},
  ]);

  console.log('arrImages: ', arrImages);

  // EVENTS
  const genderChangeHandler = e => {
    setSelect({...select, gender: e.target.value});
  };
  const brandChangeHandler = e => {
    setSelect({...select, brand: e.target.value});
  };
  const checkBoxChangeHandler = event => {
    setSizes(
      sizes.map(obj => {
        if (obj.value == event.target.htmlFor) {
          return {
            ...obj,
            needed: !obj.needed,
          };
        }
        return obj;
      }),
    );
  };

  const checkBoxChangeHandlerCategory = event => {
    setCategories(
      categories.map(obj => {
        if (obj.name == event.target.htmlFor) {
          return {
            ...obj,
            needed: !obj.needed,
          };
        }
        return obj;
      }),
    );
  };

  // STYLED COMPONENTS
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

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
    marginTop: 10,
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

  const {jwt, id} = useUser();

  const handleSubmit = async () => {
    let arrImgId = await uploadImages(arrImages, jwt);

    const res = await createProduct(
      genders,
      select,
      brands,
      categories,
      sizes,
      name,
      arrImgId,
      description,
      id,
      jwt,
    );

    resetForm();

    console.log('RES: ', res);
  };

  const resetForm = () => {
    setSelect({gender: 'Men', brand: 'Nike'});

    setName('');
    setDescription('');
    setPrice(0);
    setArrImages([
      {id: 1, file: null, image: null},
      {id: 2, file: null, image: null},
      {id: 3, file: null, image: null},
      {id: 4, file: null, image: null},
    ]);
    setSizes(
      sizes.map(obj => {
        return {
          ...obj,
          needed: false,
        };
      }),
    );
    setCategories(
      categories.map(obj => {
        return {
          ...obj,
          needed: false,
        };
      }),
    );
  };

  return (
    <>
      <Head>
        <title>Wellrun | Add Product</title>
      </Head>
      <NavBarLayout>
        <Row>
          <SideBar />
          <Content>
            <HeaderRow>
              <Typography variant="h1" component="h1">
                Add product
              </Typography>
              <ButtonsWrap>
                <HeaderBtn variant="contained" onClick={handleSubmit}>
                  Save
                </HeaderBtn>
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
            <form>
              <Stack
                sx={{
                  justifyContent: 'space-between',
                  flexDirection: isTablet ? 'column' : 'row',
                }}
              >
                <Box
                  maxWidth={isTablet ? '100%' : '440px'}
                  flex={isTablet ? '1 1 auto' : '0 0 440px'}
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
                      value={name}
                      onChange={e => setName(e.target.value)}
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
                      placeholder="Price"
                      label="Price"
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
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
                          defaultValue="Men"
                        >
                          {!isLoading &&
                            genders.map(gender => {
                              return (
                                <MenuItem key={gender.id} value={gender.name}>
                                  {gender.name}
                                </MenuItem>
                              );
                            })}
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
                          {!isLoading &&
                            brands.map(brand => {
                              return (
                                <MenuItem key={brand.id} value={brand.name}>
                                  {brand.name}
                                </MenuItem>
                              );
                            })}
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
                      value={description}
                      onChange={e => setDescription(e.target.value)}
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
                    <Typography
                      sx={{
                        fontSize: isDesktop ? '15px' : '12px',
                        flex: '0 0 100%',
                      }}
                    >
                      Add size
                    </Typography>
                    {sizes &&
                      sizes.map(size => {
                        return (
                          <Box key={size.id} onClick={checkBoxChangeHandler}>
                            <Checkbox
                              name={size.value}
                              checked={size.needed}
                              onClick={checkBoxChangeHandler}
                              id={size.id}
                            />
                            <InputLabel
                              sx={{
                                background: size.needed
                                  ? theme.palette.primary.main
                                  : 'white',
                                color: size.needed
                                  ? 'white'
                                  : theme.palette.text.secondary,
                                '&:hover': {
                                  borderColor: 'black',
                                  color: 'black',
                                },
                              }}
                              htmlFor={size.value}
                            >
                              EU-{size.value}
                            </InputLabel>
                          </Box>
                        );
                      })}
                  </CheckBoxWrap>
                  <CheckBoxWrap>
                    <Typography
                      sx={{
                        fontSize: isDesktop ? '15px' : '12px',
                        flex: '0 0 100%',
                      }}
                    >
                      Add categories
                    </Typography>
                    {categories &&
                      categories.map(category => {
                        return (
                          <Box
                            key={category.id}
                            onClick={checkBoxChangeHandlerCategory}
                          >
                            <Checkbox
                              name={category.name}
                              checked={category.needed}
                              onClick={checkBoxChangeHandlerCategory}
                              id={category.id}
                            />
                            <InputLabel
                              sx={{
                                background: category.needed
                                  ? theme.palette.primary.main
                                  : 'white',
                                color: category.needed
                                  ? 'white'
                                  : theme.palette.text.secondary,
                                '&:hover': {
                                  borderColor: 'black',
                                  color: 'black',
                                },
                              }}
                              htmlFor={category.name}
                            >
                              {category.name}
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
                    paddingLeft:
                      'calc(0px + 110 * ((100vw - 1200px) / (1920 - 1200)))',
                    paddingRight:
                      'calc(0px + 110 * ((100vw - 1200px) / (1920 - 1200)))',
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
                    {arrImages.map(img => (
                      <FileInput
                        key={img.id}
                        id={img.id}
                        setArrImages={setArrImages}
                        arrImages={arrImages}
                      />
                    ))}
                  </Box>
                </Box>
              </Stack>
            </form>
          </Content>
        </Row>
      </NavBarLayout>
    </>
  );
};

export default AddProduct;
