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

  const styles = {
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
      padding: !isDesktop ? '25px 0' : '40px 0',
    },
    content: {
      '& .MuiInputBase-root': {
        height: isDesktop ? '48px' : '33px',
        fontSize: isDesktop ? '15px' : '10px',
      },
      '& label': {
        fontSize: isDesktop ? '15px' : '12px',
      },
      flex: '1 1 auto',
      padding: `0 ${rwdValue(20, 60)}`,
    },
    formItem: {
      marginBottom: '25px',
      '& textarea': {
        height: isDesktop ? '270px!important' : '34px!important',
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
    },
    formRow: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: !isDesktop ? 'column' : 'row',
      flexWrap: lg ? 'wrap' : 'nowrap',
    },
    form: {
      maxWidth: !isDesktop ? '100%' : '440px',
      flex: !isDesktop ? '1 1 auto' : '0 0 440px',
      marginRight: !isDesktop ? 0 : rwdValue(30, 120),
      '& .MuiInputBase-input': {
        fontSize: isDesktop ? '15px' : '10px',
      },
      '& form': {display: 'flex', flexWrap: 'wrap'},
    },
    checkboxRow: {display: 'flex', gap: '20px', flexDirection: 'row'},
    label: {
      fontSize: isDesktop ? '15px' : '12px',
      flex: '0 0 100%',
    },
    filesRow: {
      display: 'flex',
      gap: !isDesktop ? '20px' : '52px',
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
  const handleClose = () => setOpen(false);

  return (
    <>
      {loading && <Loading />}
      <Button onClick={handleOpen} sx={styles.openButton}>
        {isEditing ? 'Edit' : 'Add'} product
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <Box sx={styles.content}>
          <Box sx={styles.headerRow}>
            <DialogTitle variant="h1" component="h1">
              {isEditing ? 'Edit' : 'Add'} product
            </DialogTitle>
            <DialogActions>
              <Button
                size={isDesktop ? 'medium' : 'small'}
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                size={isDesktop ? 'medium' : 'small'}
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
          <form style={styles.formRow}>
            <DialogContent sx={styles.form}>
              <Box sx={styles.formItem}>
                <TextField
                  fullWidth
                  size={isDesktop ? 'medium' : 'small'}
                  placeholder="Nike Air Max 90"
                  label="Product name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Box>
              <Box sx={styles.formItem}>
                <TextField
                  fullWidth
                  size={isDesktop ? 'medium' : 'small'}
                  placeholder="Price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Box>
              <Box sx={styles.formItem}>
                <Box sx={styles.checkboxRow}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      variant="outlined"
                      value={select.gender}
                      onChange={genderChangeHandler}
                      defaultValue="Men"
                      size={isDesktop ? 'medium' : 'small'}
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
                      size={isDesktop ? 'medium' : 'small'}
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
                      value={select.color}
                      onChange={colorChangeHandler}
                      defaultValue="Black"
                      size={isDesktop ? 'medium' : 'small'}
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
              <Box sx={styles.formItem}>
                <TextareaAutosize
                  placeholder="Do not exceed 300 characters."
                  label="Description"
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Box>
              <FormGroup sx={styles.formGroup}>
                <Typography sx={styles.label}>Add size</Typography>
                <ToggleButtonGroup
                  exclusive
                  sx={styles.toggleButtonGroup}
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
                        <>
                          <ToggleButton
                            size={isDesktop ? 'medium' : 'small'}
                            key={size.id}
                            value={size.value}
                            onClick={sizeChangeHandler}
                            sx={itemStyle}
                          >{`EU-${size.value}`}</ToggleButton>
                        </>
                      );
                    })}
                </ToggleButtonGroup>
              </FormGroup>
              <FormGroup sx={styles.formGroup}>
                <Typography sx={styles.label}>Add categories</Typography>
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
            <DialogContent sx={styles.filesWrap}>
              <InputLabel>Product images</InputLabel>
              <Box sx={styles.filesRow}>
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
