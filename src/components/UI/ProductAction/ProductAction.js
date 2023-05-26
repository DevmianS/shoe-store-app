import {rwdValue} from '@/utils/theme';

import {
  Typography,
  Box,
  TextField,
  TextareaAutosize,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  useTheme,
  useMediaQuery,
  Checkbox,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

import {useState} from 'react';
import FileInput from '@/components/UI/FileInput';
import Button from '@/components/UI/Button';
import useProductData from '@/hooks/useProductData';
import useUser from '@/hooks/useUser';

import {
  createProduct,
  uploadImages,
  validationCreateProduct,
} from '@/utils/utils';

import Loading from '@/components/UI/Loading';
import {toast} from 'sonner';
import {useRouter} from 'next/router';

const ProductAction = ({isEditing}) => {
  const router = useRouter();

  const {brands, categories, genders, sizes, colors, isLoading, setCategories} =
    useProductData() || {};

  const [loading, setLoading] = useState(false);

  const [select, setSelect] = useState({
    gender: 'Men',
    brand: 'Nike',
    color: 'Black',
    size: '36',
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [arrImages, setArrImages] = useState([
    {id: 1, file: null, image: null},
    {id: 2, file: null, image: null},
    {id: 3, file: null, image: null},
    {id: 4, file: null, image: null},
    {id: 5, file: null, image: null},
    {id: 6, file: null, image: null},
    {id: 7, file: null, image: null},
    {id: 8, file: null, image: null},
  ]);

  // EVENTS
  const genderChangeHandler = e => {
    setSelect({...select, gender: e.target.value});
  };
  const brandChangeHandler = e => {
    setSelect({...select, brand: e.target.value});
  };
  const colorChangeHandler = e => {
    setSelect({...select, color: e.target.value});
  };
  const sizeChangeHandler = e => {
    setSelect({...select, size: e.target.value});
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

  const actionStyles = {
    openButton: {
      maxWidth: '152px',
    },
    headerRow: {
      display: 'flex',
      flexDirection: isDesktop ? 'row' : 'column',
      rowGap: '10px',
      alignItems: isDesktop ? 'center' : 'start',
      justifyContent: 'space-between',
      marginBottom: rwdValue(20, 35),
      marginTop: 10,
      '& button': {maxWidth: '152px'},
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: {xs: '25px 0', md: '40px 0'},
    },
    content: {
      '& .MuiInputBase-root': {
        height: {xs: '33px', md: '48px'},
        fontSize: {xs: '10px', md: '15px'},
      },
      '& label': {
        fontSize: {xs: '12px', md: '15px'},
      },
      flex: '1 1 auto',
      padding: `0 ${rwdValue(20, 60)}`,
    },
    formItem: {
      marginBottom: '25px',
      '& textarea': {
        height: {md: '270px!important', xs: '34px!important'},
        width: '100%',
        color: '#5C5C5C',
        padding: '10px',
        borderRadius: '8px',
        resize: 'none',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        fontSize: rwdValue(10, 15),
        fontFamily: 'inherit',
        '&::placeholder': {opacity: 0.3},
        '&:focus': {
          '&::placeholder': {opacity: 0},
          outline: 'none',
          borderColor: theme.palette.primary.main,
        },
      },
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      gap: '10px',
      marginBottom: '20px',
      '& .MuiFormLabel-root': {
        cursor: 'pointer',
        border: `1px solid #C4C4C4`,
        borderRadius: '5.58px',
        width: {md: '75px', xs: '52px'},
        height: {md: '48px', xs: '34px'},
        fontSize: {md: '15px', xs: '10px'},
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
      },
      '& .MuiCheckbox-root': {
        display: 'none',
      },
    },
    formRow: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: isDesktop ? 'row' : 'column',
      flexWrap: lg ? 'wrap' : 'nowrap',
    },
    form: {
      maxWidth: {xs: '100%', md: '440px'},
      flex: isDesktop ? '0 0 440px' : '1 1 auto',
      marginRight: isDesktop ? rwdValue(30, 120) : 0,
      '& .MuiInputBase-input': {
        fontSize: isDesktop ? '15px' : '10px',
      },
      '& form': {display: 'flex', flexWrap: 'wrap'},
    },
    checkboxRow: {display: 'flex', gap: '20px', flexDirection: 'row'},
    label: {
      fontSize: rwdValue(12, 15),
      flex: '0 0 100%',
    },
    filesRow: {
      display: 'flex',
      gap: isDesktop ? '52px' : '20px',
      flexWrap: 'wrap',
    },
    filesWrap: {
      flex: '1 1 auto',
      width: '100%',
      paddingBottom: 10,
    },
    toggleButtonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    rwdSize: isDesktop ? 'medium' : 'small',
  };

  const {jwt, id} = useUser();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const errorInParameters = await validationCreateProduct({
        genders,
        price,
        categories,
        sizes,
        colors,
        name,
        arrImages,
        description,
        id,
        jwt,
      });

      if (errorInParameters) {
        toast.message('Please fill in the gaps again correctly.');
      } else {
        let arrImgId = await uploadImages(arrImages, jwt);
        const res = await createProduct({
          genders,
          select,
          brands,
          price,
          categories,
          sizes,
          colors,
          name,
          arrImgId,
          description,
          id,
          jwt,
        });

        if (res?.status == '200') {
          resetForm();

          router.push('/my-products');
        }
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setSelect({gender: 'Men', brand: 'Nike', color: 'Black', size: '36'});

    setName('');
    setDescription('');
    setPrice(0);
    setArrImages([
      {id: 1, file: null, image: null},
      {id: 2, file: null, image: null},
      {id: 3, file: null, image: null},
      {id: 4, file: null, image: null},
    ]);
    setCategories(
      categories.map(obj => {
        return {
          ...obj,
          needed: false,
        };
      }),
    );
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Button onClick={handleOpen} sx={actionStyles.openButton}>
        {isEditing ? 'Edit' : 'Add'} product
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        {loading && <Loading />}
        <Box sx={actionStyles.content}>
          <Box sx={actionStyles.headerRow}>
            <DialogTitle variant="h1" component="h1">
              {isEditing ? 'Edit' : 'Add'} product
            </DialogTitle>
            <DialogActions>
              <Button
                size={actionStyles.rwdSize}
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                size={actionStyles.rwdSize}
                variant="contained"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </DialogActions>
          </Box>
          <DialogContentText
            variant="body5"
            component="p"
            color="text.secondary"
            mb={rwdValue(25, 40)}
            fontSize={rwdValue(12, 15)}
            maxWidth="900px"
          >
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero{`'`}s De Finibus Bonorum
            et Malorum for use in a type specimen book. It usually begins with:
          </DialogContentText>
          <form style={actionStyles.formRow}>
            <DialogContent sx={actionStyles.form}>
              <Box sx={actionStyles.formItem}>
                <TextField
                  fullWidth
                  size={actionStyles.rwdSize}
                  placeholder="Nike Air Max 90"
                  label="Product name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Box>
              <Box sx={actionStyles.formItem}>
                <TextField
                  fullWidth
                  size={actionStyles.rwdSize}
                  placeholder="Price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Box>
              <Box sx={actionStyles.formItem}>
                <Box sx={actionStyles.checkboxRow}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      variant="outlined"
                      value={select.gender}
                      onChange={genderChangeHandler}
                      defaultValue="Men"
                      size={actionStyles.rwdSize}
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
                      size={actionStyles.rwdSize}
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
                  <FormControl fullWidth>
                    <InputLabel id="color">Color</InputLabel>
                    <Select
                      labelId="color"
                      variant="outlined"
                      aria-label="color"
                      value={select.color}
                      onChange={colorChangeHandler}
                      defaultValue="Black"
                      size={actionStyles.rwdSize}
                    >
                      {!isLoading &&
                        colors.map(color => {
                          return (
                            <MenuItem key={color.id} value={color.name}>
                              {color.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={actionStyles.formItem}>
                <TextareaAutosize
                  placeholder="Do not exceed 1000 characters."
                  label="Description"
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Box>
              <FormGroup sx={actionStyles.formGroup}>
                <Typography sx={actionStyles.label}>Add size</Typography>
                <ToggleButtonGroup
                  exclusive
                  sx={actionStyles.toggleButtonGroup}
                  onChange={sizeChangeHandler}
                >
                  {sizes &&
                    sizes.map(size => {
                      const itemStyle = {
                        border: '1px solid #C4C4C4',
                        background:
                          size.value === select.size
                            ? theme.palette.primary.main
                            : 'white',
                        color:
                          size.value === select.size
                            ? 'white'
                            : theme.palette.text.secondary,
                        '&:hover': {
                          background:
                            size.value === select.size
                              ? theme.palette.primary.main
                              : 'white',
                          borderColor: 'black',
                          color: 'black',
                        },
                      };
                      return (
                        <ToggleButton
                          size={actionStyles.rwdSize}
                          key={size.id}
                          value={size.value}
                          onClick={sizeChangeHandler}
                          sx={itemStyle}
                        >{`EU-${size.value}`}</ToggleButton>
                      );
                    })}
                </ToggleButtonGroup>
              </FormGroup>
              <FormGroup sx={actionStyles.formGroup}>
                <Typography sx={actionStyles.label}>Add categories</Typography>
                {categories &&
                  categories.map(category => {
                    const itemStyle = {
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
                    };
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
                        <InputLabel sx={itemStyle} htmlFor={category.name}>
                          {category.name}
                        </InputLabel>
                      </Box>
                    );
                  })}
              </FormGroup>
            </DialogContent>
            <DialogContent sx={actionStyles.filesWrap}>
              <InputLabel>Product images</InputLabel>
              <Box sx={actionStyles.filesRow}>
                {arrImages.map(img => (
                  <FileInput
                    key={img.id}
                    id={img.id}
                    setArrImages={setArrImages}
                    arrImages={arrImages}
                  />
                ))}
              </Box>
            </DialogContent>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default ProductAction;
